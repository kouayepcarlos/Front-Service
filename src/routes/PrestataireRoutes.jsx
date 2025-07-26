import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PrestataireProvider } from "../Contexts/PrestataireProvider.jsx";

const Register1 = lazy(() => import("../pages/prestataire/Register1"));
const Register2 = lazy(() => import("../pages/prestataire/Register2"));
const RegisterF = lazy(() => import("../pages/prestataire/RegisterF"));
const Connexion = lazy(() =>
    import("../pages/prestataire/Connexionprestataire")
);
const Informations = lazy(() =>
    import("../pages/prestataire/Informationprestataire.jsx")
);
const Formulaire = lazy(() =>
    import("../pages/prestataire/FormulaireRealisation.jsx")
);
const Realisations = lazy(() =>
    import("../pages/prestataire/Realisations.jsx")
);
const Souscrit = lazy(() => import("../pages/prestataire/Souscrit.jsx"));
const Homeprestataire = lazy(() =>
    import("../pages/prestataire/Homeprestataire.jsx")
);
const Visualisationprestataire = lazy(() =>
    import("../pages/prestataire/Visualisationprestataire.jsx")
);
const Forgot = lazy(() =>
    import("../pages/prestataire/forgotPassword.jsx")
);
const Reset = lazy(() =>
    import("../pages/prestataire/ResetPassword.jsx")
);


const PrestataireRoutes = () => {
    return (
        <PrestataireProvider>
            <Routes>
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/formulaire" element={<Formulaire />} />
                <Route path="/realisation" element={<Realisations />} />
                <Route path="/step1" element={<Register1 />} />
                <Route path="/step2" element={<Register2 />} />
                <Route path="/step3" element={<RegisterF />} />
                <Route path="/informations" element={<Informations />} />
                <Route path="/souscrit" element={<Souscrit />} />
                <Route path="/passe_oublie" element={<Forgot />} />
                <Route path="/reset" element={<Reset />} />
                <Route
                    path="/liste"
                    element={<Homeprestataire />}
                />
                <Route
                    path="/visualisation/:id"
                    element={<Visualisationprestataire />}
                />
            </Routes>
        </PrestataireProvider>
    );
};

export default PrestataireRoutes;
