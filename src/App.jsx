import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Factory from "./pages/Factory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/factory" element={<Factory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
