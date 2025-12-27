import { useState, useEffect } from "react";
import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three/webgpu";
import { WebGPURenderer } from "three/webgpu";
import Papa from "papaparse";
import createVerticalGradientTexture from "./components/createVerticalGradientTexture";

import AiHelper from "./components/aiHelper";
import { Experience } from "./components/Experience";
import { Dashboard } from "./components/Dashboard";
import { MachineLog } from "./components/MachineLog";

function App() {
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [roomOffset, setRoomOffset] = useState(0);

  const [rows, setRows] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);
  const [logVisible, setLogVisible] = useState(false);
  const logRows = rows.slice(0, currentIndex + 1);
  const [aiOpen, setAiOpen] = useState(false);




  const handlePumpClick = () => {
    setDashboardVisible((v) => !v);
    setRoomOffset((o) => (o === 0 ? -5 : 0));
  };

  // Dynamic CSV loading every second
  useEffect(() => {
  Papa.parse("/data/scada_pipeline.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: (results) => {
      const cleanRows = results.data.filter(Boolean);
      setRows(cleanRows);

      // 👇 choose your starting row here
      const START_INDEX = 1; // ← change this anytime
      setCurrentIndex(START_INDEX);
      setDashboardData(cleanRows[START_INDEX]);
    },
  });
}, []);

useEffect(() => {
  if (!rows.length) return;

  const interval = setInterval(() => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % rows.length;
      setDashboardData(rows[next]);
      return next;
    });
  }, 4000); // change data every __ seconds

  return () => clearInterval(interval);
}, [rows]);


  return (
    <>
      <Canvas
        shadows
        camera={{ position: [15, 8, 25], fov: 60 }}
        gl={(props) => {
          extend(THREE);
          const renderer = new WebGPURenderer({
            ...props,
            powerPreference: "high-performance",
            antialias: true,
          });
          return renderer.init().then(() => renderer);
        }}
        onCreated={({ scene }) => {
          scene.background = createVerticalGradientTexture("#000000", "#062241");
        }}
      >
        <Experience 
          onPumpClick={handlePumpClick} 
          roomOffset={roomOffset}
          eventType={dashboardData?.event_type}
        />
      </Canvas>

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

      <AiHelper 
        aiOpen={aiOpen} 
        onClose={() => setAiOpen(false)} 
        dashboardData={dashboardData} />

      <img
        src="EyeLogo.svg"
        className={`logo ${aiOpen ? "active" : ""}`}
        onClick={() => setAiOpen(true)}
      />


    </>
  );
}

export default App;
