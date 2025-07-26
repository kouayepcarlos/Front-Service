import React, { useState } from 'react';

const Popup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <span className="close-button" onClick={closePopup}>&times;</span>
            <h2>Avertissement</h2>
            <p>Nous ne sommes pas responsables des anarques sur le site.</p>
            <p>Pour plus d'informations, veuillez consulter notre page de conditions d'utilisation.</p>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Popup;
