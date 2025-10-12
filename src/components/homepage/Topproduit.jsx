


  import React, { useState, useEffect } from "react";
  import "../../assets/css/slide.css";
  import Modals from "../Modals";
  import ProductRating from "./ProductRating";
  import plombier from "../../assets/images/plombier.png";
  import menuiserie from "../../assets/images/menuiserie.png";
  import teacher from "../../assets/images/teacher.png";
  import elec from "../../assets/images/elec.png";
  import { useNavigate } from "react-router-dom";
  const Topproduit = () => {
    const navigate = useNavigate()
      const [currentSection, setCurrentSection] = useState(0); // Section actuelle
      const [imagesPerSection, setImagesPerSection] = useState(4); // Nombre d'images par section
      const images = [//le tableau dimage
          {
              
              label: "Electriciens",//le nom de l/image
              lien: elec,//le lien de l'image
              href:"/prestataire/liste?profession=electricien"

          },
          {
             
              label: "Frigoriste",
              lien: plombier,
              href:"/prestataire/liste?profession=frigoriste"
          },
          {
             
              label: "Menuisiers",
              lien: menuiserie,
              href:"/prestataire/liste?profession=menusier"
          },
          {
              
              label: "Répétiteurs",
              lien: teacher,
              href:"/prestataire/liste?profession=répétiteur"

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
                              onClick={() => (navigate(entry.href))}
                              
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
                                      />
                                  </div>
                              </section>
                              <div className="" style={{ background: "none" }}>
                                  {" "}
                                  <p>{entry.label}</p>
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
  
  export default Topproduit;
  

