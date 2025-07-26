/* eslint-disable react/prop-types */ // Désactive les avertissements sur les props manquantes (à retirer en prod)
import React, { useEffect } from "react";

// Importation des styles
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/prestataire/prestataire.css";
import "../../assets/css/connexion.css";

// Importation du contexte (non utilisé ici, donc inutile pour le moment)
import { useRegister } from "../../Contexts/PrestataireProvider";

// Importation des composants globaux
import Footer from "../../components/Footer";
import Navbarprestataire from "../../components/navbar/Navbarprestataire";
import Publicite from "../../components/Publicite";
import Chat from "../../components/Chat";
import Redirection from "../../components/Redirection";

// Image d'exemple
import apercu from "../../assets/images/apercu.png";

// Importation des composants de Swiper (carrousel)
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Importation des styles de Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Composant principal
const Realisations = () => {

    const {realisation,deleterealisation} = useRegister()
   // Liste statique des réalisations simulant une réponse d’API
    // const realisation = [
    //     {
    //         id: 1,
    //         title: "realisation1",
    //         file_url: apercu,
    //     },
    //     {
    //         id: 2,
    //         title: "realisation2",
    //         file_url: apercu,
    //     },
    //     {
    //         id: 3,
    //         title: "realisation4",
    //         file_url: apercu,
    //     },
    // ];

    return (
        <div className="general">
            
            <Publicite /> {/* Bannière ou publicité en haut */}
            <div className="my-custom-div">
                <Navbarprestataire /> {/* Barre de navigation spécifique aux prestataires */}

                <section className="mb-5">
                    {/* Bandeau de redirection / message d'en-tête */}
                    <Redirection texte="Toutes vos realisations " />

                    <section className="row tab-contact mx-md-3">
                        <div className="">
                            {/* Swiper pour afficher les réalisations sous forme de carrousel */}
                            <Swiper
                                modules={[Autoplay, Navigation, Pagination]} // Modules Swiper utilisés
                                spaceBetween={30} // Espace entre les slides
                                slidesPerView={1} // 1 slide visible par défaut
                                autoplay={{
                                    delay: 4000, // 4 secondes entre chaque slide
                                    disableOnInteraction: false, // L’autoplay continue après interaction
                                }}
                                loop={realisation?.length > 3} // Le carrousel boucle seulement si plus de 3 éléments
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
                                {realisation?.length !== 0 &&
                                    realisation?.map((realisation) => (
                                        <SwiperSlide key={realisation?.id}>
                                            <div className="card sujet-card">
                                                {/* Image de la réalisation */}
                                                <img
                                                    src={realisation?.file_url}
                                                    className="card-img-top"
                                                />
                                                <div className="card-body d-flex flex-column text-dark">
                                                    <h5 className="card-title">{realisation?.title}</h5>
                                                    {/* Bouton d’action (ici Supprimer, mais aucune logique derrière) */}
                                                    <button className="btn btn-custom1 mt-auto"  onClick={() => {
                        deleterealisation.mutateAsync({
                            id: realisation?.id,
                           
                        });
                    }}>
                                                        Supprimer
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
