// import { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/navbar/NavBar";
import Publicite from "../components/Publicite";
import "../assets/css/connexion.css";
import Chat from "../components/Chat";

import { useNavigate } from "react-router-dom";
import Redirection from "../components/Redirection";
const Pagemaintenance= () => {
  
    const navigate = useNavigate();
    

    return (
        <div className="general">
            
            <Publicite />
            <div className="my-custom-div">
                <NavBar/>
                <section className="mb-5">
                <Redirection
                        texte="Vous n'avez pas de compte? Inscrivez vous et devenez notre partenaire"
                        nomBoutton="Créer votre compte"
                        lien="/page/inscription"
                    />
                    <section className="row tab-contact mx-md-3">
                        <p>Page en maintenance</p>
                    </section>
                </section>
                <Chat />
                <Footer />
            </div>
        </div>
    );
};

export default Pagemaintenance;
