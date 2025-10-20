import { useEffect, useRef, useState } from "react";
import SendMessage from "../../components/chat/SendMessage";
import Message from "../../components/chat/Message";
import "../../assets/css/chatbox.css";
import Chat from "../../components/Chat";
import Footer from "../../components/Footer";
import Navbaracademie from "../../components/navbar/Navbaracademie";
import Publicite from "../../components/Publicite";
import { useAppContext } from "../../Contexts/AppProvider";
import Redirection from "../../components/Redirection";
import { Modal, Button } from "react-bootstrap"; // Composants Bootstrap pour la modale
import { FaRegCopy, FaCheck } from "react-icons/fa"; // Icône pour copier le code de parrainage
import PayModal from "../../components/academie/PayModal";
import { useNavigate } from "react-router-dom";

const ChatA = () => {
  const [messages, setMessages] = useState([]);
 
  const { sendMessages, sendImage, sendPdf, allMessages, user } =
    useAppContext();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/configuration");
  };
     // État pour gérer l'affichage de la modale de paiement
      const [showPaiement, setShowPaiement] = useState(false);
      //Etat pour gerer la copie
      const [copied, setCopied] = useState(false);
      // État pour gérer l'affichage de la modale
      const [showModal, setShowModal] = useState(false);
      // Fonction pour afficher la modale
      const handleClose = () => setShowModal(false);
      const handleShowPaiement = () => setShowPaiement(true);
      const handleClosePaiement = () => setShowPaiement(false);
      // Fonction pour copier le code de parrainage dans le presse-papiers
      const handleCopy = () => {
        navigator.clipboard.writeText(user?.code);
        setCopied(true); // Changer l'icône en icône de validation
      };
    
      useEffect(() => {
        let timer;
        if (copied) {
          timer = setTimeout(() => setCopied(false), 2000);
        }
        return () => clearTimeout(timer);
      }, [copied]);
    
  const [replyMessage, setReplyMessage] = useState(null);
  const scroll = useRef();
  const messageRefs = useRef({});

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await allMessages.mutateAsync();

        if (Array.isArray(res)) {
          const fetchedMessages = res;

          setMessages((currentMessages) => {
            // On récupère les ids actuels pour éviter doublons
            const currentIds = new Set(currentMessages.map((m) => m.id));

            // On filtre les messages déjà présents
            const newMessages = fetchedMessages.filter(
              (m) => !currentIds.has(m.id)
            );

            // On merge en gardant les anciens + les nouveaux venant de l'API
            return [...currentMessages, ...newMessages].sort(
              (a, b) => new Date(a.created_at) - new Date(b.created_at)
            );
          });
        } else {
          console.error("Messages invalides ou absents :", res);
          // Ne pas écraser le state si pas de messages reçus
          // setMessages([]); // supprimé pour ne pas perdre messages locaux
        }
      } catch (error) {
        console.error("Erreur lors du chargement des messages :", error);
      }
    };

    loadMessages();

    const interval = setInterval(loadMessages, 2000); // refresh auto
    return () => clearInterval(interval);
  }, []);

  const addMessage = async (message, type = "text", replyMessage = null) => {
    console.log(sendMessages);
    let data;
    if (type === "text")
      data = await sendMessages.mutateAsync({
        message: message,
        replyMessage,
      });

    const newMessage = {
      id: data?.id,
      message: data?.message,
      user_id: user.id,
      type: data?.type,
      nom: user?.nom,
      created_at: new Date().toISOString(),
      replyTo: replyMessage,
    };
    setMessages([...messages, newMessage]);

    setReplyMessage(null);
  };

  const addFichier = async (fichier, fileType, replyMessage = null) => {
    console.log(sendMessages);
    let data;
    if (fileType === "pdf") {
      data = await sendPdf.mutateAsync({ fichier, replyMessage });
    } else {
      data = await sendImage.mutateAsync({ fichier, replyMessage });
    }

    const newMessage = {
      id: data?.id,
      fichier: data.message,
      user_id: user.id,
      type: data.type,
      nom: user?.nom,
      created_at: new Date().toISOString(),
      replyTo: replyMessage,
    };
    setMessages([...messages, newMessage]);
    setReplyMessage(null);
  };

  // Étape 1 : enrichir avec replyTo
  const enrichedMessages = Array.isArray(messages)
    ? messages.map((msg) => {
        if (msg.dropped === 1) {
          const repliedMessage = messages.find(
            (m) => m.id === msg.message_dropped
          );
          return { ...msg, replyTo: repliedMessage || null };
        }
        return msg;
      })
    : [];

  // Étape 2 : grouper
  const groupedMessages = enrichedMessages.reduce((acc, message) => {
    const date = new Date(message.created_at).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(message);
    return acc;
  }, {});

  return (
    <div className="general">
      <Publicite />
      <div className="my-custom-div">
        <Navbaracademie />
         {/* Messages de redirection selon le statut de l'utilisateur */}
                  {(user?.status == "inscrit"|| user?.status == "expire")  && (
                    <Redirection
                      texte={
                        "Payez votre abonnement et accedez au Chat!!"
                      }
                      nomBoutton={"Payez"}
                      handlClick={handleShowPaiement}
                    />
                  )}
                  {user?.status == "en_attente" && !user?.serie && (
                    <Redirection
                      texte={"Complétez votre profil pour accéder au chat!!"}
                      nomBoutton={"Profil"}
                      handlClick={handleNavigate}
                    />
                  )}
                  {user?.status == "actif" && (user?.serie) && (
                    <>
        <main className="chat-boxx">
          <div className="messages-wrapper">
            {Object.entries(groupedMessages).map(([date, msgs]) => (
              <div key={date}>
                <div className="date-separator">{date}</div>
                {msgs.map((message) => (
                  <Message
                    key={message.id}
                    message={message}
                    setReplyMessage={setReplyMessage}
                    scrollToMessage={(id) => {
                      if (messageRefs.current[id]) {
                        messageRefs.current[id].scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }
                    }}
                    refCallback={(el) => {
                      if (el) messageRefs.current[message.id] = el;
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <span ref={scroll}></span>
          <SendMessage
            addMessage={addMessage}
            addFichier={addFichier}
            scroll={scroll}
            replyMessage={replyMessage}
            setReplyMessage={setReplyMessage}
          />
        </main>
        </>)}
        <Chat />
        <Footer />
      </div>
        {/* Modal Parrainage */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Code de Parrainage</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>
            Voici votre code de parrainage. Partagez-le pour inviter d'autres
            personnes !
          </p>
          <div className="d-flex align-items-center border rounded p-2">
            <input
              type="text"
              className="form-control text-center"
              value={user?.code}
              readOnly
            />
            {!copied && (
              <FaRegCopy
                className="ms-2 text-primary"
                style={{ cursor: "pointer" }}
                onClick={handleCopy}
              >
                {/* {copied ? <FaCheck className="text-success" /> : <FaRegCopy className="text-primary" />} */}
              </FaRegCopy>
            )}
            {copied && <FaCheck className="text-success" />}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de paiement  */}
      <PayModal showModal={showPaiement} handleClose={handleClosePaiement} />
    </div>
  );
};

export default ChatA;
