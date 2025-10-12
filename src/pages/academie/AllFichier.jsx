// Importation des dépendances et composants nécessaires
import Footer from "../../components/Footer"; // Pied de page
import "../../assets/css/homepage.css"; // Fichier CSS spécifique à la page
import Form from "react-bootstrap/Form";

import Chat from "../../components/Chat"; // Composant de chat
import Publicite from "../../components/Publicite"; // Composant de publicité
import Redirection from "../../components/Redirection"; // Composant de redirection
import Popup from "../../components/homepage/WarningPopup"; // Composant d'avertissement popup
import { useAppContext } from "../../Contexts/AppProvider"; // Hook pour récupérer le contexte global
import Navbaracademie from "../../components/navbar/Navbaracademie"; // Barre de navigation spécifique
import { useEffect, useState } from "react";
import CardSujetsbiblio from "../../components/academie/CardSujetbiblio"; // Composant des cartes de sujets
import { Modal, Button } from "react-bootstrap"; // Composants Bootstrap pour la modale
import { FaRegCopy, FaCheck } from "react-icons/fa"; // Icône pour copier le code de parrainage
import PayModal from "../../components/academie/PayModal";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import LoaderSujet from "../../components/LoadersCompoments/LoaderSujet";
import { useRef } from "react";
import { toast } from "react-toastify";
const AllFichier = () => {
  // Récupération des données globales depuis le contexte
  const { addFichier, fichier, user } = useAppContext();

  // // État pour gérer l'affichage de la modale de paiement
  const [showPaiement, setShowPaiement] = useState(false);
  // //Etat pour gerer la copie
  const [copied, setCopied] = useState(false);
  // // État pour gérer l'affichage de la modale
  const [showModal, setShowModal] = useState(false);
  // // Fonction pour afficher la modale
  const handleShow = () => setShowModal(true);
  // // Fonction pour fermer la modale
  const handleClose = () => setShowModal(false);
  const handleShowPaiement = () => setShowPaiement(true);
  const handleClosePaiement = () => setShowPaiement(false);
  // Fonction pour copier le code de parrainage dans le presse-papiers
  const handleCopy = () => {
    navigator.clipboard.writeText(user?.code);
    setCopied(true); // Changer l'icône en icône de validation
  };

  useEffect(() => {
    let timer;
    if (copied) {
      timer = setTimeout(() => setCopied(false), 2000);
    }
    return () => clearTimeout(timer);
  }, [copied]);

 

  const [loader, setLoader] = useState(false);

  // États pour stocker les sujets et les filtres appliqués
  const [sujets, setSujets] = useState([]); // Liste des sujets

  const [filters, setFilters] = useState({
    annee: "",
    serie: "",
    matiere: "",
  });
  // Gère les changements de sélection dans les filtres
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  // Filtrage dynamique des sujets selon les critères sélectionnés
  const filteredSujets = useMemo(() => {
    if (fichier) {
      return fichier.filter(
        (sujet) =>
          (filters.annee === "" || sujet.annee === filters.annee) &&
          (sujet.serie === user?.serie) &&
          (filters.matiere === "" || sujet.matiere === filters.matiere)
      );
    }
    return [];
  }, [filters, fichier]);

  const [sujetsUniversites, setSujetsUniversites] = useState([]); // Liste des sujets
  const [filtersUniversites, setFiltersUniversites] = useState({
    annee: "",
    serie: "",
    matiere: "",
  });
  // Gère les changements de sélection dans les filtres des sujets d universités
  const handleFilterUniversites = (e) => {
    setFiltersUniversites({
      ...filtersUniversites,
      [e.target.name]: e.target.value,
    });
  };
  const filteredSujetsUniversites = useMemo(() => {
    if (fichier) {
      return fichier.filter(
        (sujet) =>
          (filters.annee === "" || sujet.annee === filters.annee) &&
          (sujet.serie !== user?.serie) &&
          (filters.matiere === "" || sujet.matiere === filters.matiere)
      );
    }
    return [];
  }, [filtersUniversites, fichier]);

  // Mise à jour des sujets filtrés lorsqu'un filtre change
  useEffect(() => {
    
      setLoader(true);
      setTimeout(() => {
        setSujets(filteredSujets);
        setLoader(false);
      }, 500);
    
  }, [filteredSujets, user]);

  useEffect(() => {
    // setSujetsUniversites(filteredSujetsUniversites);
   
      setLoader(true);
      setSujetsUniversites(filteredSujetsUniversites);
      setTimeout(() => {
        setLoader(false);
      }, 500);
    
  }, [filteredSujetsUniversites,user]);

  useEffect(() => {
    if (fichier) {
      setSujets(
        fichier.filter((sujet) => sujet.serie === user?.serie)
      );
      console.log("fichier",fichier)
      console.log("sujet",sujets)
   
      setSujetsUniversites(
        fichier.filter(
          (sujet) => sujet.serie !== user?.serie
        )
      );}
    
  }, [fichier, user]);

  useEffect(() => {
  console.log("Valeur mise à jour de sujets :", sujets);
}, [sujets]);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/configuration");
  };

  return (
    <div className="general">
      {/* Affichage de la publicité */}
      <Publicite />

      <div className="my-custom-div ">
        {/* Barre de navigation spécifique à l'Académie */}
        <Navbaracademie />

        <section className="">
          {/* Messages de redirection selon le statut de l'utilisateur */}
          {(user?.status == "inscrit"|| user?.status == "expire")  && (
            <Redirection
              texte={
                "Payez votre abonnement et accedez aux sujets offert par Nilservice !!"
              }
              nomBoutton={"Payez"}
              handlClick={handleShowPaiement}
            />
          )}
          {user?.status == "en_attente" && !user?.serie && (
            <Redirection
              texte={"Complétez votre profil pour accéder aux sujets !!"}
              nomBoutton={"Profil"}
              handlClick={handleNavigate}
            />
          )}
          {user?.status == "actif" && (user?.serie) && (
            <>
             <Redirection
                texte={`Salut ${user?.nom}, profitez des sujets offert par NilService et n'oubliez pas que vous pouvez gagner de l'argent en parrainant`}
                nomBoutton={"Parrainez"}
                handlClick={handleShow}
              />
               {user?.type === "élève" &&  sujets && (
                <>
                  <div className="mx-5 mb-4  ">
                     <p className="fw-bold text-muted fs-5 ">
                     Mes sujets
                    </p>
                    <p className="fw-bold text-muted fs-5 ">
                      Filtrez les sujets pour affiner votre recherche :
                    </p>
                    <div className="d-flex flex-wrap gap-3 flex-md-nowrap">
                      {/* Filtre par année */}
                    {loader === false &&  <select
                        name="annee"
                        className="form-select"
                        onChange={handleFilterChange}
                      >
                        <option value="">Toutes les années</option>
                        {[
                          ...new Set(
                            sujets?.map((s) => s.annee)
                          ),
                        ]?.map((annee) => (
                          <option key={annee} value={annee}>
                            {annee}
                          </option>
                        ))}
                      </select>}
                     
                      {/* Filtre par matière */}
                    {loader === false &&  <select
                        name="matiere"
                        className="form-select"
                        onChange={handleFilterChange}
                      >
                        <option value="">Toutes les matières</option>
                        {[
                          ...new Set(
                            sujets?.map((s) => s.matiere)
                          ),
                        ]?.map((matiere) => (
                          <option key={matiere} value={matiere}>
                            {matiere}
                          </option>
                        ))}
                      </select>}
                    </div>
                  </div>

                  {/* Affichage des sujets filtrés */}
                  {loader === false && user && fichier && sujets.length > 0 &&
                    [...new Set(sujets?.map((s) => s.matiere))]?.map(
                      (matiere, index) => (
                        <div className="pt-0 " key={index}>
                          <CardSujetsbiblio
                            ListeSujets={sujets}
                            groupe={matiere}
                          />
                        </div>
                      )
                    )}
                  {loader === true && (
                    <div className="div-loader justify-content-center align-items-center d-flex ">
                      {/* <p>Chargement ...</p> */}
                      <LoaderSujet />
                    </div>
                  )}
                  {/* Message si aucun sujet n'est disponible */}
                  {sujets.length === 0 && (
                    <div className="container card-error">
                      <p className="text-danger">Aucun sujet disponible !!</p>
                    </div>
                  )}
                </>
              )}
              {user?.type === "éleve" &&
                sujets &&
                sujetsUniversites && (
                  <>
                    <div className="mx-5 mb-4">
                       <p className="fw-bold text-muted fs-5 ">
                     Les autres sujets
                    </p>
                      <p className="fw-bold text-muted">
                        Filtrez les sujets pour affiner votre recherche :
                      </p>
                      <div className="d-flex flex-wrap gap-3 flex-md-nowrap">
                        {/* Filtre par session */}
                      {loader === false &&  <select
                          name="session"
                          className="form-select"
                          onChange={handleFilterUniversites}
                        >
                          <option value="">Toutes les sessions</option>
                          {[
                            ...new Set(
                              sujetsUniversites?.map((s) => s.session)
                            ),
                          ]?.map((session) => (
                            <option key={session} value={session}>
                              {session}
                            </option>
                          ))}
                        </select>}
                      
                      {loader === false &&  <select
                          name="matiere"
                          className="form-select"
                          onChange={handleFilterUniversites}
                        >
                          <option value="">Toutes les matières</option>
                          {[
                            ...new Set(
                              sujetsUniversites?.map((s) => s.matiere)
                            ),
                          ]?.map((matiere) => (
                            <option key={matiere} value={matiere}>
                              {matiere}
                            </option>
                          ))}
                        </select>
}
                      </div>
                    </div>

                    {/* Affichage des sujets filtrés */}
                    {loader === true && (
                      <div className="div-loader justify-content-center align-items-center d-flex ">
                        {/* <p>Chargement ...</p> */}
                        <LoaderSujet />
                      </div>
                    )}

                    {loader === false && user && fichier && sujetsUniversites.length > 0 &&
                      [...new Set(sujetsUniversites?.map((s) => s.type))]?.map(
                        (type, index) => (
                          <div className="pt-0" key={index}>
                            <CardSujetsbiblio
                              ListeSujets={sujetsUniversites
                              }
                             
                              groupe={type}
                            />
                          </div>
                        )
                      )}
                    {/* Message si aucun sujet n'est disponible */}
                    {sujetsUniversites.length === 0 && (
                      <div className="container card-error">
                        <p className="text-danger">Aucun sujet disponible !!</p>
                      </div>
                    )}
                  </>
                )}
            </>
          )}
        </section>

        {/* Pied de page, partenaires et chat */}

        <Chat />
        <Footer />
        <Popup />
      </div>

      {/* Modal Parrainage */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Code de Parrainage</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>
            Voici votre code de parrainage. Partagez-le pour inviter d'autres
            personnes !
          </p>
          <div className="d-flex align-items-center border rounded p-2">
            <input
              type="text"
              className="form-control text-center"
              value={user?.code}
              readOnly
            />
            {!copied && (
              <FaRegCopy
                className="ms-2 text-primary"
                style={{ cursor: "pointer" }}
                onClick={handleCopy}
              >
                {/* {copied ? <FaCheck className="text-success" /> : <FaRegCopy className="text-primary" />} */}
              </FaRegCopy>
            )}
            {copied && <FaCheck className="text-success" />}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de paiement  */}
      <PayModal showModal={showPaiement} handleClose={handleClosePaiement} />
    </div>
  );
};

export default AllFichier;
