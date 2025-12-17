import {
  OrbitControls,
  Environment,
} from "@react-three/drei";
import { Suspense } from "react";
import { Loader } from "./Loader";
import { SmartRoom } from "./SmartRoom.jsx";

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <Environment preset="warehouse" resolution={128} />

      <OrbitControls
        makeDefault
        maxPolarAngle={Math.PI / 2.1}
      />

      {/* 👇 Suspense MUST wrap the component that calls useGLTF */}
      <Suspense fallback={<Loader />}>
        <SmartRoom position={[2.5, -2.5, 7]} />
      </Suspense>
    </>
  );
};
