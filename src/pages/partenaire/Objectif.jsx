import React from "react";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Chat from "../../components/Chat";
import Redirection from "../../components/Redirection";
import Publicite from "../../components/Publicite";
import Navbarpartenaire from "../../components/navbar/Navbarpartenaire";
import ProgressBar from "react-bootstrap/ProgressBar";
import "../../assets/css/partenaire/objectif.css";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../Contexts/PartenaireProvider";
const Objectif = () => {
    const { monobjectif } = useRegister();

    
    const [nombre, setNombre] = useState(0);
    const [now, setNow] = useState(0);
    const [nom, setNom] = useState("Marie");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await monobjectif.mutateAsync();
                console.log(result);
                const objectif = result?.objectif?.objectif_parrainages ?? 0;
                const realises = result?.objectif?.parrainages_realises ?? 0;

                setNombre(objectif);

                if (objectif > 0) {
                    const progression = (realises * 100) / objectif;
                    setNow(progression);
                } else {
                    setNow(0);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération :", error);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();
    const variant = (now) => {
        if (now <= 25) return "danger";
        else if (now <= 50) return "warning";
        else if (now <= 75) return "info";
        else return "success";
    };
    return (
        <div className="general">
            {/* {loading && <LoaderTransparent />} */}
            <Publicite />
            <div className="my-custom-div">
                <Navbarpartenaire />
                <section className="mb-5">
                    <Redirection
                        texte={`Bonjour , voici votre espace partenaire ou vous verrez vos objectifs `}
                    />
                    <section className="objectif-section">
                        <div className="black-div">
                            Votre objectif cette semaine est de parraine :
                            {nombre} personnes
                        </div>
                        <ProgressBar
                            className="progress "
                            now={now}
                            variant={variant(now)}
                            label={
                                <span
                                    style={{
                                        color: "black",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Votre progression est de {now}%
                                </span>
                            }
                        />
                        <div
                            className="black-div parrainer"
                            onClick={() => {
                                navigate("/partenaire/parrainage");
                            }}
                        >
                            {" "}
                            Voir la liste des personnes parraines
                        </div>
                        <div
                            className="blue-div"
                            onClick={() => navigate("/partenaire/mesobjectifs")}
                        >
                            Calendrier des objectifs obtenues
                        </div>
                    </section>
                </section>
                <Chat />
                <Footer />
            </div>
        </div>
    );
};

export default Objectif;
