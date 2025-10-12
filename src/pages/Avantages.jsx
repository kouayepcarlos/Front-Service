import Footer from "../components/Footer";
import NavBar from "../components/navbar/NavBar";
import Publicite from "../components/Publicite";
import "../assets/css/connexion.css";
import "../assets/css/homepage.css";
import "../assets/css/avantage.css";
import Chat from "../components/Chat";
import { useState } from "react";
import Redirection from "../components/Redirection";
import "../assets/css/accordion-pro.css"

const Avantage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const avantagesData = [
    {
      titre: "Vendeur",
      sousTitre: "1. Pour un Vendeur (quelqu’un qui a une boutique ou vend des produits)",
      items: [
        "Ouverture d’une boutique en ligne sur la plateforme",
        "Publication facile de ses produits ou services",
        "Accompagnement par Nilservice pour la communication et la visibilité",
        "Accès à un réseau de clients potentiels",
        "Possibilité de gagner de l’argent grâce à un code de parrainage",
        "Abonnement annuel abordable : 2 000 FCFA",
      ],
    },
    {
      titre: "Prestataire",
      sousTitre: "2. Pour un Prestataire (quelqu’un qui a une compétence ou une expertise)",
      items: [
        "Création d’un profil professionnel visible dans un catalogue digital",
        "Affichage de ses coordonnées, quartier, compétences et spécialités",
        "Possibilité de poster ses réalisations passées (photos, témoignages, etc.)",
        "Visibilité auprès de clients cherchant des prestataires fiables",
        "Espace de promotion personnalisé de son savoir-faire",
        "Revenu complémentaire via le code de parrainage",
        "Abonnement annuel accessible : 2 000 FCFA",
      ],
    },
    {
      titre: "Élève",
      sousTitre: "3. Pour un Élève",
      items: [
        {
          sousSousTitre: "Accès à une bibliothèque numérique avec :",
          sousItems: [
            "Des fascicules d’anciens sujets",
            "Des livres numériques achetés et mis en ligne par Nilservice",
            "Des sujets d’autres établissements disponibles sans barrière",
            "Espace chat pour échanger avec d’autres élèves de ma serie",
            "Assistants virtuels pour l’aider dans ses matières principales",
          ],
        },
         {
      sousSousTitre: "Abonnement annuel très réduit : 1 500 FCFA",
      sousItems: [], // Aucun sous-item pour cet élément
    },
      ],
    },
    {
      titre: "Étudiant",
      sousTitre: "4. Pour un Étudiant",
      items: [
        "Même accès que les élèves, mais adapté aux besoins académiques supérieurs",
        "Consultation de sujets universitaires et livres numériques liés à sa filière",
        "Ressources mutualisées entre établissements",
        "Support intelligent",
        "Abonnement annuel : 1 500 FCFA",
      ],
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="general">
      <Publicite />
      <div className="my-custom-div">
        <NavBar />
        <section className="mb-5">
          <Redirection
            texte="Vous n'avez pas de compte? Inscrivez vous et devenez notre partenaire"
            nomBoutton="Créer votre compte"
            lien="/page/inscription"
          />

          <section className="row tab-contact mx-md-3 avantage-div">
            <h3 className="avantage-h3">
              Avantages de s’abonner sur la plateforme
            </h3>

            <div className="accordion-layout">
              <div className="accordion-left">
                {avantagesData.map((item, index) => (
                  <div
                    key={index}
                    className={`accordion-item ${
                      activeIndex === index ? "active" : ""
                    }`}
                  >
                    {/* Header */}
                    <button
                      className="accordion-header"
                      onClick={() => toggleAccordion(index)}
                    >
                      <span>{item.sousTitre}</span>
                      <span className="accordion-icon">
                        {activeIndex === index ? "−" : "+"}
                      </span>
                    </button>

                    {/* Corps de l'accordéon */}
                    {activeIndex === index && (
                      <div className="accordion-body ">
                        <ul className="avantage-div">
                          {item.items.map((subItem, subIndex) => {
                            if (typeof subItem === "string") {
                              return <li key={subIndex}>{subItem}</li>;
                            }
                            return (
                              <li key={subIndex}>
                                <strong>{subItem.sousSousTitre}</strong>
                                {subItem.sousItems && (
                                  <ul className="asterix">
                                    {subItem.sousItems.map(
                                      (sous, sousIndex) => (
                                        <li key={sousIndex}>{sous}</li>
                                      )
                                    )}
                                  </ul>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
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

export default Avantage;
