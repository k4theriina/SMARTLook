import { Html, useProgress } from "@react-three/drei";

export const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html fullscreen transform={false}>
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <img
          src="/Logo.svg"
          alt="Logo"
          style={{
            width: "720px",
            maxWidth: "80vw",
            height: "auto",
            marginBottom: "24px",
          }}
        />

        <div
          style={{
            color: "#0a7afd",
            fontSize: "1.5em",
            fontFamily: 'Roboto',
            animation: "pulse 1.5s infinite",
            whiteSpace: "nowrap",

          }}
        >
          Loading… {Math.round(progress)}%
        </div>
      </div>
    </Html>
  );
};
