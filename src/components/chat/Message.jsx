import React, { useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useAppContext } from "../../Contexts/AppProvider";
import pdf from "../../assets/images/pdfchat.png"
import image from "../../assets/images/imagechat.png"
const Message = ({ message, setReplyMessage }) => {
    const { user, downloadDoc } = useAppContext();
 

    // const handleDragStart = (e) => {
    //     setReplyMessage(message);
    //     e.dataTransfer.setData("message", JSON.stringify(message));
    // };

    // const handleDrop = (e) => {
    //     e.preventDefault();
    //     const data = e.dataTransfer.getData("message");
    //     const draggedMessage = JSON.parse(data);
    //     setReplyMessage(draggedMessage);
    //     console.log(draggedMessage)
    // };

    // const handleDragOver = (e) => e.preventDefault();

    return (
        <div
            className={`message ${
                message.user_id === user.id ? "sent" : "received"
            }`}
            // draggable
            // onDragStart={handleDragStart}
            // onDrop={handleDrop}
            // onDragOver={handleDragOver}
        >
            {/* Affichage du message auquel on répond */}
            {/* {message.replyTo &&
                (message.replyTo.type === "text" ? (
                    <div className="message-content">
                        {message.replyTo.message}
                    </div>
                ) : message.replyTo.type === "image" ? (
                    <img
                        src={message.replyTo.content}
                        alt="Envoyé"
                        className="message-image"
                    />
                ) : (
                    <div className="message-pdf-container">
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                            <Viewer
                                fileUrl={message.replyTo.content}
                                defaultScale={1.0}
                            />
                        </Worker>
                    </div>
                ))} */}

            {/* Affichage du contenu du message */}
            <div className="message-name">{message?.user?.nom}</div>
            {message.type === "text" ? (
                <div className="message-content">{message.message}</div>
            ) : message.type === "image" ? (
                <img src={image}
                    onClick={() => downloadDoc.mutateAsync(message.id)}
                    style={{ color: "white" ,width:"50px"}}
                />
            ) : (
                <div className="">
                     
                     <img
                        onClick={() => downloadDoc.mutateAsync(message.id)}
                        style={{ color: "white",width:"50px", }}
                    src={pdf}/>
                    
                </div>
            )}

            <div className="message-time">
                {new Date(message.created_at).toLocaleTimeString()}
            </div>
        </div>
    );
};

export default Message;
