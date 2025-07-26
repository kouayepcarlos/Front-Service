
import Footer from "../../components/Footer";
import Navbaracademie from "../../components/navbar/Navbaracademie";
import Publicite from "../../components/Publicite";
import "../../assets/css/connexion.css";
import Chat from "../../components/Chat";
import conn from "../../assets/images/connexion.jpg";
import Redirection from "../../components/Redirection";
const PasseOublie = () => {
  return (
    <div className="general">
      <Publicite />
      <div className="my-custom-div">
        <Navbaracademie />
        <section className="mb-5  ">
          <Redirection
            texte={
              "  Vous avez deja un compte ? Connectez vous et consultez les sujets"
            }
            nomBoutton={"Créer votre compte"}
            lien={""}
          />

          <section className="row tab-contact mx-md-3">
            <div
              className="col-12 col-md-10  div-contact "
              style={{ margin: "auto", borderRadius: "10px" }}
            >
              <div className="row">
                {" "}
                <div className="col-6 d-none d-md-inline">
                  <img
                    style={{
                      borderRadius: "10px",
                      height: "400px",
                      objectFit: "cover",
                    }}
                    src={conn}
                    className="w-100"
                  />
                </div>
                <div className="form-contact col-md-6 col-12">
                  <form>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Numéro Téléphone </label>
                      <input
                        type="texte"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Entrez votre numéro"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Nom Utilisateur</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Entrez votre nom utilisateur"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                    Retrouver mon passe                    </button>
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
};

export default PasseOublie;
