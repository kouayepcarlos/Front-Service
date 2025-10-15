import Footer from "../../components/Footer";
import NavBar from "../../components/navbar/NavBar";
import Publicite from "../../components/Publicite";
import Chat from "../../components/Chat";
import Prestations from "../../components/prestataire/Prestations"; // Composant qui affiche la liste des prestations
import Redirection from "../../components/Redirection";
import { useState, useMemo, useEffect } from "react";
import { useRegister } from "../../Contexts/PrestataireProvider";
import { useSearchParams } from "react-router-dom";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";

const Homeprestataire = () => {
  const { prestation, isLoadingPrestataire } = useRegister();

  // Liste affichée à l'écran après filtrage
  const [prestationliste, setPrestationliste] = useState([]);

  // État local des filtres
  const [filters, setFilters] = useState({
    pays: "",
    ville: "",
    quartier: "",
    profession: "", // Ce champ n’existe pas dans les données, donc les filtres profession ne fonctionneront pas
  });

  // Gère les changements de valeur dans les <select>
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const professionFiltre = searchParams.get("profession");

    if (professionFiltre && prestation?.length > 0) {
      setFilters((prev) => ({
        ...prev,
        profession: professionFiltre,
      }));
    }
  }, [searchParams, prestation]); // Ajoute `prestation` comme dépendance

  // Filtrage dynamique avec useMemo pour optimiser les performances

  const filtered = useMemo(() => {
    if (prestation) {
      return prestation.filter(
        (sujet) =>
          (filters.pays === "" || sujet.pays === filters.pays) &&
          (filters.ville === "" || sujet.ville === filters.ville) &&
          (filters.quartier === "" || sujet.quartier === filters.quartier) &&
          (filters.profession === "" || sujet.profession === filters.profession) // profession non présent dans les objets
      );
    }
    console.log(prestation);
    return [];
  }, [filters, prestation]);

  // Met à jour la liste affichée après filtrage avec un petit délai
  useEffect(() => {
    setTimeout(() => {
      setPrestationliste(filtered);
    }, 500); // Simule un délai comme s’il s’agissait d’un appel API
  }, [filtered]);
  return (
    <div className="general">
      {isLoadingPrestataire && <LoaderTransparent />}
      <Publicite />
      <div className="my-custom-div">
        <NavBar />
        <section className="mb-5">
          {/* Composant pour rediriger l'utilisateur vers la création de compte */}
          <Redirection
            texte="Vous avez déjà un compte ? Connectez-vous "
            nomBoutton="Créer votre compte"
            lien="/vendeur/step1"
          />

          {/* Filtres de recherche */}
          <div className="mx-5 mb-4">
            <p className="fw-bold text-muted fs-5">
              Filtrez les prestatairess pour affiner votre recherche :
            </p>

            {/* Barre de filtres en flex-wrap */}
            <div className="d-flex flex-wrap gap-3 flex-md-nowrap">
              {/* Filtre par ville */}
              <select
                name="ville"
                className="form-select"
                onChange={handleFilterChange}
              >
                <option value="">Filtrer par ville</option>
                {[
                  ...new Set(
                    (prestation ? prestation : []).map(
                      (prestation) => prestation.ville
                    )
                  ),
                ].map((ville) => (
                  <option key={ville} value={ville}>
                    {ville}
                  </option>
                ))}
              </select>

              {/* Filtre par quartier */}
              <select
                name="quartier"
                className="form-select"
                onChange={handleFilterChange}
              >
                <option value="">Filtrer par quartier</option>
                {[
                  ...new Set(
                    (prestation ? prestation : []).map(
                      (prestation) => prestation.quartier
                    )
                  ),
                ].map((quartier) => (
                  <option key={quartier} value={quartier}>
                    {quartier}
                  </option>
                ))}
              </select>

              {/* Filtre par profession (non utilisé dans les données actuelles) */}
              <select
                name="professi"
                className="form-select"
                onChange={handleFilterChange}
                value={filters.profession}
              >
                <option value="">Filtrer par profession</option>

                {[
                  ...new Set(
                    (prestation ? prestation : []).map(
                      (prestation) => prestation.profession
                    )
                  ),
                ].map((profession) => (
                  <option key={profession} value={profession}>
                    {profession}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Affichage des prestataires filtrés */}
          <div className="pt-0">
            <Prestations prestations={prestationliste} />
          </div>
        </section>

        {/* Composants bas de page */}
        <Chat />
        <Footer />
      </div>
    </div>
  );
};

export default Homeprestataire;
