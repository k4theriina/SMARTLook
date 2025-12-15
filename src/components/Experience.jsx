import { Gltf, OrbitControls, Bounds, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Loader } from "./Loader";

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <Environment preset="warehouse" />
      <OrbitControls />

      <Suspense fallback={<Loader />}>
        <Bounds
          fit
          clip
          margin={0.9} // how far the camera is from the bounds (1 = default)
        >
          <Gltf src="/models/smartLookRoom.glb" 
          position={[-1.5, -2.5, 0]}/>
        </Bounds>
      </Suspense>

      <Environment preset="warehouse" />
    </>
  );
};
