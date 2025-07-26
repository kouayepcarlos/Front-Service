import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { VendeurProvider } from "../Contexts/VendeurProvider.jsx";
import FormulaireModificationProduit from "../pages/vendeur/FormulaireModificationProduit .jsx";
const Register1 = lazy(() => import("../pages/vendeur/Register1"));
const Register2 = lazy(() => import("../pages/vendeur/Register2"));
const RegisterF = lazy(() => import("../pages/vendeur/RegisterF"));
const Connexion = lazy(() => import("../pages/vendeur/Connexionvendeur"));
const Informations = lazy(() =>
    import("../pages/vendeur/InformationVendeur.jsx")
);
import Produits from "../pages/vendeur/Produits.jsx";
const Formulaire = lazy(() => import("../pages/vendeur/FormulaireProduit.jsx"));
const Realisations = lazy(() => import("../pages/vendeur/Mesproduits.jsx"));
const Souscrit = lazy(() => import("../pages/vendeur/Souscrit.jsx"));
const Homevendeur = lazy(() => import("../pages/vendeur/Homevendeur.jsx"));
const Visualisationproduit = lazy(() =>
    import("../pages/vendeur/Visualisationproduit.jsx")
);
const MonproduitVisualisation = lazy(() =>
  import("../pages/vendeur/MonproduitVisualisation.jsx")
);
const Forgot = lazy(() =>
    import("../pages/vendeur/forgotPassword.jsx")
  );
  const Reset= lazy(() =>
    import("../pages/vendeur/ResetPassword.jsx")
  );


const VendeurRoutes = () => {
    return (
        <VendeurProvider>
            <Routes>
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/step1" element={<Register1 />} />
                <Route path="/step2" element={<Register2 />} />
                <Route path="/step3" element={<RegisterF />} />
                <Route path="/formulaire" element={<Formulaire />} />
                <Route path="/modification/produit/:id" element={<FormulaireModificationProduit />} />
                <Route path="/souscrit" element={<Souscrit />} />
                <Route path="/Mesproduits" element={<Realisations />} />
                <Route path="/liste" element={<Homevendeur />} />
                <Route path="/informations" element={<Informations />} />
                <Route path="/home/:id" element={<Produits />} />
                     <Route path="/passe_oublie" element={<Forgot />} />
                <Route
                    path="/visualisation/:idboutique/:idproduit"
                    element={<Visualisationproduit />}
                />
                  <Route
                    path="/Monproduit/:id"
                    element={<MonproduitVisualisation />}
                />
                  <Route path="/reset" element={<Reset />} />
            </Routes>
        </VendeurProvider>
    );
};

export default VendeurRoutes;
