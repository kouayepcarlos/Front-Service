import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar/NavBar";
import Publicite from "../../components/Publicite";
import "../../assets/css/connexion.css";
import Chat from "../../components/Chat";
import conn from "../../assets/images/connexion.jpg";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";
import { authAPI } from "../../fecths/fecthAcademyUser";
import { toast } from "react-toastify";
import axios from "axios";
/**
 * Composant de page de connexion
 * Gère le formulaire de connexion et l'authentification
 */
const ForgotPassword = () => {
    const [email, setEmail]=useState({
        email:""
    })
      const API = axios.create({
            baseURL: "https://api.nilservice.net/api", // URL de base de l'API Laravel
            headers: {
                "Content-Type": "application/json", // On envoie les données au format JSON par défaut
            },
            // withCredentials: true, // Optionnel si on utilise les cookies pour l'auth (non utilisé ici)
        });
    const [message, setMessage]=useState("")
    const [loading, setLoading]=useState(false)
    const handleChange =(e)=>{
        setEmail({email:e.target.value})
    }
    const handleSend = async()=>{
        setLoading(true)
        if(email.email.trim()===""){
           toast.error("Veuillez renseigné votre email.");
            setLoading(false)
            return;
        }
      
    try {
        const res = await API.post("/auth/password/email", {
            email: email.email, // 👈 tu envoyais tout l'objet {email}, corrige ici
            broker: "academys",
        });

        console.log(res)
        if (res.status === 400 || res.data?.status === "error") {
            toast.error("Email incorrect");
        } else if (res.status === 200) {
            toast.success("Email envoyé, vérifiez votre boîte mail");
        }

        setEmail({ email: "" });
    } catch (error) {
        toast.error("Une erreur est survenue, réessayez.");
        console.error(error);
    } finally {
        setLoading(false); // 👈 le loader s’arrête TOUJOURS ici
    }

    }
    useEffect(()=>{
        setTimeout(()=>{
            setMessage("")
        }, 3000)
    }, [message])


    return (
            <div style={{ backgroundColor: "#ef8f0a" }}>
                <Publicite />
                <div className="my-custom-div">
                     <Navbar />
                        <section className="mb-5">
                            {loading && <LoaderTransparent/>}
                            <section className="row tab-contact mx-3">
                                <div className="col-12 col-md-10 div-contact" style={{ margin: "auto", borderRadius: "10px" }}>
                                    <div className="row">
                                        <div className="col-6 d-none d-md-inline">
                                            <img style={{ borderRadius: "10px", height: "400px", objectFit: "cover" }} src={conn} className="w-100" alt="Connexion" />
                                        </div>
                                        <div className="form-contact col-md-6 col-12">
                                            <div className=" register">
                                                <p>Entrer votre adresse email. Un courriel contenant un lien vous sera envoyé pour réinitialiser votre mot de passe</p>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="telephone">Email</label>
                                                <input type="text" className="form-control" id="telephone" name="telephone" placeholder="Entrez votre email"value={email.email} onChange={handleChange} required/>
                                            </div>
                                            <button className="btn btn-primary"onClick={handleSend} >
                                                Envoyer le lien
                                            </button>
                                           

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

export default ForgotPassword;

