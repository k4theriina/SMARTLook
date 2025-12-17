import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Loader } from "./Loader";
import { SmartRoom } from "./SmartRoom";

export const Experience = ({ onSelectMachine }) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <Environment preset="warehouse" resolution={128} />

      <OrbitControls
        makeDefault
        enableDamping={false}
        maxPolarAngle={Math.PI / 2.1}
      />

      <Suspense fallback={<Loader />}>
        <SmartRoom
          position={[2.5, -2.5, 7]}
          onSelectMachine={onSelectMachine}
        />
      </Suspense>
    </>
  );
};
