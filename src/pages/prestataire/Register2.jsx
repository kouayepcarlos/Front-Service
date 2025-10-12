/* eslint-disable react/prop-types */
import Footer from "../../components/Footer";
import NavBar from "../../components/navbar/NavBar";
import Publicite from "../../components/Publicite";
import "../../assets/css/connexion.css";
import Chat from "../../components/Chat";
import conn from "../../assets/images/connexion.jpg";
import Redirection from "../../components/Redirection";
import { useRegister } from "../../Contexts/PrestataireProvider";
// import { useState, useMemo } from "react";


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
 

    const handleChange = (e) => {
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const controlData = () => {
        // Validation des champs
        if (!data.telephone || !data.telephone.trim()) {
            toast.error("Veuillez entrer le téléphone");
            return;
        }

        if( !data.profession || !data.profession.trim()){
            toast.error('veuillez choisir la profession')
            return;
        }

        const phoneRegex = /^\d{9}$/;
        if (data.telephone && !phoneRegex.test(data.telephone)) {
            toast.error("Le numéro de téléphone est invalide");
            return;
        }

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
                <NavBar />
                <section className="mb-5">
                    <Redirection
                        texte={
                            "Vous avez déjà un compte ? Connectez-vous "
                        }
                        nomBoutton={"Connectez vous"}
                        lien={"/prestataire/connexion"}
                    />
                    <div className="flex-column gap-3 register-div   ">
                        <p>Deuxieme etape</p>
                    </div>
                    <section className="row tab-contact mx-md-3">
                        <div className="col-12 col-md-10 div-contact">
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
                                            <label htmlFor="phone">Téléphone <span className="text-danger fw-bold fs-1">*</span></label>
                                            <input
                                                name="telephone"
                                                value={data.telephone}
                                                onChange={handleChange}
                                                type="text"
                                                required
                                                className="form-control"
                                                id="telephone"
                                                placeholder="Entrez votre numéro de téléphone"
                                            />
                                           

                                        </div>
                                        <div className="form-group">
                                        <label htmlFor="phone">Profession <span className="text-danger fw-bold fs-1">*</span></label>
                                        <select name="profession" id="profession"  className="form-control"  onChange={handleChange}>
                                        <option value="">Profession</option>
                                          <option value="menusier">Menusier</option>
                                          <option value="electricien">Electricien</option>
                                          <option value="maçon"> Maçon</option>
                                          <option value="peintre">Peintre</option>
                                          <option value="jardinier">Jardinier</option>
                                          <option value="frigoriste">Frigoriste</option>
                                          <option value="carreleur">Carreleur</option>
                                          <option value="répétiteur"> Répétiteur</option>
                                          <option value="plombier">Plombier</option>
                                          <option value="autres">Autres</option>
                                
                                        </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="code">
                                                Code de parrainage
                                            </label>
                                            <input
                                                name="code_parain"
                                                value={data.code_parain}
                                                onChange={handleChange}
                                                type="text"
                                                className="form-control"
                                                id="code"
                                                placeholder="Entrez le code de parrainage"
                                            />
                                        </div>

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
