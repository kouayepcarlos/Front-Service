import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import Sidebar from "../../components/admin/Sidebar";
import Navbaradmin from "../../components/admin/Navbaradmin";
import Chargersujet from "../../components/admin/Chargersujet";
import ModificationUniversite from "../../components/admin/ModificationUniversite";
import ModificationExamen from "../../components/admin/ModificationExamen";
import { useAdminContext } from "../../Contexts/AdminProvider";
import Addcorrection from "../../components/admin/Addcorrection";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";


/**
 * c'est la page de gestion des sujets 
 * les differentes operations sont
 * 1)l'ajout d'un sujet
 * 2)la modification d'un sujet
 * 3)la visualisation des informations des sujets
 * 4) la suppression d'un sujet
 * @returns 
 */
const Listesujet = () => {
    const { sujets, setData, deletesubjetMutation, downloadSubjetMutation,downloadSubjetcorrectionMutation } =
        useAdminContext();

    const [modifie, setModifie] = useState(false);
    const [categorie, setCategorie] = useState("");
    const [globalFilter, setGlobalFilter] = useState("");
    const [sujet,setSujet]=useState(null)
     const [loading, setLoading] = useState(false);

   

    const modifsujet = async (data) => {//permet de recuperer les informations du sujet a modifier et d'ouvrir le form de modification
      //  console.log(data);
        setCategorie(data.categorie);
        setData(data);
        setModifie(true);
    };

    const header = (//rechercher un sujet dans le tableau
        <div className="d-flex justify-content-between ">
            <h2 className="font-semibold">Liste sujets</h2>
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
                    className="fa-solid fa-pencil"
                    style={{ width: "30px", cursor: "pointer" }}
                    onClick={() => modifsujet(rowData)}
                ></i>
                <i
                    className="fa-regular fa-trash-can"
                    style={{ width: "40px", cursor: "pointer" }}
                    onClick={() =>
                        deletesubjetMutation.mutateAsync({
                            id: rowData.id,
                            categorie: rowData.categorie,
                        })
                    }
                ></i>

                <i
                    className="fa-solid fa-eye"
                    style={{ width: "40px", cursor: "pointer" }}
                    onClick={async() => {
                        setLoading(true)
                        try{
                       await  downloadSubjetMutation.mutateAsync({
                            id: rowData.id,
                            categorie: rowData.categorie,
                        });
                    }
                    catch(error){
                    //
                    }finally{setLoading(false)}
                    }}
                ></i>
            </div>
        );
    };

    return (
        <>
        {loading && <LoaderTransparent/>}
            <Navbaradmin />
            <Sidebar />
            <div className="content">
                <div className="card">
                    
                    <DataTable 
                        value={sujets}
                        paginator
                        rows={10}
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
                        <Column field="matiere" header="Matiere" />
                         <Column  field="titre" header="Titre" />
                        <Column
                            
                            header="Annee"
                            body={(rowData) =>
                               
                                    rowData.annee? rowData.annee: rowData.session
                              
                            }
                        />
                        <Column
                            
                            header="Serie/Filiere"
                            body={(rowData) =>
                                ( rowData.serie === 'null' || !rowData.serie)
                                ?  ( rowData.concours === 'null' || !rowData.concours)? `${rowData.filiere} ${rowData.niveau}`:rowData.concours
                                : rowData.serie
                        }
                        />
                         <Column
                            field="correction"
                            header="Correction"
                            body={(rowData) =>
                                ( rowData.correction === 'null' || !rowData.correction)
                                ?  <button onClick={()=>{setSujet(rowData)}}>Ajouter la correction</button>
                                :  <button  onClick={() => {
                        downloadSubjetcorrectionMutation.mutateAsync({
                            id: rowData.id,
                            categorie: rowData.categorie,
                        });
                    }}>Voir l'epreuve</button>
                        }
                        />
                        <Column
                            header="Action"
                            body={actionBodyTemplate}
                            style={{ width: "15%", textAlign: "center" }}
                        />
                    </DataTable>
                </div>
            </div>
            {modifie == true && categorie == "universite" && (
                <ModificationUniversite />
            )}
            {modifie == true && categorie == "examen" && <ModificationExamen />}

            {sujet && <Addcorrection epreuve={sujet}/>}
            
            <Chargersujet />
            <br />
        </>
    );
};

export default Listesujet;
