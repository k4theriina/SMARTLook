import { useState, useEffect } from "react";

const AiHelper = ({ aiOpen, onClose, dashboardData }) => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello, how can I help you?" }
  ]);

  // Reset messages when AI panel is closed
  useEffect(() => {
    if (!aiOpen) {
      setMessages([{ role: "bot", text: "Hello, how can I help you?" }]);
    }
  }, [aiOpen]);

  const handleAction = (type) => {
    if (!dashboardData) return;

    let response = "";

    if (type === "summarize") {
      response = `
Pressure: ${dashboardData.pressure} PSI
Temperature: ${dashboardData.temperature} °C
Status: ${dashboardData.event_type}
Overall: Operating within normal parameters.
`;
    }

    if (type === "predict") {
      response = "Based on recent trends, pressure is expected to rise slightly in the next cycle.";
    }

    if (type === "maintenance") {
      response = "No immediate maintenance required. Monitor pump speed and temperature.";
    }

    setMessages((prev) => [...prev, { role: "bot", text: response }]);
  };

  return (
    <>
      {/* SPEECH BUBBLE (only when closed) */}
      {!aiOpen && (
        <div className="aiChat" onClick={onClose}>
          Hello, how can I help you?
        </div>
      )}

      {/* CHAT PANEL (only when open) */}
      {aiOpen && (
        <div className="aiPanel">
          <div className="aiHeader">
            <span>AI Assistant</span>
            <button className="closeButton" onClick={onClose}>✕</button>
          </div>

          <div className="aiMessages">
            {messages.map((msg, i) => (
              <div key={i} className={`aiMessage ${msg.role}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="aiActions">
            <button onClick={() => handleAction("summarize")}>
              Simplify machine status
            </button>
            <button onClick={() => handleAction("predict")}>
              Predict next state
            </button>
            <button onClick={() => handleAction("maintenance")}>
              Suggest maintenance
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AiHelper;
