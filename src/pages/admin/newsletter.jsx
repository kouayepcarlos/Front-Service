import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import Sidebar from "../../components/admin/Sidebar";
import Navbaradmin from "../../components/admin/Navbaradmin";

import { useAdminContext } from "../../Contexts/AdminProvider";

const Newsletter = () => {
    const { newsletter= [] } = useAdminContext();
    const [globalFilter, setGlobalFilter] = useState("");

    const header = (
        <div className="d-flex justify-content-between ">
            <h2 className="font-semibold">Listes des newsletters</h2>
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
    //     return (
    //         <div className="d-flex justify-content-start no-hover-icons">
    //             <i
    //                 className="fa-regular fa-trash-can"
    //                 style={{ width: "40px", cursor: "pointer" }}
    //                 onClick={() =>
    //                     deleteAdminMutation.mutateAsync({ id: rowData.id })
    //                 }
    //             ></i>
    //             <i
    //                 className="fa-solid fa-pencil"
    //                 style={{ width: "30px", cursor: "pointer" }}
    //                 onClick={() => modifadmin(rowData)}
    //             ></i>
               
    //         </div>
    //     );
    // };

    return (
        <>
            <Navbaradmin />
            <Sidebar />
            <div className="content">
                <div className="card">
                    <DataTable
                        value={newsletter[0]}
                        paginator
                        rows={4}
                        tableStyle={{ minWidth: "50rem", height: "100%" }}
                        header={header}
                        globalFilter={globalFilter}
                        selectionMode="single"
                    >
                        <Column
                            field="id"
                            header="N°"
                            style={{ width: "10%" }}
                        />
                       
                        <Column field="email" header="Email" />
                           <Column body={(rowData)=>new Date(rowData?.created_at).toISOString().slice(0,10)} header="Date de souscription" />
                        {/* <Column field="password" header="Mot de passe" /> */}
                       

                        {/* <Column
                            header="Action"
                            body={actionBodyTemplate}
                            style={{ width: "15%", textAlign: "center" }}
                        /> */}
                    </DataTable>
                </div>
            </div>
            <br />
            
        </>
    );
};

export default Newsletter
;
