import React from "react";

const Message = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div className={`message-row ${isUser ? "user" : "assistant"} animate-fade-in`}>
      <div className="avatar">
        <div className={`avatar-circle ${isUser ? "user-avatar" : "assistant-avatar"}`}>
          {isUser ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          )}
        </div>
      </div>
      <div className={`message-bubble ${isUser ? "user-message" : "assistant-message"}`}>
        {content}
      </div>
    </div>
  );
};

export default Message;