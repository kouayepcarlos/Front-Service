import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import Chat from "../../components/Chat";
import Publicite from "../../components/Publicite";
import Redirection from "../../components/Redirection";
import Footer from "../../components/Footer";
import { useRegister } from "../../Contexts/PartenaireProvider";
import "../../assets/css/souscrit.css";
import Navbarpartenaire from "../../components/navbar/Navbarpartenaire";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";

const Mesobjectifs = () => {
  const [Objectifs, setObjectifs] = useState([]);
  const { objectifs, me = {}, isLoadingObjectif } = useRegister();
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

  useEffect(() => {
    objectifs && setObjectifs(objectifs);
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
          {isLoadingObjectif && <LoaderTransparent />}
          <section className="mb-5  ">
            <Redirection
              texte={`Hello ${me?.nom} ,ceci est votre espace membre,consulter tous vos objectifs `}
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
          </section>
          <Chat />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Mesobjectifs;
