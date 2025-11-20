import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Sidebar from "../../components/admin/Sidebar";
import Navbaradmin from "../../components/admin/Navbaradmin";
import { useAdminContext } from "../../Contexts/AdminProvider";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";

const Prestataire = () => {
 
   const {prestataires = [] ,updateprestataire ,refetchPrestataire} = useAdminContext();

  const [loading,setLoading]=useState(false)

    // Archiver un message
  const archiveMessage = async (id) => {
    setLoading(true);
    try {
      await updateprestataire.mutateAsync({
        id: id,
        statut: "inactif",
      });
      refetchPrestataire()
     
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Désarchiver un message
   const unarchiveMessage = async (id) => {
    setLoading(true);
    try {
      await updateprestataire.mutateAsync({
        id: id,
        statut: "actif",
      });
      refetchPrestataire()
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
 

  const [globalFilter, setGlobalFilter] = useState("");

  const header = (
    <div className="d-flex justify-content-between ">
      <h2 className="font-semibold">Listes des prestataires</h2>
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
       

         {rowData.checked == "actif" && (
          <i
            className="fa-solid fa-toggle-on"
            onClick={() => archiveMessage(rowData.id)}
            style={{
              width: "30px",
              cursor: "pointer",
              color:"red"
            }}
          ></i>
        )}
        {rowData.checked == "inactif" && (
          <i
            className="fa-solid fa-toggle-off"
             onClick={() => unarchiveMessage(rowData.id)}
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
      {loading && <LoaderTransparent/>}
      <div className="content">
        <div className="card">
          <DataTable
            value={prestataires}
            paginator
            rows={4}
            tableStyle={{ minWidth: "50rem", height: "100%" }}
            header={header}
            globalFilter={globalFilter}
            selectionMode="single"
          >
            <Column   body={(rowData, { rowIndex }) => rowIndex + 1} header="N°" style={{ width: "10%" }} />
            <Column field="nom" header="Noms" />
            <Column field="email" header="Email" />
            <Column field="ville" header="Ville" />
            <Column field="pays" header="Pays" />
            <Column
 
  header="CNI"
  body={(rowData) => (
    <a
      href={`${rowData.file_urlcni}`}
      target="_blank"
      
    >
      Visualiser la CNI
    </a>
  )}
/>
  <Column
 
  header="Photo"
  body={(rowData) => (
    <a
      href={`${rowData.file_url}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Visualiser la photo
    </a>
  )}
/>
  <Column
 
  header="CV"
  body={(rowData) => (
    <a
      href={`${rowData.file_urlcv}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Visualiser le cv
    </a>
  )}
/>

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

export default Prestataire;
