import React, { useState, useRef, useEffect } from "react";

const InputBar = ({ onSend }) => {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const taRef = useRef(null);

  useEffect(() => {
    if (taRef.current) {
      taRef.current.style.height = "auto";
      taRef.current.style.height = Math.min(taRef.current.scrollHeight, 200) + "px";
    }
  }, [text]);

  const submit = async () => {
    const trimmedText = text.trim();
    if (!trimmedText || isSending) return;
    
    setIsSending(true);
    try {
      await onSend(trimmedText);
      setText("");
      if (taRef.current) {
        taRef.current.style.height = "auto";
      }
    } finally {
      setIsSending(false);
    }
  };

  const onKeyDown = (e) => {
    const isMod = e.ctrlKey || e.metaKey;
    if (e.key === "Enter" && !isMod && !e.shiftKey) {
      e.preventDefault();
      submit();
    } else if (e.key === "Enter" && (isMod || e.shiftKey)) {
      const el = e.target;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const newText = text.slice(0, start) + "\n" + text.slice(end);
      setText(newText);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 1;
      });
    }
  };

  return (
    <div className="input-footer">
      <div className="inputbar">
        <textarea
          ref={taRef}
          className="input-text"
          placeholder="Type your message... (Enter to send, Shift+Enter for newline)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          maxLength={2000}
          disabled={isSending}
          aria-label="Message input"
        />
        {text.length >= 1800 && (
          <div className="char-count">{2000 - text.length}</div>
        )}
      </div>
      <button
        className="send-btn"
        onClick={submit}
        disabled={!text.trim() || isSending}
        aria-label="Send message"
      >
        {isSending ? (
          <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
            <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          <svg className="send-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        )}
        <span>Send</span>
      </button>
    </div>
  );
};

export default InputBar;
