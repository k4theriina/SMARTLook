import { Canvas, extend } from "@react-three/fiber";
import { Experience } from "./components/Experience";

import * as THREE from "three/webgpu";
import { WebGPURenderer } from "three/webgpu";
import { Dashboard } from "./components/Dashboard";
import { useState } from "react";
import { useProgress } from "@react-three/drei";



function App() {
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [roomOffset, setRoomOffset] = useState(0);
  const { active } = useProgress();

  const handlePumpClick = () => {
    setDashboardVisible(v => !v);
    setRoomOffset(o => (o === 0 ? -5 : 0)); // ← move left 5
  };
  
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
            alpha: false,
            stencil: false,
            shadowMap: true,
          });
          return renderer.init().then(() => renderer);
        }}
      >
        <color attach="background" args={["#000000"]} />
          <Experience 
            onPumpClick={handlePumpClick}
            roomOffset = {roomOffset}  
          />
      </Canvas>

      {!active && (
        <img
          src="/Logo.svg"
          alt="SMARTLook Logo"
          className="logo"
        />
      )}
      <Dashboard className={`dashboard ${dashboardVisible ? "seen" : "hidden"}`}></Dashboard>
    </>


    
  );
}

export default App;
