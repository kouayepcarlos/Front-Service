// Importation des dépendances et composants nécessaires
import Footer from "../../components/Footer"; // Pied de page
import "../../assets/css/homepage.css"; // Fichier CSS spécifique à la page

import Chat from "../../components/Chat"; // Composant de chat
import Publicite from "../../components/Publicite"; // Composant de publicité
import Redirection from "../../components/Redirection"; // Composant de redirection
import Popup from "../../components/homepage/WarningPopup"; // Composant d'avertissement popup
import { useAppContext } from "../../Contexts/AppProvider"; // Hook pour récupérer le contexte global
import Navbaracademie from "../../components/navbar/Navbaracademie"; // Barre de navigation spécifique
import { useEffect, useState } from "react";
import CardSujets from "../../components/academie/CardSujet"; // Composant des cartes de sujets
import { Modal, Button } from "react-bootstrap"; // Composants Bootstrap pour la modale
import { FaRegCopy, FaCheck } from "react-icons/fa"; // Icône pour copier le code de parrainage
import PayModal from "../../components/academie/PayModal";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import LoaderSujet from "../../components/LoadersCompoments/LoaderSujet";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";

const HomeAcademy = () => {
  // Récupération des données globales depuis le contexte
  const {
    listeSujets,
    user,
    listeSujetsUniversites,
    isLoadingSujet,
    isLoadingUniv,
  } = useAppContext();

  // État pour gérer l'affichage de la modale de paiement
  const [showPaiement, setShowPaiement] = useState(false);
  //Etat pour gerer la copie
  const [copied, setCopied] = useState(false);
  // État pour gérer l'affichage de la modale
  const [showModal, setShowModal] = useState(false);
  // Fonction pour afficher la modale
  const handleShow = () => setShowModal(true);
  // Fonction pour fermer la modale
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
useEffect(()=>{console.log("hello",listeSujetsUniversites)},[listeSujetsUniversites])
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
    if (listeSujets) {
      return listeSujets.listeSujets.filter(
        (sujet) =>
          (filters.annee === "" || sujet.annee === filters.annee) &&
          sujet.serie === user?.serie &&
          (filters.matiere === "" || sujet.matiere === filters.matiere)
      );
    }
    return [];
  }, [filters, listeSujets]);

  const [sujetsUniversites, setSujetsUniversites] = useState([]); // Liste des sujets
  const [filtersUniversites, setFiltersUniversites] = useState({
    matiere: "",
    session: "",
    filiere: "",
  });
  // Gère les changements de sélection dans les filtres des sujets d universités
  const handleFilterUniversites = (e) => {
    setFiltersUniversites({
      ...filtersUniversites,
      [e.target.name]: e.target.value,
    });
  };
  const filteredSujetsUniversites = useMemo(() => {
    if (listeSujetsUniversites) {
      return listeSujetsUniversites.data.filter(
        (sujet) =>
          (filtersUniversites.session === "" ||
            sujet.session === filtersUniversites.session) &&
          sujet.filiere === user?.filiere &&
          (filtersUniversites.matiere === "" ||
            sujet.matiere === filtersUniversites.matiere)
      );
    }
    return [];
  }, [filtersUniversites, listeSujetsUniversites]);

  // Mise à jour des sujets filtrés lorsqu'un filtre change
  useEffect(() => {
    console.log("USER", user);
    console.log("SUJETS UNIVERSITES", listeSujetsUniversites);
    console.log("SUJETS FILTRÉS", filteredSujetsUniversites);
    if (user?.type === "élève") {
      setLoader(true);
      setTimeout(() => {
        setSujets(filteredSujets);
        setLoader(false);
      }, 500);
    }
  }, [filteredSujets, user]);

  useEffect(() => {
    // setSujetsUniversites(filteredSujetsUniversites);
    console.log("USER", user);

    console.log("SUJETS UNIVERSITES", listeSujetsUniversites);
    console.log("SUJETS FILTRÉS", filteredSujetsUniversites);

    if (user?.type === "étudiant") {
      setLoader(true);
      setSujetsUniversites(filteredSujetsUniversites);
      setTimeout(() => {
        setLoader(false);
      }, 500);
    }
  }, [filteredSujetsUniversites]);

  useEffect(() => {
    if (listeSujets && user?.type === "élève") {
      setSujets(
        listeSujets.listeSujets.filter((sujet) => sujet.serie === user?.serie)
      );
    } else if (listeSujetsUniversites && user?.type === "étudiant") {
      setSujetsUniversites(
        listeSujetsUniversites.data.filter(
          (sujet) => sujet.filiere === user?.filiere
        )
      );
    }
  }, [listeSujets, listeSujetsUniversites, user]);

  /**
   * Vérifie si un utilisateur peut accéder à un sujet donné
   * @param {object} sujet - Le sujet concerné
   * @param {object} user - L'utilisateur actuel
   * @returns {boolean} - Indique si l'utilisateur a accès ou non
   */

  function isAccess(sujet, user) {
    if (!user || user?.status != "actif") return false;

    if (user?.type === "étudiant") {
      const access =
        user?.filiere?.toLowerCase() === sujet.filiere?.toLowerCase() &&
        parseInt(user?.niveau) === parseInt(sujet.niveau);

      console.log("Access check =>", {
        sujet: sujet.id,
        userFiliere: user?.filiere,
        sujetFiliere: sujet.filiere,
        userNiveau: user?.niveau,
        sujetNiveau: sujet.niveau,
        result: access,
      });

      return access;
    }

    if (user?.type === "élève") {
      return user?.serie?.toLowerCase() === sujet.serie?.toLowerCase();
    }

    return false;
  }

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/configuration");
  };

  return (
    <div className="general">
      {/* Affichage de la publicité */}
      <Publicite />
      {(isLoadingSujet || isLoadingUniv) && <LoaderTransparent />}

      <div className="my-custom-div ">
        {/* Barre de navigation spécifique à l'Académie */}
        <Navbaracademie />

        <section className="">
          {/* Messages de redirection selon le statut de l'utilisateur */}
          {(user?.status == "inscrit" || user?.status == "expire") && (
            <Redirection
              texte={
                "Payez votre abonnement et accedez aux sujets offert par Nilservice !!"
              }
              nomBoutton={"Payez"}
              handlClick={handleShowPaiement}
            />
          )}
          {user?.status == "en_attente" && !user?.filiere && !user?.serie && (
            <Redirection
              texte={"Complétez votre profil pour accéder aux sujets !!"}
              nomBoutton={"Profil"}
              handlClick={handleNavigate}
            />
          )}
          {user?.status == "actif" && (user?.filiere || user?.serie) && (
            <>
              <Redirection
                texte={`Salut ${user?.nom}, profitez des sujets offert par NilService et n'oubliez pas que vous pouvez gagner de l'argent en parrainant`}
                nomBoutton={"Parrainez"}
                handlClick={handleShow}
              />

              {/* <div className="container d-flex align-items-center justify-content-center mt-2 mb-4 ">
                        <h1 >Listes des Sujets disponible sur la plateforme Nilservice</h1>

                    </div> */}
              {user?.type === "élève" && listeSujets && sujets && (
                <>
                  <div className="mx-5 mb-4  ">
                    <p className="fw-bold text-muted fs-5 ">
                      Filtrez les sujets pour affiner votre recherche :
                    </p>
                    <div className="d-flex flex-wrap gap-3 flex-md-nowrap">
                      {/* Filtre par année */}
                      {loader === false && (
                        <select
                          name="annee"
                          className="form-select"
                          onChange={handleFilterChange}
                        >
                          <option value="">Toutes les années</option>
                          {[
                            ...new Set(
                              sujets
                                ?.filter((s) => isAccess(s, user))
                                ?.map((s) => s.annee)
                            ),
                          ]?.map((annee) => (
                            <option key={annee} value={annee}>
                              {annee}
                            </option>
                          ))}
                        </select>
                      )}

                      {/* Filtre par matière */}
                      {loader === false &&
                        [
                          ...new Set(
                            sujets
                              .filter((s) => isAccess(s, user)) // ✅ On garde seulement les sujets accessibles
                              .map((s) => s.matiere)
                          ),
                        ]?.map((matiere, index) => (
                          <div className="pt-0" key={index}>
                            <CardSujets
                              ListeSujets={sujets.filter(
                                (s) =>
                                  s.matiere === matiere && isAccess(s, user) // ✅ Sujet accessible + correspond à la matière
                              )}
                              isAccess={isAccess}
                              groupe={matiere}
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Affichage des sujets filtrés */}
                  {loader === false &&
                    [...new Set(sujets?.map((s) => s.matiere))]?.map(
                      (matiere, index) => (
                        <div className="pt-0 " key={index}>
                          <CardSujets
                            ListeSujets={sujets.filter((s) =>
                              isAccess(s, user)
                            )}
                            isAccess={isAccess}
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
              {user?.type === "étudiant" &&
                listeSujetsUniversites &&
                sujetsUniversites && (
                  <>
                    <div className="mx-5 mb-4">
                      <p className="fw-bold text-muted">
                        Filtrez les sujets pour affiner votre recherche :
                      </p>
                      <div className="d-flex flex-wrap gap-3 flex-md-nowrap">
                        {/* Filtre par session */}
                        {loader === false && (
                          <select
                            name="session"
                            className="form-select"
                            onChange={handleFilterUniversites}
                          >
                            <option value="">Toutes les sessions</option>
                            {[
                              ...new Set(
                                sujetsUniversites
                                  .filter((s) => isAccess(s, user)) // ✅ Garde seulement les sujets accessibles
                                  ?.map((s) => s.session)
                              ),
                            ]?.map((session) => (
                              <option key={session} value={session}>
                                {session}
                              </option>
                            ))}
                          </select>
                        )}

                        {loader === false && (
                          <select
                            name="matiere"
                            className="form-select"
                            onChange={handleFilterUniversites}
                          >
                            <option value="">Toutes les matières</option>
                            {[
                              ...new Set(
                                sujetsUniversites
                                  .filter((s) => isAccess(s, user)) // ✅ Garde seulement les sujets accessibles
                                  ?.map((s) => s.matiere)
                              ),
                            ]?.map((matiere) => (
                              <option key={matiere} value={matiere}>
                                {matiere}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>

                    {/* Affichage des sujets filtrés */}
                    {loader === true && (
                      <div className="div-loader justify-content-center align-items-center d-flex ">
                        {/* <p>Chargement ...</p> */}
                        <LoaderSujet />
                      </div>
                    )}

                    {loader === false &&
                      [
                        ...new Set(
                          sujetsUniversites
                            .filter((s) => isAccess(s, user)) // ✅ Garde seulement les sujets accessibles
                            .map((s) => s.type)
                        ),
                      ]?.map((type, index) => (
                        <div className="pt-0" key={index}>
                          <CardSujets
                            ListeSujets={sujetsUniversites.filter(
                              (s) => s.type === type && isAccess(s, user) // ✅ Filtrage par type + accès autorisé
                            )}
                            isAccess={isAccess}
                            groupe={type}
                          />
                        </div>
                      ))}
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

export default HomeAcademy;
