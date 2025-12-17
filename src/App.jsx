import { Canvas, extend } from "@react-three/fiber";
import { Experience } from "./components/Experience";

import * as THREE from "three/webgpu";
import { WebGPURenderer } from "three/webgpu";
import { Dashboard } from "./components/Dashboard";

function App() {
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
          <Experience />
      </Canvas>

      <img
        src="/Logo.svg"
        alt="SMARTLook Logo"
        className="logo"
        />
        <Dashboard></Dashboard>
    </>


    
  );
}

export default App;
