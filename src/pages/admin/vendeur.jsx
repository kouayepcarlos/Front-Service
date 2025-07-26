import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Sidebar from "../../components/admin/Sidebar";
import Navbaradmin from "../../components/admin/Navbaradmin";


const Vendeur = () => {
  const [data, setData] = useState([
    { id: 1, client: "Client A", document: "Document1", telephone: "123-456-7890" },
    { id: 2, client: "Client B", document: "Document1", telephone: "987-654-3210" },
    { id: 3, client: "Client C", document: "Document1", telephone: "456-789-1230" },
    { id: 4, client: "Client C", document: "Document1", telephone: "456-789-1230" },
    { id: 5, client: "Client C", document: "Document1", telephone: "456-789-1230" },
    { id: 6, client: "Client C", document: "Document1", telephone: "456-789-1230" },
    { id: 7, client: "Client C", document: "Document1", telephone: "456-789-1230" },
  ]);

  const [globalFilter, setGlobalFilter] = useState("");

  const header = (
    <div className="d-flex justify-content-between ">
      <h2 className="font-semibold">Listes des vendeurs</h2>
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
       <i className="fa-solid fa-toggle-on" style={{ width: "30px", cursor: "pointer", color: "green" }}></i>
       <i className="fa-solid fa-toggle-off" style={{ width: "40px", cursor: "pointer", color: "red" }}></i>
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
            value={data}
            paginator
            rows={4}
            tableStyle={{ minWidth: "50rem", height: "100%"}}
            header={header}
            globalFilter={globalFilter}
            selectionMode="single"
          >
            <Column field="id" header="N°" style={{ width: "10%" }} />
            <Column field="client" header="Noms" />
          
            <Column field="telephone" header="Numero" />
            <Column field="document" header="Document" />
            <Column
              header="Action"
              body={actionBodyTemplate}
              style={{ width: "15%", textAlign: "center" }}
            />
          </DataTable>
        </div>
      </div>

    </>
  );
};

export default Vendeur;
