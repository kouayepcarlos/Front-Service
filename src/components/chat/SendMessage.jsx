import React, { useState } from "react";
import { Viewer,Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const SendMessage = ({ addMessage,addFichier, scroll, replyMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = async() => {
    if (message.trim()) {
    await  addMessage(message,  "text", replyMessage);
      setMessage("");
      setTimeout(() => scroll.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  const handleFileUpload = (event, type) => {
    const fichier = event.target.files[0];
    if (fichier) {
     
      const fileType = fichier.type === "application/pdf" ? "pdf" : type;
      addFichier(fichier,  fileType, replyMessage);
      setTimeout(() => scroll.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  return (
    <>
     {/* {replyMessage && (
        replyMessage.type === "text" ? (
                <div className="message-content">{replyMessage.message}</div>
              ) :  replyMessage.type === "image" ? (
                <img src={replyMessage.content} style={{height:"100px",width:"100px"}} alt="Envoyé" className="message-image" />
              ) : (
                <div className="message-pdf-container">
               <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
               <Viewer fileUrl={replyMessage.content} defaultScale={1.0}/>
               </Worker> 
              </div>
              )
      )} */}
    <div className="send-message">
     
      
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écrivez un message..."
      />
      <button onClick={handleSend}>Envoyer</button>
      <input type="file" id="file-upload" accept=".pdf" hidden onChange={(e) => handleFileUpload(e, "file")} />
      <button className="file-button" onClick={() => document.getElementById('file-upload').click()}><i className="fa-solid fa-file-pdf"></i></button>
      <input type="file" id="image-upload" hidden accept="image/*" onChange={(e) => handleFileUpload(e, "image")} />
      <button className="image-button" onClick={() => document.getElementById('image-upload').click()}><i className="fa-solid fa-image"></i></button>
    </div>
    </>
  );
};

export default SendMessage;