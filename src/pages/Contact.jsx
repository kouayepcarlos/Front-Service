import React, { useState } from "react";
import Navbarcontact from "../components/navbar/Navbarcontact";
import Navbaracademie from "../components/navbar/Navbaracademie";
import Footer from "../components/Footer";
import Publicite from "../components/Publicite";
import "../assets/css/contact.css";
import Chat from "../components/Chat";
import Redirection from "../components/Redirection";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Contact = () => {
    const [data, setData] = useState({
        nom: "",
        telephone: "",
        message: "",
    });

    const handleChange = (e) => {
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const controlData = async () => {
        // Validation des champs
        if (!data.telephone.trim() || !data.nom.trim() || !data.message.trim()) {
            toast.error("Veuillez remplir tous les champs.");
            return;
        }

        const phoneRegex = /^\d{9}$/;
        if (!phoneRegex.test(data.telephone)) {
            toast.error("Le numéro de téléphone est invalide.");
            return;
        }

        try {
            // Envoi des données à l'API
          
            await axios.post("https://api.nilservice.net/api/envoyer-message", {
                nom: data.nom,
                numero: data.telephone, 
                message: data.message,
            }
        
        
        );

            toast.success("Message bien envoyé. Vous serez contacté d'ici peu.");
            setData({ nom: "", telephone: "", message: "" }); // Réinitialiser
        } catch (error) {
    if (error.response) {
        console.log("Réponse API : ", error.response);
    } else if (error.request) {
        console.log("Pas de réponse (request):", error.request);
    } else {
        console.log("Erreur inconnue:", error.message);
    }
    toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
}
    };

    return (
        <div className="general">
            <Publicite />
            <div className="my-custom-div">
                {localStorage.getItem("isAuthenticated") === "true" ? (
                    <Navbaracademie />
                ) : (
                    <Navbarcontact />
                )}
                <section className="mb-5">
                    <Redirection
                        texte="Mettez en valeur vos services ou produits sur Nilservice"
                        nomBoutton="Créer votre compte"
                        lien="/page/inscription"
                    />

                    <section className="row tab-contact mx-md-3">
                        <div className="col-12 col-md-4 contact-info">
                            <p>Nous Contacter</p>
                            <ul>
                                <li>
                                    <i className="fa-solid fa-location-dot"></i>{" "}
                                    Adresse
                                </li>
                                <li>Ange Raphael, Douala Cameroun</li>
                                <li>
                                    <i className="fa-solid fa-phone"></i> Phone
                                </li>
                                <li>+237 6 97 72 30 63 / 6 79 80 76 75</li>
                                <li>
                                    <i className="fa-solid fa-envelope"></i>{" "}
                                    Email
                                </li>
                                <li>contact@nilservices.com</li>
                                <li>
                                    <i className="fa-solid fa-globe"></i> Nos horaires
                                </li>
                                <li>Lundi-Samedi, 8h-17h</li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-8">
                            <p>Laisser un message</p>
                            <div className="form-contact">
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="form-group">
                                        <label htmlFor="nom">Nom</label>
                                        <input
                                            name="nom"
                                            value={data.nom}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            id="nom"
                                            placeholder="Nom"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="telephone">Numéro</label>
                                        <input
                                            name="telephone"
                                            value={data.telephone}
                                            onChange={handleChange}
                                            type="text"
                                            className="form-control"
                                            id="telephone"
                                            placeholder="Numéro"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            name="message"
                                            value={data.message}
                                            onChange={handleChange}
                                            className="form-control"
                                            id="message"
                                            placeholder="Votre message"
                                            required
                                        ></textarea>
                                    </div>
                                    <span
                                        onClick={controlData}
                                        className="btn btn-primary span-button"
                                    >
                                        Contacter
                                    </span>
                                </form>
                            </div>
                        </div>
                    </section>

                    <div className="mx-4">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=..."
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </section>
                <Chat />
                <Footer />
                <ToastContainer />
            </div>
        </div>
    );
};

export default Contact;
