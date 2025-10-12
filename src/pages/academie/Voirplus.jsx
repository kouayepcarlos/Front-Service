import React, { useState, useEffect } from "react";
import "../../assets/css/slide.css";
import Publicite from "../../components/Publicite";
import Redirection from "../../components/Redirection";
import Footer from "../../components/Footer";
import NavBar from "../../components/navbar/NavBar";
import "../../assets/css/souscrit.css";
import Chat from "../../components/Chat";
import "../../assets/css/homepage.css";
import "../../assets/css/voirplus.css";

const Voirplus = () => {
  const [currentSection, setCurrentSection] = useState(0); // Section actuelle
  const [imagesPerSection, setImagesPerSection] = useState(4); // Nombre d'images par section
  const images = [
    { bgClass: "bgimg", label: "Vêtementt" },
    { bgClass: "bgimg4", label: "Electroménager" },
    { bgClass: "bgimg1", label: "Appareils" },
    { bgClass: "bgimg5", label: "Chaussures" },
    { bgClass: "bgimg", label: "Vêtement" },
    { bgClass: "bgimg4", label: "Electroménager" },
    { bgClass: "bgimg1", label: "Appareils" },
    { bgClass: "bgimg5", label: "Chaussures" },
    { bgClass: "bgimg", label: "Vêtementt" },
    { bgClass: "bgimg4", label: "Electroménager" },
    { bgClass: "bgimg1", label: "Appareils" },
    { bgClass: "bgimg5", label: "Chaussures" },
    { bgClass: "bgimg", label: "Vêtement" },
    { bgClass: "bgimg4", label: "Electroménager" },
    { bgClass: "bgimg1", label: "Appareils" },
    { bgClass: "bgimg5", label: "Chaussures" },
  ];

  const getGridColumns = () => {
    if (imagesPerSection === 12) return "repeat(4, 1fr)"; // 4 colonnes
    if (imagesPerSection === 9) return "repeat(3, 1fr)"; // 3 colonnes
    if (imagesPerSection === 6) return "repeat(2, 1fr)"; // 2 colonnes
    return "repeat(1, 1fr)"; // 1 colonne par défaut
  };

  // Mise à jour du nombre d'images par section selon la taille de l'écran
  const updateImagesPerSection = () => {
    if (window.innerWidth < 600) {
      setImagesPerSection(6); // Mobile
    } else if (window.innerWidth < 900) {
      setImagesPerSection(9); // Tablette
    } else {
      setImagesPerSection(12); // Ordinateur
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

  const totalSections = Math.ceil(images.length / imagesPerSection);
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
    <div className="general">
      <Publicite />
      <div className="my-custom-div">
        <NavBar />
        <section className="mb-5  ">
          <Redirection
            texte={`Hello Marie ,consultons les anciens sujets de ta filiere`}
            nomBoutton={"Parrainez un ami"}
            lien={""}
          />
             <h2 className="ml-5  mb-4">CC</h2>
          <div className="slider-container">
       
            <div className="image-wrapper">
              <div
                className="images"
                style={{
                  display: "grid",
                  gridTemplateColumns: getGridColumns(),
                  gap: "25px",
                }}
              >
               
                {visibleImages.map((entry, index) => (
                  <a
                    href=""
                    style={{ border: "none" }}
                    className={`card ${entry.bgClass}`}
                  >
                    <div
                      className="card-body"
                      style={{ background: "none" }}
                    ></div>
                    <div className="card-header">
                      <p>{entry.label}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="navigation-buttons">
              {Array.from({ length: totalSections }).map((_, index) => (
                <button
                  key={index}
                  className={`nav-btn ${
                    currentSection === index ? "active" : ""
                  }`}
                  onClick={() => goToSection(index)}
                ></button>
              ))}
            </div>
          </div>
        </section>
        <Chat />
        <Footer />
      </div>
    </div>
  );
};

export default Voirplus;
