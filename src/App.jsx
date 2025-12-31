import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Factory from "./pages/Factory";

function AppRoutes() {
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(true);

  useEffect(() => {
    setTransitioning(true);

    const timer = setTimeout(() => {
      setTransitioning(false);
    }, 600); // controls transition length

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {transitioning && <div id="transition" />}

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/factory" element={<Factory />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
