import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const SmartRoom = ({ onPumpClick, eventType, ...props }) => {
  const { scene, nodes } = useGLTF("/models/smartLookRoom.glb");
  const pump = nodes.BigNuclear;

  const materialRef = useRef(null);

  // Freeze transforms (good optimization)
  useEffect(() => {
    scene.traverse((obj) => {
      if (!obj.isMesh) return;
      obj.matrixAutoUpdate = false;
      obj.updateMatrix();
      obj.frustumCulled = true;
    });
  }, [scene]);

  // Clone material ONCE
  useEffect(() => {
    if (!pump || materialRef.current) return;

    materialRef.current = pump.material.clone();
    pump.material = materialRef.current;
    pump.material.emissive = new THREE.Color("black");
    pump.material.emissiveIntensity = 0;
  }, [pump]);

  // 🔥 STATUS → GLOW (DATA DRIVEN)
  useEffect(() => {
    if (!materialRef.current) return;

    if (eventType?.toLowerCase() === "normal") {
      materialRef.current.emissive.set("black");
      materialRef.current.emissiveIntensity = 0;
    } else if (eventType === "Warning") {
      materialRef.current.emissive.set("yellow");
      materialRef.current.emissiveIntensity = 0.25;
    } else if (eventType) {
      materialRef.current.emissive.set("red");
      materialRef.current.emissiveIntensity = 0.35;
    }
  }, [eventType]);

  // Hover ONLY affects cursor
  const onPointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
  };

  const onPointerOut = () => {
    document.body.style.cursor = "default";
  };

  const onClick = (e) => {
    e.stopPropagation();
    onPumpClick();
  };

  return (
    <primitive object={scene} {...props}>
      <primitive
        object={pump}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={onClick}
      />
    </primitive>
  );
};
