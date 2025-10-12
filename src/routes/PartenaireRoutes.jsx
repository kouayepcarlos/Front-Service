import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PartenaireProvider } from "../Contexts/PartenaireProvider.jsx";
const Register1 = lazy(() => import("../pages/partenaire/Register1"));
const Informations = lazy(() => import("../pages/partenaire/Informationpartenaire.jsx"));
const RegisterF = lazy(() => import("../pages/partenaire/RegisterF"));
const Connexion = lazy(() => import("../pages/partenaire/Connexionpartenaire"));
const Objectif = lazy(() => import("../pages/partenaire/Objectif"));
const Parrainage = lazy(() => import("../pages/partenaire/Souscrit"));
const Mesobjectifs = lazy(() => import("../pages/partenaire/Mesobjectifs.jsx"));
import ForgotPassword from "../pages/partenaire/forgotPassword.jsx";


const PartenaireRoutes = () => {
    return (
        <PartenaireProvider>
            <Routes>
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/objectif" element={<Objectif />} />
                <Route path="/parrainage" element={<Parrainage />} />
                <Route path="/informations" element={<Informations />} />
                <Route path="/mesobjectifs" element={<Mesobjectifs />} />
                  <Route path='/forgot-password' element={<ForgotPassword/>}/>
                <Route path="/*"  element={
                <PartenaireProvider>
                    <Routes>
                        <Route path="/step1" element={<Register1 />} />
                        <Route path="/step2" element={<RegisterF />} />
                       
                    </Routes>
                </PartenaireProvider>}
                />
                
            </Routes>
        </PartenaireProvider>
    );
};

export default PartenaireRoutes;
