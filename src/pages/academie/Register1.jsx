/* eslint-disable react/prop-types */
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar/NavBar";
import Publicite from "../../components/Publicite";
import "../../assets/css/connexion.css";
import Chat from "../../components/Chat";
import conn from "../../assets/images/connexion.jpg";
import Redirection from "../../components/Redirection";
import { useRegister } from "../../Contexts/RegisterProvider";
import { useState } from "react";
import { toast } from "react-toastify";

/**
 * cette page est dédié à la création de compte utilisateur coté academie qui se fait en trois étape et celle ci
 * est la première étape
 * on récupère : le nom et prenom, l'email, le mot de passe, confirmation de mot de passe
 * enfin on valide les données avant de passé à l'étape deux
 * contrainte: 1) le mot de passe doit contenir 8 caractère minimum comprenant au moins
 *              une lettre majuscule, minuscule, un chiffre
 *              2) le nom et prenom ne doit pas contenir de caractère spéciaux !!
 *              3) l'email doit être conforme
 * @returns JSX
 * @param aucun parametre
 *
 */
function Register_1() {
    //donnees de l utilisateur pour la creation de son compte
    const { data, setData, nextStep } =
        useRegister() || {};



    const [typePassword, setTypePassword] = useState({
        password: "password",
        password_confirmation: "password",
    });

    const [icon, setIcon] = useState({
        password: "fa-regular fa-eye",
        password_confirmation: "fa-regular fa-eye",
    });



    // cette foncion est dédiée à la récupération des données de l utilisateur soit nom et prenom
    // email etc
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "nom") {
            const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\u00A0\s]+$/;
            if (value === "" || nameRegex.test(value)) {
                setData((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));
            } else {
                return;
            }
        }
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // contrôle et validation des données utilisateur afin que les contraintes soit respectés
    function controlData() {
        // e.preventDefault()
        if (
            !data.nom.trim() ||
            !data.email.trim() ||
            !data.password.trim() ||
            !data.password_confirmation.trim()
        ) {

                toast.error("Tous les champs doivent être remplis.")


        }

        // Validation du nom
        // const nameRegex = /^[a-zA-Z\s]+$/;
        // if (!nameRegex.test(data.nom.trim())) {
        //     setValidation({
        //         message: "Le nom ne doit contenir que des lettres et des espaces.",
        //         hidden: false
        //     });
        //     return;
        // }

        // Validation de l'email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(data.email.trim())) {

               toast.error("Email invalide.");
               return;

        }

        // Validation du mot de passe
        const passwordRegex = /^\d{8}$/;
        if (!passwordRegex.test(data.password.trim())) {
           toast.error(
                    "Le mot de passe doit contenir au moins 8 caractères.",
             );
             return;
        }

        // Vérification de la confirmation du mot de passe
        if (data.password.trim() !== data.password_confirmation.trim()) {

                toast.error("Les deux mots de passe ne correspondent pas.");
                return;
        }

        // Sauvegarde et passage à l'étape suivante
        localStorage.setItem("dataUser", JSON.stringify(data));
        nextStep(2);
    }

    function hiddenPassword(field) {
        setTypePassword((prevState) => ({
            ...prevState,
            [field]: prevState[field] === "password" ? "text" : "password",
        }));

        setIcon((prevState) => ({
            ...prevState,
            [field]:
                prevState[field] === "fa-regular fa-eye"
                    ? "fa-regular fa-eye-slash"
                    : "fa-regular fa-eye",
        }));
    }

    if (!data || !setData || !nextStep) {
        return <div>erreur </div>;
    } else {
        return (
            <div className="general">
                <Publicite />
                <div className="my-custom-div">
                    <Navbar />
                    <section className="mb-5  ">
                        <Redirection
                            texte={
                                "  Vous avez deja un compte ? Connectez vous et consultez les sujets"
                            }
                            nomBoutton={"Connectez vous"}
                            lien={"/connexion/academie"}
                        />
                        <div
                            className="flex-column gap-3  register-div  "

                        >
                            <p
                               
                            >
                                Renseignements Personnelles
                            </p>
                        </div>
                        <section className="row tab-contact mx-md-3">
                            <div
                                className="col-12 col-md-10  div-contact "
                               
                            >
                                <div className="row">
                                    {" "}
                                    <div className="col-6 d-none d-md-inline">
                                        <img
                                           
                                            src={conn}
                                            className="w-100 img-register"
                                        />
                                    </div>
                                    <div className="form-contact col-md-6 col-12">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="name">
                                                    Nom et Prenom <span className="text-danger fw-bold fs-1">*</span>
                                                </label>
                                                <input
                                                    value={data.nom}
                                                    onChange={handleChange}
                                                    name="nom"
                                                    type="texte"
                                                    required
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="Entrez votre nom et prenom"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">
                                                    Email <span className="text-danger fw-bold fs-1">*</span>
                                                </label>
                                                <input
                                                    value={data.email}
                                                    onChange={handleChange}
                                                    name="email"
                                                    type="email"
                                                    required
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="Entrez votre adresse mail"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">
                                                    Mot de passe <span className="text-danger fw-bold fs-1">*</span>
                                                </label>
                                                <session className="input-container">
                                                    <input
                                                        value={data.password}
                                                        required
                                                        onChange={handleChange}
                                                        name="password"
                                                        type={
                                                            typePassword.password
                                                        }
                                                        className="form-control"
                                                        id="password"
                                                        placeholder="Entrez votre mot de passe"
                                                    />
                                                    <span
                                                        className="icon"
                                                        onClick={() =>
                                                            hiddenPassword(
                                                                "password"
                                                            )
                                                        }
                                                    >
                                                        <i
                                                            className={
                                                                icon.password
                                                            }
                                                        ></i>
                                                    </span>
                                                </session>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password_confirmation">
                                                    Confirmation mot de passe <span className="text-danger fw-bold fs-1">*</span>
                                                </label>
                                                <session className="input-container">
                                                    <input
                                                        value={
                                                            data.password_confirmation
                                                        }
                                                        required
                                                        onChange={handleChange}
                                                        name="password_confirmation"
                                                        type={
                                                            typePassword.password_confirmation
                                                        }
                                                        className="form-control"
                                                        id="password_confirmation"
                                                        placeholder="Entrez de nouveau votre mot de passe"
                                                    />
                                                    <span
                                                        className="icon"
                                                        onClick={() =>
                                                            hiddenPassword(
                                                                "password_confirmation"
                                                            )
                                                        }
                                                    >
                                                        <i
                                                            className={
                                                                icon.password_confirmation
                                                            }
                                                        ></i>
                                                    </span>
                                                </session>
                                            </div>

                                            <a
                                                className="btn btn-primary"
                                                onClick={() => controlData()}
                                            >
                                                Suivant
                                            </a>
                                        </form>
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
    }
}

export default Register_1;
