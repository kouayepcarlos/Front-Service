// Import des hooks React et composants réutilisables
import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Navbarvendeur from "../../components/navbar/Navbarvendeur";
import Publicite from "../../components/Publicite";
import "../../assets/css/connexion.css";
import Chat from "../../components/Chat";
import "../../assets/css/vendeur/boutique.css";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";
import { useRegister } from "../../Contexts/VendeurProvider";
import Redirection from "../../components/Redirection";
import { toast } from "react-toastify"; // Pour les notifications

const FormulaireRealisation = () => {
  const { ajoutProduit, Maboutique } = useRegister();

  const [boutique, setBoutique] = useState(false);
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await Maboutique.mutateAsync();
        if (Object.keys(result).length > 0) {
          setBoutique(true);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // State pour stocker les fichiers
  const [credentials, setCredentials] = useState({
    nom: "",
    prix: "",
    description: "",
    statut: "",
    categorie: "autres",
  });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Tous les fichiers sélectionnés

    if (selectedFiles.length > 3) {
      toast.error("Vous ne pouvez sélectionner que 3 images maximum !");
      return;
    }

    const newCredentials = { image1: null, image2: null, image3: null };

    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles[i].size > 1024 * 1024) {
        toast.error(`Le fichier ${selectedFiles[i].name} dépasse 1 Mo !`);
        return;
      }
      if (i === 0) newCredentials.image1 = selectedFiles[i];
      if (i === 1) newCredentials.image2 = selectedFiles[i];
      if (i === 2) newCredentials.image3 = selectedFiles[i];
    }

    setImages(newCredentials);
  };

  const [loading, setLoading] = useState(false);

  // Met à jour les champs texte du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fonction appelée lors de l'envoi du formulaire
  const handleSubmit = async () => {
    // Vérifie que le champ titre est rempli
    if (credentials.nom.trim() === "" || credentials.statut.trim() === "") {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }
    setLoading(true); // Active le loader

    try {
      const dataToSend = { ...credentials, ...images };
      console.log(dataToSend);
      await ajoutProduit.mutateAsync(dataToSend);
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    } finally {
      setLoading(false); // Désactive le loader
    }
  };

  // Affichage JSX de la page
  return (
    <div className="general">
      {loading && <LoaderTransparent />} {/* Loader transparent si en cours */}
      <Publicite />
      <div className="my-custom-div">
        <Navbarvendeur />
        <section className="mb-5">
          <Redirection texte="Ajouter vos produits " />
          <section className=" tab-contact mx-md-3">
            <div className="">
              {/* Colonne image pour grands écrans */}

              {boutique == false && (
                <p>Creer une boutique pour ajouter des produits</p>
              )}

              {/* Colonne du formulaire */}
              {boutique && (
                <div className="form-contact ">
                  <h5 className="produit"> AJOUTER UN PRODUIT</h5>
                  <div className="form-group">
                    <label htmlFor="email">Nom produit</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nom"
                      placeholder="Entrez le nom"
                      value={credentials.nom}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Prix produit</label>
                    <input
                      type="number"
                      className="form-control"
                      name="prix"
                      placeholder="Entrez le titre"
                      value={credentials.prix}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Description</label>
                    <textarea
                      name="description"
                      id=""
                      cols="10"
                      rows="3"
                      onChange={handleChange}
                      className="form-control"
                      value={credentials.description}
                      required
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Disponibilite</label>
                    <select
                      name="statut"
                      id=""
                      onChange={handleChange}
                      className="form-control"
                      required
                    >
                      <option value="">selectionner la disponibilite</option>
                      <option value="disponible">Disponible</option>
                      <option value="rupture">Rupture</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Images (Maximum 3) </label>
                    <session className="input-container">
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="form-control"
                        onChange={handleFileChange}
                        required
                        multiple
                      />
                    </session>
                  </div>

                  {/* Bouton pour envoyer le formulaire */}
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    type="submit"
                  >
                    Enregistrer
                  </button>
                </div>
              )}
            </div>
          </section>
        </section>
        <Chat />
        <Footer />
      </div>
    </div>
  );
};

export default FormulaireRealisation;
