import { Gltf, OrbitControls, Bounds, Environment } from "@react-three/drei";
import { Suspense } from "react";

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 10]} intensity={2} />
      <OrbitControls />

      <Suspense fallback={null}>
        <Bounds
          fit
          clip
          observe
          margin={1.2} // how far the camera is from the bounds (1 = default)
        >
          <Gltf src="/models/smartLookRoom.glb" />
        </Bounds>
      </Suspense>

      <Environment preset="warehouse" />
    </>
  );
};
