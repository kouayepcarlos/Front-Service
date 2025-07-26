import React, { useState} from "react";
import Form from "react-bootstrap/Form";
import { Button } from "primereact/button";
import "../../assets/css/admin/sujet.css";

import { useAdminContext } from "../../Contexts/AdminProvider";

const Modificationadmin = () => {
    const { dataadmin, updateAdminMutation } = useAdminContext();
    const [nom, setNom] = useState(dataadmin.username);
    const [email, setEmail] = useState(dataadmin.email);
    const [passe, setPasse] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await updateAdminMutation.mutateAsync({
                id: dataadmin.id,
                nom: nom == dataadmin.username ? null : nom,
                email: email == dataadmin.email ? null : email,
                passe,
            });

         
        } catch (error) {
          //  console.log(error)
        } finally {
            // setLoading(false);
        }
    };


    return (
        <>
        
            <div className=" p-4 shadow-md rounded-md content">
                <h3>Modification admin</h3>
                <div className="card flex px-sm-4 pt-5 justify-content-center">
                    <Form onSubmit={handleSubmit} className="px-2 pb-2">
                        <div className="flex flex-column h-12rem pr-3 mb-3 gap-5">
                            {" "}
                            
                            <Form.Control
                                className="mb-3 h-12rem"
                                onChange={(e) => setNom(e.target.value)}
                                value={nom}
                                type="text"
                                required
                                placeholder="Entrer le nom"
                            />
                            <Form.Control
                                className="mb-3 h-12rem"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                placeholder="Entrer l'email"
                                required
                            />
                            <Form.Control
                                className="mb-3 h-12rem"
                                value={passe}
                                onChange={(e) => setPasse(e.target.value)}
                                type="text"
                                placeholder="Entrer le mot de passe"
                                
                            />
                        </div>

                        <Button
                            type="submit"
                            label="Enregistrer"
                            className="p-button-success mt-4"
                        />
                    </Form>
                </div>
            </div>
            <div style={{marginBottom:"150px"}}></div>
        </>
    );
};

export default Modificationadmin;
