import "../assets/css/homepage.css";
/* eslint-disable react/prop-types */
/**
 * @typedef {Object} RedirectionParams
 * @property {string} texte - le texte de description
 * @property {string} nomBoutton - le nom du button
 * @property {string} lien - le lien de la page ou renvoyer l'utilisateur
 */

/**
 * permet de rediriger l'utilisateur vers une autre page
 * @param {RedirectionParams} params
 * @returns
 */


const Redirection = ({ texte, nomBoutton, lien, handlClick }) => {
  return (
    <div className={`flex-column gap-2 ${nomBoutton?'pt-4':''} pb-3 espace-home body-nav px-3  body-back `}>
      {!nomBoutton && <div className="pt-3"></div>}
      <p >{texte}</p>
     {nomBoutton && <button className="butt1 "onClick={handlClick}>
        <a href={lien}>
          <i className="fa-solid fa-plus" ></i> <span className="creerCompte">{nomBoutton}</span>
        </a>
      </button>}
    </div>
  );
};

export default Redirection;
