/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import Footer from "../../components/Footer";
import Publicite from "../../components/Publicite";
import "../../assets/css/connexion.css";
import Chat from "../../components/Chat";
import Redirection from "../../components/Redirection";
import { useRegister } from "../../Contexts/PartenaireProvider";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";
import { useState } from "react";
import conn from "../../assets/images/connexion.jpg";
import NavBar from "../../components/navbar/NavBar";

const Register_final = () => {
  const { data, nextStep, registerPartenaireMutation ,setData} = useRegister();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      setData((prev)=>({
        ...prev,
          redirect_url: `https://nilservice.net/partenaire/connexion?nom=${data?.nom}`,
      faillure_redirect_url: "https://nilservice.net/page/echec",
      }))
      const res = await registerPartenaireMutation.mutateAsync(data);
      if (res?.status === "payment_pending" && res?.link) {
        window.location.href = res.link;
        alert(
          "Vous allez être redirigé vers le paiement. Veuillez finaliser la transaction."
        );
      }
    } catch (error) {
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
            texte={"  Vous avez deja un compte ? Connectez vous "}
            nomBoutton={"Connectez vous"}
            lien={"/partenaire/connexion"}
          />
          <div className="flex-column gap-3  register-div  ">
            <p>Derniere etape</p>
          </div>
          <section className="row tab-contact mx-md-3">
            <div className="col-12 col-md-10  div-contact ">
              <div className="row">
                <div className="form-contact col-lg-7 col-md-6 col-12 register">
                  <ul>
                    <li>
                      <span> Nom et prenom:</span>
                      {data.nom}
                    </li>
                    <li>
                      <span> Prenom:</span>
                      {data.prenom}
                    </li>
                    <li>
                      {" "}
                      <span>Email:</span>
                      {data.email}
                    </li>
                    <li>
                      {" "}
                      <span>Mot de passe:</span>
                      {data.password}
                    </li>

                    <li>
                      {" "}
                      <span>Telephone</span>
                      {data.telephone}
                    </li>

                    <li>
                      <span> Code du parrain:</span>
                      {data.code_parrain ? data.code_parrain : "Aucun"}
                    </li>
                  </ul>

                  <div className="step">
                    {" "}
                    <a onClick={() => nextStep(1)} className="btn btn-primary">
                      Retour
                    </a>
                    <a className="btn btn-primary" onClick={handleSubmit}>
                      S enregistrer
                    </a>
                  </div>
                </div>

                <div className="col-6 col-lg-5 d-none d-md-inline">
                  <img src={conn} className="w-100 img-register" />
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
