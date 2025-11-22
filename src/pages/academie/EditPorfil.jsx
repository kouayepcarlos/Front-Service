//import React from "react";
import Footer from "../../components/Footer";
import "../../assets/css/homepage.css";
// import Partenaire from "../../components/Partenaire";
import Chat from "../../components/Chat";
import Publicite from "../../components/Publicite";
import { useAppContext } from "../../Contexts/AppProvider";
import Navbaracademie from "../../components/navbar/Navbaracademie";
import { useState, useEffect } from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa"; // Icône pour copier le code de parrainage
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";
import { toast } from "react-toastify";
const EditPorfil = () => {
  const {
    user,
    lastabonnement,
    isLoadingAbonnement,
    completedAccountMutation,
    nouvelAbonnementsuereMutation,
  } = useAppContext();
  const [data, setData] = useState({
    etablissement: "",
    serie: "",
    filiere: "",
    niveau: "",
  });
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);
  const difference = () => {
    if (!lastabonnement) return;
    const dateFin = new Date(lastabonnement?.date_expiration);
    const dateAujourdhui = new Date();

    // Calcul de la différence en millisecondes
    const diffMs = dateFin - dateAujourdhui;

    // Conversion en jours (1 jour = 86400000 ms)
    const diffJours = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    setDate(diffJours);
    console.log(lastabonnement);
  };
  const nouvelAbonnement = async () => {
    setLoading(true);
    try {
      await nouvelAbonnementsuereMutation.mutateAsync({
        redirect_url: "https://nilservice.net/connexion/academie",
        //"localhost:5173/connexion/academy",
        faillure_redirect_url: "https://nilservice.net/page/echec",
        //"localhost:5173/page/echec"
      });
    } catch (error) {
      console.error("Erreur :", error);
    } finally {
      // Désactive le loader
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setData((preventStae) => ({
      ...preventStae,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.etablissement.trim()) {
      toast.error("entrez le nom de votre etablissement");
      return;
    }
    if(user?.type === "élève" && !data.concours.trim()){
      toast.error("choisissez votre categorie");
      return;
    }
    if (user?.type === "élève" && data.concours.trim() == "false" && !data.serie.trim()) {
      toast.error("choisissez votre serie");
      return;
    }
    if (
      user?.type === "étudiant" &&
      !data.niveau.trim() &&
      !data.filiere.trim()
    ) {
      toast.error("entrez votre niveau et votre filière");
      return;
    }
    console.log(data);

    setLoading(true);
    try {
      await completedAccountMutation.mutate(data);
    } catch (error) {
      console.error("Erreur :", error);
    } finally {
      // Désactive le loader
      setLoading(false);
    }
  };

  // Fonction pour copier le code de parrainage dans le presse-papiers
  const handleCopy = () => {
    navigator.clipboard.writeText(user?.code);
    setCopied(true); // Changer l'icône en icône de validation
  };

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 500); // Revenir à l'icône de copie après 2s
  }, [copied]);

  const navigate = useNavigate();
  useEffect(() => {
    difference();
  }, [lastabonnement]);
  return (
    <div className="general">
      {(loading || isLoadingAbonnement) && <LoaderTransparent />}
      <Publicite />
      <div className="my-custom-div">
        <Navbaracademie />
        <div
          className="p-4  rounded  w-100"
          style={{ maxWidth: "600px", margin: "auto" }}
        >
          <h2 className="text-center " style={{ color: "#ef8f0a" }}>
            Informations relatives à votre compte
          </h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Nom :</strong> {user?.nom}
            </li>
            <li className="list-group-item">
              <strong>Téléphone :</strong>{" "}
              {user?.telephone == null ? "Aucun" : user?.telephone}
            </li>
            <li className="list-group-item">
              <strong>Téléphone parent :</strong> {user?.telephone_parent}
            </li>
            <li className="list-group-item">
              <strong>Email :</strong> {user?.email}
            </li>
            <li className="list-group-item">
              <strong>Type :</strong> {user?.type}
            </li>
            {user?.filiere && (
              <li className="list-group-item">
                <strong>Filière :</strong> {user?.filiere}
              </li>
            )}
            {user?.niveau && (
              <li className="list-group-item">
                <strong>Niveau :</strong> {user?.niveau}
              </li>
            )}

             {user?.concours === "true" && (
              <li className="list-group-item">
                <strong>Categorie :</strong> Concours
              </li>
            )}

            {user?.serie && user?.concours === "false" && (
              <li className="list-group-item">
                <strong>Série :</strong> {user?.serie}
              </li>
            )}
            <li className="list-group-item">
              <strong>Établissement :</strong> {user?.etablissement}
            </li>
            <li
              className={
                user?.status === "actif"
                  ? "list-group-item text-success"
                  : "list-group-item text-danger"
              }
            >
              <strong className="text-dark">status :</strong> {user?.status}
            </li>
          </ul>
          <div className="text-center d-flex flex-column align-items-start gap-2 mt-3">
            <p className="fw-bold text-success">
              n'oubliez pas que vous pouvez gagner de l'argent en parrainant
            </p>
            <div className="d-flex align-items-center border rounded p-1 w-100">
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
                />
              )}
              {copied && <FaCheck className="text-success" />}
            </div>
          </div>
          <br />
          {user?.status != "inscrit" && (
            <div>
              {" "}
              {date > 0 && <p>votre abonnement expire dans {date} jours </p>}
              {date <= 0 && (
                <p>Votre abonnement est expiré , veuillez renouveller</p>
              )}
            </div>
          )}
          <div>
            {user?.status != "inscrit" ? (
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
          <button
            onClick={() => navigate("/souscrit")}
            className="btn btn-outline-primary w-100 mt-3"
          >
            Vos statistiques de parrainage ici
          </button>
          {user?.status == "inscrit" && !user?.filiere && !user?.serie && (
            <p>Payez votre abonnement pour completer vos information</p>
          )}
          {!user?.filiere && !user?.serie && user?.status == "en_attente" && (
            <form className="mt-4" onSubmit={handleSubmit}>
              <p className="text-center text-danger">
                Complétez votre profil pour accéder aux différents sujets
              </p>
              <div className="mb-3">
                <label className="form-label">Votre établissement</label>
                <input
                  type="text"
                  className="form-control"
                  name="etablissement"
                  value={data.etablissement}
                  onChange={handleChange}
                  required
                />
              </div>
              {user?.type === "étudiant" && (
                <div className="mb-3">
                  <label className="form-label">Votre filière</label>
                  <select
                    className="form-select"
                    name="filiere"
                    onChange={handleChange}
                    value={data.filiere}
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="Seco">Seco</option>
                    <option value="Ste">Ste</option>
                    <option value="Gestion">Gestion</option>
                    <option value="Ecomo">Ecomo</option>
                    <option value="Seco">Seco</option>
                    <option value="Ecomo">Ecomo</option>
                    <option value="marketing">Marketing</option>
                    <option value="Fico">Fico</option>
                    <option value="Info">Info </option>
                    <option value="Mathematiques">Mathematiques </option>
                    <option value="Bio/Boa/Bc">Bio/Boa/Bc</option>
                    <option value="Physique">Physique</option>
                    <option value="Droit">Droit</option>
                    <option value="ESSEC">ESSEC</option>
                    <option value="ENSPD">ENSPD</option>
                    <option value="Médecine">Médecine</option>
                  </select>
                </div>
              )}
               {user?.type === "élève" && (
                 <div className="mb-3">
                  <label className="form-label">Votre categorie</label>

                  <select
                    className="form-select"
                    name="concours"
                    onChange={handleChange}
                    value={data.concours}
                    id="serie"
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="true">Concours</option>
                    <option value="false">Serie</option>
                     </select>
                </div>
               )}
              {user?.type === "élève" && user?.concours === "false" && (
                <div className="mb-3">
                  <label className="form-label">Votre série</label>

                  <select
                    className="form-select"
                    name="serie"
                    onChange={handleChange}
                    value={data.serie}
                    id="serie"
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="A">A</option>
                    <option value="TI">TI</option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                    <option value="F3">F3</option>
                    <option value="F4">F4</option>
                    <option value="F5">F5</option>
                    <option value="F6">F6</option>
                    <option value="F8">F8</option>
                    <option value="CG">CG</option>
                    <option value="STT">STT</option>
                    <option value="ACC">ACC</option>
                  </select>
                </div>
              )}
              {user?.type === "étudiant" && (
                <div className="mb-3">
                  <label className="form-label">Votre niveau</label>
                  <select
                    className="form-select"
                    name="niveau"
                    onChange={handleChange}
                    value={data.niveau}
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="1">Licence 1</option>
                    <option value="2">Licence 2</option>
                    <option value="3">Licence 3</option>
                  </select>
                </div>
              )}
              <button className="btn btn-primary w-100" type="submit">
                Compléter
              </button>
            </form>
          )}
        </div>

        <Chat />
        <Footer />
      </div>
    </div>
  );
};

export default EditPorfil;
