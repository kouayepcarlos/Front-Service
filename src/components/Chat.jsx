import React, { useState } from "react";
import "../assets/css/chat.css";

/**
 * composant dedie au chat de questions-reponses 
 * @returns 
 */
const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userInput.trim()) return; // Ne pas envoyer si l'input est vide

    // Ajoute le message dans le chat
    setMessages([...messages, { type: "question", text: userInput }]);

    // Envoyer l'email via EmailJS

    setUserInput(""); // Réinitialiser le champ d'entrée
  };

  const questions = [
    {
      titre: "Quels sont nos horaires d'ouvertures?",
      question: "Quels sont vos horaires d'ouvertures ?",
      answer:
        "Salut ! 🥳 Pour les horaires d'ouverture, nous sommes ouvert du lundi-samedi,8h-17h! 😊",
    },
    {
      titre: "Comment nous contacter?",
      question: "Comment puis-je vous contacter ?",
      answer:
        "Vous pouvez nous contacter via email à contact@nilservices.com ou au +237697723063 / 679807675.",
    },
    {
      titre: "Où sommes nous situés ?",
      question: "Où êtes-vous situés ??",
      answer: "Nous sommes situés à Ange Raphael, Douala Cameroun 😄",
    },
  ];

  const handleQuestionClick = (question, answer) => {//lorsquon clique sur une question predefinie,la question et la reponse s'affiche sur le chat
    setMessages([
      ...messages,
      { type: "question", text: question },
      { type: "answer", text: answer },
    ]);
  };

  const supprimer = () => {//permet de vider le chat
    setMessages([]);
  };
  return (
    <div className="chat-container ">
      {/* Chat Box */}
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <h5>Bienvenue sur Nilservice</h5>
            <button onClick={() => {supprimer();setIsOpen(!isOpen)}}>
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
          <div className="chat-body">
            {/* Display Messages */}
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message `}>
                  {msg.type === "question" ? (
                    <div
                     
                      className="px-2 py-1 message-question"
                    >
                      {msg.text}
                    </div>
                  ) : (
                    <div
                     
                      className="px-2 py-1 message-answer"
                    >
                      {msg.text}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form className="chat-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Écrivez votre message..."
                required
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button type="submit">
                <i className="fa-regular fa-paper-plane"></i>
              </button>
            </form>

            {/* Predefined Questions */}
            <div className="chat-questions">
              {questions.map((item, index) => (
                <button
                  key={index}
                  className="chat-question-btn"
                  onClick={() =>
                    handleQuestionClick(item.question, item.answer)
                  }
                >
                  {item.titre}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Icon */}
      <div className="chat-icon" onClick={() => setIsOpen(!isOpen)}>
        <i className="fa-regular fa-comment-dots"></i>
      </div>
    </div>
  );
};

export default Chat;
