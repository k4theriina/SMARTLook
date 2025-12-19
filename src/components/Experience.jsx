import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Loader } from "./Loader";
import { SmartRoom } from "./SmartRoom";

export const Experience = ({ onPumpClick, roomOffset, eventType }) => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <Environment preset="warehouse" />

      <OrbitControls makeDefault />

      <Suspense fallback={<Loader />}>
        <SmartRoom
          position={[2.5 + roomOffset, -2.5, 7 - roomOffset]}
          onPumpClick={onPumpClick}
          eventType={eventType} // ✅ REQUIRED
        />
      </Suspense>
    </>
  );
};
