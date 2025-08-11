// ChatWidget.jsx
import React, { useEffect, useState } from "react";
import socket from "../utils/socket"; // socket instance
import { IoMdClose } from "react-icons/io";

const ChatWidget = ({ currentUserId, receiverId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("addUser", currentUserId);

    socket.on("getMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("getMessage");
  }, [currentUserId]);

  const sendMessage = () => {
    if (text.trim() === "") return;
    const message = { senderId: currentUserId, receiverId, text };
    socket.emit("sendMessage", message);
    setMessages((prev) => [...prev, message]);
    setText("");
  };

  return (
    <div style={styles.widgetContainer}>
      <div style={styles.header}>
        <p>Chat</p>
        <IoMdClose size={20} onClick={onClose} style={{ cursor: "pointer" }} />
      </div>

      <div style={styles.chatArea}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.senderId === currentUserId ? "right" : "left",
              marginBottom: "6px",
            }}
          >
            <span style={styles.message}>{m.text}</span>
          </div>
        ))}
      </div>

      <div style={styles.inputArea}>
        <input
          type="text"
          value={text}
          placeholder="Type message..."
          onChange={(e) => setText(e.target.value)}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.sendBtn}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  widgetContainer: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "300px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    zIndex: 9999,
  },
  header: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  chatArea: {
    height: "250px",
    overflowY: "auto",
    padding: "10px",
    backgroundColor: "#f9f9f9",
  },
  inputArea: {
    display: "flex",
    borderTop: "1px solid #ddd",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "none",
    outline: "none",
  },
  sendBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
  },
  message: {
    background: "#e0e0e0",
    borderRadius: "8px",
    padding: "6px 10px",
    display: "inline-block",
    maxWidth: "80%",
  },
};

export default ChatWidget;
