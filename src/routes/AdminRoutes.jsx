import { Routes, Route } from "react-router-dom";
import { AdminProvider } from "../Contexts/AdminProvider";
import Listesujet from "../pages/admin/Listesujet";
import Connexionadmin from "../pages/admin/Connexionadmin";
import Prestataire from "../pages/admin/prestataire";
import Vendeur from "../pages/admin/vendeur";
import Partenaire from "../pages/admin/partenaire";
import Academy from "../pages/admin/academy";
import ListeAdmin from "../pages/admin/admin";

const AdminRoutes = () => {
    return (
        <AdminProvider>
            <Routes>
                <Route path="connexion" element={<Connexionadmin />} />
                <Route path="listesujet" element={<Listesujet />} />
                <Route path="admins" element={<ListeAdmin />} />
                <Route path="academy" element={<Academy />} />
                <Route path="prestataires" element={<Prestataire />} />
                <Route path="vendeurs" element={<Vendeur />} />
                <Route path="partenaires" element={<Partenaire />} />
            </Routes>
        </AdminProvider>
    );
};

export default AdminRoutes;
