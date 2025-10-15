/* eslint-disable react/prop-types */ // Désactive les avertissements sur les props manquantes (à retirer en prod)
import { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/prestataire/prestataire.css";
import "../../assets/css/connexion.css";
import Footer from "../../components/Footer";
import Navbarvendeur from "../../components/navbar/Navbarvendeur";
import Publicite from "../../components/Publicite";
import Chat from "../../components/Chat";
import Redirection from "../../components/Redirection";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useRegister } from "../../Contexts/VendeurProvider";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";

// Composant principal
const Realisations = () => {
  const { produit = [], isLoadingProduit } = useRegister();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log(produit);
  }, [produit]);
  // Filtrage par recherche
  const filteredProduits = produit.filter((produit) => {
    const search = searchTerm.toLowerCase().replace(/\s+/g, "");
    return produit?.nom.toLowerCase().replace(/\s+/g, "").includes(search);
  });
  return (
    <div className="general">
      {isLoadingProduit && <LoaderTransparent />}
      <Publicite /> {/* Bannière ou publicité en haut */}
      <div className="my-custom-div">
        <Navbarvendeur />{" "}
        {/* Barre de navigation spécifique aux prestataires */}
        <section className="mb-5">
          {/* Bandeau de redirection / message d'en-tête */}
          <Redirection texte="Tous vos produits " />
          <div className="mx-5 mb-4">
            <p className="fw-bold text-muted fs-5">
              Filtrez les produits pour affiner votre recherche :
            </p>
            <div className="input-group input-group-sm search-box w-100">
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="input-group-text">
                <i className="fa fa-search"></i>
              </span>
            </div>
          </div>
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
                loop={filteredProduits?.length > 3} // Le carrousel boucle seulement si plus de 3 éléments
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
                {filteredProduits?.length !== 0 &&
                  filteredProduits?.map((produit) => (
                    <SwiperSlide key={produit?.id}>
                      <div className="card sujet-card">
                        <img
                          src={produit.file_url}
                          className="card-img-top"
                          alt={produit.title}
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title text-dark">
                            {produit.nom}
                          </h5>
                          {/* Bouton d’action (ici Supprimer, mais aucune logique derrière) */}
                          <button
                            className="btn btn-custom1 mt-auto"
                            onClick={() => {
                              navigate(`/vendeur/Monproduit/${produit?.id}`);
                            }}
                          >
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
