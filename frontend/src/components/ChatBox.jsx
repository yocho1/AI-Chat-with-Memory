import React from "react";
import Message from "./Message";

const ChatBox = ({ messages }) => {
  return (
    <div className="chatbox">
      {messages.map((msg, i) => (
        <Message key={i} role={msg.role} content={msg.content} />
      ))}
    </div>
  );
};

export default ChatBox;
