import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import PartenaireRoutes from "./routes/PartenaireRoutes";
import VendeurRoutes from "./routes/VendeurRoutes";
import PrestataireRoutes from "./routes/PrestataireRoutes";
import AcademieRoutes from "./routes/AcademieRoutes";
import Pagechoix from "./pages/Pagechoix";
import Pageechec from "./pages/Pageechec";
import ResetPassword from "./pages/ResetPassword";
import PageConnexion from "./pages/PageConnexion";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="page/inscription" element={<Pagechoix />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/prestataire/*" element={<PrestataireRoutes />} />
                <Route path="/vendeur/*" element={<VendeurRoutes />} />
                <Route path="/partenaire/*" element={<PartenaireRoutes />} />
                <Route path="/page/echec" element={<Pageechec />} />
                <Route path="/password-reset" element={<ResetPassword />} />
                <Route path="/page-connexion" element={<PageConnexion />} />
                <Route path="/*" element={<AcademieRoutes />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
