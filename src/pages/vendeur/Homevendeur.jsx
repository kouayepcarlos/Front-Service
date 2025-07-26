import Boutiques from "../../components/vendeur/boutique";
import Footer from "../../components/Footer";
import NavBar from "../../components/navbar/NavBar";
import Publicite from "../../components/Publicite";
import Chat from "../../components/Chat";
import { useRegister } from "../../Contexts/VendeurProvider";
import Redirection from "../../components/Redirection";
import { useState, useMemo, useEffect } from "react";
const Homevendeur = () => {

    const {boutiques} = useRegister()

//   const boutiques = [
//     {
//       id:1,
//       boutique:"text1",
//       ville:"douala",
//       quartier:"bonamoussadi"
//     }
//   ]

 const [prestationliste, setPrestationliste] = useState([]);
    const [filters, setFilters] = useState({
           pays: "",
           ville: "",
           quartier: "",
          
       });
   
       // Gère les changements de valeur dans les <select>
       const handleFilterChange = (e) => {
           setFilters({ ...filters, [e.target.name]: e.target.value });
       };
   
    const filtered = useMemo(() => {
        if (boutiques) {
            return boutiques.filter(
                (sujet) =>
                    (filters.pays === "" || sujet.pays === filters.pays) &&
                    (filters.ville === "" || sujet.ville === filters.ville) &&
                    (filters.quartier === "" || sujet.quartier === filters.quartier) 
                  
            );
        }

        return [];
    }, [filters, boutiques]);
  useEffect(() => {
        setTimeout(() => {
            setPrestationliste(filtered);
        }, 500); // Simule un délai comme s’il s’agissait d’un appel API
    }, [filtered]);
    return (
        <div className="general">
            <Publicite />
            <div className="my-custom-div">
                <NavBar />
                <section className="mb-5">
                    <Redirection
                        texte="Vous avez déjà un compte ? Connectez-vous "
                        nomBoutton="Créer votre compte"
                        lien="/vendeur/step1"
                    />
                    <div className="mx-5 mb-4  ">
                        <p className="fw-bold text-muted fs-5 ">
                            Filtrez les boutiques pour affiner votre recherche :
                        </p>
                        <div className="d-flex flex-wrap gap-3 flex-md-nowrap">
                        <select name="pays" className="form-select" onChange={handleFilterChange}   >
                                <option value="">Filtrer par pays</option>
                                {[...new Set(prestationliste.map((prestation) => prestation.pays))].map((pays) => (
                                        <option key={pays} value={pays}>{pays}</option>
                                    ))}
                               
                            </select>
                            {/* Filtre par ville */}
                           {/* Filtre par ville */}
                           <select name="ville" className="form-select" onChange={handleFilterChange}>
                                <option value="">Filtrer par ville</option>
                                {[...new Set(prestationliste.map((prestation) => prestation.ville))].map((ville) => (
                                        <option key={ville} value={ville}>{ville}</option>
                                    ))}
                           
                            </select>

                            {/* Filtre par quartier */}
                            <select name="quartier" className="form-select" onChange={handleFilterChange}>
                                <option value="">Filtrer par quartier</option>
                                {[...new Set(prestationliste.map((prestation) => prestation.quartier))].map((quartier) => (
                                        <option key={quartier} value={quartier}>{quartier}</option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <div className="pt-0 " >
                        <Boutiques
                            boutiques={prestationliste}
                           
                        />
                    </div>
                </section>
                <Chat />
                <Footer />
            </div>
        </div>
    );
};

export default Homevendeur;
