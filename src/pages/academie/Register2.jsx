/* eslint-disable react/prop-types */
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar/NavBar";
import Publicite from "../../components/Publicite";
import "../../assets/css/connexion.css";
import Chat from "../../components/Chat";
import conn from "../../assets/images/connexion.jpg";
import Redirection from "../../components/Redirection";
import { useRegister } from "../../Contexts/RegisterProvider";
// import { useState } from "react";
import { toast } from "react-toastify";

/**
 * cette page est dédié à la création de compte utilisateur coté academie qui se fait en trois étape et celle ci
 * est la deuxième  étape
 * on récupère : le numéro de télphone, la catégorie de l'utilisateur(élève ou étudiant) et son code de parrainage s'il y en a
 * s'il est un élève il devra choisi le type d'abonnement auquel il veut soucrire
 * enfin on valide les données et on passe à l'étape 3
 * contrainte: 1) le numéro de télphone c'est exactement 9 chiffres
 *              2) le code de parrainage n'est pas obligatoire
 * @returns JSX
 * @param aucun parametre
 *
 */

function Register_2() {
    const { data, setData, nextStep, errorMessageRegister } = useRegister();

    const ErroTag = ({ text }) => {
        return (
            <>
                <div>
                    <p>{text}</p>
                </div>
            </>
        );
    };

    const handleChange = (e) => {
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const controlData = () => {
        // Validation des champs
        if (!data.telephone_parent.trim() || !data.type.trim()) {
            toast.error(
                "Veuillez entrer le téléphone et sélectionner votre catégorie"
            );
            return;
        }

        const phoneRegex = /^\d{9}$/;
        if (data.telephone && !phoneRegex.test(data.telephone)) {
            toast.error("Le numéro de téléphone est invalide");
            return;
        }
        if (data.telephone_parent && !phoneRegex.test(data.telephone_parent)) {
            toast.error("Le numéro de téléphone est invalide");
            return;
        }

        if (data.type === "élève" && !data.abonnement) {
            toast.error("Veuillez sélectionner un type d'abonnement");
            return;
        }
        setData((prevState) => ({
            ...prevState,
            redirect_url: "https://mailpit.axllent.org/docs/",
            //"localhost:5173/connexion/academie",
            faillure_redirect_url: "https://mailpit.axllent.org/docs/",
            //"localhost:5173/page/echec"
        }));
        localStorage.setItem("dataUser", JSON.stringify(data));
        nextStep(3); // Passe à l'étape suivante
    };

    if (!data || !setData || !nextStep) {
        return <div>Erreur étape 2</div>;
    }

    return (
        <div className="general">
            <Publicite />
            <div className="my-custom-div">
                <Navbar />
                <section className="mb-5">
                    <Redirection
                        texte={
                            "Vous avez déjà un compte ? Connectez-vous et consultez les sujets"
                        }
                        nomBoutton={"Connectez vous"}
                        lien={"/connexion/academie"}
                    />
                    <div className="flex-column gap-3 register-div   ">
                        <p>Deuxieme etape</p>
                    </div>
                    <section className="row tab-contact mx-md-3">
                        <div
                            className="col-12 col-md-10 div-contact"
                            style={{ margin: "auto", borderRadius: "10px" }}
                        >
                            <div className="row">
                                <div className="col-6 d-none d-md-inline">
                                    <img
                                        src={conn}
                                        className="w-100 img-register"
                                    />
                                </div>
                                <div className="form-contact col-md-6 col-12">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="phone">
                                                Téléphone parent
                                            </label>
                                            <input
                                                name="telephone_parent"
                                                value={
                                                    data.telephone_parent || ""
                                                }
                                                onChange={handleChange}
                                                type="text"
                                                required
                                                className="form-control"
                                                id="name"
                                                placeholder="Entrez le numéro de téléphone du parent"
                                            />
                                            {errorMessageRegister.status ===
                                                "telephone" && (
                                                <ErroTag
                                                    text={
                                                        errorMessageRegister.message
                                                    }
                                                />
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">
                                                Téléphone (Non obligatoire)
                                            </label>
                                            <input
                                                name="telephone"
                                                value={data.telephone || ""}
                                                onChange={handleChange}
                                                type="text"
                                                required
                                                className="form-control"
                                                id="name"
                                                placeholder="Entrez votre numéro de téléphone"
                                            />
                                            {errorMessageRegister.status ===
                                                "telephone" && (
                                                <ErroTag
                                                    text={
                                                        errorMessageRegister.message
                                                    }
                                                />
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="code">
                                                Code de parrainage
                                            </label>
                                            <input
                                                name="code_parrain"
                                                value={
                                                    data.code_parrain || null
                                                }
                                                onChange={handleChange}
                                                type="text"
                                                className="form-control"
                                                id="code"
                                                placeholder="Entrez le code de parrainage"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="type">
                                                Vous êtes ?
                                            </label>

                                            <select
                                                name="type"
                                                id="type"
                                                onChange={handleChange}
                                                value={data.type}
                                                style={{
                                                    height: "50px",
                                                    paddingLeft: "10px",
                                                    borderRadius: "10px",
                                                    border: "2px solid black",
                                                }}
                                            >
                                                <option value="">
                                                    Veuillez Sélectionner
                                                </option>

                                                <option value="élève">
                                                    Élève
                                                </option>
                                                <option value="étudiant">
                                                    Étudiant
                                                </option>
                                            </select>
                                        </div>

                                        {data.type === "élève" && (
                                            <div className="form-group">
                                                <label htmlFor="abonnement">
                                                    Quel type d abonnement
                                                    choisissez-vous ?
                                                </label>

                                                <select
                                                    name="abonnement"
                                                    id="abonnement"
                                                    onChange={handleChange}
                                                    value={data.abonnement}
                                                    style={{
                                                        height: "50px",
                                                        paddingLeft: "10px",
                                                        borderRadius: "10px",
                                                        border: "2px solid black",
                                                    }}
                                                >
                                                    <option value="">
                                                        Veuillez Sélectionner
                                                    </option>

                                                    <option value="examen">
                                                        Examen
                                                    </option>
                                                    <option value="bibliothèque">
                                                        Bibliothèque
                                                    </option>
                                                </select>
                                            </div>
                                        )}

                                        <div className="step">
                                            {" "}
                                            <a
                                                onClick={() => nextStep(1)}
                                                className="btn btn-primary"
                                            >
                                                Retour
                                            </a>
                                            <a
                                                onClick={controlData}
                                                className="btn btn-primary"
                                            >
                                                Suivant
                                            </a>
                                        </div>
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

export default Register_2;
