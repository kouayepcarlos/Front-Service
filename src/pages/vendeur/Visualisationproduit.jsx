/* eslint-disable react/prop-types */ // Désactive les avertissements ESLint sur les props non typées (à activer en prod)

// Importation des bibliothèques et fichiers nécessaires
import "bootstrap/dist/css/bootstrap.min.css"; // CSS Bootstrap pour les composants
import "../../assets/css/prestataire/prestataire.css"; // Styles personnalisés du prestataire
import apercu from "../../assets/images/apercu.png"; // Image de démonstration utilisée pour les tests
import { useRegister } from "../../Contexts/VendeurProvider";
// Swiper : bibliothèque pour créer un carrousel responsive
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Importation des composants partagés
import { useParams, useNavigate } from "react-router-dom"; // Récupère les paramètres d’URL (par ex. l'id du prestataire)
import Footer from "../../components/Footer";
import NavBar from "../../components/navbar/NavBar";
import Publicite from "../../components/Publicite";
import Chat from "../../components/Chat";
import Redirection from "../../components/Redirection";
import Produits from "./Produits";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../assets/css/modal.css";
const Visualisationproduit = () => {
    const { boutiques } = useRegister();
    const navigate = useNavigate();
    const [produit, setProduit] = useState();
    const [produits, setProduits] = useState();
    const [vendeur, setVendeur] = useState();
    const [loading, setLoading] = useState(false);
    const { idboutique, idproduit } = useParams();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (!boutiques) return; // 🔒 Attendre que boutiques soit défini

        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("BOUTIQUES:", boutiques);

                const result = boutiques.find((c) => c.id == idboutique); // == pour éviter les problèmes de type
                console.log(result);
                setVendeur(result.vendeur);
                setProduits(result.produits);
                const produit = result.produits.find((c) => c.id == idproduit);

                setProduit(produit);
                console.log(produit);
            } catch (error) {
                console.error("Erreur lors de la récupération :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [boutiques, idproduit, idboutique]); // ✅ Ajoute boutiques et id comme dépendances

    return (
        <div className="general">
            <Publicite /> {/* Bandeau de publicité / information générale */}
            <div className="my-custom-div">
                <NavBar /> {/* Barre de navigation principale */}
                <section className="mb-5">
                    <Redirection  texte={`Bienvenue chez ${vendeur?.nom} Votre satisfaction est notre priorité — découvrez 
nos produits et passez commande en toute confiance`}/>{" "}
                    {/* Zone pour un message de redirection personnalisé */}
                    {/* Section infos prestataire */}
                    <div className="mx-5 pb-5 row">
                        <div className="col-lg-6 photo">
                            {/* Photo du prestataire */}
                            <img
                                src={produit?.file_url}
                                alt=""
                                className="w-100"
                            />
                        </div>

                        <div className="col-lg-6 contact-info">
                            <ul>
                                <li>Nom</li>
                                <li>{produit?.nom}</li>
                                <li>Description</li>
                                <li>{produit?.description}</li>
                                <li>Prix</li>
                                <li>{produit?.prix}</li>
                                <li>Categorie</li>
                                <li> {produit?.categorie}</li>
                                <li>Statut</li>
                                <li> {produit?.statut}</li>
                                <li>
                                    {" "}
                                    <Button
                                        className="btn btn-primary"
                                        onClick={handleShow}
                                    >
                                        Ecrire au vendeur
                                    </Button>
                                    <Modal
                                        show={show}
                                        onHide={handleClose}
                                        className="Modal"
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>
                                                Informations vendeur
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="info-vendeur">
                                            <div>
                                                {" "}
                                                <span>Nom: &nbsp;</span>
                                                <p>{vendeur?.nom}</p>
                                            </div>
                                            <div>
                                                {" "}
                                                <span>Email: &nbsp;</span>{" "}
                                                <p>{vendeur?.email}</p>
                                            </div>
                                            {vendeur?.description && (
                                                <div>
                                                    {" "}
                                                    <span>
                                                        Description: &nbsp;{" "}
                                                    </span>
                                                    <p>
                                                        {vendeur?.description}
                                                    </p>
                                                </div>
                                            )}
                                            <div>
                                                {" "}
                                                <span>Adresse: &nbsp;</span>{" "}
                                                <p>
                                                    {vendeur?.pays}-
                                                    {vendeur?.ville},
                                                    {vendeur?.adresse}
                                                </p>
                                            </div>
                                            <div>
                                                {" "}
                                                <span>
                                                    Telephone: &nbsp;
                                                </span>{" "}
                                                <p>{vendeur?.telephone}</p>
                                            </div>
                                            {vendeur?.whatsapp && (
                                                <div>
                                                    {" "}
                                                    <span>Whatsapp: &nbsp;</span>
                                                    <p>{vendeur?.whatsapp}</p>
                                                </div>
                                            )}
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button
                                                variant="secondary"
                                                onClick={handleClose}
                                            >
                                                Fermer
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Section des réalisations du prestataire */}
                    <div className="mx-5 pb-5 produit">
                        <p>Les Autres produits</p>

                        <Swiper
                            modules={[Autoplay, Navigation, Pagination]}
                            spaceBetween={30}
                            slidesPerView={1}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            loop={produits?.length > 3} // Boucle le carrousel uniquement si plus de 3 réalisations
                            navigation
                            // pagination={{ clickable: true }} // Tu peux activer ça si tu veux les points de navigation
                            breakpoints={{
                                576: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                992: { slidesPerView: 3 },
                            }}
                            onMouseEnter={() => {
                                const swiper =
                                    document.querySelector(".swiper").swiper;
                                swiper.autoplay.stop(); // Stoppe le défilement auto au survol
                            }}
                            onMouseLeave={() => {
                                const swiper =
                                    document.querySelector(".swiper").swiper;
                                swiper.autoplay.start(); // Reprend le défilement au départ de la souris
                            }}
                        >
                            {/* Affiche chaque réalisation sous forme de slide */}
                            {produits?.length !== 0 &&
                                produits?.map((produit) => (
                                    <SwiperSlide key={produit?.id}>
                                        <div className="card sujet-card">
                                            <img
                                                src={produit?.file_url}
                                                className="card-img-top"
                                                alt={produit?.nom}
                                            />
                                            <div className="card-body d-flex flex-column text-dark">
                                                <h5 className="card-title">
                                                    {produit?.nom}
                                                </h5>
                                                <p>{produit?.prix}</p>
                                                {/* Bouton d’action (ici Supprimer, mais aucune logique derrière) */}
                                                <button
                                                    className="btn btn-custom1 mt-auto"
                                                    onClick={() => {
                                                        navigate(
                                                            `/vendeur/visualisation/${idboutique}/${produit.id}`
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
                {/* Composants de fin de page */}
                <Chat />
                <Footer />
            </div>
        </div>
    );
};

export default Visualisationproduit;
