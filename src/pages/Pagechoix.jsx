// import { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/navbar/NavBar";
import Publicite from "../components/Publicite";
import "../assets/css/connexion.css";
import Chat from "../components/Chat";
import conn from "../assets/images/connexion.jpg";

import { useNavigate } from "react-router-dom";
import Redirection from "../components/Redirection";
const Pagechoix= () => {
  
    const navigate = useNavigate();
    

    return (
        <div className="general">
            
            <Publicite />
            <div className="my-custom-div">
                <NavBar/>
                <section className="mb-5">
                <Redirection
                        texte="Vous n'avez pas de compte? Inscrivez vous et devenez notre partenaire"
                       
                    />
                    <section className="row tab-contact mx-md-3">
                        <div
                            className="col-12 col-md-10 div-contact"
                           
                        >
                            <div className="row">
                                <div className="col-6 d-none d-md-inline">
                                    <img
                                      
                                        src={conn}
                                        className="w-100 img-connexion"
                                        alt="Connexion"
                                    />
                                </div>
                                <div className="form-contact col-md-6 col-12" >
                                  <button className="btn btn-primary form-group" onClick={()=> navigate("/register/step1")}>Inscription academie</button>
                                  <button className="btn btn-primary form-group" onClick={()=> navigate("/partenaire/step1")}>Inscription partenaire</button>
                                  <button className="btn btn-primary form-group" onClick={()=> navigate("/maintenance")}>Inscription vendeur pro </button>
                                  <button className="btn btn-primary " onClick={()=> navigate("/maintenance")}>Inscription prestataire pro</button>
                                  </div>
                                   
                            </div>
                        </div>
                       
                    </section>
                </section>
                <Chat />
                <Footer />
            </div>
        </div>
    );
};

export default Pagechoix;
