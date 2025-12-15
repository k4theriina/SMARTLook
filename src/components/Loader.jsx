import { Html, useProgress } from "@react-three/drei";

export const Loader = () => {
    // tracks all progress in the <Suspense>
  const { progress } = useProgress();
  return (
    // puts loading in center of canvas
    <Html center>
      <div style={{
        color: "#0a7afd",
        fontSize: "2.5em",
        textAlign: "center",
        fontFamily: "space-mono",
      }}>
        Loading {Math.round(progress)}%
      </div>
    </Html>
  );
};
