import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Sidebar from "../../components/admin/Sidebar";
import Navbaradmin from "../../components/admin/Navbaradmin";
import Objectifpartenaire from "../../components/admin/Objectifpartenaire";
import { useAdminContext } from "../../Contexts/AdminProvider";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";

const Partenaire = () => {
  const { partenaire, deletePartenaire, allobjectifsid } = useAdminContext();
  const [loading, setLoading] = useState(false);
  const [ajout, setAjout] = useState(false);
  const [Partenaire, setPartenaire] = useState({});
  const [globalFilter1, setGlobalFilter1] = useState("");
  const [id, setId] = useState(null);
  const [objectif, setObjectifs] = useState([]);
  const [nom,setNom]=useState("")

  const updateTableau = async (rowData) => {
    setLoading(true);
    try {
      const result = await allobjectifsid.mutateAsync(rowData.id);
      console.log(result);
      setObjectifs(result.objectifs);
      setNom(`${rowData?.nom} ${rowData?.prenom}`)
      setId(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const header1 = (
    <div className="d-flex justify-content-between ">
      <h2 className="font-semibold" style={{ color: "#ef8f0a" }}>
        Historique objectifs de {nom}
      </h2>
      <span className="p-input-icon-left ">
        <InputText
          type="search"
          placeholder="Rechercher..."
          onInput={(e) => setGlobalFilter1(e.target.value)}
          className="p-inputtext-sm"
        />
      </span>
    </div>
  );

  const indexTemplate = (rowData, options) => {
    return options.rowIndex + 1; // +1 pour commencer à 1 au lieu de 0
  };

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

        {rowData.statut != "delete" && (
          <i
            className="fa-solid fa-eye"
            onClick={() => updateTableau(rowData)}
            style={{
              width: "30px",
              cursor: "pointer",
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
      {loading && <LoaderTransparent />}
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
            <Column field="id" header="N°" style={{ width: "10%" }} />
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
      
      {id && (
        <div className="ml-3 mr-3">
            <br />
          <div className="">
            <DataTable
              value={objectif}
              paginator
              rows={4}
              tableStyle={{
                minWidth: "50rem",
                height: "100%",
              }}
              header={header1}
              globalFilter={globalFilter1}
              selectionMode="single"
            >
              {/* {getFilleuls.premiereGen?.map((filleul, index)=>{

                    })} */}
              <Column header="Numero" body={indexTemplate} />
              <Column
                field="objectif_parrainages"
                header="objectif_parrainages"
              />
              <Column
                field="parrainages_realises"
                header="parrainages_realises"
              />
              <Column field="date_debut" header="date_debut" />
              <Column field="date_fin" header="date_fin" />
            </DataTable>
          </div>
        </div>

      )}
      </div>
      {ajout == true && <Objectifpartenaire partenaire={Partenaire} />}
    </>
  );
};

export default Partenaire;
