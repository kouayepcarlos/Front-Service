/* eslint-disable react/prop-types */ // Désactive les avertissements sur les props manquantes (à retirer en prod)
import React, { useEffect } from "react";

// Importation des styles
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/prestataire/prestataire.css";
import "../../assets/css/connexion.css";

// Importation du contexte (non utilisé ici, donc inutile pour le moment)

// Importation des composants globaux
import Footer from "../../components/Footer";
import Navbarvendeur from "../../components/navbar/Navbarvendeur";
import Publicite from "../../components/Publicite";
import Chat from "../../components/Chat";
import Redirection from "../../components/Redirection";
import { useNavigate } from "react-router-dom";
// Importation des composants de Swiper (carrousel)
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useRegister } from "../../Contexts/VendeurProvider";
// Importation des styles de Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Composant principal
const Realisations = () => {
    const {produit} = useRegister()
const navigate = useNavigate()
    
 
    return (
        <div className="general">
            <Publicite /> {/* Bannière ou publicité en haut */}
            <div className="my-custom-div">
                <Navbarvendeur /> {/* Barre de navigation spécifique aux prestataires */}

                <section className="mb-5">
                    {/* Bandeau de redirection / message d'en-tête */}
                    <Redirection texte="Touts vos produits " />

                    <section className="row tab-contact ">
                        <div className=" pb-5">
                            {/* Swiper pour afficher les réalisations sous forme de carrousel */}
                            <Swiper
                                modules={[Autoplay, Navigation, Pagination]} // Modules Swiper utilisés
                                spaceBetween={30} // Espace entre les slides
                                slidesPerView={1} // 1 slide visible par défaut
                                autoplay={{
                                    delay: 4000, // 4 secondes entre chaque slide
                                    disableOnInteraction: false, // L’autoplay continue après interaction
                                }}
                                loop={produit?.length > 3} // Le carrousel boucle seulement si plus de 3 éléments
                                navigation // Affiche les flèches de navigation
                                // pagination={{ clickable: true }} // Option pour activer les points de pagination
                                breakpoints={{
                                    // Réglage responsive : nombre de cartes visible selon la largeur de l’écran
                                    576: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                    },
                                    992: {
                                        slidesPerView: 3,
                                    },
                                }}
                                onMouseEnter={() => {
                                    // Arrêt de l’autoplay quand la souris entre dans le carrousel
                                    const swiper = document.querySelector(".swiper").swiper;
                                    swiper.autoplay.stop();
                                }}
                                onMouseLeave={() => {
                                    // Reprise de l’autoplay quand la souris sort
                                    const swiper = document.querySelector(".swiper").swiper;
                                    swiper.autoplay.start();
                                }}
                            >
                                {/* Génère une slide par réalisation */}
                                {produit?.length !== 0 &&
                                    produit?.map((produit) => (
                                        <SwiperSlide key={produit?.id}>
                                            <div className="card sujet-card">
                                            <img
                                                src={produit.file_url}
                                                className="card-img-top"
                                                alt={produit.title}
                                            />
                                          <div className="card-body d-flex flex-column">
                                          <h5 className="card-title text-dark">{produit.nom}</h5>
                                                    {/* Bouton d’action (ici Supprimer, mais aucune logique derrière) */}
                                                    <button className="btn btn-custom1 mt-auto" onClick={()=>{navigate(`/vendeur/Monproduit/${produit?.id}`)}}>
                                                        voir plus
                                                    </button>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                    </section>
                </section>

                {/* Composants de bas de page */}
                <Chat />
                <Footer />
            </div>
        </div>
    );
};

export default Realisations;
