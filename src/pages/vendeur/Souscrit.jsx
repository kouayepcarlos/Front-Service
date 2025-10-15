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
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";
import { toast } from "react-toastify";
const Souscrit = () => {
  const [loading, setLoading] = useState(false);
  const [getFilleuls, setGetFilleuls] = useState({
    premiereGen: [],
    deuxiemeGen: [],
    retraitTotal: 0,
  });
  const {
    user,
    solde,
    isLoadingSolde,
    refetchFilleuls,
    filleuls,
    withdrawal,
    isLoadingFilleuls,
  } = useRegister();
  const [globalFilter, setGlobalFilter] = useState("");

  const header = (
    <div className="d-flex justify-content-between ">
      <h2 className="font-semibold" style={{ color: "#ef8f0a" }}>
        Gains
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

  useEffect(() => {
    refetchFilleuls();
  }, []);
  console.log(filleuls);
  console.log("solde", solde);
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
    setLoading(true);
    if (solde?.data[0]?.net <= 0) {
      toast.error("le montant est insuffisant pour effectuer le retrait");
      return;
    }
    try {
      console.log(solde?.data[0]?.net);
      await withdrawal.mutateAsync(400);
      refetchFilleuls();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="general">
        {(loading || isLoadingFilleuls || isLoadingSolde) && (
          <LoaderTransparent />
        )}
        <Publicite />
        <div className="my-custom-div">
          <Navbarvendeur />
          <section className="mb-5  ">
            <Redirection
              texte={`Hello ${user?.nom} ,ceci est votre espace memre,consulter toutes personnes qui ont sosucrit avec votre code parain`}
              nomBoutton={"Parrainez un ami"}
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
                  <Column header="Numero" body={indexTemplate} />
                  <Column field="nom" header="Noms" />
                  <Column field="date_inscription" header="Date" />
                </DataTable>

                <div className="resultat">
                  TOTAL GAINS :{filleuls?.premiere_generation?.montant}
                </div>
              </div>

              <br />

              <br />

              {solde && (
                <div className="">
                  <DataTable
                    value={solde?.data || []}
                    paginator
                    rows={4}
                    tableStyle={{ minWidth: "50rem", height: "100%" }}
                    header={header2}
                    globalFilter={globalFilter}
                    selectionMode="single"
                  >
                    <Column field="solde" header="Gain total" />
                    <Column field="retrait" header="Total retrait" />
                    {/* <Column field="password" header="Mot de passe" /> */}
                    <Column field="net" header="Reste à retirer" />
                  </DataTable>

                  <button className="resultat" onClick={handleWithdraw}>
                    FAIRE UN RETRAIT
                  </button>
                </div>
              )}
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
