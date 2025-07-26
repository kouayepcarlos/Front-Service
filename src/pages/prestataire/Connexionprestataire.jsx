import { useState } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/navbar/NavBar";
import Publicite from "../../components/Publicite";
import "../../assets/css/connexion.css";
import Chat from "../../components/Chat";
import conn from "../../assets/images/connexion.jpg";
import { useRegister } from "../../Contexts/PrestataireProvider";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";
import { useNavigate } from "react-router-dom";
import Redirection from "../../components/Redirection";
import { toast } from "react-toastify";

const Connexion = () => {
    const { loginMutationprestataire, messageConnexion, setMessageConnexion } =
        useRegister();

    const [credentials, setCredentials] = useState({
        telephone: "",
        email: "",
        mot_de_passe: "",
    });

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState("fa-regular fa-eye");

    const handleToggle = () => {
        if (type === "password") {
            setIcon("fa-regular fa-eye");
            setType("text");
        } else {
            setIcon("fa-regular fa-eye-slash");
            setType("password");
        }
    };

    // Gérer les changements des inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        setCredentials((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Gérer la soumission du formulaire
    const handleSubmit = async () => {
        if (
            (credentials.telephone.trim() === "" &&
                credentials.email.trim() === "") ||
            credentials.mot_de_passe.trim() === ""
        ) {
            //   setError("Veuillez remplir tous les champs.");
            toast.error("Veuillez remplir tous les champs.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            let tempCredentials = { ...credentials };

            const { telephone, ...withoutTelephone } = tempCredentials;
            const { email, ...withoutEmail } =
                telephone === "" ? withoutTelephone : tempCredentials;

            const finalCredentials =
                email === ""
                    ? withoutEmail
                    : telephone === ""
                    ? withoutTelephone
                    : tempCredentials;

            setCredentials(finalCredentials);
            console.log(credentials);
            await loginMutationprestataire.mutateAsync(finalCredentials);

            navigate("/prestataire/informations");
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            //   setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="general">
            {loading && <LoaderTransparent />}
            <Publicite />
            <div className="my-custom-div">
                <NavBar />
                <section className="mb-5">
                    <Redirection
                        texte="Vous avez déjà un compte ? Connectez-vous et prester vos servies"
                        nomBoutton="Créer votre compte"
                        lien="/prestataire/step1"
                    />
                    <section className="row tab-contact mx-md-3">
                        <div className="col-12 col-md-10 div-contact">
                            <div className="row">
                                <div className="col-6 d-none d-md-inline">
                                    <img
                                        src={conn}
                                        className="w-100 img-connexion"
                                        alt="Connexion"
                                    />
                                </div>

                                <div className="form-contact col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="Entrez votre email"
                                            value={credentials.email}
                                            onChange={handleChange}
                                            readOnly={
                                                credentials.telephone != ""
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="telephone">
                                            Telephone
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="telephone"
                                            name="telephone"
                                            placeholder="Entrez votre numéro"
                                            value={credentials.telephone}
                                            onChange={handleChange}
                                            readOnly={credentials.email != ""}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">
                                            Mot de passe
                                        </label>
                                        <session className="input-container">
                                            <input
                                                type={type}
                                                className="form-control"
                                                id="mot_de_passe"
                                                name="mot_de_passe"
                                                placeholder="Entrez votre mot de passe"
                                                value={credentials.mot_de_passe}
                                                onChange={handleChange}
                                            />
                                            <span
                                                className="icon"
                                                onClick={handleToggle}
                                            >
                                                <i className={icon}></i>
                                            </span>
                                        </session>
                                    </div>
                                    {error && (
                                        <p className="text-danger">{error}</p>
                                    )}
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleSubmit}
                                        type="submit"
                                        disabled={
                                            loginMutationprestataire.isLoading
                                        }
                                    >
                                        {loginMutationprestataire.isLoading
                                            ? "Connexion..."
                                            : "Se Connecter"}
                                    </button>
                                    <p className="text-danger">
                                        {messageConnexion}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <a href="/prestataire/passe_oublie">
                            Mot de passe oublié
                        </a>
                    </section>
                </section>
                <Chat />
                <Footer />
            </div>
        </div>
    );
};

export default Connexion;
