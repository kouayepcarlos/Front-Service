/* eslint-disable react/prop-types */
import { Modal, Button } from "react-bootstrap"; // Composants Bootstrap pour la modale
import { useAppContext } from "../../Contexts/AppProvider";
import { useEffect, useState } from "react";
import LoaderPaiement from "../LoadersCompoments/LoaderPaiement";
import "../../assets/css/modal.css"
import { authAPI } from '../../fecths/fecthAcademyUser';


export default function PayModal({showModal, handleClose}) {
    const {user, Abonnement}=useAppContext()
    const [data, setData]=useState({
        abonnement:null
    })
    const [loading, setLoading]=useState(false)
    const [message, setMessage]=useState('')
    const [statusPaiement, setStatusPaiement]=useState(null)

    const handlePay= async () =>{
        setLoading(true)
        setStatusPaiement("pending")
       const res= await Abonnement.mutateAsync(data)

       if(res?.paiement && res.paiement.status==="pending"){
         await checkPaiementStatus(res.paiement.transaction_id)
       }else{
            setStatusPaiement("failed")
            setLoading(true)
       }
    }



    const checkPaiementStatus = async (transaction_id) => {


        let isCompleted = false;

        // Vérifier le statut toutes les 5 secondes
        const interval = setInterval(async () => {
            try {
                const res = await authAPI.fetchCheckTransaction(transaction_id)
                console.log(res, res.data.status);

                if (res.data.status === "SUCCESSFUL") {
                    setStatusPaiement("success");
                    isCompleted = true;
                    setLoading(false)
                    clearInterval(interval);
                } else if (res.data.status === "FAILED") {
                    setStatusPaiement("failed");
                    isCompleted = true;
                    clearInterval(interval);
                }
            } catch (error) {
                console.error("Erreur lors de la vérification", error);
            }
        }, 5000);

        // Arrêter après 1 minute si pas de réponse
        let timer = setTimeout(() => {
            if (!isCompleted) {
                clearInterval(interval);
                setStatusPaiement("failed");
                setLoading(false)
            }
        }, 60000);

        clearTimeout(timer)
    };



  return (
                <Modal show={showModal} onHide={handleClose} centered className="" >
                    <Modal.Header closeButton className="h-4 py-2">
                        <Modal.Title>Payez votre abonnement</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center pb-0 Modal w-100 " >
                        <p></p>
                        { user.type === "étudiant" && <><div className="d-flex align-items-center p-2">
                            <p>le coût de votre  abonnement est de :</p>
                            <input type="text" className="form-control text-center" value="1000 fcfa" readOnly />
                        </div>
                        <div className="d-block align-items-center   ">
                            <button className="btn btn-success center" onClick={handlePay}>payez</button>
                        </div></>
                        }
                         { user.type === "élève" && <><div className="d-flex align-items-center p-2 ">
                            <p>le coût de votre  abonnement est de :</p>
                            <input type="text" className="form-control text-center" value="1000 fcfa" readOnly />
                        </div>
                        <div className="d-flex align-items-center    justify-content-end ">
                            {!loading && <button className="btn btn-success center" onClick={handlePay}>payez</button>}
                            {loading  && <LoaderPaiement/>}
                        </div>
                        <div className="pt-3 mb-0 ">
                            <p>{message}</p>
                        </div>
                        </>
                        }
                    </Modal.Body>
                    <Modal.Footer className="h-4 py-2">
                        {!loading && <Button variant="secondary" onClick={handleClose}>Fermer</Button>}
                    </Modal.Footer>
                </Modal>
)
}
