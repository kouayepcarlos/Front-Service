import  { useEffect, useRef, useState } from "react";
import SendMessage from "../../components/chat/SendMessage";
import Message from "../../components/chat/Message";
import "../../assets/css/chatbox.css";
import Chat from "../../components/Chat";
import Footer from "../../components/Footer";
import Navbaracademie from "../../components/navbar/Navbaracademie";
import Publicite from "../../components/Publicite";
import { useAppContext } from "../../Contexts/AppProvider";



const ChatA = () => {
    const [messages, setMessages] = useState([]);

    const { sendMessages, sendImage, sendPdf, allMessages, user, getUser } =
        useAppContext();
    const [replyMessage, setReplyMessage] = useState(null);
    const scroll = useRef();

useEffect(() => {
    const loadMessages = async () => {
        try {
            const res = await allMessages.mutateAsync();

            if (Array.isArray(res?.data?.messages)) {
                const fetchedMessages = res.data.messages;

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

    const interval = setInterval(loadMessages, 10000); // refresh auto
    return () => clearInterval(interval);
}, []);

    const addMessage = async (message, type = "text", replyTo = null) => {
        console.log(sendMessages);
        if (type === "text")
            await sendMessages.mutateAsync({
                message: message,
            });

        const newMessage = {
            id: Date.now(),
            message,
            user_id: user.id,
            type,
            user,
            created_at: new Date().toISOString(),
            replyTo,
        };
        setMessages([...messages, newMessage]);

        setReplyMessage(null);
    };

    const addFichier = async (fichier, fileType, replyTo = null) => {
        console.log(sendMessages);
        let data;
        if (fileType === "pdf") {
            data = await sendPdf.mutateAsync(fichier);
        } else {
            data = await sendImage.mutateAsync(fichier);
        }

        const newMessage = {
            id: Date.now(),
            fichier: data.message,
            user_id: user.id,
            type: data.type,
            user,
            created_at: new Date().toISOString(),
            replyTo,
        };
        setMessages([...messages, newMessage]);
        setReplyMessage(null);
    };

    const enrichMessages = async () => {
        if (!allMessages || allMessages.length === 0) {
            return [];
        }

        const userCache = {};

        const enriched = await Promise.all(
            messages.map(async (msg) => {
                const userId = msg.user_id;

                // Vérifier le cache
                if (userCache[userId]) {
                    return { ...msg, user: userCache[userId] };
                }

                try {
                    const { data } = await getUser.mutateAsync(userId);
                    if (data) {
                        userCache[userId] = data; // mettre en cache
                        return { ...msg, user: data.data };
                    }
                } catch (e) {
                    console.warn(
                        "Utilisateur introuvable pour le message :",
                        msg.id
                    );
                }

                return null;
            })
        );

        const validMessages = enriched.filter((msg) => msg !== null);
        console.log(validMessages);
        setMessages(validMessages);
    };

    // useEffect(() => {
    //     enrichMessages();
    // }, [allMessages]);
   const groupedMessages = Array.isArray(messages)
    ? messages.reduce((acc, message) => {
        const date = new Date(message.created_at).toLocaleDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(message);
        return acc;
    }, {})
    : {};


    return (
        <div className="general">
            <Publicite />
            <div className="my-custom-div">
                <Navbaracademie />
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
                    />
                </main>
                <Chat />
                <Footer />
            </div>
        </div>
    );
};

export default ChatA;
