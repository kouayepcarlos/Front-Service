import axios from "axios";




/**
 * Instance Axios pour la gestion du CSRF
 * Utilisée uniquement pour récupérer le cookie CSRF
 */
const sanctumAPI = axios.create({
    baseURL: "https://api.nilservice.net/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },

    withCredentials: true, // Indispensable pour Sanctum - permet d'envoyer et recevoir des cookies
});

/**
 * Instance principale pour les requêtes API
 * Utilisée pour toutes les requêtes d'authentification et de données
 */
const API = axios.create({
    baseURL: "https://api.nilservice.net/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest", // Requis par Sanctum pour identifier les requêtes XHR
    },
    withCredentials: true, // Obligatoire pour gérer les cookies de session et CSRF
    withXSRFToken: true, // Permet à Axios de gérer automatiquement le token CSRF
});

/**
 * Initialise le CSRF token en récupérant un cookie du serveur
 * Cette fonction doit être appelée avant toute requête nécessitant une protection CSRF
 * @returns {Promise} Résultat de la requête CSRF
 */
const initializeCSRF = async () => {
    try {
        return await sanctumAPI.get("/sanctum/csrf-cookie");
    } catch (error) {
        // console.error("Erreur lors de l'initialisation du CSRF:", error);
        console.error("Erreur lors de l'initialisation du CSRF:", error);
        throw error; // Propager l'erreur pour une meilleure gestion
    }
};

/**
 * API d'authentification pour les utilisateurs de l'académie
 * Contient toutes les méthodes liées à l'authentification
 */

export const authAPI = {
    /**
     * Connecte un utilisateur avec ses identifiants
     * @param {Object} credentials - Identifiants de l'utilisateur (telephone, password)
     * @returns {Promise<Object>} Données de l'utilisateur connecté
     */
    login: async (credentials) => {
        try {
            await initializeCSRF(); // Initialiser le CSRF avant login
            const response = await API.post("/usersacademy/login", credentials);

            // Stocker les informations de session dans localStorage pour la persistance
            if (response.data?.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                // console.log(localStorage.getItem("user"));
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("lastActivity", Date.now().toString());
            }

            return response.data;
        } catch (error) {
            console.error(
                "Erreur de connexion:",
                error.response?.data || error.message
            );
            throw error;
        }
    },

    /**
     * Inscrit un nouvel utilisateur
     * @param {Object} credentials - Données d'inscription de l'utilisateur
     * @returns {Promise<Object>} Résultat de l'inscription
     */
    register: async (credentials) => {
        try {
            console.log(credentials);
            await initializeCSRF(); // Initialiser le CSRF avant register
            console.log(credentials);
            const response = await API.post(
                "usersacademy/register",
                credentials
            );
            return response.data;
        } catch (error) {
            console.log(error)
            return (
                error.response?.data || {
                    status: "error",
                    message: error.message,
                }
            );
        }
    },

    completedAccount: async (data) => {
        try {
            const response = await API.post(
                "usersacademy/completedAccount",
                data
            );
            return response.data;
        } catch (error) {
            return (
                error.response?.data || {
                    status: "error",
                    message: error.message,
                }
            );
        }
    },

    /**
     * Déconnecte l'utilisateur actuel
     * @returns {Promise<Object>} Résultat de la déconnexion
     */
    logout: async () => {
        try {
            const response = await API.post("/usersacademy/logout");

            // Nettoyer les données de session du localStorage
            localStorage.removeItem("lastActivity");
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");

            return response.data;
        } catch (error) {
            console.error(
                "Erreur de déconnexion:",
                error.response?.data || error.message
            );

            // Même en cas d'erreur, on nettoie le localStorage
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("lastActivity");
            throw error;
        }
    },

    /**
     * Vérifie si l'utilisateur est authentifié
     * @returns {Promise<Object>} Données de l'utilisateur si authentifié
     */
    checkAuth: async () => {
        try {
            const response = await API.get("/usersacademy/check-session");
            console.log(response);

            // Mettre à jour les informations utilisateur dans localStorage
            if (response.data?.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("lastActivity", Date.now().toString());
            }

            return response.data;
        } catch (error) {
            // En cas d'erreur (session expirée), nettoyer le localStorage
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");
            console.error(
                "Erreur d'authentification:",
                error.response?.data || error.message
            );
            throw error;
        }
    },

    /**
     * Récupère l'utilisateur depuis le localStorage
     * @returns {Object|null} Utilisateur stocké ou null
     */
    getStoredUser: () => {
        try {
            const user = localStorage.getItem("user");
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error(
                "Erreur lors de la récupération de l'utilisateur stocké:",
                error
            );
            return null;
        }
    },

    /**
     * Vérifie si la session est active basée sur le localStorage
     * @returns {boolean} True si l'utilisateur est authentifié localement
     */
    isAuthenticated: () => {
        return localStorage.getItem("isAuthenticated") === "true";
    },

    /**
     * Vérifie si la session a expiré basée sur l'inactivité
     * @param {number} sessionTimeout - Durée de la session en millisecondes (défaut: 30 minutes)
     * @returns {boolean} True si la session a expiré
     */
    isSessionExpired: (sessionTimeout = 10 * 60 * 1000) => {
        const lastActivity = localStorage.getItem("lastActivity");
        if (!lastActivity) return true;

        const now = Date.now();
        const lastActivityTime = parseInt(lastActivity, 10);

        return now - lastActivityTime > sessionTimeout;
    },
//fonction pour visualiser un sujet d'examen
getUser: async (id) => {
    try {
        console.log(id);
        const response = await API.get(
            `usersacademy/finduser/${id}`
        );
        // creer un url utilisable pour l'affichage
       return response
    } catch (error) {
        //  console.error("Erreur lors du téléchargement :", error);
        console.log("Impossible d'afficher ce sujet.", error);
    }
},

    //fonction pour visualiser un sujet d'examen
    downloadSubjet: async (id) => {
        try {
            console.log(id);
            const response = await API.get(
                `usersacademy/telechargerSujetExamen/${id}`,
                {
                    responseType: "blob",
                }
            );

            // creer un url utilisable pour l'affichage
            const fileURL = URL.createObjectURL(response.data);

            return fileURL;
        } catch (error) {
            //  console.error("Erreur lors du téléchargement :", error);
            console.log("Impossible d'afficher ce sujet.", error);
        }
    },

    //fonction pour visualiser un sujet d'universite
    downloadSubjetUniversite: async (id) => {
        try {
            console.log(id);
            const response = await API.get(
                `usersacademy/downloadSujetUniversite/${id}`,
                {
                    responseType: "blob",
                }
            );


            const fileURL = URL.createObjectURL(response.data);

            return fileURL;
        } catch (error) {
            //  console.error("Erreur lors du téléchargement :", error);
            console.log("Impossible d'afficher ce sujet.", error);
        }
    },

    //fonction pour envoyer un message du chat
    sendMessage: async (message) => {
        try {
            const res = await API.post("usersacademy/sendmessage", message);
            return res.data;
        } catch (error) {
            console.error("Erreur :", error);
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
                "usersacademy/abonnement",credentials, {
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

    //fonction pour envoyer une image du chat
    sendImage: async (fichier) => {
        try {
            const formData = new FormData();
            formData.append("fichier", fichier);
            const res = await API.post("usersacademy/sendimage", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return res.data.data;
        } catch (error) {
            console.error("Erreur :", error);
            return {
                status: "error",
                message: error.response?.data?.message || error.message,
            };
        }
    },

    //fonction pour envoyer un pdf dans le chat
    sendPdf: async (fichier) => {
        try {
            const formData = new FormData();
            formData.append("fichier", fichier);

            const res = await API.post("usersacademy/sendpdf", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return res.data.data;
        } catch (error) {
            console.error("Erreur :", error);
            return {
                status: "error",
                message: error.response?.data?.message || error.message,
            };
        }
    },

    //fonction de telechargement d'un fichierdu chat
    downloadDoc: async (id) => {
        try {
            console.log(id);
            const response = await API.get(`usersacademy/downloaddoc/${id}`, {
                responseType: "blob",
            });

            // Ouvrir le fichier dans un nouvel onglet
            const fileURL = URL.createObjectURL(response.data);

            window.open(fileURL, "_blank");


        } catch (error) {
            //  console.error("Erreur lors du téléchargement :", error);
            console.log("Impossible d'afficher ce sujet.", error);
        }
    },

    //fonction de recuperation de tous les messages du chat de la filiere
    allMessage: async () => {
        try {
            const res = await API.get("/usersacademy/showmessage");
            return res.data.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des messages :", error);
            return {
                status: "error",
                message: error.response?.data?.message || error.message,
            };
        }
    },

    getFilleuls: async () => {
        try {
            const res = await API.get("/usersacademy/filleuls");
            return res.data.data;
        } catch (error) {
            console.error("Erreur lors de la récupération des sujets :", error);
            return {
                status: "error",
                message: error.response?.data?.message || error.message,
            };
        }
    },
    //Api pour récuperer la liste de sujets
    fetchSujets: async () => {
        try {
            const res = await API.get("usersacademy/listeSujets");

            return res.data; // Toujours retourner les données attendues
        } catch (error) {
            console.error("Erreur lors de la récupération des sujets :", error);
            return {
                status: "error",
                message: error.response?.data?.message || error.message,
            };
        }
    },
    //Api pour récuperer la liste de sujets
    fetchSujetsUniversites: async () => {
        try {
            const res = await API.get("usersacademy/listeSujetsUniversites");
            return res.data; // Toujours retourner les données attendues
        } catch (error) {
            console.error("Erreur lors de la récupération des sujets :", error);
            return {
                status: "error",
                message: error.response?.data?.message || error.message,
            };
        }
    },

    //Api pour effectuer un abonnement
    fetchAbonnement: async (abonnement) => {
        try {
            const res = await API.post("usersacademy/abonnement", abonnement);
            return res.data;
        } catch (error) {
            console.error("Erreur lors de l operation  d abonnement :", error);
            return {
                status: "error",
                message: error.response?.data?.message || error.message,
            };
        }
    },

// Api pour la vérification du status d'une transaction
    fetchCheckTransaction: async (transaction_id)=>{
        try{
            const res =await API.get(`usersacademy/check/${transaction_id}`);
            return res.data

        }catch(error){
            console.log("Erreur lors de la vérification de la transaction:", error);
            return { status: "error", message: error.response?.data?.message || error.message };
        }
    },

    //   withdrawal: async (amount)=>{
    //     try {
    //         const res = await API.post("/usersacademy/retrait", amount);
    //         return(res.data);

    //     } catch (error) {
    //         console.log(error);
    //         throw error;

//     }
//   }

    forgotPassword: async (email)=>{
        try{
            const res= await API.post("usersacademy/forgot-password", email)
            return res;

        }catch(error){
            console.log("Erreur :", error);
            return { status: "error", message: error.response?.data?.message || error.message };
        }
    },
    resetPassword: async (data)=>{
        try{
            const res= await API.post("usersacademy/reset-password", data)
            return res;

        }catch(error){
            console.log("Erreur :", error);
            return { status: "error", message: error.response?.data?.message || error.message };
        }
    }
};
