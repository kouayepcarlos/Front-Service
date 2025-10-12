import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "primereact/button";
import { useAdminContext } from "../../Contexts/AdminProvider";
import LoaderTransparent from "../LoadersCompoments/LoaderTransparent";
/**
 * cette page est dédié à l'enregistrement d'un admin
 * on renseigne le nom,l'email et le mot de passe 
 * @returns 
 */
const Inscription = () => {
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [passe, setPasse] = useState("");
const [loading,setLoading]= useState(false)
    const { addAdminMutation } = useAdminContext();

    const handleSubmit = async (event) => {
        event.preventDefault();
setLoading(true)
        try {
            await addAdminMutation.mutateAsync({
                nom,
                email,
                passe,
            });

            //navigate("/listesujet")
        } catch (error) {
          //  console.error("Erreur lors de la connexion :", error);
            //   setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
             setLoading(false);
        }
    };

    return (
        <>
            
            <div className=" p-4 shadow-md rounded-md content">
                {loading && <LoaderTransparent/>}
                <h3>Enregistrer administrateur</h3>
                <div className="card flex px-sm-4 pt-5 justify-content-center">
                    <Form onSubmit={handleSubmit} className="px-2 pb-2">
                        <div className="flex flex-column pr-3 mb-3 gap-5">
                            {" "}
                            <p style={{color:"red"}}>NB : Veuillez memoriser le mot de passe car il ne pouura plus etre visible</p>
                            <Form.Control
                                className="mb-3 h-12rem "
                                onChange={(e) => setNom(e.target.value)}
                                type="text"
                                required
                                placeholder="Entrer le nom"
                            />
                            <Form.Control
                                className="mb-3 h-12rem"
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Entrer l'email"
                                required
                            />
                            <Form.Control
                                className="mb-3 h-12rem"
                                onChange={(e) => setPasse(e.target.value)}
                                type="text"
                                placeholder="Entrer le mot de passe"
                                required
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
        </>
    );
};

export default Inscription;
