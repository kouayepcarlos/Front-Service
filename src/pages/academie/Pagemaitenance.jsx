// import { useState } from "react";
import Footer from "../../components/Footer";
import Navbaracademie from "../../components/navbar/Navbaracademie";
import Publicite from "../../components/Publicite";
import "../../assets/css/connexion.css";
import Chat from "../../components/Chat";

import { useNavigate } from "react-router-dom";
import Redirection from "../../components/Redirection";
const Pagemaintenanceacademie= () => {
  
    const navigate = useNavigate();
    

    return (
        <div className="general">
            
            <Publicite />
            <div className="my-custom-div">
                <Navbaracademie/>
                <section className="mb-5">
                <Redirection
                        texte="Profitez des services offerts par NilService et n'oubliez pas que vous pouvez gagner de l'argent en parrainant"
                        nomBoutton="Consulter les sujets"
                        lien="/homeacademy"
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

export default Pagemaintenanceacademie;
