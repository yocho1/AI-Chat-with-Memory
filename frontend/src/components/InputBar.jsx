import React, { useState } from "react";

const InputBar = ({ onSend }) => {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="inputbar">
      <textarea
        className="input-text"
        placeholder="Type a message and press Enter..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        rows={1}
      />
      <button className="send-btn" onClick={submit}>Send</button>
    </div>
  );
};

export default InputBar;
