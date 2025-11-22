import { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "primereact/button";
import "../../assets/css/admin/sujet.css";
import { useAdminContext } from "../../Contexts/AdminProvider";
import { toast } from "react-toastify";
import LoaderTransparent from "../LoadersCompoments/LoaderTransparent";

/**
 * c'est la page d'ajout des sujets
 
 * @returns 
 */
const Chargersujet = () => {
  const { addsubjetMutation } = useAdminContext();
  const [selectedOption, setSelectedOption] = useState("");
  const [type, setType] = useState("");
  const [filiere, setFiliere] = useState("");
  const [serie, setSerie] = useState("");
  const [date, setDate] = useState("");
  const [matiere, setMatiere] = useState("");
  const [titre, setTitre] = useState("");
  const [file, setFile] = useState(null);
  const [etablissement, setEtablissement] = useState("");
  const [statut, setStatut] = useState("");
  const [niveau, setNiveau] = useState(null);
  const [session, setSession] = useState(null);
  const [concours, setConcours] = useState(null);
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      //si aucun fichier n'est pas ajouté
      toast.error("Veuillez sélectionner un fichier !");
      return;
    }
    setLoading(true);
    try {
      await addsubjetMutation.mutateAsync({
        selectedOption,
        type,
        filiere,
        serie,
        date,
        matiere,
        titre,
        file,
        etablissement,
        statut,
        niveau,
        session,
        concours,
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

    if (selectedFile.size > 6144 * 6144) {
      //  console.log(selectedFile.size);
      toast.error("Le fichier doit être inférieur à 6144ko.");
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

  return (
    <>
      <div className=" p-4 shadow-md rounded-md content ">
        {loading == true && <LoaderTransparent />}
        <h3>Charger Sujet</h3>
        <div className="card flex px-sm-4 pt-5 pb-sm-4 justify-content-center">
          <Form onSubmit={handleSubmit} className="px-2 pb-2">
            <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
              <Form.Select
                aria-label="choix type épreuves"
                value={selectedOption}
                onChange={(e) => {
                  setSelectedOption(e.target.value),
                    setType(""),
                    setFiliere(""),
                    setSerie("");
                }}
              >
                <option value="">Choisissez le type de sujets</option>
                <option value="1">Examen</option>
                <option value="2">Sujets université</option>
              </Form.Select>
            </div>

            {selectedOption == 1 && (
              <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
                <Form.Select
                  aria-label="choix type d'examen"
                  className="mb-3 h-12rem"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Choisissez le type d'examens</option>
                  <option value="CONCOURS">CONCOURS</option>
                  <option value="BAC">BAC</option>
                  <option value="BTS">BTS</option>
                </Form.Select>

                <Form.Control
                  className="mb-3 h-12rem"
                  onChange={(e) => setDate(e.target.value)}
                  type="number"
                  placeholder="Entrer l'annee de la matiere"
                  required
                />
              </div>
            )}

            {type == "BAC" && (
              <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
                <select
                  type="text"
                  className="mb-3 h-12rem"
                  placeholder="Entrer la serie"
                  value={serie}
                  onChange={(e) => {
                    setSerie(e.target.value.toUpperCase()), setFiliere("");
                    setConcours("");
                  }}
                >
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
            {(type == "BTS" || selectedOption == 2) && (
              <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
                <Form.Select
                  aria-label="choix filière"
                  value={filiere}
                  onChange={(e) => {
                    setFiliere(e.target.value), setSerie(""), setConcours("");
                  }}
                >
                  <option value="">Choisissez la Filière</option>

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

            {selectedOption == 2 && (
              <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
                {" "}
                <Form.Control
                  className="mb-3 h-12rem"
                  onChange={(e) => setEtablissement(e.target.value)}
                  type="text"
                  required
                  placeholder="Entrer le nom de l'etablissement"
                />
                <Form.Select
                  className="mb-3 h-12rem"
                  aria-label="statut"
                  value={statut}
                  onChange={(e) => {
                    setStatut(e.target.value);
                  }}
                  required
                >
                  <option value="">Choisissez le statut etablissement</option>
                  <option value="privé">privé</option>
                  <option value="public"> public</option>
                </Form.Select>
                <Form.Control
                  className="mb-3 h-12rem"
                  onChange={(e) => setNiveau(e.target.value.toString())}
                  type="number"
                  placeholder="Entrer le niveau"
                  required
                />
                <Form.Control
                  className="mb-3 h-12rem"
                  onChange={(e) => setSession(parseInt(e.target.value, 10))}
                  type="number"
                  placeholder="Entrer la session"
                  required
                />
                <Form.Select
                  aria-label="Type"
                  className="mb-3 h-12rem"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <option value="">Choisissez le type epreuve</option>
                  <option value="examen">examen</option>
                  <option value="rattrapage"> rattrapage</option>
                  <option value="td">td</option>
                  <option value="cc">CC</option>
                   <option value="autres"> autres</option>
                </Form.Select>
              </div>
            )}
            {(filiere != "" || serie != "" || concours != "") && (
              <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
                {" "}
                <Form.Control
                  className="mb-3 h-12rem"
                  onChange={(e) => setMatiere(e.target.value.toLowerCase())}
                  type="text"
                  placeholder="Entrer le nom de la Matiere"
                  required
                />
                <Form.Control
                  type="text"
                  placeholder="Entrer le titre du sujet "
                  onChange={(e) => setTitre(e.target.value)}
                  className="mb-3 h-12rem"
                  required
                />
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Fichier</Form.Label>
                  <Form.Control
                    required
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e)}
                    ref={fileInputRef}
                  />
                </Form.Group>
              </div>
            )}
            {(filiere != "" || concours != "" || serie != "") && type != "" && (
              <Button
                type="submit"
                label="Enregistrer"
                className="p-button-success my-4"
              />
            )}
          </Form>
        </div>
      </div>
    </>
  );
};

export default Chargersujet;
