import { Star } from "lucide-react";

const ProductRating = ({ rating }) => {
  // Assurez-vous que rating est entre 0 et 5
  const maxStars = 5;

  return (
    <div className="flex items-center mt-2">
      {[...Array(maxStars)].map((_, index) => (
        <Star
          key={index}
          size={24}
          className={`${
            index < rating ? "text-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default ProductRating;
