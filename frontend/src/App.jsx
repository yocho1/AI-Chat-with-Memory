import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ChatBox from "./components/ChatBox";
import InputBar from "./components/InputBar";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    // load history on mount
    axios.get(`${API}/history`)
      .then(res => setMessages(res.data || []))
      .catch(err => console.error("History load error:", err));
  }, []);

  useEffect(() => {
    // scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text || !text.trim()) return;
    const userMsg = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await axios.post(`${API}/chat`, { message: text });
      const aiMsg = { role: "assistant", content: res.data.reply };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error("Send message error:", err);
      // show error message as assistant text
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Error: failed to get reply." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-root">
      <header className="app-header">AI Chat with Memory</header>

      <main className="chat-container" ref={scrollRef}>
        <ChatBox messages={messages} />
        {loading && <div className="loading-line">AI is typing...</div>}
      </main>

      <footer className="input-footer">
        <InputBar onSend={sendMessage} />
      </footer>
    </div>
  );
};

export default App;