// Import des hooks React et composants réutilisables
import { useState, useEffect } from "react"
import Footer from "../../components/Footer";
import Navbarvendeur from "../../components/navbar/Navbarvendeur";
import Publicite from "../../components/Publicite";
import "../../assets/css/connexion.css";
import Chat from "../../components/Chat";
import "../../assets/css/vendeur/boutique.css";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";
import { useRegister } from "../../Contexts/VendeurProvider";
import Redirection from "../../components/Redirection";
import { useParams } from "react-router-dom";

const FormulaireModificationProduit = () => {
    const { Monproduitid, updateProduit } = useRegister();
    const [produit, setProduit] = useState({});
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(id);
                const result = await Monproduitid.mutateAsync({ id });
                setProduit(result);
                console.log(result);
            } catch (error) {
                console.error("Erreur lors de la récupération :", error);
            }
        };

        fetchData();
    }, []);

    // Gestion d'erreur et de chargement
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    // Met à jour les champs texte du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduit((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Fonction appelée lors de l'envoi du formulaire
    const handleSubmit = async () => {
        // Vérifie que le champ titre est rempli

        setError("");
        setLoading(true); // Active le loader

        try {
            // Envoie des données au backend via mutation React Query
            await updateProduit.mutateAsync(produit);
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
        } finally {
            setLoading(false); // Désactive le loader
        }
    };

    // Affichage JSX de la page
    return (
        <div className="general">
            {loading && <LoaderTransparent />}{" "}
            {/* Loader transparent si en cours */}
            <Publicite />
            <div className="my-custom-div">
                <Navbarvendeur />
                <section className="mb-5">
                    <Redirection texte="Ajouter vos realisattion " />
                    <section className=" tab-contact mx-md-3">
                        <div className="">
                            {/* Colonne image pour grands écrans */}

                            {/* Colonne du formulaire */}
                            <div className="form-contact ">
                                <h5 className="produit">
                                    {" "}
                                    MODIFIER UN PRODUIT
                                </h5>
                                <div className="form-group">
                                    <label htmlFor="email">Nom produit</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nom"
                                        placeholder="Entrez le nom"
                                        value={produit.nom}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Prix produit</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="prix"
                                        placeholder="Entrez le titre"
                                        value={produit.prix}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Description</label>
                                    <textarea
                                        name="description"
                                        id=""
                                        cols="10"
                                        rows="3"
                                        className="form-control"
                                        onChange={handleChange}
                                        value={produit.description}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Categorie</label>
                                    <select
                                        name="categorie"
                                        className="form-control"
                                        id=""
                                        onChange={handleChange}
                                        value={produit?.categorie}
                                    >
                                        <option value=""></option>
                                        <option value="meuble">meuble</option>
                                        <option value="vetement">
                                            vetement
                                        </option>
                                        <option value="table">table</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Disponibilite</label>
                                    <select
                                        name="statut"
                                        id=""
                                        onChange={handleChange}
                                        value={produit?.statut}
                                        className="form-control"
                                    >
                                        <option value=""></option>
                                        <option value="disponible">
                                            Disponible
                                        </option>
                                        <option value="rupture">Rupture</option>
                                    </select>
                                </div>

                                {/* Bouton pour envoyer le formulaire */}
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSubmit}
                                    type="submit"
                                >
                                    Enregistrer
                                </button>
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

export default FormulaireModificationProduit;
