import React, { useState, useEffect } from "react";
import "../../assets/css/slide.css";
import Modals from "../Modals";
import img1 from "../../assets/images/img1.jpg";
import img4 from "../../assets/images/img4.jpg";
import img3 from "../../assets/images/img3.jpg";
import img10 from "../../assets/images/img10.jpg";
import meuble from "../../assets/images/meuble.jpg";
const Recent = ({onChangeEtat}) => {
   const handleClick = (nouvelEtat) => {
    onChangeEtat(nouvelEtat); // change l'état dans Homepage
    document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
  };
  const [currentSection, setCurrentSection] = useState(0); // Section actuelle
  const [imagesPerSection, setImagesPerSection] = useState(2); // Nombre d'images par section
  const images = [
    //le tableau dimage
    {
      label: "NilAcademy", //le nom de l/image
      lien: img4, //le lien de l'image
      href: "academy",
      texte:"NilAcademy est un espace numérique dédié aux étudiants et aux élèves des classes de Terminale."
    },
    {
      label: "NilMarket",
      lien: img1,
      href: "product",
        texte:"NilMarket est un espace conçu pour aider tous les vendeurs à toucher un large public."
    },
    {
      label: "NilPro",
      lien: meuble,
      href: "service",
        texte:"Tu as une expertise dans un domaine ? NilPro est l’espace idéal pour mettre en valeur tes compétences, quel que soit ton secteur (plomberie, menuiserie, électricité, coiffure, etc.)"
    },
    {
      label: "Project partner",
      lien: img10,
      href: "partenaire",
        texte:"Cet espace est dédié à tous les jeunes souhaitant devenir partenaires de Nilservice."
    },
  ];

  // Mise à jour du nombre d'images par section selon la taille de l'écran
  const updateImagesPerSection = () => {
    if (window.innerWidth < 800) {
      setImagesPerSection(1); // Mobile
    } else if (window.innerWidth < 900) {
      setImagesPerSection(2); // Tablette
    } else {
      setImagesPerSection(2); // Ordinateur
    }
    setCurrentSection(0);
  };

  useEffect(() => {
    updateImagesPerSection(); // Initialisation
    window.addEventListener("resize", updateImagesPerSection); // Écoute les changements de taille d'écran

    return () => {
      window.removeEventListener("resize", updateImagesPerSection); // Nettoyage
    };
  }, []);

  const totalSections = Math.ceil(images.length / imagesPerSection); //le nombre de slide
  const visibleImages = images.slice(
    currentSection * imagesPerSection,
    (currentSection + 1) * imagesPerSection
  );

  // Gestion des clics sur les boutons de navigation
  const goToSection = (index) => {
    if (index >= 0 && index < totalSections) {
      setCurrentSection(index);
    }
  };

  return (
    <div className="slider-container">
      <div className="image-wrapper">
        <div className="imagess">
          {visibleImages.map((entry, index) => (
            <div
              key={index}
              href=""
              className={`card-recent`}
              data-toggle="modal"
              data-target="#myModal"
            >
              <section className="d-flex flex-column  section-modal">
                {" "}
                <img src={entry.lien} alt="" />{" "}
              </section>
              <div className="titre-produit" style={{ background: "none" }}>
                {" "}
                <p>{entry.label}</p>
              </div>
               <div className="texte-produit" style={{ background: "none" }}>
                {" "}
                <p>{entry.texte}</p>
              </div>
              <div className="lien-produit">
                <a onClick={()=>handleClick(entry.href)}>Voir plus</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="navigation-buttons">
        {Array.from({ length: totalSections }).map((_, index) => (
          <button
            key={index}
            className={`nav-btn ${currentSection === index ? "active" : ""}`}
            onClick={() => goToSection(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Recent;
