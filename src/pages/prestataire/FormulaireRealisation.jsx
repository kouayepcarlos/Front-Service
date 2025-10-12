// Import des hooks React et composants réutilisables
import { useState } from "react";
import Footer from "../../components/Footer";
import Navbarprestataire from "../../components/navbar/Navbarprestataire";
import Publicite from "../../components/Publicite";
import "../../assets/css/connexion.css";
import Chat from "../../components/Chat";
import conn from "../../assets/images/connexion.jpg";
import { useRegister } from "../../Contexts/PrestataireProvider"; // Contexte global pour utiliser l'API Prestataire
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";
import { useNavigate } from "react-router-dom";
import Redirection from "../../components/Redirection";
import { toast } from "react-toastify"; // Pour les notifications

const FormulaireRealisation = () => {
    // Récupération de la mutation `ajoutRealisation` depuis le contexte
    const { ajoutRealisation } = useRegister();

    // State local pour stocker les valeurs du formulaire
    const [credentials, setCredentials] = useState({
        title: "",
        image: null,
    });

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
        if (credentials.title.trim() === "") {
            toast.error("Veuillez remplir tous les champs.");
            return;
        }

        setError("");
        setLoading(true); // Active le loader

        try {
            console.log(credentials);
            // Envoie des données au backend via mutation React Query
            await ajoutRealisation.mutateAsync(credentials);
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
        } finally {
            setLoading(false); // Désactive le loader
        }
    };

    // Affichage JSX de la page
    return (
        <div className="general">
            {loading && <LoaderTransparent />} {/* Loader transparent si en cours */}
            <Publicite />
            <div className="my-custom-div">
                <Navbarprestataire />
                <section className="mb-5">
                    <Redirection texte="Ajouter vos realisattion " />
                    <section className="row tab-contact mx-md-3">
                        <div className="col-12 col-md-10 div-contact">
                            <div className="row">
                                {/* Colonne image pour grands écrans */}
                                <div className="col-6 d-none d-md-inline">
                                    <img
                                        src={conn}
                                        className="w-100 img-connexion"
                                        alt="Connexion"
                                    />
                                </div>

                                {/* Colonne du formulaire */}
                                <div className="form-contact col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="email">Titre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            placeholder="Entrez le titre"
                                            value={credentials.title}
                                            onChange={handleChange}
                                            required
                                        />
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
                                        Envoyer
                                    </button>
                                </div>
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
