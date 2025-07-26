import React from "react";
import Chat from "../components/Chat";
import Publicite from "../components/Publicite";
import Redirection from "../components/Redirection";
import Footer from "../components/Footer";
import NavBar from "../components/navbar/NavBar";
import "../assets/css/homepage.css";
import "../assets/css/politique.css";

const Politiqueconfidentialite = () => {
    return (
        <div className="general">
            <Publicite />
            <div className="my-custom-div">
                <NavBar />
                <section className="mb-5 ">
                    <Redirection
                        texte={
                            "Les politiques de confidentialités de la plateforme Nilservice"
                        }
                    />
                    <div className="condition">
                        <p> 1. Collecte des données</p>

                        <p>
                            Nilservices collecte uniquement les données
                            nécessaires à la fourniture des services proposés
                            par la plateforme. Les données collectées peuvent
                            inclure le nom, l’adresse e-mail, les informations
                            de paiement et les données de localisation des
                            utilisateurs.
                        </p>

                        <p>2. Utilisation des données</p>

                        <p>
                            Les données des utilisateurs ne seront pas
                            partagées avec des tiers sans leur consentement
                            explicite. Elles seront utilisées uniquement pour
                            fournir les services demandés par les utilisateurs
                            et pour améliorer la qualité des services proposés
                            par Nilservices . La plateforme peut également
                            utiliser les données pour personnaliser les services
                            proposés aux utilisateurs en fonction de leurs
                            besoins et de leurs préférences.
                        </p>

                        <p> 3. Sécurité des données</p>

                        <p>
                            Nilservices prend toutes les mesures nécessaires
                            pour garantir la sécurité des données des
                            utilisateurs
                        </p>

                        <p>4. Accès aux données</p>

                        <p>
                            Les utilisateurs ont le droit d’accéder à leurs
                            données personnelles stockées sur la plateforme. Ils
                            peuvent également demander la suppression de leurs
                            données à tout moment. En cas de demande de
                            suppression, les données des utilisateurs seront
                            définitivement supprimées de la plateforme.
                        </p>

                        <p>5. Respect de la loi</p>

                        <p>
                            Nilservices respecte les lois et réglementations en
                            vigueur en Afrique concernant la protection des
                            données personnelles. La politique de
                            confidentialité peut être modifiée à tout moment
                            pour s’adapter aux évolutions législatives.
                        </p>

                        <p>Conclusion</p>

                        <p>
                            En utilisant la plateforme Nilservices, les
                            utilisateurs acceptent les termes et conditions de
                            cette politique de confidentialité. La plateforme
                            s’engage à informer régulièrement les utilisateurs
                            des éventuelles modifications apportées à cette
                            politique
                        </p>
                    </div>
                </section>
                <Chat />
                <Footer />
            </div>
        </div>
    );
};

export default Politiqueconfidentialite;
