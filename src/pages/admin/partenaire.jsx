import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Sidebar from "../../components/admin/Sidebar";
import Navbaradmin from "../../components/admin/Navbaradmin";
import Objectifpartenaire from "../../components/admin/Objectifpartenaire";
import { useAdminContext } from "../../Contexts/AdminProvider";

const Partenaire = () => {
    const { partenaire, deletePartenaire, definirObjectif } = useAdminContext();

    const [ajout, setAjout] = useState(false);
    const [Partenaire, setPartenaire] = useState({});

    const [globalFilter, setGlobalFilter] = useState("");

    const header = (
        <div className="d-flex justify-content-between ">
            <h2 className="font-semibold">Listes des partenaires</h2>
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

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="d-flex justify-content-start no-hover-icons">
                {rowData.statut != "delete" && (
                    <i
                        className="fa-regular fa-square-plus"
                        onClick={() => {
                            setAjout(true), setPartenaire(rowData);
                        }}
                    ></i>
                )}
                {rowData.statut != "delete" && (
                    <i
                        className="fa-solid fa-toggle-on"
                        onClick={() => deletePartenaire.mutateAsync(rowData)}
                        style={{
                            width: "30px",
                            cursor: "pointer",
                            color: "red",
                        }}
                    ></i>
                )}
                {rowData.statut == "delete" && (
                    <i
                        className="fa-solid fa-toggle-off"
                        style={{
                            width: "40px",
                            cursor: "pointer",
                            color: "green",
                        }}
                    ></i>
                )}
            </div>
        );
    };

    return (
        <>
            <Navbaradmin />
            <Sidebar />
            <div className="content">
                <div className="card">
                    <DataTable
                        value={partenaire}
                        paginator
                        rows={4}
                        tableStyle={{ minWidth: "50rem", height: "100%" }}
                        header={header}
                        globalFilter={globalFilter}
                        selectionMode="single"
                    >
                        <Column
                            field="id"
                            header="N°"
                            style={{ width: "10%" }}
                        />
                        <Column field="nom" header="Noms" />
                        <Column field="prenom" header="Prenoms" />
                        <Column field="email" header="Email" />
                        <Column field="telephone" header="Numero" />
                        <Column field="statut" header="Statut" />
                        <Column
                            header="Action"
                            body={actionBodyTemplate}
                            style={{ width: "15%", textAlign: "center" }}
                        />
                    </DataTable>
                </div>
            </div>
            {ajout == true && <Objectifpartenaire partenaire={Partenaire} />}
        </>
    );
};

export default Partenaire;
