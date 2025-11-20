import  { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Sidebar from "../../components/admin/Sidebar";
import Navbaradmin from "../../components/admin/Navbaradmin";
// import Chargersujet from "./Chargersujet";

import { useAdminContext } from "../../Contexts/AdminProvider";

const Academy = () => {
    const { academy = [] } = useAdminContext(); // ✅ récupère depuis le contexte
    const [globalFilter, setGlobalFilter] = useState("");

    const header = (
        <div className="d-flex justify-content-between ">
            <h2 className="font-semibold">Liste des Académies</h2>
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

    // const actionBodyTemplate = (rowData) => (
    //     <div className="d-flex justify-content-start no-hover-icons">
    //         <i className="fa-solid fa-toggle-on" style={{ width: "30px", cursor: "pointer", color: "green" }}></i>
    //         <i className="fa-solid fa-toggle-off" style={{ width: "40px", cursor: "pointer", color: "red" }}></i>
    //     </div>
    // );

    return (
        <>
            <Navbaradmin />
            <Sidebar />
            <div className="content">
                <div className="card">
                    <DataTable
                        value={academy}
                        paginator
                        rows={4}
                        tableStyle={{ minWidth: "50rem", height: "100%" }}
                        header={header}
                        globalFilter={globalFilter}
                        selectionMode="single"
                    >
                        <Column   body={(rowData, { rowIndex }) => rowIndex + 1} header="N°" style={{ width: "10%" }} />
                        <Column field="nom" header="Nom" />
                        <Column field="telephone" header="Numéro" />
                        <Column field="etablissement" header="Etablissement" />
                        <Column field="type" header="Type" />
                        <Column field="status" header="Status" />
                        <Column field="filiere" header="Filiere" />
                        <Column field="serie" header="Serie" />
                        {/* <Column
                            header="Action"
                            body={actionBodyTemplate}
                            style={{ width: "15%", textAlign: "center" }}
                        /> */}
                    </DataTable>
                </div>
            </div>
        </>
    );
};


export default Academy;
