/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import { Button } from "primereact/button";
import "../../assets/css/admin/objectifpartenaire.css";
import { useRef } from "react";
import { useAdminContext } from "../../Contexts/AdminProvider";
import LoaderTransparent from "../LoadersCompoments/LoaderTransparent";

const Addcorrection = ({ epreuve }) => {
  const { updatecorrection } = useAdminContext();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const payload = {
        id: epreuve.id,
        fichier: file,
      };

      if (epreuve.serie) {
        payload.serie = epreuve.serie;
      }

      if (epreuve.filiere) {
        payload.filiere = epreuve.filiere;
      }

      await updatecorrection.mutateAsync(payload);
    } catch (error) {
      //  console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" p-4 shadow-md rounded-md content content-partenaire">
        <h3>Ajout Correction</h3>
        {loading && <LoaderTransparent />}
        <div className="card flex px-sm-4 pt-5 justify-content-center">
          <Form className="px-2 pb-2" onSubmit={handleSubmit}>
            <div className="flex flex-column h-12rem pr-3   gap-5">
              {" "}
              <Form.Control
                className="mb-3 h-12rem"
                value={epreuve?.titre}
                type="text"
                readOnly
                placeholder="Nom du partenaire"
              />
              <div className="mb-3">
                <br />
              </div>
              <Form.Control
                className="mb-3 h-12rem"
                onChange={(e) => handleFileChange(e)}
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                placeholder="Choisir la correction"
              />
            </div>

            <Button
              type="submit"
              label="Ajouter"
              className="p-button-success mt-4"
            />
          </Form>
        </div>
      </div>
      <div style={{ marginBottom: "150px" }}></div>
    </>
  );
};

export default Addcorrection;
