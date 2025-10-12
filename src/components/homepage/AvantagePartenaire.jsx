import React from "react";
import { FaBullhorn, FaHandshake,FaWallet,FaLightbulb, FaChartLine, FaGraduationCap, FaGift } from "react-icons/fa";
import "../../assets/css/avantageacademy.css"
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import exampleImage from '../../assets/images/action.jpg';
const AvantagePartenaire = () => {
  const avantages = [
    { icon: <FaBullhorn size={27}  />, title: "Promotion", desc: "Faites la promotion de la plateforme et recevez une rémunération." },
    { icon: <FaHandshake size={27}  />, title: "Réunions stratégiques", desc: "Participez aux réunions de l’entreprise et partagez vos idées." },
    { icon: <FaLightbulb size={27}  />, title: "Innovation", desc: "Proposez des idées d’amélioration et d’innovation." },
    { icon: <FaChartLine size={27}  />, title: "Objectifs", desc: "Suivez des objectifs hebdomadaires définis pour votre rôle." },
    { icon: <FaGraduationCap size={27}  />, title: "Formations", desc: "Bénéficiez de formations gratuites pour développer vos compétences." },
     { icon: <FaWallet size={27} />, title: "Abonnement annuel", desc: "1 500 FCFA seulement pour profiter de toutes les fonctionnalités." },
    { icon: <FaGift size={27} />, title: "Parrainage", desc: "Gagnez 500 FCFA pour chaque proche inscrit via votre code promo." },
  ];

   useEffect(() => {
      AOS.init({
        duration: 800, // durée de l’animation (ms)
        once: true, // animation se joue une seule fois
      });
    }, []);
  return (
    <div className="container ">
      <div className="row align-items-center g-5">
        {/* Texte à gauche */}
        <div className="col-lg-6">
          <h2 className="fw-bold mb-3 titre-academy-avantage">Devenez <span>Project Partner</span> avec Nilservice</h2>
          <p className="text-muted mb-4">
            Participez activement à la croissance de la plateforme tout en étant rémunéré et formé.
          </p>
          <div className="row g-4">
            {avantages.map((av, index) => (
              <div key={index}  data-aos="zoom-in"
                data-aos-delay={index * 150}  className="col-6">
                <div className=" icone-academy d-flex flex-column align-items-start">
                  {av.icon}
                  <h5 className="title-academy text-start fw-bold">{av.title}</h5>
                  <p className="text-start text-dark title-academy-desc">{av.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image à droite */}
         <div className="col-lg-6 text-center d-none d-md-block" >
                  <img src={exampleImage}  data-aos="fade-left"
            data-aos-delay="400" style={{marginTop:"-50px",height:"600px"}} alt="Nil Pro" className="img-fluid " />
                </div>
      </div>
    </div>
  );
};

export default AvantagePartenaire;
