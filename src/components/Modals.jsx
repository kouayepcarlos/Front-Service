import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../assets/css/modal.css";
import apercu from "../assets/images/apercu.png";

/**
 *  @typedef {Object} ModalParams
 *  @property {string} texte - le titre du modal
 * @property {string} img - le lien de l'image
 * @property {string} desc - la description de l'image
 * @property {string} prix - le prix de l'image

 */
/**
 * permet d'ouvrir un modal de description d'un produit
  * @param {ModalParams} params
 * @returns 
 */
export const Modals = ({ texte, img, desc, prix }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="hover-mod Modal">
      <Button variant="warning" className="modal-hover" onClick={handleShow}>
       <img src={apercu} alt="rien" width={20} />
      </Button>

      <Modal show={show} onHide={handleClose} className="Modal">
        <Modal.Header closeButton>
          <Modal.Title>{texte}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={img} />
          <p>{desc}</p>
          <p>{prix}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Payer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modals;
