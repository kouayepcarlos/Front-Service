import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/vendeur/boutique.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Boutiques = ({ boutiques }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const boutiquesPerPage = 12;

  // State pour boutiques mélangées
  const [shuffledBoutiques, setShuffledBoutiques] = useState([]);

  // Mélanger aléatoirement à chaque changement de boutiques
  useEffect(() => {
    if (boutiques && boutiques.length > 0) {
      const arr = [...boutiques].reverse();
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setShuffledBoutiques(arr);
      setCurrentPage(1); // reset page à 1 si nouvelles données
    }
  }, [boutiques]);

  // Pagination
  const indexOfLast = Math.min(currentPage * boutiquesPerPage, shuffledBoutiques.length);
  const indexOfFirst = (currentPage - 1) * boutiquesPerPage;
  const currentBoutiques = shuffledBoutiques.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(shuffledBoutiques.length / boutiquesPerPage);

  return (
    <div className="mx-5 pb-5">
      <div className="grid-container">
        {currentBoutiques.map((boutique) => (
          <div key={boutique.id} className="grid-item">
            <div className="card sujet-card text-dark">
              <img
                src={boutique.file_url}
                className="card-img-top"
                style={{ height: "150px", objectFit: "cover" }}
                alt={boutique.nom}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{boutique.nom}</h5>
                <p className="card-text">{`${boutique.ville} ${boutique.quartier}`}</p>
                <button
                  className="btn btn-custom1 mt-auto"
                  onClick={() => navigate(`/vendeur/home/${boutique.id}`)}
                >
                  Voir
                </button>
              </div>
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

export default Boutiques;
