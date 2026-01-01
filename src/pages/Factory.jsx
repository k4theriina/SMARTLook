import { useState, useEffect, Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Papa from "papaparse";

import CanvasWrapper from "../components/CanvasWrapper";
import { Loader } from "../components/Loader";
import { Experience } from "../components/Experience";
import { Dashboard } from "../components/Dashboard";
import { MachineLog } from "../components/MachineLog";
import AiHelper from "../components/AiHelper";

function Factory() {
  const navigate = useNavigate();
  const location = useLocation();

  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [roomOffset, setRoomOffset] = useState(0);
  const [rows, setRows] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);
  const [logVisible, setLogVisible] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiVisible, setAiVisible] = useState(false);

  const [canvasKey, setCanvasKey] = useState(0);
  
  const handlePumpClick = () => {
    setDashboardVisible((v) => !v);
    setRoomOffset((o) => (o === 0 ? -5 : 0));
  };

  // Force full WebGPU teardown on every entry
  useEffect(() => {
    setCanvasKey((k) => k + 1);
  }, [location.pathname]);

  // Load CSV
  useEffect(() => {
    Papa.parse("/data/scada_pipeline.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const cleanRows = results.data.filter(Boolean);
        setRows(cleanRows);
        const START_INDEX = 1;
        setCurrentIndex(START_INDEX);
        setDashboardData(cleanRows[START_INDEX]);
      },
    });
  }, []);

  // Update dashboard periodically
  useEffect(() => {
    if (!rows.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % rows.length;
        setDashboardData(rows[next]);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [rows]);

  // Show AI after 3s
  useEffect(() => {
    const timer = setTimeout(() => setAiVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CanvasWrapper key={canvasKey}>
        <Suspense fallback={<Loader />}>
          <Experience
            onPumpClick={handlePumpClick}
            roomOffset={roomOffset}
            eventType={dashboardData?.event_type}
          />
        </Suspense>
      </CanvasWrapper>

      {dashboardData && (
        <Dashboard
          className={`dashboard ${dashboardVisible ? "seen" : "hidden"}`}
          data={dashboardData}
          rows={rows}
          currentIndex={currentIndex}
          logVisible={logVisible}
          setLogVisible={setLogVisible}
        />
      )}

      {logVisible && (
        <MachineLog
          rows={rows.slice(0, currentIndex + 1)}
          onClose={() => setLogVisible(false)}
        />
      )}

      {aiVisible && (
        <AiHelper
          aiOpen={aiOpen}
          onClose={() => setAiOpen(false)}
          dashboardData={dashboardData}
        />
      )}

      <img
        src="EyeLogo.svg"
        className={`logo ${aiOpen ? "active" : ""}`}
        onClick={() => setAiOpen((prev) => !prev)}
      />
      <img
        src="Home.svg"
        className="home"
        onClick={() => navigate("/")}
      />
    </>
  );
}

export default Factory;
