import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get("https://api.nilservice.net/api/messages");
            setMessages(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des messages :", error);
            toast.error("Impossible de charger les messages.");
        }
    };

    return (
        <div className="card">
            <h3>📥 Messages de Contact</h3>
            <DataTable value={messages} paginator rows={5} stripedRows>
                <Column field="id" header="ID" style={{ width: "5%" }} />
                <Column field="nom" header="Nom" />
                <Column field="numero" header="Téléphone" />
                <Column field="message" header="Message" />
                <Column
                    field="created_at"
                    header="Date"
                    body={(rowData) => new Date(rowData.created_at).toLocaleString()}
                />
            </DataTable>
            <ToastContainer />
        </div>
    );
};

export default AdminMessages;
