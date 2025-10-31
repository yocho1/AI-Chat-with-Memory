import React, { useEffect, useRef } from "react";
import Message from "./Message";

const ChatBox = ({ messages }) => {
  // Hooks must be called unconditionally at the top level of the component
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className="empty-state">
        <div className="avatar-circle assistant-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3>Welcome to AI Chat!</h3>
          <p>Start a conversation — I'm here to help.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chatbox" ref={ref}>
      {messages.map((msg, i) => (
        <Message key={i} role={msg.role} content={msg.content} />
      ))}
    </div>
  );
};

export default ChatBox;
