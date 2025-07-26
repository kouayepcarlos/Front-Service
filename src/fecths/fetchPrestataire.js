import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// 🔧 Création d'une instance Axios préconfigurée pour éviter les répétitions
const API = axios.create({
    baseURL: "https://api.nilservice.net/api", // URL de base de l'API Laravel
    headers: {
        "Content-Type": "application/json", // On envoie les données au format JSON par défaut
    },
    // withCredentials: true, // Optionnel si on utilise les cookies pour l'auth (non utilisé ici)
});

// 📦 Objet qui regroupe toutes les fonctions liées à l'authentification et gestion du prestataire
export const authAPIPrestataire = {
    // 🔐 Fonction de connexion d’un prestataire
    login: async (credentials) => {
        try {
            const response = await API.post("/prestataire/login", credentials); // Envoie email/téléphone + mot de passe

            if (response.data?.prestataire) {
                // Stocke les données de l’utilisateur dans sessionStorage
                sessionStorage.setItem(
                    "user",
                    JSON.stringify(response.data.prestataire)
                );
                console.log(sessionStorage.getItem("user")); // Debug
            }

            return response.data; // Retourne la réponse complète
        } catch (error) {
            console.error(
                "Erreur de connexion:",
                error.response?.data || error.message
            );
            throw error; // Permet de gérer l’erreur dans le composant React
        }
    },

    // 📝 Fonction d’inscription d’un nouveau prestataire
    register: async (credentials) => {
        try {
            console.log(credentials);
            const response = await API.post(
                "prestataire/register",
                credentials
            ); // Inscription via API
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
    nouvelAbonnement: async (credentials) => {
        const token = sessionStorage.getItem("token"); 
        console.log(token)
        try {
            console.log(credentials);
            const response = await API.post(
                "prestataire/abonnement",credentials, {
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

    // ✅ Vérifie si l'utilisateur est toujours connecté (token valide)
    checkout: async () => {
        const token = sessionStorage.getItem("token"); // Récupère le token

        try {
            if (!token) {
                toast.error("Utilisateur non authentifié !");
                return;
            }
            console.log(token);

            await API.get("prestataire/check-auth", {
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

    // 📄 Complète le profil d’un prestataire avec ses fichiers (CV, CNI, photo)
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
                "/prestataire/completeAccount",
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
    Ajoutproduit: async (credentials) => {
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
                "/prestataire/ajoutRealisation",
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

    // 🚪 Déconnexion du prestataire
    logout: async () => {
        try {
            const token = sessionStorage.getItem("token");

            const response = await API.get("/prestataire/logout", {
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

    // 📋 Récupère toutes les réalisations du prestataire connecté
    allRealisation: async () => {
        const token = sessionStorage.getItem("token");

        try {
            if (!token) {
                toast.error("Utilisateur non authentifié !");
                return;
            }

            const realisation = await API.get("/prestataire/listeRealisation", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(realisation);
            // Retourne uniquement la liste des réalisations
            return realisation.data.data;
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
            throw error;
        } finally {
            // Ici tu peux désactiver un loading si besoin
        }
    },
    me: async () => {
        const token = sessionStorage.getItem("token");

        try {
            if (!token) {
                toast.error("Utilisateur non authentifié !");
                return;
            }

            const me = await API.get("/prestataire/me", {
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
    allPrestataires: async () => {
        try {
            // Exécuter les deux requêtes en parallèle pour optimiser la performance
            const Prestataire = await API.get("prestataire/listeprestataire");

            // Vérifier les réponses et fusionner les données
            console.log(
                "Sujets fusionnés et triés :",
                Prestataire.data.data.data
            );
            return Prestataire.data.data.data.filter(
                (item) => item.statut === 'valide' || item.statut === 'complete'
              );
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
        } finally {
            //  setLoading(false);
        }
    },

    Prestataireid: async (id) => {
        //  console.log(credentials);

        try {
            const response = await API.get(`/prestataire/prestataire/${id.id}`);

            return response.data;
        } catch (error) {
            console.log(error);
        }
    },

    allRealisationid: async (id) => {
        try {
            const realisation = await API.get(
                `/prestataire/listeRealisationid/${id.id}`
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
    deleterealisation: async (credentials) => {
        console.log(credentials);

        const token = sessionStorage.getItem("token");
        const result = await Swal.fire({
            title: "Suppression realisation",
            confirmButtonText: "Confirmer",
            cancelButtonText: "Annuler",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonColor: "#3085d6",
            text: "Etes vous sur de vouloir supprimer?",
            customClass: {
                popup: "swal-padding-bottom",
            },
        });
        if (!result.isConfirmed) {
            return;
        }

        if (!token) {
            toast.error("Utilisateur non authentifié !");
            return;
        }

        try {
            const response = await API.delete(
                `prestataire/supprimerRealisation/${credentials.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            return response.data;
        } catch (error) {
            // console.error("Erreur lors de la suppression :", error);
            throw error;
        }
    },
    getFilleuls: async () => {
        const token = sessionStorage.getItem("token");
        console.log(token);
        try {
            const res = await API.get("/prestataire/filleuls", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(res.data);
            return res.data.original;
        } catch (error) {
            console.error("Erreur lors de la récupération des sujets :", error);
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
                "/prestataire/retrait",
                { montant: montant },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return res.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    forgotPassword: async (email) => {
        try {
            const res = await API.post("/auth/password/email", {
                email: email,
                broker: "prestataires",
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
