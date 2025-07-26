import React, { useState } from "react";
import "../../assets/css/accordion-pro.css";
import illustration from "../../assets/images/marche.png"; // ton image

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const accordionData = [
    {
      title: "Comment devenir vendeur sur la plateforme Nilservice ?",
      content: `Accédez à l’onglet “S’abonner au niveau du menu” et choisissez l’option “S’abonner comme Vendeur”. Créez votre compte et validez votre profil avec un paiement annuel de 1000F CFA. Le système générera un code potentiel qui vous permettra de générer des revenus.`,
    },
    {
      title: "Comment devenir prestataire sur la plateforme Nilservice ?",
      content: `Choisissez l’option “S’abonner comme Prestataire” Créez votre compte et validez votre profil avec un paiement annuel de 1000F CFA. Le système générera un code potentiel qui vous permettra de générer des revenus sur la plateforme Nilservice`,
    },
    {
      title: "Comment intégrer l’Académie de Nilservices ?",
      content: `Créez votre compte,  Payez la cotisation annuelle de 1000F CFA et connectez-vous à votre espace. Consulter les sujets: Explorez les anciens sujets et échangez avec des amis.`,
    },
    {
      title: "Pourquoi s’abonner sur la plateforme Nilservice ?",
      content: `Pour promouvoir vos services, vos produits à l’échelle nationale et ainsi maximiser ses  revenus, ceci à moindre coût. Elle permet au prestataire de services de mettre son professionnalisme à portée de main des populations à moindre coût.`,
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion-layout">
      <div className="accordion-left">
        {accordionData.map((item, index) => (
          <div
            key={index}
            className={`accordion-item ${activeIndex === index ? "active" : ""}`}
          >
            <button className="accordion-header" onClick={() => toggleAccordion(index)}>
              <span>{item.title}</span>
              <span className="accordion-icon">{activeIndex === index ? "−" : "+"}</span>
            </button>
            <div className="accordion-body">
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="accordion-right">
        <img src={illustration} alt="illustration question" className="accordion-img" />
      </div>
    </div>
  );
};

export default Accordion;
