import React from "react";

const Message = ({ role, content }) => {
  return (
    <div className={`message ${role}`}>
      <div className="message-content">
        {content}
      </div>
    </div>
  );
};

export default Message;