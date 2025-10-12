import axios from "axios";


// 🔧 Création d'une instance Axios préconfigurée pour éviter les répétitions
const API = axios.create({
    baseURL: "https://api.nilservice.net/api", // URL de base de l'API Laravel
    headers: {
        "Content-Type": "application/json", // On envoie les données au format JSON par défaut
    },
    // withCredentials: true, // Optionnel si on utilise les cookies pour l'auth (non utilisé ici)
});

// 📦 Objet qui regroupe toutes les fonctions liées à l'authentification et gestion du 
export const authAPINewsletter = {
    
    subscribe: async (email) => {
        try {
            const response = await API.post("/newsletter/subscribe", email); // Inscription via API
            console.log(response);
            return response.data; // Retourne la réponse
        } catch (error) {
            console.log(error);
            return (
                error.response?.data || {
                    status: "error",
                    message: error.message,
                }
            );
        }
    },
  }