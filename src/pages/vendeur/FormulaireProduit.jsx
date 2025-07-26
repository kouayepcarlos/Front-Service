// Import des hooks React et composants réutilisables
import { useState } from "react";
import Footer from "../../components/Footer";
import Navbarvendeur from "../../components/navbar/Navbarvendeur";
import Publicite from "../../components/Publicite";
import "../../assets/css/connexion.css";
import Chat from "../../components/Chat";
import "../../assets/css/vendeur/boutique.css";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";
import { useRegister } from "../../Contexts/VendeurProvider";
import Redirection from "../../components/Redirection";
import { toast } from "react-toastify"; // Pour les notifications

const FormulaireRealisation = () => {
    const { ajoutProduit } = useRegister();

    // State local pour stocker les valeurs du formulaire
    const [credentials, setCredentials] = useState({});

    // Gère les fichiers envoyés par l'utilisateur
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]; // Récupère le fichier
        console.log(e.target.name);

        if (!selectedFile) {
            toast.error("Aucun fichier sélectionné !");
            return;
        }

        if (selectedFile.size > 1024 * 1024) {
            toast.error("Le fichier doit être inférieur à 1024ko.");
            return;
        }

        // Si tout est bon, on met à jour le fichier dans le state
        setCredentials((prev) => ({
            ...prev,
            [e.target.name]: selectedFile,
        }));
    };

    // Gestion d'erreur et de chargement
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    // Met à jour les champs texte du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Fonction appelée lors de l'envoi du formulaire
    const handleSubmit = async () => {
        // Vérifie que le champ titre est rempli
        if (credentials.nom.trim() === "") {
            toast.error("Veuillez remplir tous les champs.");
            return;
        }

        setError("");
        setLoading(true); // Active le loader

        try {
            console.log(credentials);
            // Envoie des données au backend via mutation React Query
            await ajoutProduit.mutateAsync(credentials);
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
                    <Redirection texte="Ajouter vos produits " />
                    <section className=" tab-contact mx-md-3">
                        <div className="">
                            {/* Colonne image pour grands écrans */}

                            {/* Colonne du formulaire */}
                            <div className="form-contact ">
                                <h5 className="produit"> AJOUTER UN PRODUIT</h5>
                                <div className="form-group">
                                    <label htmlFor="email">Nom produit</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nom"
                                        placeholder="Entrez le nom"
                                        value={credentials.nom}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Prix produit</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="prix"
                                        placeholder="Entrez le titre"
                                        value={credentials.prix}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Description</label>
                                    <textarea
                                        name="description"
                                        id=""
                                        cols="10"
                                        rows="3"
                                        onChange={handleChange}
                                        className="form-control"
                                        value={credentials.description}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Categorie</label>
                                    <select
                                        name="categorie"
                                        id=""
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    >
                                        <option value="">
                                            selectionner la categorie
                                        </option>
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
                                        className="form-control"
                                        required
                                    >
                                        <option value="">
                                            selectionner la disponibilite
                                        </option>
                                        <option value="disponible">
                                            Disponible
                                        </option>
                                        <option value="rupture">Rupture</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Image</label>
                                    <session className="input-container">
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            className="form-control"
                                            onChange={handleFileChange}
                                            required
                                        />
                                    </session>
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

export default FormulaireRealisation;
