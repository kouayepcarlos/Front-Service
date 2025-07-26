import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import Chat from "../../components/Chat";
import Publicite from "../../components/Publicite";
import Redirection from "../../components/Redirection";
import Footer from "../../components/Footer";
import Navbarvendeur from "../../components/navbar/Navbarvendeur";
import { useRegister } from "../../Contexts/VendeurProvider";
import "../../assets/css/souscrit.css";

const Souscrit = () => {
    const token = sessionStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    const [bilan, setBilan] = useState([]);

    const [getFilleuls, setGetFilleuls] = useState({
        premiereGen: [],
        deuxiemeGen: [],
        retraitTotal: 0,
    });
    const { user, refetchFilleuls, filleuls, withdrawal } = useRegister();
    const [globalFilter, setGlobalFilter] = useState("");

    const header = (
        <div className="d-flex justify-content-between ">
            <h2 className="font-semibold" style={{ color: "#ef8f0a" }}>
                Premiere generation
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

    const header1 = (
        <div className="d-flex justify-content-between ">
            <h2 className="font-semibold" style={{ color: "#ef8f0a" }}>
                Deuxieme genration
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

    const header2 = (
        <div className="d-flex justify-content-between ">
            <h2 className="font-semibold" style={{ color: "#ef8f0a" }}>
                Bilan
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
        refetchFilleuls();
    }, []);
    console.log(filleuls);

    useEffect(() => {
        if (filleuls) {
            setGetFilleuls({
                premiereGen: filleuls?.premiere_generation?.filleuls,
                deuxiemeGen: filleuls?.deuxieme_generation?.filleuls,
                retraitTotal:
                    filleuls?.premiere_generation?.montant +
                    filleuls?.deuxieme_generation?.montant,
            });
        }
    }, [filleuls]);

    const indexTemplate = (rowData, options) => {
        return options.rowIndex + 1; // +1 pour commencer à 1 au lieu de 0
    };

    const handleWithdraw = async () => {
        await withdrawal.mutateAsync(10);
    };

    return (
        <>
            <div className="general">
                <Publicite />
                <div className="my-custom-div">
                    <Navbarvendeur />
                    <section className="mb-5  ">
                        <Redirection
                            texte={`Hello ${user?.nom} ,ceci est votre espace memre,consulter toutes personnes qui ont sosucrit avec votre code parain`}
                            nomBoutton={"Parrainer un ami"}
                            lien={""}
                        />
                        <div className="ml-3 mr-3">
                            <div className="">
                                <DataTable
                                    value={getFilleuls.premiereGen}
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
                                    <Column field="nom" header="Noms" />
                                    <Column
                                        field="date_inscription"
                                        header="Date"
                                    />
                                    {/* <Column field="telephone" header="Telephone" /> */}
                                    {/* <Column field="status" header="Gains" /> */}
                                </DataTable>

                                <div className="resultat">
                                    TOTAL PREMIERE GENERATION :
                                    {filleuls?.premiere_generation?.montant}
                                </div>
                            </div>

                            <br />

                            <div className="">
                                <DataTable
                                    value={getFilleuls.deuxiemeGen}
                                    paginator
                                    rows={4}
                                    tableStyle={{
                                        minWidth: "50rem",
                                        height: "100%",
                                    }}
                                    header={header1}
                                    globalFilter={globalFilter}
                                    selectionMode="single"
                                >
                                    <Column
                                        header="Numero"
                                        body={indexTemplate}
                                    />
                                    <Column field="nom" header="Noms" />
                                    <Column
                                        field="date_inscription"
                                        header="Date"
                                    />

                                    {/* <Column
      header="Action"
      body={actionBodyTemplate}
      style={{ width: "15%", textAlign: "center" }}
    /> */}
                                </DataTable>

                                <div className="resultat">
                                    TOTAL DEUXIEME GENERATION :{" "}
                                    {filleuls?.deuxieme_generation?.montant}
                                </div>
                            </div>

                            <br />

                            <div className="">
                                <DataTable
                                    value={bilan}
                                    paginator
                                    rows={4}
                                    tableStyle={{
                                        minWidth: "50rem",
                                        height: "100%",
                                    }}
                                    header={header2}
                                    globalFilter={globalFilter}
                                    selectionMode="single"
                                >
                                    <Column
                                        field="total"
                                        header="Total gagne"
                                    />
                                    <Column
                                        field="total_retrait"
                                        header="Total retrait"
                                    />
                                    {/* <Column field="password" header="Mot de passe" /> */}
                                    <Column
                                        field="reste"
                                        header="Reste a retirer"
                                    />
                                </DataTable>

                                <button
                                    className="resultat"
                                    onClick={handleWithdraw}
                                >
                                    FAIRE UN RETRAIT
                                </button>
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

export default Souscrit;
