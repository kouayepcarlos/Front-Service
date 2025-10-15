import Footer from "../../components/Footer";
import "../../assets/css/homepage.css";
import Chat from "../../components/Chat";
import Publicite from "../../components/Publicite";
import Navbarpartenaire from "../../components/navbar/Navbarpartenaire";
import { useState, useEffect } from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../Contexts/PartenaireProvider";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";

const EditPorfil = () => {
  const {
    me = {},
    lastabonnement,
    isLoadingAbonnement,
    nouvelAbonnementPartenaireMutation,
    isLoadingMe,
  } = useRegister();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);
  const navigate = useNavigate();

  const difference = () => {
    if (!lastabonnement) return;
    const dateFin = new Date(lastabonnement?.date_fin);
    const dateAujourdhui = new Date();

    // Calcul de la différence en millisecondes
    const diffMs = dateFin - dateAujourdhui;

    // Conversion en jours (1 jour = 86400000 ms)
    const diffJours = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    setDate(diffJours);
  };
  const nouvelAbonnement = async () => {
    setLoading(true);
    try {
      await nouvelAbonnementPartenaireMutation.mutateAsync({
        redirect_url: "https://nilservice.net/partenaire/connexion",
        faillure_redirect_url: "https://nilservice.net/page/echec",
      });
    } catch (error) {
      console.error("Erreur :", error);
    } finally {
      setLoading(false); // Désactive le loader
    }
  };
  // Fonction pour copier le code de parrainage dans le presse-papiers
  const handleCopy = () => {
    navigator.clipboard.writeText(me?.code);
    setCopied(true); // Changer l'icône en icône de validation
  };

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 500); // Revenir à l'icône de copie après 2s
  }, [copied]);

  useEffect(() => {
    difference();
  }, [lastabonnement]);

  return (
    <div className="general">
      {(loading || isLoadingAbonnement || isLoadingMe) && <LoaderTransparent />}
      <Publicite />
      <div className="my-custom-div">
        <Navbarpartenaire />
        <div
          className="p-4  rounded  w-100"
          style={{ maxWidth: "600px", margin: "auto" }}
        >
          <h2 className="text-center " style={{ color: "#ef8f0a" }}>
            Informations relatives à votre compte
          </h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Nom :</strong> {me?.nom}
            </li>
            <li className="list-group-item">
              <strong>Téléphone :</strong> {me?.telephone}
            </li>
            <li className="list-group-item">
              <strong>Email :</strong> {me?.email}
            </li>
          </ul>
          <br />
          {me?.statut != "inscrit" && (
            <div>
              {" "}
              {date > 0 && <p>votre abonnement expire dans {date} jours </p>}
              {date <= 0 && (
                <p>Votre abonnement est expiré , veuillez renouveller</p>
              )}
            </div>
          )}
          <div>
            {me?.statut != "inscrit" ? (
              <button
                className="btn btn-primary"
                onClick={() => {
                  nouvelAbonnement();
                }}
              >
                Renouveller l'abonnement'
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  nouvelAbonnement();
                }}
              >
                payer votre abonnement
              </button>
            )}
          </div>
          <div className="text-center d-flex flex-column align-items-start gap-2 mt-3">
            <p className="fw-bold text-success">
              n'oubliez pas que vous pouvez gagner de l'argent en parrainant
            </p>
            <div className="d-flex align-items-center border rounded p-1 w-100">
              <input
                type="text"
                className="form-control text-center"
                value={me?.code}
                readOnly
              />
              {!copied && (
                <FaRegCopy
                  className="ms-2 text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={handleCopy}
                />
              )}
              {copied && <FaCheck className="text-success" />}
            </div>
          </div>

          <button
            onClick={() => navigate("/partenaire/parrainage")}
            className="btn btn-outline-primary w-100 mt-3"
          >
            Vos statistiques de parrainage ici
          </button>
        </div>
        <Chat />
        <Footer />
      </div>
    </div>
  );
};

export default EditPorfil;
