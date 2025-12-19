import { useState, useEffect } from "react";
import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three/webgpu";
import { WebGPURenderer } from "three/webgpu";
import Papa from "papaparse";
import createVerticalGradientTexture from "./components/createVerticalGradientTexture";

import { Experience } from "./components/Experience";
import { Dashboard } from "./components/Dashboard";

function App() {
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [roomOffset, setRoomOffset] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);

  const handlePumpClick = () => {
    setDashboardVisible((v) => !v);
    setRoomOffset((o) => (o === 0 ? -5 : 0));
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
    interval = setInterval(fetchData, 8000); // update every 4 seconds

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

      {/* Dashboard only renders when CSV data is loaded */}
      {dashboardData && (
        <Dashboard
          className={`dashboard ${dashboardVisible ? "seen" : "hidden"}`}
          data={dashboardData}
          eventType={dashboardData?.event_type}
        />
      )}

    </>
  );
}

export default App;
