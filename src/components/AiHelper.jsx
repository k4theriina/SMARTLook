const AiHelper = ({ aiOpen, onClose }) => {
  return (
    <>
      {/* SPEECH BUBBLE (only when closed) */}
      {!aiOpen && (
        <div className="aiChat">
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
            <p>Hello, how can I help you?</p>
          </div>

          <input
            className="aiInput"
            placeholder="Type a question..."
          />
        </div>
      )}
    </>
  );
};

export default AiHelper;
