import { useState, useEffect } from "react";

const AiHelper = ({ aiOpen, onClose, dashboardData }) => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hello, how can I help you?" }
  ]);

  const handleAction = async (type, userText) => {
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setMessages((prev) => [...prev, { role: "bot", text: "Analyzing…" }]);

    try {
        const res = await fetch("http://localhost:3000/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            intent: type,
            dashboard: dashboardData,
        }),
        });

        const data = await res.json();

        setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", text: data.reply },
        ]);
    } catch {
        setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", text: "⚠️ AI unavailable." },
        ]);
    }
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
