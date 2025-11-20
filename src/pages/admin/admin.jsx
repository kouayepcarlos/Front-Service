import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import Sidebar from "../../components/admin/Sidebar";
import Navbaradmin from "../../components/admin/Navbaradmin";
import Inscription from "../../components/admin/Inscription";
import Modificationadmin from "../../components/admin/Modificationadmin";
import { useAdminContext } from "../../Contexts/AdminProvider";

/**
 * c'est la page de gestion des admins uniquement accessible par le superadministrateur
 * les differentes operations sont
 * 1)l'ajout d'un admin
 * 2)la modification d'un admin
 * 3)la visualisation des informations des admins
 * 4) la suppression d'un admin
 * @returns 
 */
const ListeAdmin = () => {
    const { admin = [], deleteAdminMutation, setDataadmin } = useAdminContext();
    const [modifie, setModifie] = useState(false);

    const modifadmin = async (data) => {//permet de recuperer les informations de l'admin à modifier et d'ouvrir le form de modifcation
        setDataadmin(data);
        setModifie(true);
    };

    const [globalFilter, setGlobalFilter] = useState("");

    const header = (
        <div className="d-flex justify-content-between ">
            <h2 className="font-semibold">Listes des admins</h2>
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
                <i
                    className="fa-regular fa-trash-can"
                    style={{ width: "40px", cursor: "pointer" }}
                    onClick={() =>
                        deleteAdminMutation.mutateAsync({ id: rowData.id })
                    }
                ></i>
                <i
                    className="fa-solid fa-pencil"
                    style={{ width: "30px", cursor: "pointer" }}
                    onClick={() => modifadmin(rowData)}
                ></i>
               
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
                        value={admin}
                        paginator
                        rows={4}
                        tableStyle={{ minWidth: "50rem", height: "100%" }}
                        header={header}
                        globalFilter={globalFilter}
                        selectionMode="single"
                    >
                        <Column
                              body={(rowData, { rowIndex }) => rowIndex + 1}
                            header="N°"
                            style={{ width: "10%" }}
                        />
                        <Column field="username" header="Noms" />
                        <Column field="email" header="Email" />
                        {/* <Column field="password" header="Mot de passe" /> */}
                        <Column field="code" header="code" />
                        <Column field="solde" header="Solde" />

                        <Column
                            header="Action"
                            body={actionBodyTemplate}
                            style={{ width: "15%", textAlign: "center" }}
                        />
                    </DataTable>
                </div>
            </div>
            <br />
            {modifie == true && <Modificationadmin />}
            <Inscription />
        </>
    );
};

export default ListeAdmin;
