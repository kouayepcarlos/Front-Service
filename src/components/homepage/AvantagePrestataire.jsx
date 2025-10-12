import React, { useState, useEffect } from "react";
import "../../assets/css/avantageprestataire.css";
import AOS from "aos";
import "aos/dist/aos.css";

import exampleImage from "../../assets/images/auger.jpg"; 
import {
  FaChartLine,
  FaClipboardList,
  FaCoins,
  FaGift,
  FaPaintBrush,
  FaLock,
  FaStar,
  FaSearch,
  FaComments,
  FaMoneyBillWave,
} from "react-icons/fa";

const AvantagePrestataire = () => {
  const steps = [
    {
      icon: <FaSearch size={32} />,
      title: "Choisissez",
      desc: "Parcourez notre réseau de professionnels qualifiés et sélectionnez celui qui correspond le mieux à vos besoins et votre localisation.",
    },
    {
      icon: <FaComments size={30} />,
      title: "Discutez",
      desc: "Communiquez directement avec le prestataire pour clarifier les détails du travail et convenir de la meilleure approche pour votre projet.",
    },
    {
      icon: <FaMoneyBillWave size={30} />,
      title: "Paiement",
      desc: "Payez uniquement une fois le service rendu par le prestataire.",
    },
    {
      icon: <FaStar size={30} />,
      title: "Évaluez",
      desc: "Laissez votre avis et évaluez le prestataire pour aider la communauté et améliorer la qualité des services proposés.",
    },
  ];

  const advantages = [
    {
      icon: <FaChartLine size={27} />,
      title: "Trouvez des clients",
      desc: "Nilservice vous aide à trouver des clients rapidement et facilement.",
    },
    {
      icon: <FaClipboardList size={27} />,
      title: "Catalogue digital",
      desc: "Votre nom, votre quartier et vos contacts sont affichés dans un catalogue digital par métier.",
    },
    {
      icon: <FaPaintBrush size={27} />,
      title: "Valorisation",
      desc: "Une équipe vous met en valeur à travers des supports visuels et promotions en ligne.",
    },
    {
      icon: <FaLock size={27} />,
      title: "Paiement sécurisé",
      desc: "Recevez votre paiement uniquement après réalisation du travail.",
    },
    {
      icon: <FaStar size={27} />,
      title: "Évaluation",
      desc: "Les clients évaluent vos services pour vous aider à gagner en crédibilité.",
    },
    {
      icon: <FaCoins size={27} />,
      title: "Abonnement",
      desc: "Accès annuel à tout le contenu pour 2 000 FCFA.",
    },
    {
      icon: <FaGift size={27} />,
      title: "Parrainage",
      desc: "Gagnez 500 FCFA à chaque proche inscrit via votre code promo.",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const [activeStep, setActiveStep] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(false);
    const timer = setTimeout(() => setFade(true), 50);
    return () => clearTimeout(timer);
  }, [activeStep]);

  return (
    <section className="container ">
      <div className="row align-items-center g-4">
        {/* Colonne texte */}
        <div className="col-lg-6">
          <h2 className="mb-4 fw-bold titre-academy-avantage">
            Choisissez <span>un professionnel</span> pour vos travaux
          </h2>
          <p className="mb-4 text-muted">
            Nous vous mettons en relation avec des professionnels qualifiés,
            proches de chez vous, pour tous vos besoins.
          </p>

          <p className="fw-bold mb-3">Comment ça marche ?</p>
          <br />

          {/* Étape active */}
          <div
            className={`row  step-description mb-4 ${
              fade ? "fade-in" : "fade-out"
            }`}
          >
            <div className="col-2 col-lg-1 text-start my-auto">{steps[activeStep].icon}</div>
            <div className="col-10  col-lg-11  text-start">
              <h5 className="fw-bold">{steps[activeStep].title}</h5>
              <p className="text-muted activestep-des">
                {steps[activeStep].desc}
              </p>
            </div>
          </div>

          {/* Stepper */}
          <div className="d-flex align-items-center mb-4 position-relative stepper-container">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div
                  className={`step-circle d-flex align-items-center justify-content-center cursor-pointer 
                    ${
                      index < activeStep
                        ? "completed"
                        : activeStep === index
                        ? "active"
                        : ""
                    }`}
                  onClick={() => setActiveStep(index)}
                >
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`step-line flex-grow-1 ${
                      index < activeStep ? "completed-line" : ""
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>

          <br />
          <br />

          {/* Avantages */}
          <div className="row g-3 avantages-prest">
            {advantages.map((adv, index) => (
              <div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 150}
                className="col-6 col-md-3 col-sm-4"
              >
                <div className="d-flex flex-column align-items-start ">
                  <div className="mb-2 icone-academy">{adv.icon}</div>
                  <h5 className="fw-bold title-academy text-start">
                    {adv.title}
                  </h5>
                  <p className="text-start title-academy-desc">{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne image */}
        <div className="col-lg-6 text-center d-none d-md-block">
          <img
            src={exampleImage}
            data-aos="fade-left"
            data-aos-delay="400"
            style={{ marginTop: "-400px" }}
            alt="Nil Pro"
            className="img-fluid "
          />
        </div>
      </div>
    </section>
  );
};

export default AvantagePrestataire;
