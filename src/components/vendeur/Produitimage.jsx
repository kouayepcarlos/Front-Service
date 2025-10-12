import { useState, useEffect } from "react";

const ProduitImages = ({ image1, image2, image3 }) => {
  // Crée un tableau avec les images disponibles
  const images = [image1, image2, image3].filter(Boolean);

  const [mainImage, setMainImage] = useState(null);

  // Met à jour mainImage dès que les images changent
  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0]);
    }
  }, [image1, image2, image3]); // Déclenché à chaque changement de props

  const handleClick = (img) => {
    setMainImage(img);
  };

  if (images.length === 0) return null; // Aucun visuel à afficher

  return (
    <div className="produit-images">
      {/* Image principale */}
      <div className="main-image mb-3">
        <img
          src={mainImage}
          alt="Produit principal"
          className="img-fluid w-100"
          style={{ maxHeight: "400px", objectFit: "contain" }}
        />
      </div>

      {/* Miniatures */}
      <div className="d-flex gap-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Miniature ${index + 1}`}
            className={`img-thumbnail ${img === mainImage ? "border-primary" : ""}`}
            style={{ width: "100px", height: "100px", objectFit: "contain", cursor: "pointer" }}
            onClick={() => handleClick(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProduitImages;
