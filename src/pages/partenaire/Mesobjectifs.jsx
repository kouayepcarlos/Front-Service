import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import Chat from "../../components/Chat";
import Publicite from "../../components/Publicite";
import Redirection from "../../components/Redirection";
import Footer from "../../components/Footer";
import Navbarprestataire from "../../components/navbar/Navbarprestataire";
import { useRegister } from "../../Contexts/PartenaireProvider";
import "../../assets/css/souscrit.css";
import Navbarpartenaire from "../../components/navbar/Navbarpartenaire";

const Mesobjectifs = () => {
    const token = sessionStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    const [bilan, setBilan] = useState([]);

    const [Objectifs, setObjectifs] = useState([]);
    const { user, objectifs, withdrawal } = useRegister();
    const [globalFilter, setGlobalFilter] = useState("");

    const header = (
        <div className="d-flex justify-content-between ">
            <h2 className="font-semibold" style={{ color: "#ef8f0a" }}>
                Historique objectifs
            </h2>
            <span className="p-input-icon-left ">
                <InputText
                    type="search"
                    placeholder="Rechercher..."
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    className="p-inputtext-sm"
                />
            </span>
        </div>
    );

    // const actionBodyTemplate = (rowData) => {
    //   return (
    //     <div className="d-flex justify-content-start no-hover-icons">
    //      <i className="fa-solid fa-toggle-on" style={{ width: "30px", cursor: "pointer", color: "green" }}></i>
    //      <i className="fa-solid fa-toggle-off" style={{ width: "40px", cursor: "pointer", color: "red" }}></i>
    //     </div>
    //   );
    // };

    useEffect(() => {
        console.log(objectifs);
        setObjectifs(objectifs?.liste_des_objectifs);
        console.log(objectifs?.liste_des_objectifs);
    }, [objectifs]);

    const indexTemplate = (rowData, options) => {
        return options.rowIndex + 1; // +1 pour commencer à 1 au lieu de 0
    };

    return (
        <>
            <div className="general">
                <Publicite />
                <div className="my-custom-div">
                    <Navbarpartenaire />
                    <section className="mb-5  ">
                        <Redirection
                            texte={`Hello ${user?.nom} ,ceci est votre espace memre,consulter toutes personnes qui ont sosucrit avec votre code parain`}
                            nomBoutton={"Parrainer un ami"}
                            lien={""}
                        />
                        <div className="ml-3 mr-3">
                            <div className="">
                                <DataTable
                                    value={Objectifs}
                                    paginator
                                    rows={4}
                                    tableStyle={{
                                        minWidth: "50rem",
                                        height: "100%",
                                    }}
                                    header={header}
                                    globalFilter={globalFilter}
                                    selectionMode="single"
                                >
                                    {/* {getFilleuls.premiereGen?.map((filleul, index)=>{

                    })} */}
                                    <Column
                                        header="Numero"
                                        body={indexTemplate}
                                    />
                                    <Column
                                        field="objectif_parrainages"
                                        header="objectif_parrainages"
                                    />
                                    <Column
                                        field="parrainages_realises"
                                        header="parrainages_realises"
                                    />
                                    <Column
                                        field="date_debut"
                                        header="date_debut"
                                    />
                                    <Column
                                        field="date_fin"
                                        header="date_fin"
                                    />
                                </DataTable>
                            </div>
                        </div>
                    </section>
                    <Chat />
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Mesobjectifs;
