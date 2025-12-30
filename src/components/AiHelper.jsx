import { useState, useEffect } from "react";

const AiHelper = ({ aiOpen, onClose, dashboardData }) => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello, how can I help you?" }
  ]);

  const handleAction = (type, userText) => {
    if (!dashboardData) return;

    setMessages((prev) => [
    ...prev,
    { role: "user", text: userText }
  ]);
  
    let response = userText;

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

    setMessages((prev) => [
    ...prev,
    { role: "bot", text: response }
  ]);
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
            <button onClick={() => handleAction("summarize", "Simplify machine status")}>
              Simplify machine status
            </button>
            <button onClick={() => handleAction("predict", "Predict next state")}>
              Predict next state
            </button>
            <button onClick={() => handleAction("maintenance", "Suggest maintenance")}>
              Suggest maintenance
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AiHelper;
