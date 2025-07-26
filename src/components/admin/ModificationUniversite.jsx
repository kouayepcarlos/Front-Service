import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "primereact/button";
import "../../assets/css/admin/sujet.css";
import { useAdminContext } from "../../Contexts/AdminProvider";

const ModificationUniversite = () => {
    const { data, updateUniversiteMutation } = useAdminContext();
    const [type, setType] = useState(data.type);
    const [filiere, setFiliere] = useState(data.filiere);
    const [matiere, setMatiere] = useState(data.matiere);
    const [etablissement, setEtablissement] = useState(data.etablissement);
    const [statut, setStatut] = useState(data.status);
    const [niveau, setNiveau] = useState(data.niveau);
    const [session, setSession] = useState(data.session);
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await updateUniversiteMutation.mutateAsync({
                id: data.id,
                type,
                filiere,
                matiere,
                etablissement,
                statut,
                niveau,
                session,
            });

            //navigate("/listesujet")
        } catch (error) {
            //  console.error("Erreur lors de la connexion :", error);
            //   setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            // setLoading(false);
        }
    };

    return (
        <>
            <div className=" p-4 shadow-md rounded-md content">
                <h3>Modification Sujet</h3>
                <div className="card flex px-sm-4 pt-5 justify-content-center">
                    <Form onSubmit={handleSubmit} className="px-2 pb-2">
                     

                        <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
                            <Form.Select
                                aria-label="choix filière"
                                value={filiere}
                                onChange={(e) => {
                                    setFiliere(e.target.value);
                                }}
                            >
                                <option value="">Filière</option>
                                <option value="Info">Info</option>
                                <option value="Math">Math</option>
                                <option value="chimie">chimie</option>
                            </Form.Select>
                        </div>

                        <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
                            
                            
                            <Form.Control
                                className="mb-3 h-12rem"
                                onChange={(e) =>
                                    setEtablissement(e.target.value)
                                }
                                type="text"
                                required
                                value={etablissement}
                                placeholder="Etablissement"
                            />
                        
                            <Form.Select
                                aria-label="statut"
                                 className="mb-3 h-12rem"
                                value={statut}
                                onChange={(e) => {
                                    setStatut(e.target.value);
                                }}
                                required
                            >
                                <option value="">statut etablissement</option>
                                <option value="privé">privé</option>
                                <option value="public"> public</option>
                            </Form.Select>
                            
                            <Form.Control
                                className="mb-3 h-12rem"
                                onChange={(e) =>
                                    setNiveau(e.target.value.toString())
                                }
                                type="number"
                                placeholder="niveau"
                                value={parseInt(niveau)}
                                required
                            />
                            <Form.Control
                                className="mb-3 h-12rem"
                                onChange={(e) =>
                                    setSession(parseInt(e.target.value, 10))
                                }
                                type="number"
                                placeholder="session"
                                value={session}
                                required
                            />
                            <Form.Select
                                aria-label="Type"
                                value={type}
                                onChange={(e) => {
                                    setType(e.target.value);
                                }}
                            >
                                <option value="">Type epreuve</option>
                                <option value="examen">examen</option>
                                <option value="rattrapage"> rattrapage</option>
                                <option value="td">td</option>
                            </Form.Select>
                        </div>

                        <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
                            {" "}
                            <Form.Control
                                className="mb-3 h-12rem"
                                onChange={(e) => setMatiere(e.target.value)}
                                type="text"
                                placeholder="Matiere"
                                required
                                value={matiere}
                            />
                            
                        </div>

                        {filiere != "" && type != "" && statut != "" && (
                            <Button
                                type="submit"
                                label="Modifier"
                                className="p-button-success mt-4"
                            />
                        )}
                    </Form>
                </div>
            </div>
            <div style={{marginBottom:"150px"}}></div>
        </>
    );
};

export default ModificationUniversite;
