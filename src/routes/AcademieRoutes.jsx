import { Routes, Route } from "react-router-dom";
import { AppProvider } from "../Contexts/AppProvider";
import { RegisterProvider } from "../Contexts/RegisterProvider";
import AuthGuard from "../components/academie/AuthGuard";
import Homepage from "../pages/Homepage";
import Contact from "../pages/Contact";
import Conditiongenerale from "../pages/Conditiongenerale";
import Politiqueconfidentialite from "../pages/Politiqueconfidentialite";
import ConnexionAcademie from "../pages/academie/Connexion";
import PasseOublie from "../pages/academie/PasseOublie";
import HomeAcademy from "../pages/academie/HomeAcademy";
import Anciensujet from "../pages/academie/Epreuves";
import Souscrit from "../pages/academie/Souscrit";
import Voirplus from "../pages/academie/Voirplus";
import EditProfil from "../pages/academie/EditPorfil";
import ChatA from "../pages/chat/ChatA";
import Register1 from "../pages/academie/Register1";
import Register2 from "../pages/academie/Register2";
import RegisterF from "../pages/academie/RegisterF";
import Visualiser from "../pages/academie/Visualiser";
import Contactacademie from "../pages/academie/Contact";
import Pagemaintenance from "../pages/Pagemaitenance";
import Pagemaintenanceacademie from "../pages/academie/Pagemaitenance";
import ForgotPassword from "../pages/academie/forgotPassword.jsx"
import Bibliotheque from "../pages/academie/Bibliotheque.jsx";
import AllFichier from "../pages/academie/AllFichier.jsx";

const AcademieRoutes = () => {
    return (
        <AppProvider>
            <AuthGuard>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path='/forgot-password' element={<ForgotPassword/>}/>
                    <Route path="maintenance" element={<Pagemaintenance/>} />
                    <Route path="maintenance_academie" element={<Pagemaintenanceacademie/>} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="contact/academie" element={<Contactacademie />} />
                    <Route path="visualiser/:lien" element={<Visualiser />} />
                    <Route path="condition_generale" element={<Conditiongenerale />} />
                    <Route path="politique_confidentialite" element={<Politiqueconfidentialite />} />
                    <Route path="connexion/academie" element={<ConnexionAcademie />} />
                    <Route path="passe_oublie" element={<PasseOublie />} />
                    <Route path="anciensujet" element={<Anciensujet />} />
                    <Route path="voirplus" element={<Voirplus />} />
                    <Route path="homeacademy" element={<HomeAcademy />} />
                    <Route path="souscrit" element={<Souscrit />} />
                    <Route path="configuration" element={<EditProfil />} />
                    <Route path="chat" element={<ChatA />} />
                     <Route path="bibliotheque" element={<Bibliotheque />} />
                      <Route path="allfichier" element={<AllFichier/>} />
                   
                    <Route path="register/*" element={
                        <RegisterProvider>
                            <Routes>
                                <Route path="step1" element={<Register1 />} />
                                <Route path="step2" element={<Register2 />} />
                                <Route path="step3" element={<RegisterF />} />
                            </Routes>
                        </RegisterProvider>
                    } />
                </Routes>
            </AuthGuard>
        </AppProvider>
    );
};

export default AcademieRoutes;
