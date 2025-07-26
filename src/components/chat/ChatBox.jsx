import React, { useEffect, useRef, useState } from "react";
import SendMessage from "./SendMessage";
import Message from "./Message";
import "../../assets/css/chatbox.css"

const ChatBox = () => {
  const [messages, setMessages] = useState([
    {createdAt:  "2025-03-31T18:26:27.872Z",
    id :  1743445587872,
    sender: "received",
    content : "hello",
  type:"text"}
  ]);
  const scroll = useRef();

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    setMessages(storedMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
    console.log(messages)
  }, [messages]);

  const addMessage = (content, sender,type = "text") => {
    const newMessage = {
      id: Date.now(),
      content,
      sender,
      type,
      createdAt: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
  };

  const groupedMessages = messages.reduce((acc, message) => {
    const date = new Date(message.createdAt).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(message);
    return acc;
  }, {});

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            <div className="date-separator">{date}</div>
            {msgs.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
        ))}
      </div>
      <span ref={scroll}></span>
      <SendMessage addMessage={addMessage} scroll={scroll} />
    </main>
  );
};

export default ChatBox;