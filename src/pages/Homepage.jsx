import Footer from "../components/Footer";
import NavBar from "../components/navbar/NavBar";
import "../assets/css/homepage.css";
import "animate.css";
import Accordion from "../components/homepage/Accordion";
import Partenaire from "../components/Partenaire";
import AvantageAcademy from "../components/homepage/AvantageAcademy";
import AvantageMarket from "../components/homepage/AvantageMarket";
import AvantagePartenaire from "../components/homepage/AvantagePartenaire";
import AvantagePrestataire from "../components/homepage/AvantagePrestataire";
import Recent from "../components/homepage/Recent";
import Chat from "../components/Chat";
import Publicite from "../components/Publicite";
import Redirection from "../components/Redirection";
import Popup from "../components/homepage/WarningPopup";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { authAPIadmin } from "../fecths/fecthAdmin";
import img4 from "../assets/images/tech4.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBook,FaShoppingCart, FaHandshake,FaClipboardList} from "react-icons/fa";

const Homepage = () => {
  const [etat, setEtat] = useState("academy");
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .post("https://api.nilservice.net/api/increment-visitor")
      .then((res) => setCount(res.data.count))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const valeur = async () => {
      const data1 = await authAPIadmin.allAcademyemail();
      const data2 = await authAPIadmin.allPartenairesemail();
      console.log(data1, data2);
    };
    valeur();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const changeEtat = (etats) => {
    setEtat(etats);
  };
  const donnees = {
    academy: {
      lien: <AvantageAcademy />,
    },
    product: {
      lien: <AvantageMarket />,
    },
    service: {
      lien: <AvantagePrestataire />,
    },
    partenaire: {
      lien: <AvantagePartenaire />,
    },
  };
  const navigate = useNavigate();
  return (
    <div className="general">
      <Publicite />
      <div className="my-custom-div">
        <NavBar />
        <section className="mb-3 ">
          <div className="flex-column gap-2 pt-0 pb-3 espace-home body-na  body-back  ">
            {/* <p >{"Mettez en valeur vos services ou produits sur Nilservice"}</p>
     { <button className="butt1 ">
        
           <span className="creerCompte px-1" style={{color:"white"}}>{`Nombre de visiteurs : ${count}`}</span>
        
      </button>} */}

            <section className="container pt-5 pt-md-0">
              <div className="row align-items-center g-4 ">
                <div className="col-lg-7 animate__animated  animate__backInLeft ">
                  <h1 className="fw-bold display-5">
                    Bienvenue sur{" "}
                    <span
                      style={{
                        color: "#ef8f0a",
                        fontStyle: "italic",
                        fontFamily: "Montserrat",
                      }}
                    >
                      Nilservice
                    </span>
                  </h1>
                  <p className="text-start mt-3 long-text">
                    Une plateforme pensée par des jeunes, pour accompagner
                    toutes les générations vers l’excellence : académique,
                    professionnelle et commerciale. Ici, nous mettons en valeur
                    vos compétences, savoir-faire et ambitions, pour vous aider
                    à réussir dans tous les domaines.
                  </p>

                  <div className="d-flex gap-3 mt-4 flex-wrap">
                    <a
                      href="/page/inscription"
                      className="btn btn-primary btn-md"
                    >
                      S'abonner
                    </a>
                    <a
                      href="/avantage"
                      className="btn btn-outline-primary btn-md"
                    >
                      Les avantages de NilService
                    </a>
                  </div>

                  <div className="d-flex align-items-center gap-2 mt-4 fs-5">
                    {/* <span role="img" aria-label="visiteurs">👀</span> */}
                    <small className="text-muted">
                      +{" "}
                      <span className="fs-4" style={{ color: "#ef8f0a", fontWeight: "bolder" ,fontStyle: "italic",
                        fontFamily: "Montserrat",}}>
                        {" "}
                        {count}{" "}
                      </span>{" "}
                      visiteurs sur la plateforme
                    </small>
                  </div>
                </div>

                <div className="col-lg-5 d-none d-md-block ">
                  <img
                    src={img4}
                    alt=""
                    className="img-visiteur animate__animated animate__backInRight animate__delay-1s"
                  />
                </div>
              </div>
            </section>
          </div>

          <section className="about-home espace-home">
            <div className="about-text">
              <span className="fw-bold  " data-aos="fade-up">
                {" "}
                Nilservice, tout pour vous simplifier la vie
              </span>
              <h3 className="nilservice-presentation">
                Nilservice est une plateforme numérique Camerounaise, conçue
                pour favoriser l’entrepreneuriat, améliorer l’accès aux services
                et produits localement, et soutenir la réussite académique de la
                jeunesse Camerounaise.
              </h3>

              <h3 className="nilservice-presentation2">
                Nous proposons plusieurs services
              </h3>
              <div className="nilservice-presentation3">
                <ul className="row gy-3">
                  <li
                    data-aos="fade-up"
                    data-aos-delay="0"
                    className="col-6"
                    onClick={() => {
                      navigate("connexion/academie");
                    }}
                  >
                   <span><small><FaBook size={22} /></small>
                   NilAcademy</span>
                  </li>
                  <li
                    data-aos="fade-up"
                    data-aos-delay="100"
                     className="col-6"
                    onClick={() => {
                      navigate("vendeur/liste");
                    }}
                  >
                    <span>
                      <small> <FaShoppingCart size={22} /></small>NilMarket</span>
                  </li>
                  <li
                    data-aos="fade-up"
                    data-aos-delay="200"
                     className="col-6"
                    onClick={() => {
                      navigate("prestataire/liste");
                    }}
                  >
                    <span>
                    <small>  <FaClipboardList size={22}/></small>
                      NilPro</span>
                  </li>
                  <li
                    data-aos="fade-up"
                    data-aos-delay="300"
                     className="col-6"
                    onClick={() => {
                      navigate("partenaire/connexion");
                    }}
                  >
                    <span>
                      <small>  <FaHandshake size={22}/></small>
                       NilTeam</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="about-image prof-image"></div>
          </section>

          <div className="container espace-home">
            <h2 className="se  mb-4 tire-prestation">
              Nos differentes prestations
            </h2>
            <Recent onChangeEtat={changeEtat} />
          </div>

          <div>
            <Redirection
              texte={
                "Publicité autorisée. Veuillez noter que seules les transactions liées aux abonnements sont autorisées sur cette plateforme."
              }
            />
          </div>
          <section className="about-home espace-home" id="about-section">
            {donnees[etat].lien}

            {/* <div className="about-image prof-image"></div> */}
          </section>

          <div className=" espace-home">
            <div className="flex-column gap-3 py-4 abonnement espace-abonnement  bg-primary">
              <p>
                Des services indépendants à votre portée, rejoignez la
                communauté Nilservice dès maintenant!
              </p>
              <button style={{ backgroundColor: "white" }}>
                <a className="espace-a" href="/page/inscription">
                  S’abonner
                </a>
              </button>
            </div>
          </div>

          <section className="faq espace-home">
            <div className="faq-text">
              <h3 className="comment">Comment ça marche</h3>
              <Accordion />
            </div>
          </section>
        </section>

        <Partenaire />
        <Chat />
        <Footer />
        <Popup />
      </div>
    </div>
  );
};

export default Homepage;
