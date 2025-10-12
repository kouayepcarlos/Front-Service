import React from "react";
import { FaShoppingCart, FaUsers, FaBullhorn, FaPaintBrush, FaWallet, FaGift } from "react-icons/fa";
import "../../assets/css/avantageacademy.css"
import exampleImage from '../../assets/images/hand.jpg'; // remplace par ton image
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const AvantageMarket = () => {
  const avantages = [
    { icon: <FaShoppingCart size={27} />, title: "Boutique en ligne", desc: "Créez votre propre boutique et publiez vos articles à vendre." },
    { icon: <FaUsers size={27}  />, title: "Contact direct", desc: "Soyez contacté directement par les clients intéressés." },
    { icon: <FaBullhorn size={27}  />, title: "Promotion gratuite", desc: "La plateforme fait la publicité de vos produits sur les réseaux sociaux." },
    { icon: <FaPaintBrush size={27}  />, title: "Support marketing", desc: "Une équipe de designers et community managers valorise vos articles." },
    { icon: <FaWallet size={27} />, title: "Abonnement annuel", desc: "2 000 FCFA seulement pour profiter de toutes les fonctionnalités." },
    { icon: <FaGift size={27} />, title: "Parrainage", desc: "Gagnez 500 FCFA pour chaque personne inscrite via votre code promo." },
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
          <h2 className="fw-bold mb-3 titre-academy-avantage"><span>Boostez vos ventes </span> avec NilMarket</h2>
          <p className="text-muted mb-4">
            Publiez vos produits, atteignez de nouveaux clients et bénéficiez d’un accompagnement complet.
          </p>
          <div className="row g-4">
            {avantages.map((av, index) => (
              <div key={index}  data-aos="zoom-in"
                data-aos-delay={index * 150}  className="col-6">
                <div className="d-flex flex-column align-items-start icone-academy">
                  {av.icon}
                  <h5 className="fw-bold text-start title-academy">{av.title}</h5>
                  <p className="text-start text-dark title-academy-desc">{av.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image à droite */}
         <div className="col-lg-6 text-center d-none d-md-block" >
                          <img src={exampleImage}  data-aos="fade-left"
            data-aos-delay="400" style={{marginTop:"-50px",height:"500px"}} alt="Nil Pro" className="img-fluid " />
                        </div>
      </div>
    </div>
  );
};

export default AvantageMarket;
