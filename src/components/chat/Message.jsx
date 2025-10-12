import React, { useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useAppContext } from "../../Contexts/AppProvider";
import pdf from "../../assets/images/pdfchat.png"
import image from "../../assets/images/imagechat.png"
const Message = ({ message, setReplyMessage, scrollToMessage, refCallback }) => {
    const { user, downloadDoc } = useAppContext();

    const handleReplyClick = () => {
      if (message.replyTo?.id) {
        scrollToMessage(message.replyTo.id); // ✅ va chercher l'élément référencé
    }
    };
 const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);

    useEffect(() => {
        console.log(message);
    }, [message]);

    const handleDragStart = (e) => {
        setReplyMessage(message);
        e.dataTransfer.setData("message", JSON.stringify(message));
    };

    

    // Swipe mobile
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setCurrentX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
        if (currentX - startX > 50) { // seuil 50px
            setReplyMessage(message);
             e.dataTransfer.setData("message", JSON.stringify(message));
        }
        setStartX(0);
        setCurrentX(0);
    };

    return (
        <div
            className={`message ${message.user_id === user.id ? "sent" : "received"} ${message?.connected === 0 ?"no_connected":"connected"}`}
            draggable
            ref={refCallback} 
            onDragStart={handleDragStart}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Si le message répond à un autre */}
            {message.replyTo && (
                <div
                    className="reply-preview"
                    onClick={handleReplyClick}
                    style={{
                        background: "#f9f9f9",
                      color:"black",
                        padding: "5px",
                        marginBottom: "5px",
                        cursor: "pointer"
                    }}
                >
                    <div>{message.replyTo.nom}</div>
                    {message.replyTo.type === "text" && <div>{message.replyTo.message}</div>}
                    {message.replyTo.type === "image" && (
                        <img
                            src={image}
                            alt="Reply"
                            style={{ maxWidth: "50px", borderRadius: "4px" }}
                        />
                    )}
                    {message.replyTo.type === "pdf" && (
                        <img
                            src={pdf}
                            alt="PDF"
                            style={{ width: "30px" }}
                        />
                    )}
                </div>
            )}

            {/* Contenu principal */}
            <div className="message-name">{message.nom}</div>
            {message.type === "text" && <div className="message-content">{message.message}</div>}
            {message.type === "image" && (
                <img
                    src={image}
                    onClick={() => downloadDoc.mutateAsync(message.id)}
                    style={{ width: "50px" }}
                />
            )}
            {message.type === "pdf" && (
                <img
                    src={pdf}
                    onClick={() => downloadDoc.mutateAsync(message.id)}
                    style={{ width: "50px" }}
                />
            )}

            <div className="message-time">
                {new Date(message.created_at).toLocaleTimeString()}
            </div>
        </div>
    );
};


export default Message;
