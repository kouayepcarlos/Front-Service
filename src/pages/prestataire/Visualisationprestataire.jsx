/* eslint-disable react/prop-types */ // Désactive les avertissements ESLint sur les props non typées (à activer en prod)
import "bootstrap/dist/css/bootstrap.min.css"; // CSS Bootstrap pour les composants
import "../../assets/css/prestataire/prestataire.css"; // Styles personnalisés du prestataire
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useParams } from "react-router-dom"; // Récupère les paramètres d’URL (par ex. l'id du prestataire)
import Footer from "../../components/Footer";
import NavBar from "../../components/navbar/NavBar";
import Publicite from "../../components/Publicite";
import Chat from "../../components/Chat";
import Redirection from "../../components/Redirection";
import { useEffect, useState } from "react";
import { useRegister } from "../../Contexts/PrestataireProvider";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const Visualisationprestataire = () => {
  const { PrestataireId, RealisationId } = useRegister();
  const [prestation, setPrestation] = useState();
  const [realisations, setRealisations] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => {
    setShow(false), setShow2(true);
  };
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await PrestataireId.mutateAsync({ id });
        const resultrealisation = await RealisationId.mutateAsync({ id });
        setPrestation(result.data);
        setRealisations(resultrealisation?.data);
        console.log("Résultat :", resultrealisation);
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      } finally {
        setLoading(false); // Désactive le loader
      }
    };

    fetchData();
  }, []); // ou [] si id ne change jamais

  return (
    <div className="general">
      {loading && <LoaderTransparent />}
      <Publicite /> {/* Bandeau de publicité / information générale */}
      <div className="my-custom-div">
        <NavBar /> {/* Barre de navigation principale */}
        <section className="mb-5">
          <Redirection
            texte="Votre satisfaction est notre priorité — découvrez 
nos services"
          />{" "}
          {/* Zone pour un message de redirection personnalisé */}
          {/* Section infos prestataire */}
          <div className="mx-5 pb-5 row">
            <div className="col-lg-6 photo">
              {/* Photo du prestataire */}
              <img src={prestation?.file_url} alt="" className="w-100" />
            </div>

            <div className="col-lg-6 contact-info">
              <p>Nous Contacter</p>
              <ul>
                <li>Nom</li>
                <li>{prestation?.nom}</li>
                <li> Adresse</li>
                <li>
                  {prestation?.pays}, {prestation?.ville} -{" "}
                  {prestation?.quartier}
                </li>
                <li> Profession</li>
                <li>{prestation?.profession}</li>
                <li>Description</li>
                <li>{prestation?.description}</li>
                <br />
                <li>
                  {prestation?.checked === "actif" && (
                    <Button className="btn btn-primary" onClick={handleShow}>
                      Contacter le prestataire
                    </Button>
                  )}
                  <Modal show={show2} onHide={handleClose2} className="Modal">
                    <Modal.Header closeButton>
                      <Modal.Title>Informations Prestataire</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="info-vendeur">
                      <div>
                        {" "}
                        <span>Nom: &nbsp;</span>
                        <p>{prestation?.nom}</p>
                      </div>
                      <div>
                        {" "}
                        <span>Email: &nbsp;</span> <p>{prestation?.email}</p>
                      </div>
                      <div>
                        {" "}
                        <span>Telephone: &nbsp;</span>{" "}
                        <p>{prestation?.telephone}</p>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose2}>
                        Fermer
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Modal show={show} onHide={handleClose} className="Modal">
                    <Modal.Header closeButton>
                      <Modal.Title>AVERTISSEMENT</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="info-vendeur">
                      <p>
                        Toute Transaction qui se fait en dehors de cette
                        plateforme ne nous concerne plus
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        J'acquiesse
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </li>
              </ul>
            </div>
          </div>
          {/* Section des réalisations du prestataire */}
          <div className="mx-5 pb-5 realisation">
            {realisations?.length > 0 && <p>Les réalisations</p>}

            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              loop={realisations?.length > 3} // Boucle le carrousel uniquement si plus de 3 réalisations
              navigation
              // pagination={{ clickable: true }} // Tu peux activer ça si tu veux les points de navigation
              breakpoints={{
                576: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                992: { slidesPerView: 3 },
              }}
              onMouseEnter={() => {
                const swiper = document.querySelector(".swiper").swiper;
                swiper.autoplay.stop(); // Stoppe le défilement auto au survol
              }}
              onMouseLeave={() => {
                const swiper = document.querySelector(".swiper").swiper;
                swiper.autoplay.start(); // Reprend le défilement au départ de la souris
              }}
            >
              {/* Affiche chaque réalisation sous forme de slide */}
              {realisations?.length !== 0 &&
                realisations?.map((realisation) => (
                  <SwiperSlide key={realisation?.id}>
                    <div className="card sujet-card">
                      <img
                        src={realisation?.file_url}
                        className="card-img-top"
                        alt={realisation?.title}
                      />
                      <div className="card-body d-flex flex-column text-dark">
                        <h5 className="card-title">{realisation?.title}</h5>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </section>
        {/* Composants de fin de page */}
        <Chat />
        <Footer />
      </div>
    </div>
  );
};

export default Visualisationprestataire;
