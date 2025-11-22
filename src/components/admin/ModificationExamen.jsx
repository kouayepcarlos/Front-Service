import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "primereact/button";
import "../../assets/css/admin/sujet.css";
import { useAdminContext } from "../../Contexts/AdminProvider";
import LoaderTransparent from "../LoadersCompoments/LoaderTransparent";

const ModificationExamen = () => {
  const { data, updateExamenMutation } = useAdminContext();
  const [type, setType] = useState(data.type);
  const [serie, setSerie] = useState(data.serie == null ? "" : data.serie);
  const [matiere, setMatiere] = useState(data.matiere);
  const [titre, setTitre] = useState(data.titre);
  const [filiere, setFiliere] = useState(
    data.filiere == null ? "" : data.filiere
  );
  const [annee, setAnnee] = useState(data.annee);
  const [concours, setConcours] = useState(
    data.concours == null ? "" : data.concours
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setType(data.type);
      setFiliere(data.filiere == null ? "" : data.filiere);
      setSerie(data.serie == null ? "" : data.serie);
      setMatiere(data.matiere);
      setConcours(data.concours == null ? "" : data.concours);
      setAnnee(data.annee);
      setTitre(data.titre);
    }
  }, [data]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await updateExamenMutation.mutateAsync({
        id: data.id,
        type,
        serie: serie === "" ? null : serie,
        matiere,
        titre,
        filiere: filiere === "" ? null : filiere,
        concours: concours === "" ? null : concours,
        annee: annee.toString(),
      });
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
            <div className="flex flex-column h-12rem pr-3 mb-3 gap-5"></div>

            <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
              <Form.Select
                aria-label="choix type d'examen"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Type d'examens</option>
                <option value="CONCOURS">CONCOURS</option>
                <option value="BAC">BAC</option>
                <option value="BTS">BTS</option>
              </Form.Select>
            </div>

            <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
              {" "}
              <br />
              {type == "BAC" && (
                <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
                  <Form.Control
                    type="text"
                    className="mb-3 h-12rem"
                    placeholder="Entrer la serie"
                    value={serie}
                    onChange={(e) => {
                      setSerie(e.target.value.toUpperCase()),
                        setFiliere(""),
                        setConcours("");
                    }}
                  />
                </div>
              )}
              {type == "CONCOURS" && (
                <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
                  <Form.Select
                                   aria-label="choix filière"
                                   value={filiere}
                                   onChange={(e) => {
                                    setConcours(e.target.value),
                                       setSerie(""),
                                       setFiliere("");
                                   }}
                                 >
                                   <option value="">Choisissez le concours</option>
                                   <option value="ESSEC">ESSEC</option>
                                   <option value="ENSPD">ENSPD</option>
                                   <option value="Médecine">Médecine</option>
                                 </Form.Select>
                </div>
              )}
              {type == "BTS" && (
                <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
                  <Form.Select
                    aria-label="choix filière"
                    value={filiere}
                    onChange={(e) => {
                      setFiliere(e.target.value), setSerie(""), setConcours("");
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
                  </Form.Select>
                </div>
              )}
            </div>

            <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
              {" "}
              <Form.Control
                type="text"
                placeholder="Titre du sujet "
                onChange={(e) => setTitre(e.target.value)}
                className="mb-3 h-12rem"
                required
                value={titre}
              />
              <Form.Control
                className="mb-3 h-12rem"
                onChange={(e) => setMatiere(e.target.value.toLowerCase())}
                type="text"
                placeholder="Matiere"
                required
                value={matiere}
              />
              <Form.Control
                className="mb-3 h-12rem"
                onChange={(e) => setAnnee(e.target.value)}
                type="number"
                placeholder="Annee du sujet"
                required
                value={annee}
              />
            </div>

            {(filiere != "" ||
              concours != "" ||
              (type == "BAC" && serie != "")) &&
              type != "" && (
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

export default ModificationExamen;
