import React, { useEffect } from "react";
import { FaGraduationCap, FaBook, FaComments, FaChalkboardTeacher, FaCoins, FaGift, FaTools } from "react-icons/fa";
import "../../assets/css/avantageacademy.css"
import exampleImage from '../../assets/images/computer.jpg'; 
import AOS from "aos";
import "aos/dist/aos.css";

const AvantageAcademy = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, // durée de l’animation (ms)
      once: true, // animation se joue une seule fois
    });
  }, []);

  const steps = [
    { icon: <FaGraduationCap size={27} />, title: "Anciens sujets", desc: "Accédez aux sujets d’examens des années précédentes." },
    { icon: <FaBook size={27} />, title: "Livres numériques", desc: "Livres selon votre domaine d’étude pour réviser efficacement." },
    { icon: <FaComments size={27} />, title: "Espace discussion", desc: "Échangez avec d’autres élèves de Terminale par série." },
    { icon: <FaChalkboardTeacher size={27} />, title: "Accompagnement", desc: "Professeurs qualifiés pour vous guider tout au long de l’année." },
    { icon: <FaCoins size={27} />, title: "Abonnement", desc: "Accès annuel à tout le contenu pour 1 500 FCFA." },
    { icon: <FaGift size={27} />, title: "Parrainage", desc: "Gagnez 500 FCFA à chaque proche inscrit via votre code promo." },
    { icon: <FaTools size={27} />, title: "Services indépendants", desc: "Accédez à des services adaptés à vos besoins." },
  ];

  return (
    <div className="container ">
      <div className="row align-items-center g-5">
        {/* Texte */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-4 titre-academy-avantage">
            Découvrez les <span>avantages </span> de NilAcademy
          </h2>
          <div className="row g-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className="col-6"
                data-aos="zoom-in"
                data-aos-delay={index * 150} // Décalage progressif
              >
                <div className="d-flex flex-column align-items-start">
                  <div className="mb-2 icone-academy">{step.icon}</div>
                  <h5 className="fw-bold title-academy text-start">{step.title}</h5>
                  <p className="text-start title-academy-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="col-lg-6 text-center d-none d-md-block">
          <img
            src={exampleImage}
            style={{ marginTop: "-50px", height: "500px" }}
            alt="Nil Pro"
            className="img-fluid"
            data-aos="fade-left"
            data-aos-delay="400"
          />
        </div>
      </div>
    </div>
  );
};

export default AvantageAcademy;
