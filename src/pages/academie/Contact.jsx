import React from "react";

import Navbaracademie from "../../components/navbar/Navbaracademie";
import Footer from "../../components/Footer";
import Publicite from "../../components/Publicite";
import "../../assets/css/contact.css";
import Chat from "../../components/Chat";
import Redirection from "../../components/Redirection";

const Contactacademie = () => {
    return (
        <div className="general">
            <Publicite />
            <div className="my-custom-div">
          <Navbaracademie/>
                <section className="mb-5  ">
                    <Redirection
                        texte={
                            "Mettez en valeur vos services ou produits sur Nilservice"
                        }
                        nomBoutton={"Créer votre compte"}
                        lien={""}
                    />

                    <section className="row tab-contact mx-md-3">
                        <div className="col-12 col-md-4 contact-info ">
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
                                    <i className="fa-solid fa-globe"></i>Nos
                                    horaires
                                </li>
                                <li>Lundi-Samedi, 8h-17h</li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-8">
                            <p>Laisser un message</p>
                            <div className="form-contact">
                                <form>
                                    <div className="form-group">
                                        <label for="exampleInputEmail1">
                                            Nom{" "}
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="nom"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputPassword1">
                                            Numero
                                        </label>
                                        <input
                                            type=""
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="numero"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label for="">Message</label>
                                        <textarea
                                            name=""
                                            className="form-control"
                                            id=""
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Contacter
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>
                    <div className="mx-4">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.6347072306526!2d9.767384973717888!3d4.09453354661681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10610f9a501cb325%3A0x93a47c86bf960a4f!2sAngel%20raphael!5e0!3m2!1sfr!2scm!4v1737102388022!5m2!1sfr!2scm"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </section>
                <Chat />
                <Footer />
            </div>
        </div>
    );
};

export default Contactacademie;
