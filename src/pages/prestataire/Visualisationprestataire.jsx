/* eslint-disable react/prop-types */ // Désactive les avertissements ESLint sur les props non typées (à activer en prod)

// Importation des bibliothèques et fichiers nécessaires
import "bootstrap/dist/css/bootstrap.min.css"; // CSS Bootstrap pour les composants
import "../../assets/css/prestataire/prestataire.css"; // Styles personnalisés du prestataire
import apercu from "../../assets/images/apercu.png"; // Image de démonstration utilisée pour les tests

// Swiper : bibliothèque pour créer un carrousel responsive
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Importation des composants partagés
import { useParams } from "react-router-dom"; // Récupère les paramètres d’URL (par ex. l'id du prestataire)
import Footer from "../../components/Footer";
import NavBar from "../../components/navbar/NavBar";
import Publicite from "../../components/Publicite";
import Chat from "../../components/Chat";
import Redirection from "../../components/Redirection";
import { useEffect,useState } from "react";
import { useRegister } from "../../Contexts/PrestataireProvider";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";

const Visualisationprestataire = () => {

    const {PrestataireId, RealisationId} = useRegister()
    // Liste de réalisations simulée (à remplacer plus tard par appel API selon l'id du prestataire)
    // const realisations = [
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

    // Données statiques du prestataire affiché 
    // const prestation = {
    //     id: 1,
    //     photo: apercu,
    //     nom: "prestataire1",
    //     pays: "cameroun",
    //     ville: "yaounde",
    //     quartier: "bastos",
    //     profession: "electricien",
    //     description: "description",
    //     email: "email@gmail.com",
    //     telephone: "688193877",
    // };

    const [prestation,setPrestation] = useState();
    const [realisations,setRealisations] = useState()
    const [loading, setLoading] = useState(false);
    const { id } = useParams(); 

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await PrestataireId.mutateAsync({ id });
                const resultrealisation = await RealisationId.mutateAsync({ id });
                setPrestation(result.data)
                setRealisations(resultrealisation?.data)
                console.log("Résultat :", resultrealisation);
                
            } catch (error) {
                console.error("Erreur lors de la récupération :", error);
            } finally {
                setLoading(false); // Désactive le loader
            }
        };
    
        fetchData();
    }, []); // ou [] si id ne change jamais
    

    return (
        <div className="general">
             {loading && <LoaderTransparent />} 
            <Publicite /> {/* Bandeau de publicité / information générale */}
            <div className="my-custom-div">
                <NavBar /> {/* Barre de navigation principale */}

                <section className="mb-5">
                    <Redirection texte=" " /> {/* Zone pour un message de redirection personnalisé */}

                    {/* Section infos prestataire */}
                    <div className="mx-5 pb-5 row">
                        <div className="col-lg-6 photo">
                            {/* Photo du prestataire */}
                            <img src={prestation?.file_url} alt="" className="w-100" />
                        </div>

                        <div className="col-lg-6 contact-info">
                            <p>Nous Contacter</p>
                            <ul>
                                <li>Nom</li>
                                <li>{prestation?.nom}</li>

                                <li> Adresse</li>
                                <li>{prestation?.pays}, {prestation?.ville} - {prestation?.quartier}</li>

                                <li> Téléphone</li>
                                <li>{prestation?.telephone}</li>

                                <li> Email</li>
                                <li>{prestation?.email}</li>

                                <li> Profession</li>
                                <li>{prestation?.profession}</li>

                                <li>Description</li>
                                <li>{prestation?.description}</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section des réalisations du prestataire */}
                    <div className="mx-5 pb-5 realisation">
                        <p>Les réalisations</p>

                        <Swiper
                            modules={[Autoplay, Navigation, Pagination]}
                            spaceBetween={30}
                            slidesPerView={1}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            loop={realisations?.length > 3} // Boucle le carrousel uniquement si plus de 3 réalisations
                            navigation
                            // pagination={{ clickable: true }} // Tu peux activer ça si tu veux les points de navigation
                            breakpoints={{
                                576: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                992: { slidesPerView: 3 },
                            }}
                            onMouseEnter={() => {
                                const swiper = document.querySelector(".swiper").swiper;
                                swiper.autoplay.stop(); // Stoppe le défilement auto au survol
                            }}
                            onMouseLeave={() => {
                                const swiper = document.querySelector(".swiper").swiper;
                                swiper.autoplay.start(); // Reprend le défilement au départ de la souris
                            }}
                        >
                            {/* Affiche chaque réalisation sous forme de slide */}
                            {realisations?.length !== 0 &&
                                realisations?.map((realisation) => (
                                    <SwiperSlide key={realisation?.id}>
                                        <div className="card sujet-card">
                                            <img
                                                src={realisation?.file_url}
                                                className="card-img-top"
                                                alt={realisation?.title}
                                            />
                                            <div className="card-body d-flex flex-column text-dark">
                                                <h5 className="card-title">{realisation?.title}</h5>
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

export default Visualisationprestataire;
