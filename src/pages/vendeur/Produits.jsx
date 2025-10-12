/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/prestataire/prestataire.css";
import "../../assets/css/connexion.css";

import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../components/Footer";
import NavBar from "../../components/navbar/NavBar";
import Publicite from "../../components/Publicite";
import Chat from "../../components/Chat";
import Redirection from "../../components/Redirection";
import { useRegister } from "../../Contexts/VendeurProvider";

const Produits = () => {
  const { boutiques } = useRegister();
  const { id } = useParams();
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);
  const [nom, setNom] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const produitsPerPage = 12;

  // Récupération de la boutique
  useEffect(() => {
    if (!boutiques) return;

    const result = boutiques.find((c) => c.id == id);
    if (result) {
      setNom(result?.nom);

      // Mélanger aléatoirement les produits **une seule fois**
      const shuffled = [...result.produits];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setProduits(shuffled);
    } else {
      setProduits([]);
    }
  }, [boutiques, id]);

  // Filtrage par recherche
  const filteredProduits = produits.filter((produit) => {
    const search = searchTerm.toLowerCase().replace(/\s+/g, "");
    return (
      produit?.nom.toLowerCase().replace(/\s+/g, "").includes(search) 
    );
  });

  // Pagination
  const indexOfLast = currentPage * produitsPerPage;
  const indexOfFirst = indexOfLast - produitsPerPage;
  const currentProduits = filteredProduits.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProduits.length / produitsPerPage);

  return (
    <div className="general">
      <Publicite />
      <div className="my-custom-div">
        <NavBar />
        <section className="mb-5">
          <Redirection
            texte={`Bienvenue chez ${nom}! Découvrez nos produits.`}
          />
          <div className="mx-5 mb-4">
            <p className="fw-bold text-muted fs-5">
              Filtrez les produits pour affiner votre recherche :
            </p>
            <div className="input-group input-group-sm search-box w-100">
              <input
                type="text"
                className="form-control"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="input-group-text">
                <i className="fa fa-search"></i>
              </span>
            </div>
          </div>

          {currentProduits.length === 0 ? (
            <p className="mx-5">Aucun produit</p>
          ) : (
            <div className="mx-5 pb-5 produits-grid">
              {currentProduits.map((produit) => (
                <div key={produit.id} className="card sujet-card text-dark">
                  <img
                    src={produit?.file_url}
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                    alt={produit?.nom}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-dark"> {produit?.nom} </h5>
                    <p>{produit?.prix} XAF</p>
                    {/* Bouton d’action (ici Supprimer, mais aucune logique derrière) */}
                    <button
                      className="btn btn-custom1 mt-auto"
                      onClick={() => {
                        navigate(`/vendeur/visualisation/${id}/${produit.id}`);
                      }}
                    >Voir plus</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center">
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
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
           {/* Grid CSS */}
          <style>{`
            .produits-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }
            @media (min-width: 768px) {
              .produits-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }
            @media (min-width: 992px) {
              .produits-grid {
                grid-template-columns: repeat(4, 1fr);
              }
            }
          `}</style>
        </section>
        <Chat />
        <Footer />
      </div>
    </div>
  );
};

export default Produits;
