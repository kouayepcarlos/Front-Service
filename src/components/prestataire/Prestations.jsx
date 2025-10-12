/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/prestataire/prestataire.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Prestations = ({ prestations }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const prestationsPerPage = 12;

  // State pour prestations mélangées
  const [shuffledPrestations, setShuffledPrestations] = useState([]);

  // Mélanger aléatoirement une seule fois à la réception des prestations
  useEffect(() => {
    if (prestations && prestations.length > 0) {
      const arr = [...prestations].reverse();
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setShuffledPrestations(arr);
      setCurrentPage(1); // reset page à 1 si nouvelles données
    }
  }, [prestations]);

  // Pagination
  const indexOfLast = Math.min(currentPage * prestationsPerPage, shuffledPrestations.length);
  const indexOfFirst = (currentPage - 1) * prestationsPerPage;
  const currentPrestations = shuffledPrestations.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(shuffledPrestations.length / prestationsPerPage);

  return (
    <div className="mx-5 pb-5">
      {/* Grille responsive */}
      <div className="prestations-grid">
        {currentPrestations.map((prestation) => (
          <div key={prestation.id} className="card sujet-card text-dark">
            <img
              src={prestation.file_url}
              className="card-img-top"
              style={{ height: "150px", objectFit: "cover" }}
              alt={prestation.nom}
            />
            <div className="card-bodyy prestation-body  d-flex flex-column"  >
              <h5 className="card-title">{prestation.nom}</h5>
              <h5 className="card-title">{prestation.description_courte}</h5>
              <p className="card-text">
                {`${prestation.pays}, ${prestation.ville} ${prestation.quartier}`}
              </p>
              <p className="card-text">{prestation.profession}</p>
              <button
                className="btn btn-custom1 mt-auto"
                onClick={() =>
                  navigate(`/prestataire/visualisation/${prestation.id}`)
                }
              >
                Voir
              </button>
            </div>
          </div>
        ))}
      </div>
<br />
      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

     
    </div>
  );
};

export default Prestations;
