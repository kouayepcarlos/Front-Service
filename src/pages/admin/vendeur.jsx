import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import Sidebar from "../../components/admin/Sidebar";
import Navbaradmin from "../../components/admin/Navbaradmin";
import { useAdminContext } from "../../Contexts/AdminProvider";

const Vendeur = () => {
  const { vendeurs = [] } = useAdminContext();
  const [globalFilter, setGlobalFilter] = useState("");

  const header = (
    <div className="d-flex justify-content-between ">
      <h2 className="font-semibold">Liste des vendeurs</h2>
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
  //       <i
  //         className="fa-solid fa-toggle-on"
  //         style={{ width: "30px", cursor: "pointer", color: "green" }}
  //         onClick={() => console.log("Activer", rowData.id)}
  //       ></i>
  //       <i
  //         className="fa-solid fa-toggle-off"
  //         style={{ width: "40px", cursor: "pointer", color: "red" }}
  //         onClick={() => console.log("Désactiver", rowData.id)}
  //       ></i>
  //     </div>
  //   );
  // };

  return (
    <>
      <Navbaradmin />
      <Sidebar />
      <div className="content">
        <div className="card">
          <DataTable
            value={vendeurs}
            paginator
            rows={4}
            tableStyle={{ minWidth: "50rem", height: "100%" }}
            header={header}
            globalFilter={globalFilter}
            selectionMode="single"
          >
            <Column field="id" header="N°" style={{ width: "10%" }} />
            <Column field="nom" header="Nom" />
            <Column field="telephone" header="Téléphone" />
            <Column field="email" header="Email" />
            <Column field="ville" header="Ville" />
            <Column field="pays" header="Pays" />
           
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default Vendeur;
