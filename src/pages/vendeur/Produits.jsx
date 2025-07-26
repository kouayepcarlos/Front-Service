/* eslint-disable react/prop-types */ // Désactive les avertissements sur les props manquantes (à retirer en prod)
import React, { useEffect, useState ,useMemo} from "react";

// Importation des styles
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/prestataire/prestataire.css";
import "../../assets/css/connexion.css";

import { useParams } from "react-router-dom";

// Importation des composants globaux
import Footer from "../../components/Footer";
import NavBar from "../../components/navbar/NavBar";
import Publicite from "../../components/Publicite";
import Chat from "../../components/Chat";
import Redirection from "../../components/Redirection";
import { useNavigate,useSearchParams } from "react-router-dom";
// Image d'exemple
import apercu from "../../assets/images/apercu.png";
import { useRegister } from "../../Contexts/VendeurProvider";
// Importation des composants de Swiper (carrousel)
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Importation des styles de Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Composant principal
const Produits = () => {
    const {boutiques} = useRegister()
const [produits,setProduits] = useState()
const [produitsliste,setProduitsliste] = useState()
const [nom,setNom] = useState("")
     const [loading, setLoading] = useState(false);
     const [filters, setFilters] = useState({
        categorie: "",
        nom: ""
    })
        const { id } = useParams(); 
    
        useEffect(() => {
            if (!boutiques) return; // 🔒 Attendre que boutiques soit défini
        
            const fetchData = async () => {
              setLoading(true);
              try {
                console.log("BOUTIQUES:", boutiques);
                const result = boutiques.find((c) => c.id == id); // == pour éviter les problèmes de type
                if (result) {
                  setProduits(result.produits);
                setNom(result?.nom)
                } else {
                  console.warn("Aucune boutique trouvée avec l'id :", id);
                  setProduits([]); // ou null selon ton besoin
                }
              } catch (error) {
                console.error("Erreur lors de la récupération :", error);
              } finally {
                setLoading(false);
              }
            };
        
            fetchData();
          }, [boutiques, id]); // ✅ Ajoute boutiques et id comme dépendances

            const [searchParams] = useSearchParams();
          
              useEffect(() => {
                  const categorie = searchParams.get("categorie");
              
                  if (categorie && produits?.length > 0) {
                      setFilters((prev) => ({
                          ...prev,
                          categorie: categorie,
                      }));
                  }
              }, [searchParams, produits]);

        // Gère les changements de valeur dans les <select>
    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    }; 
     const filtered = useMemo(() => {
           if (produits) {
               return produits.filter(
                   (produit) =>
                       (filters.categorie === "" || produit.categorie === filters.categorie) &&
                       (filters.nom === "" || produit.nom === filters.nom) 
                      
               );
           }
          
           return [];
       }, [filters, produits]);
   
         // Met à jour la liste affichée après filtrage avec un petit délai
         useEffect(() => {
           setTimeout(() => {
               setProduitsliste(filtered);
           }, 500); // Simule un délai comme s’il s’agissait d’un appel API
       }, [filtered]);
    const navigate = useNavigate();

    return (
        <div className="general">
            <Publicite /> {/* Bannière ou publicité en haut */}
            <div className="my-custom-div">
                <NavBar />{" "}
                {/* Barre de navigation spécifique aux prestataires */}
                <section className="mb-5">
                    {/* Bandeau de redirection / message d'en-tête */}
                    <Redirection
                        texte={`Bienvenue chez ${nom} Votre satisfaction est notre priorité — découvrez 
nos produits et passez commande en toute confiance`}
                    />
                    <div className="mx-5 mb-4  ">
                        <p className="fw-bold text-muted fs-5 ">
                            Filtrez les produits pour affiner votre recherche :
                        </p>
                        <div className="d-flex flex-wrap gap-3 flex-md-nowrap">
                            {/* Filtre par ville */}
                            <select name="nom" className="form-select" onChange={handleFilterChange}>
                                <option value="">Filtrer par nom</option>

                                {[...new Set(produits?.map((produit) => produit?.nom))].map((produit) => (
                                        <option key={produit} value={produit}>{produit}</option>
                                    ))}
                            </select>
                            {/* Filtre par ville */}
                            <select name="categorie" className="form-select" onChange={handleFilterChange} >
                                <option value="">Filtrer par categorie</option>
                             
                                {[...new Set(produits?.map((produit) => produit?.categorie))].map((produit) => (
                                        <option key={produit} value={produit}>{produit}</option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <section className="row tab-contact mx-md-3">
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
                                loop={produitsliste?.length > 3} // Le carrousel boucle seulement si plus de 3 éléments
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
                                    const swiper =
                                        document.querySelector(
                                            ".swiper"
                                        ).swiper;
                                    swiper.autoplay.stop();
                                }}
                                onMouseLeave={() => {
                                    // Reprise de l’autoplay quand la souris sort
                                    const swiper =
                                        document.querySelector(
                                            ".swiper"
                                        ).swiper;
                                    swiper.autoplay.start();
                                }}
                            >
                                {/* Génère une slide par réalisation */}
                                {produitsliste?.length !== 0 &&
                                    produitsliste?.map((produit) => (
                                        <SwiperSlide key={produit.id}>
                                            <div className="card sujet-card">
                                                {/* Image de la réalisation */}
                                                <img
                                                    src={produit?.file_url}
                                                    className="card-img-top"
                                                />
                                                <div className="card-body d-flex flex-column">
                                                    <h5 className="card-title text-dark">
                                                        {produit?.nom}
                                                    </h5>
                                                    <p>{produit?.prix} XAF</p>
                                                    {/* Bouton d’action (ici Supprimer, mais aucune logique derrière) */}
                                                    <button
                                                        className="btn btn-custom1 mt-auto"
                                                        onClick={() => {
                                                            navigate(
                                                                `/vendeur/visualisation/${id}/${produit.id}`
                                                            );
                                                        }}
                                                    >
                                                        Voir plus de details
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

export default Produits;
