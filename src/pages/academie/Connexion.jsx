import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar/NavBar";
import Publicite from "../../components/Publicite";
import "../../assets/css/connexion.css";
import Chat from "../../components/Chat";
import conn from "../../assets/images/connexion.jpg";
import Redirection from "../../components/Redirection";
import { useAppContext } from "../../Contexts/AppProvider";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * Composant de page de connexion
 * Gère le formulaire de connexion et l'authentification
 */

const Connexion = () => {
    const { loginUserMutation, messageConnexion, setMessageConnexion , user} = useAppContext();
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
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState("fa-regular fa-eye");
    // const [user, setUser]=useState()

    const handleToggle = () => {
        if (type==='password'){
            setIcon("fa-regular fa-eye");
            setType('text')
        } else {
            setIcon("fa-regular fa-eye-slash")
            setType('password')
        }
    }

  // État local pour les identifiants
  const [credentials, setCredentials] = useState({
    telephone: "",
    password: "",
  });

  /**
   * Redirection si l'utilisateur est déjà connecté
   */
//   useEffect(() => {
//     if (user) {
//       navigate('/homeAcademy');
//     }

//     // Réinitialiser le message de connexion à chaque montage du composant
//     setMessageConnexion("");
//   }, [user, navigate, setMessageConnexion]);



  /**
   * Gère les changements des champs du formulaire
   * Validation spécifique pour le champ téléphone (uniquement des chiffres)
   * @param {Event} e - Événement de changement
   */
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "telephone") {
            const phoneRegex = /^[0-9]+$/;
            if (value === "" || phoneRegex.test(value)) {
                setCredentials((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));
            }
        } else {
            setCredentials((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const navigate=useNavigate()
  
    const from = location.state?.from || "/homeAcademy";

    
    // Gérer la soumission du formulaire
    const handleSubmit = async () => {
        if (
            credentials.telephone_parent.trim() === "" ||
            credentials.password.trim() === ""
        ) {
            //   setError("Veuillez remplir tous les champs.");
           toast.error("Veuillez remplir tous les champs.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            console.log(credentials)
            await loginUserMutation.mutateAsync(credentials);

            // navigate("/homeAcademy"); // Redirection après connexion
        } catch (error) {
        setLoading(false);

          //  console.error("Erreur lors de la connexion :", error);
              setError("Une erreur est survenue. Veuillez réessayer.");
        }
    };
    // 🔹 Une fois que `user` est mis à jour, on redirige proprement
    useEffect(() => {
        if (user) {
        navigate(from, { replace: true });
        setLoading(true);
        }
    }, [user, from, navigate]);



    return (
            <div className="general">
                {loading && <LoaderTransparent />}
                <Publicite />
                <div className="my-custom-div">
                     <Navbar />
                        <section className="mb-5">
                            {!nom && <Redirection texte="Vous n'avez pas de compte? Inscrivez vous  et consultez les sujets" nomBoutton="Créer votre compte" lien="/register/step1" />}
                              {nom &&<Redirection
                                                    texte={`Bienvenue ${nom},
                                                    Merci de vous connecter pour commencer `}
                                                   
                                                /> }
                            <section className="row tab-contact mx-3">
                                <div className="col-12 col-md-10 div-contact" style={{ margin: "auto", borderRadius: "10px" }}>
                                    <div className="row">
                                        <div className="col-6 d-none d-md-inline">
                                            <img style={{ borderRadius: "10px", height: "490px", objectFit: "cover" }} src={conn} className="w-100" alt="Connexion" />
                                        </div>
                                        <div className="form-contact col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="telephone">Numéro de transaction</label>
                                                <input type="text" required className="form-control" id="telephone" name="telephone_parent" placeholder="Entrez votre numéro" value={credentials.telephone_parent} onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Mot de passe</label>
                                                <session className="input-container">
                                                <input  type={type} required className="form-control" id="password" name="password" placeholder="Entrez votre mot de passe" value={credentials.password} onChange={handleChange} />
                                                <span
                                                className="icon"
                                                onClick={handleToggle}
                                            >
                                                <i className={icon}></i>
                                            </span>
                                        </session>
                                            </div>

                                            <button className="btn btn-primary" onClick={handleSubmit} type="submit" disabled={loginUserMutation.isLoading}>
                                                {loginUserMutation.isLoading ? "Connexion..." : "Se Connecter"}
                                            </button>
                                            <div className="register">
                                                <p><a href="/register/step1"> Pas encore de compte </a></p>
                                            </div>
                                            <div className="register " style={{marginBottom:"-30px"}}>
                                                <p> <a href="/forgot-password"> Mot de passe oublié ?</a></p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>

                        </section>
                        <Chat/>
                        <Footer/>
                </div>
            </div>
    )
}

export default Connexion;

