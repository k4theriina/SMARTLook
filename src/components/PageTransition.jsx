import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PageTransition() {
  const location = useLocation();
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Fade IN
    setActive(true);

    // Fade OUT after route swap
    const timer = setTimeout(() => {
      setActive(false);
    }, 10); // must match CSS timing

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return <div className={`page-transition ${active ? "active" : ""}`} />;
}
