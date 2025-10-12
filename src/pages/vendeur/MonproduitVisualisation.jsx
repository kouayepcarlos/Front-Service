/* eslint-disable react/prop-types */ // Désactive les avertissements ESLint sur les props non typées (à activer en prod)

// Importation des bibliothèques et fichiers nécessaires
import "bootstrap/dist/css/bootstrap.min.css"; // CSS Bootstrap pour les composants
import "../../assets/css/prestataire/prestataire.css"; // Styles personnalisés du prestataire
import ProduitImages from "../../components/vendeur/Produitimage";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Importation des composants partagés
import { useParams,useNavigate } from "react-router-dom"; // Récupère les paramètres d’URL (par ex. l'id du prestataire)
import Footer from "../../components/Footer";
import Navbarvendeur from "../../components/navbar/Navbarvendeur";
import Publicite from "../../components/Publicite";
import Chat from "../../components/Chat";
import Redirection from "../../components/Redirection";
import { useRegister } from "../../Contexts/VendeurProvider";
import { useEffect, useState } from "react";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";

const MonproduitVisualisation = () => {
    const {Monproduitid,deleteproduit} = useRegister()
    const [produit,setProduit] = useState()
   const navigate = useNavigate()
    // Données statiques du prestataire affiché 
    // const produit = {
    //     id: 1,
    //     photo: apercu,
    //     nom: "produit",
    //    prix:"10 000",
    //     profession: "electricien",
    //     description_courte: "description",
    //     description_longue: "description",
    // };

    const { id } = useParams(); 
    const [loading, setLoading] = useState(false);
     useEffect(() => {
            const fetchData = async () => {
                setLoading(true);
                try {
                    console.log(id)
                    const result = await Monproduitid.mutateAsync({ id });
                    setProduit(result)
                    console.log(result)
                  
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
              {loading && <LoaderTransparent />} {/* Loader transparent si en cours */}
            <Publicite /> {/* Bandeau de publicité / information générale */}
            <div className="my-custom-div">
                <Navbarvendeur /> {/* Barre de navigation principale */}

                <section className="mb-5">
                    <Redirection texte=" " /> {/* Zone pour un message de redirection personnalisé */}

                    {/* Section infos prestataire */}
                    <div className="mx-5 pb-5 row">
                        <div className="col-lg-6 photo">
                            {/* Photo du prestataire */}
                           <ProduitImages
                              image1={produit?.file_url}
                              image2={produit?.file_url2}
                              image3={produit?.file_ur3}
                            />
                        </div>

                        <div className="col-lg-6 contact-info text-dark">
                            
                            <ul className="text-dark">
                                <li>Nom de l'article </li>
                                <li >{produit?.nom}</li>
                                <li>Description de l'article </li>
                                <li>{produit?.description}</li>
                                <li>Prix de l'article </li>
                               
                                <li>{produit?.categorie}</li>
                                <li>Statut de l'article </li>
                                <li> {produit?.statut}</li>
                                <li><button className="btn btn-primary" onClick={()=>navigate(`/vendeur/modification/produit/${produit?.id}`)}>Modifier</button>
                              &nbsp; &nbsp;  <button className="btn btn-primary"  onClick={() => {
                        deleteproduit.mutateAsync({
                            id: produit?.id,
                           
                        })}}>Supprimer</button></li>
                            </ul>
                        </div>
                    </div>

                  
                </section>

                {/* Composants de fin de page */}
                <Chat />
                <Footer />
            </div>
        </div>
    );
};

export default MonproduitVisualisation;
