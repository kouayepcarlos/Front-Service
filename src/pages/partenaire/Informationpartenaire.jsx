//import React from "react";
import Footer from "../../components/Footer";
import "../../assets/css/homepage.css";
// import Partenaire from "../../components/Partenaire";
import Chat from "../../components/Chat";
import Publicite from "../../components/Publicite";

import Navbarpartenaire from "../../components/navbar/Navbarpartenaire";
import { useState, useEffect } from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa"; // Icône pour copier le code de parrainage
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../Contexts/PartenaireProvider";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";

const EditPorfil = () => {
  const {me,nouvelAbonnementPartenaireMutation}= useRegister()
    const [copied, setCopied] = useState(false);
   
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();

    const nouvelAbonnement =async () =>{
        setLoading(true)
        try{
        await nouvelAbonnementPartenaireMutation.mutateAsync({
            redirect_url:"https://mailpit.axllent.org/docs/",
            //"localhost:5173/connexion/partenaire",
            faillure_redirect_url:"https://mailpit.axllent.org/docs/"
            //"localhost:5173/page/echec"
        });
    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        setLoading(false); // Désactive le loader
    }
    }
    // Fonction pour copier le code de parrainage dans le presse-papiers
    const handleCopy = () => {
        navigator.clipboard.writeText(user.code);
        setCopied(true); // Changer l'icône en icône de validation
    };

    useEffect(() => {
        if (copied) setTimeout(() => setCopied(false), 500); // Revenir à l'icône de copie après 2s
    }, [copied]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await me.mutateAsync();
                console.log(result);
                setUser(result.partenaire);
            } catch (error) {
                console.error("Erreur lors de la récupération :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();

   
    return (
        <div className="general">
            {loading && <LoaderTransparent />}
            <Publicite />
            <div className="my-custom-div">
                <Navbarpartenaire />
                <div
                    className="p-4  rounded  w-100"
                    style={{ maxWidth: "600px", margin: "auto" }}
                >
                    <h2 className="text-center " style={{ color: "#ef8f0a" }}>
                        Informations relatives à votre compte
                    </h2>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <strong>Nom :</strong> {user?.nom}
                        </li>
                        <li className="list-group-item">
                            <strong>Téléphone :</strong> {user?.telephone}
                        </li>
                        <li className="list-group-item">
                            <strong>Email :</strong> {user?.email}
                        </li>
                       
                      
                    </ul>
                    <div>
                        <button className="btn btn-primary" onClick={()=>{nouvelAbonnement()}}>Renouveller l'abonnement</button>
                    </div>
                    <div className="text-center d-flex flex-column align-items-start gap-2 mt-3">
                        <p className="fw-bold text-success">
                            n'oubliez pas que vous pouvez gagner de l'argent en
                            parrainant
                        </p>
                        <div className="d-flex align-items-center border rounded p-1 w-100">
                            <input
                                type="text"
                                className="form-control text-center"
                                value={user?.code}
                                readOnly
                            />
                            {!copied && (
                                <FaRegCopy
                                    className="ms-2 text-primary"
                                    style={{ cursor: "pointer" }}
                                    onClick={handleCopy}
                                />
                            )}
                            {copied && <FaCheck className="text-success" />}
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/partenaire/parrainage")}
                        className="btn btn-outline-primary w-100 mt-3"
                    >
                        Vos statistiques de parrainage ici
                    </button>

                   </div>

                <Chat />
                <Footer />
            </div>
        </div>
    );
};

export default EditPorfil;
