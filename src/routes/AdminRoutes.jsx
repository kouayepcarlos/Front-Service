import { Routes, Route } from "react-router-dom";
import { AdminProvider } from "../Contexts/AdminProvider";
import Listesujet from "../pages/admin/Listesujet";
import Connexionadmin from "../pages/admin/Connexionadmin";
import Prestataire from "../pages/admin/prestataire";
import Vendeur from "../pages/admin/vendeur";
import Partenaire from "../pages/admin/partenaire";
import Academy from "../pages/admin/academy";
import ListeAdmin from "../pages/admin/admin";
import AdminMessages from "../pages/admin/contact";
import Newsletter from "../pages/admin/newsletter";
import Totale from "../pages/admin/Totale";

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
                <Route path="contact" element={<AdminMessages />} />
                 <Route path="newsletter" element={<Newsletter />} />
                 <Route path="totale" element={<Totale />} />
            </Routes>
        </AdminProvider>
    );
};

export default AdminRoutes;
