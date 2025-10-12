import { useState } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/navbar/NavBar";
import Publicite from "../../components/Publicite";
import "../../assets/css/connexion.css";
import Chat from "../../components/Chat";
import conn from "../../assets/images/connexion.jpg";
import { useAdminContext } from "../../Contexts/AdminProvider";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";
import { useNavigate } from "react-router-dom";


/**
 * cette page est dédié à la connexion d'un administrateur,
 * on renseigne le numero de telephone et le mot de passe ,si les informations 
 * sont exactes,l'utilisateur est renvoyé dans son espace
 * @returns 
 */
const Connexion = () => {
    const { loginMutationadmin, messageConnexion, setMessageConnexion } =
        useAdminContext();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState("fa-regular fa-eye");

    const handleToggle = () => {//permet de changer le type de l'input password
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
            credentials.username.trim() === "" ||
            credentials.password.trim() === ""
        ) {
            //   setError("Veuillez remplir tous les champs.");
            setMessageConnexion("Veuillez remplir tous les champs.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            await loginMutationadmin.mutateAsync(credentials);

            navigate("/admin/listesujet");
             setTimeout(() => {
    window.location.reload();
}, 100); 
        } catch (error) {
            //  console.error("Erreur lors de la connexion :", error);
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
                    <div
                        className="flex-column gap-3 pt-5    "
                        style={{ color: "#ef8f0a", fontSize: "1vmax" }}
                    >
                        <p className="p-admin">
                            Connexion administrateur, pour la gestion des sujets
                        </p>
                    </div>
                    <section className="row tab-contact mx-md-3">
                        <div
                            className="col-12 col-md-10 div-contact"
                            style={{ margin: "auto", borderRadius: "10px" }}
                        >
                            <div className="row">
                                <div className="col-6 d-none d-md-inline">
                                    <img
                                        style={{
                                            borderRadius: "10px",
                                            height: "400px",
                                            objectFit: "cover",
                                        }}
                                        src={conn}
                                        className="w-100"
                                        alt="Connexion"
                                    />
                                </div>
                                <div className="form-contact col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="telephone">Nom</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="telephone"
                                            name="username"
                                            placeholder="Entrez votre nom"
                                            value={credentials.username}
                                            onChange={handleChange}
                                            required
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
                                                id="password"
                                                name="password"
                                                placeholder="Entrez votre mot de passe"
                                                value={credentials.password}
                                                onChange={handleChange}
                                                required
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
                                            loginMutationadmin.isLoading
                                        }
                                    >
                                        {loginMutationadmin.isLoading
                                            ? "Connexion..."
                                            : "Se Connecter"}
                                    </button>
                                    <p className="text-danger">
                                        {messageConnexion}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <a href="/connexion/passe_oublie">
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
