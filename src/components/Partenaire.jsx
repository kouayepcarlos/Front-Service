import React from "react";
import "../assets/css/partenaire.css";
import partenaire1 from "../assets/images/partenaire1.jpg";
import syner from "../assets/images/syner.jpeg";


const Partenaire = () => {
  const images = [
    partenaire1,
    syner,
    partenaire1,
    syner,
    partenaire1,
    syner
  ];

  // On duplique les logos pour que le défilement soit infini
  const duplicatedImages = [...images, ...images];

  return (
    <div className="partenaire-marquee">
      <p className="partenaire-title">Nos Partenaires</p>
      <div className="marquee">
        <div className="marquee-content">
          {duplicatedImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`logo partenaire ${index}`}
              className="marquee-logo"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partenaire;
