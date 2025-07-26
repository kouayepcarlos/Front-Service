

  import React, { useState, useEffect } from "react";
  import "../../assets/css/slide.css";
  import Modals from "../Modals";
  import ProductRating from "./ProductRating";
  import img1 from "../../assets/images/img1.jpg";
  import img4 from "../../assets/images/img4.jpg";
  import img3 from "../../assets/images/img3.jpg";
  import meuble from "../../assets/images/meuble.jpg";
  const Topcategorie = () => {
      const [currentSection, setCurrentSection] = useState(0); // Section actuelle
      const [imagesPerSection, setImagesPerSection] = useState(4); // Nombre d'images par section
      const images = [//le tableau dimage
          {
              
              label: "Vêtement",//le nom de l/image
              lien: img3,//le lien de l'image
              prix: 1000,// le prix
          },
          {
             
              label: "Electroménager",
              lien: img1,
              prix: 1000,
          },
          {
             
              label: "Appareils",
              lien: img4,
              prix: 1000,
          },
          {
              
              label: "Meuble",
              lien: meuble,
              prix: 100000,
          },
          
          
      ];
  
      // Mise à jour du nombre d'images par section selon la taille de l'écran
      const updateImagesPerSection = () => {
          if (window.innerWidth < 600) {
              setImagesPerSection(2); // Mobile
          } else if (window.innerWidth < 900) {
              setImagesPerSection(3); // Tablette
          } else {
              setImagesPerSection(4); // Ordinateur
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
  
      const totalSections = Math.ceil(images.length / imagesPerSection);//le nombre de slide
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
                  <div className="images">
                      {visibleImages.map((entry, index) => (
                          <div
                              href=""
                              
                              className={`card-recent`}
                              data-toggle="modal"
                              data-target="#myModal"
                          >
                              <section className="d-flex flex-column  section-modal">
                                  {" "}
                                  <img src={entry.lien} alt="" />{" "}
                                  <div
                                      className=""
                                      style={{ marginTop: "-60px" }}
                                  >
                                      <Modals
                                          texte={entry.label}
                                          img={entry.lien}
                                          desc={entry.label}
                                          prix={entry.prix}
                                      />
                                  </div>
                              </section>
                              <div className="" style={{ background: "none" }}>
                                  {" "}
                                  <p>{entry.label}</p>
                              </div>
                              <div className="">
                                  <p>{entry.prix} FCFA</p>
                              </div>
                          </div>
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
      );
  };
  
  export default Topcategorie;
  