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
import CardSujets from "../../components/academie/CardSujet"; // Composant des cartes de sujets
import { Modal, Button } from "react-bootstrap"; // Composants Bootstrap pour la modale
import { FaRegCopy, FaCheck } from "react-icons/fa"; // Icône pour copier le code de parrainage
import PayModal from "../../components/academie/PayModal";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import LoaderSujet from "../../components/LoadersCompoments/LoaderSujet";
import { useRef } from "react";
import { toast } from "react-toastify";
const Bibliotheque = () => {
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


  const [annee, setannee] = useState("");
  const [matiere, setMatiere] = useState("");
  const [titre, setTitre] = useState("");
  const [file, setFile] = useState(null);
  const [ecole, setEcole] = useState("");

  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      //si aucun fichier n'est pas ajouté
      toast.error("Veuillez sélectionner un fichier !");
      return;
    }
    if(titre==""){
toast.error("veuillez selectionner le titre")
    }
    setLoading(true);
    try {
      await addFichier.mutateAsync({
        annee,
        matiere,
        titre,
        file,
        ecole,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      toast.error("Aucun fichier sélectionné !");
      return;
    }

    if (selectedFile.size > 1024 * 1024) {
      //  console.log(selectedFile.size);
      toast.error("Le fichier doit être inférieur à 1024ko.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Vérifier l'extension du fichier
    const allowedExtensions = [
      "pdf",
      "doc",
      "docx",
      "ppt",
      "png",
      "jpeg",
      "jpg",
    ];
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      toast.error("Format de fichier non autorisé !");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }
    // Si tout est bon, on met à jour le fichier
    setFile(selectedFile);
  };


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
              <div className="card flex px-sm-4 pt-5 pb-sm-4 justify-content-center">
                <Form onSubmit={handleSubmit} className="px-2 pb-2">
                  <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
                    <Form.Control
                      className="mb-3 h-12rem"
                      onChange={(e) => setannee(e.target.value)}
                      type="number"
                      placeholder="Entrer l'annee de la matiere"
                      required
                    />
                  </div>{" "}
                  <Form.Control
                    className="mb-3 h-12rem"
                    onChange={(e) => setEcole(e.target.value)}
                    type="text"
                    required
                    placeholder="Entrer le nom de l'etablissement"
                  />
                  <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
                    {" "}
                    <Form.Control
                      className="mb-3 h-12rem"
                      onChange={(e) => setMatiere(e.target.value.toLowerCase())}
                      type="text"
                      placeholder="Entrer le nom de la Matiere"
                      required
                    />
                    <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
                      <select
                        type="text"
                        className="mb-3 h-12rem form-control"
                        placeholder="Entrer le titre du sujet"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                      >
                         <option value="">--selectionner--</option>
                        <option value="CC">CC</option>
                        <option value="Normale">Normale</option>
                        <option value="Bac blanc">Bac blanc</option>
                      </select>
                    </div>
                   
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Fichier</Form.Label>
                      <Form.Control
                        required
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.png,.jpeg,.jpg"
                        onChange={(e) => handleFileChange(e)}
                        ref={fileInputRef}
                      />
                    </Form.Group>
                  </div>
                  <Button
                    type="submit"
                   
                    className="p-button-success my-4"
                  >Enregistrer</Button>
                </Form>
              </div>
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

export default Bibliotheque;
