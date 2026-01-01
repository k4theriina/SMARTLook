
import { Canvas, extend } from "@react-three/fiber";
import * as THREE from "three/webgpu";
import { WebGPURenderer } from "three/webgpu";
import createVerticalGradientTexture from "./createVerticalGradientTexture";

export default function CanvasWrapper({ children }) {
  return (
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
      {children}
    </Canvas>
  );
}
