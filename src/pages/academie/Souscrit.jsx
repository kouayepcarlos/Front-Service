import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import Chat from "../../components/Chat";
import Publicite from "../../components/Publicite";
import Redirection from "../../components/Redirection";
import Footer from "../../components/Footer";
import { FaRegCopy, FaCheck } from "react-icons/fa"; // Icône pour copier le code de parrainage
import Navbaracademie from "../../components/navbar/Navbaracademie";
import { useAppContext } from "../../Contexts/AppProvider";
import "../../assets/css/souscrit.css";
import { Modal, Button } from "react-bootstrap"; // Composants Bootstrap pour la modale
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";
import { toast } from "react-toastify";
const Souscrit = () => {
  const token = sessionStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [bilan, setBilan] = useState([]);
  const handleClose = () => setShowModal(false);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(user.code);
    setCopied(true); // Changer l'icône en icône de validation
  };

  const handleShow = () => setShowModal(true);

  const [getFilleuls, setGetFilleuls] = useState({
    premiereGen: [],
    // 'deuxiemeGen':[],
    retraitTotal: 0,
  });
  const {
    user,
    refetchFilleuls,
    filleuls,
    withdrawal,
    solde,
    isLoadingSolde,
    isLoadingFilleuls,
  } = useAppContext();
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
        premiereGen: filleuls.premiere_generation,

        retraitTotal: filleuls.total_retrait,
      });
    }
  }, [filleuls]);

  const GainPremiereGen = (filleuls) => {
    let gains = 0;
    filleuls.map((filleul) => {
      if (filleul.status === "actif") gains += 500;
    });
    return gains;
  };

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
      await withdrawal.mutateAsync(solde?.data[0]?.net);
      refetchFilleuls();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="general">
        {(loading || isLoadingFilleuls || isLoadingSolde) && <LoaderTransparent />}
        <Publicite />
        <div className="my-custom-div">
          <Navbaracademie />
          <section className="mb-5  ">
            <Redirection
              texte={`Hello ${user.nom} ,ceci est votre espace memre,consulter toutes personnes qui ont sosucrit avec votre code parain`}
              nomBoutton={"Parrainez un ami"}
              handlClick={handleShow}
            />
            <div className="ml-3 mr-3">
              <div className="">
                <DataTable
                  value={getFilleuls.premiereGen}
                  paginator
                  rows={4}
                  tableStyle={{ minWidth: "50rem", height: "100%" }}
                  header={header}
                  globalFilter={globalFilter}
                  selectionMode="single"
                >
                  {/* {getFilleuls.premiereGen.map((filleul, index)=>{

                    })} */}
                  <Column header="Numero" body={indexTemplate} />
                  <Column field="nom" header="Noms" />
                  <Column field="created_at" header="Date" />
                  <Column field="telephone" header="Telephone" />
                  <Column field="status" header="Gains" />
                </DataTable>

                <div className="resultat">
                  TOTAL GAINS:
                  {GainPremiereGen(getFilleuls.premiereGen)}
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
        {/* Modal Parrainage */}
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Code de Parrainage</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>
              Voici votre code de parrainage. Partagez-le pour inviter d'autres
              personnes !
            </p>
            <div className="d-flex align-items-center border rounded p-2">
              <input
                type="text"
                className="form-control text-center"
                value={user.code}
                readOnly
              />
              {!copied && (
                <FaRegCopy
                  className="ms-2 text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={handleCopy}
                >
                  {/* {copied ? <FaCheck className="text-success" /> : <FaRegCopy className="text-primary" />} */}
                </FaRegCopy>
              )}
              {copied && <FaCheck className="text-success" />}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Souscrit;
