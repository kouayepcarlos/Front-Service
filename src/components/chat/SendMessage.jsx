import React, { useState } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import LoaderTransparent from "../LoadersCompoments/LoaderTransparent";
import pdf from "../../assets/images/pdfchat.png";
import image from "../../assets/images/imagechat.png";
const SendMessage = ({
  addMessage,
  addFichier,
  scroll,
  replyMessage,
  setReplyMessage,
}) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSend = async () => {
    setLoading(true);
    try {
      if (message.trim()) {
        await addMessage(message, "text", replyMessage);
        setMessage("");
        setTimeout(
          () => scroll.current?.scrollIntoView({ behavior: "smooth" }),
          100
        );
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event, type) => {
    setLoading(true);
    try {
      const fichier = event.target.files[0];
      if (fichier) {
        const fileType = fichier.type === "application/pdf" ? "pdf" : type;
        addFichier(fichier, fileType, replyMessage);
        setTimeout(
          () => scroll.current?.scrollIntoView({ behavior: "smooth" }),
          100
        );
      }
    } catch (error) {
      /* empty */
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {replyMessage && (
        <div className="d-flex flex-row justify-between">
          {replyMessage?.type === "text" ? (
            <div className="message-content">{replyMessage?.message}</div>
          ) : replyMessage?.type === "image" ? (
            <img
              src={image}
              style={{ height: "100px", width: "100px" }}
              alt="Envoyé"
              className="message-image"
            />
          ) : (
            <img
              src={pdf}
              style={{ height: "100px", width: "100px" }}
              alt="Envoyé"
              className="message-image"
            />
          )}
          <i
            onClick={() => {
              setReplyMessage(null);
            }}
            className="fa-solid fa-xmark cursor-pointer"
            style={{ position: "relative", zIndex: 9999 }}
          />
        </div>
      )}
      {loading && <LoaderTransparent />}
      <div
        className="send-message"
        onDrop={(e) => {
          e.preventDefault();
          const data = e.dataTransfer.getData("message");
          if (data) {
            const draggedMessage = JSON.parse(data);
            setReplyMessage(draggedMessage);
          }
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrivez un message..."
        />
        <button onClick={handleSend}>Envoyer</button>
        <input
          type="file"
          id="file-upload"
          accept=".pdf"
          hidden
          onChange={(e) => handleFileUpload(e, "file")}
        />
        <button
          className="file-button"
          onClick={() => document.getElementById("file-upload").click()}
        >
          <i className="fa-solid fa-file-pdf"></i>
        </button>
        <input
          type="file"
          id="image-upload"
          hidden
          accept="image/*"
          onChange={(e) => handleFileUpload(e, "image")}
        />
        <button
          className="image-button"
          onClick={() => document.getElementById("image-upload").click()}
        >
          <i className="fa-solid fa-image"></i>
        </button>
      </div>
    </>
  );
};

export default SendMessage;
