import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "primereact/button";
import "../../assets/css/admin/sujet.css";
import { useAdminContext } from "../../Contexts/AdminProvider";
import LoaderTransparent from "../LoadersCompoments/LoaderTransparent";

const ModificationUniversite = () => {
  const { data, updateUniversiteMutation } = useAdminContext();
  const [type, setType] = useState(data.type);
  const [filiere, setFiliere] = useState(data.filiere);
  const [matiere, setMatiere] = useState(data.matiere);
  const [etablissement, setEtablissement] = useState(data.etablissement);
  const [statut, setStatut] = useState(data.status);
  const [niveau, setNiveau] = useState(data.niveau);
  const [session, setSession] = useState(data.session);
  const [loading, setLoading] = useState(false);
  const [titre, setTitre] = useState(data.titre);
  useEffect(() => {
    if (data) {
      setType(data.type);
      setFiliere(data.filiere);
      setMatiere(data.matiere);
      setEtablissement(data.etablissement);
      setStatut(data.status);
      setNiveau(data.niveau);
      setSession(data.session);
      setTitre(data.titre);
    }
  }, [data]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await updateUniversiteMutation.mutateAsync({
        id: data.id,
        type,
        filiere,
        matiere,
        etablissement,
        statut,
        niveau,
        session,
        titre,
      });

      //navigate("/listesujet")
    } catch (error) {
      //  console.error("Erreur lors de la connexion :", error);
      //   setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" p-4 shadow-md rounded-md content">
        <h3>Modification Sujet</h3>
        {loading && <LoaderTransparent />}
        <div className="card flex px-sm-4 pt-5 justify-content-center">
          <Form onSubmit={handleSubmit} className="px-2 pb-2">
            <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
              <Form.Select
                aria-label="choix filière"
                value={filiere}
                onChange={(e) => {
                  setFiliere(e.target.value);
                }}
              >
                <option value="">Filière</option>
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
              </Form.Select>
            </div>

            <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
              <Form.Control
                className="mb-3 h-12rem"
                onChange={(e) => setEtablissement(e.target.value)}
                type="text"
                required
                value={etablissement}
                placeholder="Etablissement"
              />

              <Form.Select
                aria-label="statut"
                className="mb-3 h-12rem"
                value={statut}
                onChange={(e) => {
                  setStatut(e.target.value);
                }}
                required
              >
                <option value="">statut etablissement</option>
                <option value="privé">privé</option>
                <option value="public"> public</option>
              </Form.Select>

              <Form.Control
                className="mb-3 h-12rem"
                onChange={(e) => setNiveau(e.target.value.toString())}
                type="number"
                placeholder="niveau"
                value={parseInt(niveau)}
                required
              />
              <Form.Control
                className="mb-3 h-12rem"
                onChange={(e) => setSession(parseInt(e.target.value, 10))}
                type="number"
                placeholder="session"
                value={session}
                required
              />
              <Form.Select
                aria-label="Type"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="">Type epreuve</option>
                <option value="examen">examen</option>
                <option value="rattrapage"> rattrapage</option>
                <option value="td">td</option>
                <option value="cc">CC</option>
                <option value="autres"> autres</option>
              </Form.Select>
            </div>

            <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
              {" "}
              <Form.Control
                className="mb-3 h-12rem"
                onChange={(e) => setMatiere(e.target.value)}
                type="text"
                placeholder="Matiere"
                required
                value={matiere}
              />
              <Form.Control
                type="text"
                placeholder="Titre du sujet "
                onChange={(e) => setTitre(e.target.value)}
                className="mb-3 h-12rem"
                required
                value={titre}
              />
            </div>

            {filiere != "" && type != "" && statut != "" && (
              <Button
                type="submit"
                label="Modifier"
                className="p-button-success mt-4"
              />
            )}
          </Form>
        </div>
      </div>
      <div style={{ marginBottom: "150px" }}></div>
    </>
  );
};

export default ModificationUniversite;
