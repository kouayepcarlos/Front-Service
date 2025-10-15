/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar/NavBar";
import Publicite from "../../components/Publicite";
import "../../assets/css/connexion.css";
import Chat from "../../components/Chat";
import conn from "../../assets/images/connexion.jpg";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { authAPIPrestataire } from "../../fecths/fetchPrestataire";

/**
 * Composant de page de connexion
 * Gère le formulaire de connexion et l'authentification
 */
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");
  const navigate = useNavigate();

  const handleSend = async () => {
    setLoading(true);
    if (password.trim() === "" || password_confirmation.trim() === "") {
      setMessage("remplissez tous les champs");
      return;
    }

    // Validation du mot de passe
    const passwordRegex = /^.{8,}$/;
    if (!passwordRegex.test(password.trim())) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    // Vérification de la confirmation du mot de passe
    if (password.trim() !== password_confirmation.trim()) {
      toast.error("Les deux mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await authAPIPrestataire.resetPassword({
        password,
        password_confirmation,
        token,
        email,
        type: "prestataires",
      });

      if (res.status === 400 || res.status === "error") {
       toast.error(
          "le token de réinitialisaion est déjà expiré, Veuillez recommencer la procedure"
        );
      }
      if (res.status === 200) {
        toast.success("mot de passe mis a jour connecez-vous");
        navigate("/prestataire/connexion");
      }
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  return (
    <div style={{ backgroundColor: "#ef8f0a" }}>
      <Publicite />
      <div className="my-custom-div">
        <Navbar />
        <section className="mb-5">
          {loading && <LoaderTransparent />}
          <section className="row tab-contact mx-3">
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
                    <label htmlFor="telephone">
                      Entrer un nouveau mot de passe{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Entrez votre mot de passe"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telephone">
                      confirmer votre mot de passe
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="password_confirmation"
                      value={password_confirmation}
                      onChange={(e) => setPassword_confirmation(e.target.value)}
                      placeholder="Entrez à nouveau votre mot de passe"
                    />
                  </div>
                  <button className="btn btn-primary" onClick={handleSend}>
                    Réinitialiser le mot de passe
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

export default ResetPassword;
