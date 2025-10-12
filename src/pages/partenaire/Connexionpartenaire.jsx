import { useState,useEffect } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/navbar/NavBar";
import Publicite from "../../components/Publicite";
import "../../assets/css/connexion.css";
import Chat from "../../components/Chat";
import conn from "../../assets/images/connexion.jpg";
import { useRegister } from "../../Contexts/PartenaireProvider";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";
import { useNavigate } from "react-router-dom";
import Redirection from "../../components/Redirection";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
const Connexion = () => {
       const [nom,setNom]=useState(null)
      const location = useLocation();
      useEffect(() => {
        const params = new URLSearchParams(location.search);
    
        // Vérifier si le paramètre existe
        if (params.has("nom")) {
          setNom(params.get("nom"));
         
        } else {
          console.log("Pas de paramètre 'nom' dans l'URL");
        }
      }, [location]);
   const { loginMutationpartenaire, messageConnexion, setMessageConnexion } =
        useRegister(); 

        const [credentials, setCredentials] = useState({
            telephone: "",
            email: "",
            password: "",
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
                   credentials.password.trim() === ""
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

        
            await loginMutationpartenaire.mutateAsync(finalCredentials);

            navigate("/partenaire/informations");
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
                <NavBar/>
                <section className="mb-5">
               {!nom && <Redirection
                        texte="Vous avez déjà un compte ? Connectez-vous et devenez notre partenaire"
                        nomBoutton="Créer votre compte"
                        lien="/partenaire/step1"
                    />}
                      {nom &&<Redirection
                        texte={`Bienvenue ${nom},
                        Merci de vous connecter pour commencer `}
                       
                    /> }
                    <section className="row tab-contact mx-md-3">
                        <div
                            className="col-12 col-md-10 div-contact"
                           
                        >
                            <div className="row">
                                <div className="col-6 d-none d-md-inline">
                                    <img
                                      
                                        src={conn}
                                        className="w-100 img-connexion"
                                        alt="Connexion"
                                    />
                                </div>
                                <div className="form-contact col-md-6 col-12">
                                {/* <div className="form-group">
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
                                    </div> */}
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
                                            required
                                            // readOnly={credentials.email != ""}
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
                                            loginMutationpartenaire.isLoading
                                        }
                                    >
                                        {loginMutationpartenaire.isLoading
                                            ? "Connexion..."
                                            : "Se Connecter"}
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                        <a href="/partenaire/forgot-password">
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
