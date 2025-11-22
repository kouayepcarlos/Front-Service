import React from 'react'
import { useState } from 'react';
const SlideGridconcours = ({ sujets, isAccess, handleDownload,handleDownloadcorrection, itemsPerPage = 12,user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sujets.length / itemsPerPage);
  const currentItems = sujets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="sujets-grid">
        {currentItems.map((sujet) => (
          <div key={sujet.id} className="card  sujet-card shadow-sm">
                    <img
                      src={sujet.image}
                      className="card-img-top"
                      alt={sujet.matiere}
                    />
                    <div className="card-bodyy d-flex flex-column">
                      <h5 className="card-title text-dark">{`${sujet.matiere}`}</h5>
                      <p className="card-text text-dark">{`${sujet.type} ${sujet?.concours}  ${sujet.annee}`}</p>

                      {console.log(
                        "SUJET actuel:",
                        sujet.matiere,
                        "ACCÈS actuel:",
                        isAccess(sujet, user)
                      )}

                      <button
                        className={
                          isAccess(sujet, user)
                            ? "btn btn-custom1 mt-auto"
                            : "bt disabled-button mt-auto"
                        }
                        onClick={() => handleDownload(sujet.id)}
                      >
                        voir sujet
                        {isAccess(sujet, user) && (
                          <i className="fa-solid fa-lock-open pl-2"></i>
                        )}
                        {!isAccess(sujet, user) && (
                          <i className="fa-solid fa-lock pl-2"></i>
                        )}
                      </button>
                      <br />
                      {!sujet.correction ? (
                        <p className="card-text text-danger">
                          Aucune Correction
                        </p>
                      ) : (
                        <button
                          className="btn btn-custom1 mt-auto"
                          onClick={() => handleDownloadcorrection(sujet.id)}
                        >
                          Voir la correction de l'epreuve
                        </button>
                      )}
                    </div>
                  
          </div>
        ))}
      </div>
<br />
      {/* Pagination interne */}
      {totalPages > 1 && (
       <div className="pagination mt-3">
  <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>Précédent</button>
  {[...Array(totalPages)].map((_, idx) => (
    <button
      key={idx}
      className={`btn ${currentPage === idx + 1 ? "btn-primary" : "btn-light"}`}
      onClick={() => setCurrentPage(idx + 1)}
    >
      {idx + 1}
    </button>
  ))}
  <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>Suivant</button>
</div>
      )}
    </div>
  );
};


export default  SlideGridconcours