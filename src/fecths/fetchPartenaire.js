import axios from "axios";
import { toast } from "react-toastify";

// 🔧 Création d'une instance Axios préconfigurée pour éviter les répétitions
const API = axios.create({
    baseURL: "https://api.nilservice.net/api", // URL de base de l'API Laravel
    headers: {
        "Content-Type": "application/json", // On envoie les données au format JSON par défaut
    },
    // withCredentials: true, // Optionnel si on utilise les cookies pour l'auth (non utilisé ici)
});

// 📦 Objet qui regroupe toutes les fonctions liées à l'authentification et gestion du partenaire
export const authAPIPartenaire = {
    // 🔐 Fonction de connexion d’un partenaire
    login: async (credentials) => {
        try {
            const response = await API.post("/partenaire/login", credentials); // Envoie email/téléphone + mot de passe

            if (response.data?.partenaire) {
                // Stocke les données de l’utilisateur dans sessionStorage
                sessionStorage.setItem(
                    "user",
                    JSON.stringify(response.data.partenaire)
                );
                console.log(sessionStorage.getItem("user")); // Debug
            }
            console.log(response);
            return response.data; // Retourne la réponse complète
        } catch (error) {
            console.error(
                "Erreur de connexion:",
                error.response?.data || error.message
            );
            throw error; // Permet de gérer l’erreur dans le composant React
        }
    },
      forgotPassword: async (email) => {
        try {
            const res = await API.post("/auth/password/email", {
                email: email,
                broker: "partenaires",
            });
            console.log(res);
            return res;
        } catch (error) {
            console.log("Erreur :", error);
            return {
                status: "error",
                message: error.response?.data?.message || error.message,
            };
        }
    },
       withdrawal: async (montant) => {
        console.log(montant);
        const token = sessionStorage.getItem("token");
        try {
            const res = await API.post(
                "/partenaire/retrait",
                { montant: montant },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return res.data;
        } catch (error) {
            if(error?.response?.data?.data?.data)
            toast.error(error?.response?.data?.data?.data?.message)
        else
            toast.error(error?.message);
            throw error;
        }
    },
    // 📝 Fonction d’inscription d’un nouveau partenaire
    register: async (credentials) => {
        try {
            const response = await API.post("partenaire/register", credentials); // Inscription via API
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
       getSolde: async () => {
         const token = sessionStorage.getItem("token");
        try {
            const res = await API.get("/partenaire/soldeCourant", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des soldes :", error);
            return {
                status: "error",
                message: error.response?.data?.message || error.message,
            };
        }
    },
     LastAbonnement: async () => {
         const token = sessionStorage.getItem("token");
        try {
            const res = await API.get("/partenaire/lastAbonnement", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(res)
            return res.data.data
        } catch (error) {
            console.error("Erreur lors de la récupération des messages :", error);
            return {
                status: "error",
                message: error.response?.data?.message || error.message,
            };
        }
    },

    // ✅ Vérifie si l'utilisateur est toujours connecté (token valide)
    checkout: async () => {
        const token = sessionStorage.getItem("token"); // Récupère le token

        try {
            if (!token) {
                toast.error("Utilisateur non authentifié !");
                return;
            }
            console.log(token);

            await API.get("partenaire/check-auth", {
                headers: {
                    Authorization: `Bearer ${token}`, // Ajoute le token dans les headers
                },
            });

            console.log("Utilisateur authentifié");
        } catch (error) {
            return error;
            // Ici, tu pourrais aussi rediriger ou supprimer le token
        }
    },

    // 📄 Complète le profil d’un partenaire avec ses fichiers (CV, CNI, photo)
    completedAccount: async (credentials) => {
        const token = sessionStorage.getItem("token");

        // Vérifie que tous les fichiers sont fournis
        if (!credentials.cv || !credentials.photo || !credentials.cni) {
            toast.error("Veuillez ajouter tous les fichiers !");
            return;
        }

        // Construction du formulaire d'envoi de fichiers
        const formData = new FormData();
        formData.append("pays", credentials.pays);
        formData.append("ville", credentials.ville);
        formData.append("quartier", credentials.quartier);
        formData.append("description", credentials.description);
        formData.append("cni", credentials.cni);
        formData.append("cv", credentials.cv);
        formData.append("photo", credentials.photo);

        try {
            if (!token) {
                toast.error("Utilisateur non authentifié !");
                return;
            }

            // Envoi du formulaire avec fichier (multipart)
            const response = await API.post(
                "/partenaire/completeAccount",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            toast.error("Erreur lors du téléchargement du fichier.");
            throw error;
        }
    },

    // 🖼️ Ajoute une réalisation (titre + image)
    Ajoutrealisation: async (credentials) => {
        const token = sessionStorage.getItem("token");
        console.log(credentials); // Debug

        if (!credentials.image) {
            toast.error("Veuillez ajouter tous les fichiers !");
            return;
        }

        const formData = new FormData();
        formData.append("title", credentials.title);
        formData.append("image", credentials.image);

        try {
            if (!token) {
                toast.error("Utilisateur non authentifié !");
                return;
            }

            // Envoie de la réalisation
            const response = await API.post(
                "/partenaire/ajoutRealisation",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            toast.error("Erreur lors du téléchargement du fichier.");
            throw error;
        }
    },

    // 🚪 Déconnexion du partenaire
    logout: async () => {
        try {
            const token = sessionStorage.getItem("token");

            const response = await API.get("/partenaire/logout", {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data; // Message de confirmation de logout
        } catch (error) {
            console.error(
                "Erreur de déconnexion:",
                error.response?.data || error.message
            );
            throw error;
        }
    },

    me: async () => {
        const token = sessionStorage.getItem("token");

        try {
            if (!token) {
                toast.error("Utilisateur non authentifié !");
                return;
            }

            const me = await API.get("/partenaire/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(me);
            // Retourne uniquement la liste des réalisations
            return me.data;
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
            throw error;
        } finally {
            // Ici tu peux désactiver un loading si besoin
        }
    },

    partenaireid: async (id) => {
        //  console.log(credentials);

        try {
            const response = await API.get(`/partenaire/partenaire/${id.id}`);

            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    allRealisationid: async (id) => {
        try {
            const realisation = await API.get(
                `/partenaire/listeRealisationid/${id.id}`
            );

            // Retourne uniquement la liste des réalisations
            return realisation.data;
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
            throw error;
        } finally {
            // Ici tu peux désactiver un loading si besoin
        }
    },
    objectifEncours: async () => {
        const token = sessionStorage.getItem("token");

        try {
            if (!token) {
                toast.error("Utilisateur non authentifié !");
                return;
            }

            const me = await API.get("/partenaire/monobjectif", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(me);
            // Retourne uniquement la liste des réalisations
            return me.data;
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
            throw error;
        } finally {
            // Ici tu peux désactiver un loading si besoin
        }
    },
    getFilleuls: async () => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Utilisateur non authentifié !");
            return;
        }
        console.log(token);
        try {
            const res = await API.get("/partenaire/filleuls", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(res.data);
            return res;
        } catch (error) {
            console.error("Erreur lors de la récupération des sujets :", error);
            return {
                status: "error",
                message: error.response?.data?.message || error.message,
            };
        }
    },
    nouvelAbonnement: async (credentials) => {
        const token = sessionStorage.getItem("token"); 
        console.log(token)
        try {
            console.log(credentials);
            const response = await API.post(
                "partenaire/abonnement",credentials, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Ajoute le token dans les headers
                    },
                });
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

    getObjectifs: async () => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Utilisateur non authentifié !");
            return;
        }
        console.log(token);
        try {
            const res = await API.get("/partenaire/objectifs", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des sujets :", error);
            return {
                status: "error",
                message: error.response?.data?.message || error.message,
            };
        }
    },
    resetPassword: async (data) => {
        try {
            const res = await API.post("auth/reset-password", data);
            return res;
        } catch (error) {
            console.log("Erreur :", error);
            return {
                status: "error",
                message: error.response?.data?.message || error.message,
            };
        }
    },
};
