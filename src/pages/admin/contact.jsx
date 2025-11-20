import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/admin/Sidebar";
import Navbaradmin from "../../components/admin/Navbaradmin";
import { useAdminContext } from "../../Contexts/AdminProvider";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";

const AdminMessages = () => {
  const { deleteMessage } = useAdminContext();
  const [messages, setMessages] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="d-flex justify-content-start no-hover-icons">
        <i
          className="fas fa-trash"
          onClick={() => {
            setLoading(true);
            try {
              deleteMessage.mutateAsync(rowData), fetchMessages();
            } catch (error) {
              console.error("Erreur :", error);
            } finally {
              // Désactive le loader
              setLoading(false);
            }
          }}
          style={{
            width: "30px",
            cursor: "pointer",
            color: "red",
          }}
        ></i>
      </div>
    );
  };
  const header = (
    <div className="d-flex justify-content-between ">
      <h2 className="font-semibold">Liste des messages</h2>
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
    fetchMessages();
  }, []);
  const API = axios.create({
    baseURL: "https://api.nilservice.net/api",
    headers: {
      "Content-Type": "application/json",
    },
    /// withCredentials: true,
  });
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await API.get("https://api.nilservice.net/api/messages");
      console.log(response);
      setMessages(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des messages :", error);
      toast.error("Impossible de charger les messages.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbaradmin />
      {loading && <LoaderTransparent />}
      <Sidebar />
      <div className="content">
        <div className="card">
          <DataTable
            value={messages}
            paginator
            rows={4}
            tableStyle={{ minWidth: "50rem", height: "100%" }}
            header={header}
            globalFilter={globalFilter}
            selectionMode="single"
          >
            <Column   body={(rowData, { rowIndex }) => rowIndex + 1} header="ID" style={{ width: "5%" }} />
            <Column field="nom" header="Nom" />
            <Column field="numero" header="Téléphone" />
            <Column field="message" header="Message" />
            <Column
              field="created_at"
              header="Date"
              body={(rowData) => new Date(rowData.created_at).toLocaleString()}
            />
            <Column
              header="Action"
              body={actionBodyTemplate}
              style={{ width: "15%", textAlign: "center" }}
            />
          </DataTable>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default AdminMessages;
