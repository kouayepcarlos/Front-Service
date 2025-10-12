import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import Sidebar from "../../components/admin/Sidebar";
import Navbaradmin from "../../components/admin/Navbaradmin";

import { useAdminContext } from "../../Contexts/AdminProvider";

const Totale = () => {
    const {totale= [] } = useAdminContext();
    const [globalFilter, setGlobalFilter] = useState("");

    const header = (
        <div className="d-flex justify-content-between ">
            <h2 className="font-semibold">Statistiques</h2>
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
                        value={totale}
                        paginator
                        rows={4}
                        tableStyle={{ minWidth: "50rem", height: "100%" }}
                        header={header}
                        globalFilter={globalFilter}
                        selectionMode="single"
                    >
                        <Column
                            field="soldeTotale"
                            header="Solde Totale de parrainage"
                          
                        />
                       
                        <Column field="totalRetrait" header="Total retrait" />

                        <Column
                            header="Dette de Campay"
                            field="totaldette"
                          
                        />
                    </DataTable>
                </div>
            </div>
            <br />
            
        </>
    );
};

export default Totale
;
