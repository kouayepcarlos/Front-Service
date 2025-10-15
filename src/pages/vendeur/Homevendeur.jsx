import Boutiques from "../../components/vendeur/boutique";
import Footer from "../../components/Footer";
import NavBar from "../../components/navbar/NavBar";
import Publicite from "../../components/Publicite";
import Chat from "../../components/Chat";
import { useRegister } from "../../Contexts/VendeurProvider";
import Redirection from "../../components/Redirection";
import { useState, useMemo } from "react";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";
const Homevendeur = () => {
  const { boutiques, isLoadingBoutique } = useRegister();

  const [filters, setFilters] = useState({
    pays: "",
    ville: "",
    quartier: "",
  });

  // Filtrage en cascade avec useMemo
  const filteredBoutiques = useMemo(() => {
    return boutiques
      ? boutiques.filter(
          (b) =>
            (filters.pays === "" || b.pays === filters.pays) &&
            (filters.ville === "" || b.ville === filters.ville) &&
            (filters.quartier === "" || b.quartier === filters.quartier)
        )
      : [];
  }, [filters, boutiques]);

  const villesDisponibles = useMemo(() => {
    return boutiques ? [...new Set(boutiques.map((b) => b.ville))] : [];
  }, [boutiques]);

  const quartiersDisponibles = useMemo(() => {
    return boutiques
      ? [
          ...new Set(
            boutiques
              .filter((b) => filters.ville === "" || b.ville === filters.ville)
              .map((b) => b.quartier)
          ),
        ]
      : [];
  }, [boutiques, filters.ville]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    // Si on change la ville, on reset le quartier
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "ville" ? { quartier: "" } : {}),
    }));
  };

  return (
    <div className="general">
      {isLoadingBoutique && <LoaderTransparent />}
      <Publicite />
      <div className="my-custom-div">
        <NavBar />
        <section className="mb-5">
          <Redirection
            texte="Vous avez déjà un compte ? Connectez-vous "
            nomBoutton="Créer votre compte"
            lien="/vendeur/step1"
          />
          <div className="mx-5 mb-4">
            <p className="fw-bold text-muted fs-5">
              Filtrez les boutiques pour affiner votre recherche :
            </p>
            <div className="d-flex flex-wrap gap-3 flex-md-nowrap">
              <select
                name="ville"
                value={filters.ville}
                className="form-select"
                onChange={handleFilterChange}
              >
                <option value="">Filtrer par ville</option>
                {villesDisponibles.map((ville) => (
                  <option key={ville} value={ville}>
                    {ville}
                  </option>
                ))}
              </select>

              <select
                name="quartier"
                value={filters.quartier}
                className="form-select"
                onChange={handleFilterChange}
              >
                <option value="">Filtrer par quartier</option>
                {quartiersDisponibles.map((quartier) => (
                  <option key={quartier} value={quartier}>
                    {quartier}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-0">
            <Boutiques boutiques={filteredBoutiques} />
          </div>
        </section>
        <Chat />
        <Footer />
      </div>
    </div>
  );
};

export default Homevendeur;
