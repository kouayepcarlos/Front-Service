import Footer from "../../components/Footer";
import NavBar from "../../components/navbar/NavBar";
import Publicite from "../../components/Publicite";
import "../../assets/css/connexion.css";
import Chat from "../../components/Chat";
import Redirection from "../../components/Redirection";
// import { useAppContext } from "../../Contexts/AppProvider";
import { useRegister } from "../../Contexts/VendeurProvider";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";
import { useState } from "react";
import conn from "../../assets/images/connexion.jpg";

const Register_final = () => {
    const { data, nextStep, registerVendeurMutation } = useRegister();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await registerVendeurMutation.mutateAsync(data);
        } catch (error) {
            // Gestion des erreurs d'enregistrement
            console.error("Erreur lors de l'enregistrement :", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="general">
            <div>{loading && <LoaderTransparent />}</div>
            <Publicite />
            <div className="my-custom-div">
                <NavBar />
                <section className="mb-5  ">
                    <Redirection
                        texte={
                            "  Vous avez deja un compte ? Connectez vous et consultez les sujets"
                        }
                        nomBoutton={"Connectez vous"}
                        lien={"/connexion/prestataire"}
                    />
                    <div
                        className="flex-column gap-3   register-div "
                     
                    >
                        <p
                          
                        >
                            Derniere etape
                        </p>
                    </div>
                    <section className="row tab-contact mx-md-3">
                        <div
                            className="col-12 col-md-10  div-contact "
                           
                        >
                            <div className="row">
                                <div className="form-contact col-lg-7 col-md-6 col-12 register">
                                    
                                    <ul>
                                        <li><span> Nom et prenom:</span>{data.nom}</li>
                                        <li> <span>Email:</span>{data.email}</li>
                                        <li> <span>Mot de passe:</span>{data.mot_de_passe}</li>
                                        <li>  <span>Telephone</span>{data.telephone}</li>
                                     
                                        <li>
                                        <span> Code du parrain:</span>
                                            {data.code_parain
                                                ? data.code_parain
                                                : "null"}
                                        </li>
                                      
                                    </ul>

                                 <div className="step">  <a
                                        onClick={() => nextStep(2)}
                                        className="btn btn-primary"
                                    >
                                        Retour
                                    </a>

                                    <a
                                        className="btn btn-primary"
                                        onClick={handleSubmit}
                                    >
                                        S enregistrer
                                    </a>
                                    </div>
                               
                                </div>
                            
                            <div className="col-6 col-lg-5 d-none d-md-inline">
                                <img
                                   
                                    src={conn}
                                    className="w-100 img-register"
                                />
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

export default Register_final;
