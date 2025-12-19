import { useState, useEffect } from "react";
import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three/webgpu";
import { WebGPURenderer } from "three/webgpu";
import Papa from "papaparse";

import { Experience } from "./components/Experience";
import { Dashboard } from "./components/Dashboard";

function App() {
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [roomOffset, setRoomOffset] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);

  const handlePumpClick = () => {
    setDashboardVisible((v) => !v);
    setRoomOffset((o) => (o === 0 ? -5 : 0)); // move room left/right
  };

  // Dynamic CSV loading every second
  useEffect(() => {
    let interval;

    const fetchData = () => {
      Papa.parse("/data/scada_pipeline.csv", {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          if (results.data.length > 0) {
            // pick random row for demo/live effect
            const randomIndex = Math.floor(Math.random() * results.data.length);
            setDashboardData(results.data[randomIndex]);
          }
        },
      });
    };

    fetchData(); // fetch immediately
    interval = setInterval(fetchData, 3000); // update every second

    return () => clearInterval(interval);
  }, []);

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
      >
        {/* Keep background black */}
        <color attach="background" args={["#000000"]} />
        <Experience onPumpClick={handlePumpClick} roomOffset={roomOffset} />
      </Canvas>

      {/* Dashboard only renders when CSV data is loaded */}
      {dashboardData && (
        <Dashboard
          className={`dashboard ${dashboardVisible ? "seen" : "hidden"}`}
          data={dashboardData}
        />
      )}
    </>
  );
}

export default App;
