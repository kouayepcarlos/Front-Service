import React, { useState } from "react";
import "../../assets/css/accordion-pro.css";
import illustration from "../../assets/images/marche.png"; // ton image
import { useNavigate } from "react-router-dom";

const Accordion = () => {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(null);

  const accordionData = [
    {
      title: "Prêt à vendre en ligne ? Rejoignez Nilservice dès maintenant !",
      content: ` 1. Rendez-vous dans le menu et cliquez sur « S’abonner »
 2. Choisissez l’option « S’abonner comme Vendeur »
 3. Créez votre compte et payez 2 000 FCFA pour valider votre profil (abonnement annuel)
 4. Ouvrez votre boutique en ligne directement sur la plateforme
 5. Publiez facilement vos produits ou services
 6. Profitez de notre accompagnement en communication pour booster votre visibilité
 7. Recevez un code de parrainage et gagnez de l’argent en invitant d’autres utilisateurs

Nilservice, c’est plus qu’une vitrine : c’est un vrai coup de pouce pour faire grandir votre activité !`,
    },
    {
      title: "Vous avez une compétence ? Faites-la connaître avec Nilservice !",
      content: ` Devenez Prestataire sur notre plateforme et valorisez votre savoir-faire auprès d’un large public grâce à un catalogue digital personnalisé !

Comment faire ?

 1. Choisissez l’option « S’abonner comme Prestataire »
 2. Créez votre compte en quelques minutes
 3. Validez votre profil avec un paiement annuel de 2 000 FCFA
 4. Publiez vos réalisations passées pour montrer la qualité de votre travail
 5. Votre profil inclura : votre nom, contact, quartier et les services que vous proposez
 6. Recevez un code de parrainage et gagnez de l’argent en invitant d’autres personnes

Avec Nilservice, vos compétences ne passent plus inaperçues.

Faites-vous connaître, attirez de nouveaux clients, et développez votre activité !`,
    },
    {
      title: " Comment intégrer NilAcademy ?",
      content: ` 1. Crée ton compte
 2. Paye un abonnement annuel de seulement 1 500 FCFA
 3. Connecte-toi à ton espace personnel
 4. Accède à une bibliothèque numérique complète :
     •Fascicules d’anciens sujets achetés par Nilservice
    •Livres numériques mis en ligne 
     •Sujets de première, deuxième… séquence de plusieurs établissements accessibles sans restriction
 5. Discute et échange avec les autres élèves de ta filière grâce à un espace chat dédié
 6. Reçois l’aide de deux assistants virtuels dans tes matières de spécialité

 Avec NilAcademy, tu n’étudies plus seul : tu accèdes à des ressources précieuses, tu échanges avec d’autres apprenants, et tu te prépares efficacement pour réussir !

Rejoins NilAcademy dès maintenant et booste ta réussite scolaire !`,
    },
    {
      title: "Pourquoi s’abonner sur la plateforme Nilservice ?",
      lien: "/avantage",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion-layout">
      <div className="accordion-left">
        {accordionData.map((item, index) => (<>
         {!item.lien && <div
            key={index}
            className={`accordion-item ${activeIndex === index ? "active" : ""}`}
          >
            <button className="accordion-header" onClick={() => toggleAccordion(index)}>
              <span>{item.title}</span>
              <span className="accordion-icon">{activeIndex === index ? "−" : "+"}</span>
            </button>
            <div className="accordion-body" style={{whiteSpace: 'pre-line' }}>
              <p>{item.content}</p>
            </div>
          </div>}

          {item.lien && <div
            key={index}
            className={`accordion-item ${activeIndex === index ? "active" : ""}`}
          >
            <button className="accordion-header" onClick={() =>navigate(item.lien)}>
              <span>{item.title}</span>
              <span className="accordion-icon">{activeIndex === index ? "−" : "+"}</span>
            </button>
            
          </div>
          }</>
        ))}
      </div>
      <div className="accordion-right">
        <img src={illustration} alt="illustration question" className="accordion-img" />
      </div>
    </div>
  );
};

export default Accordion;
