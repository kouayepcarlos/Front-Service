import React from 'react'
import Homeprestataire from "../pages/prestataire/Homeprestataire";
import Visualisationprestataire from "../pages/prestataire/Visualisationprestataire";
import Visualisationproduit from "../pages/vendeur/Visualisationproduit.jsx";
import Produits from "../pages/vendeur/Produits.jsx";
import Homevendeur from "../pages/vendeur/Homevendeur.jsx";
import Register1 from "../pages/prestataire/Register1";
import Register2 from "../pages/prestataire/Register2";
import RegisterF from "../pages/prestataire/RegisterF";
import Connexion from "../pages/prestataire/Connexionprestataire";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeProvider } from "../Contexts/HomeProvider.jsx";
const HomeRoutes = () => {
  return (
    <HomeProvider>
    <Routes>
        <Route path="prestataire/step1" element={<Register1 />} />
        <Route path="prestataire/step2" element={<Register2 />} />
        <Route path="prestataire/step3" element={<RegisterF />} />
        <Route
            path="prestataire/connexion"
            element={<Connexion />}
        />
        <Route
            path="/prestataire/liste"
            element={<Homeprestataire />}
        />
        <Route path="/vendeur/liste" element={<Homevendeur />} />
        <Route
            path="/prestataire/visualisation/:id"
            element={<Visualisationprestataire />}
        />
        <Route path="/vendeur/:idvendeur" element={<Produits />} />
        <Route
            path="/produit/visualisation/:idvendeur/:idproduit"
            element={<Visualisationproduit />}
        />
    </Routes>
</HomeProvider>
  )
}

export default HomeRoutes