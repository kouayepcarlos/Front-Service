/* eslint-disable no-useless-catch */
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const API = axios.create({
    baseURL: "https://api.nilservice.net/api",
    headers: {
        "Content-Type": "application/json",
    },
    /// withCredentials: true,
});

export const authAPIVendeur = {
    /**
     * Connecte un utilisateur avec ses identifiants
     * @param {Object} credentials - Identifiants de l'utilisateur (telephone/email, password)
     * @returns {Promise<Object>} Données de l'utilisateur connecté
     */
    login: async (credentials) => {
        try {
            const response = await API.post("/vendeur/login", credentials);
            if (response.data?.vendeur) {
                sessionStorage.setItem(
                    "user",
                    JSON.stringify(response.data.vendeur)
                );
                console.log(sessionStorage.getItem("user"));
            }

            // Stocker les informations de session dans localStorage pour la persistance

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
            const response = await API.post("vendeur/register", credentials);

            return response.data;
        } catch (error) {
           throw error
        }
    },
    nouvelAbonnement: async (credentials) => {
        const token = sessionStorage.getItem("token"); 
        console.log(token)
        try {
            console.log(credentials);
            const response = await API.post(
                "vendeur/abonnement",credentials, {
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

    checkout: async () => {
        const token = sessionStorage.getItem("token");

        try {
            await API.get("vendeur/check-auth", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Authentifié → continuer
            console.log("Utilisateur authentifié");
        } catch (error) {
            return error;
            //   if (error.response?.status === 401) {
            //     console.warn('Token invalide ou expiré');
            //     sessionStorage.removeItem('token');
            //     navigate('/admin/connexion/admin');
            //   } else {
            //     console.error('Erreur inconnue :', error);
            //   }
        }
    },

    completedAccount: async (credentials) => {
        const token = sessionStorage.getItem("token");
        if (!credentials.cv || !credentials.photo || !credentials.cni) {
            toast.error("Veuillez ajouter tous les fihciers !");
            return;
        }

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

            let response = await API.post(
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
            //  console.error("Erreur lors de l'upload :", error);
            toast.error("Erreur lors du téléchargement du fichier.");
            throw error;
        }
    },
    Ajoutproduit: async (credentials) => {
        const token = sessionStorage.getItem("token");
        console.log(credentials); // Debug

      

        const formData = new FormData();
        formData.append("nom", credentials.nom);
        formData.append("prix", credentials.prix);
        formData.append("description", credentials.description);
        formData.append("categorie", credentials.categorie);
        formData.append("statut", credentials.statut);
      // Champs image (nullable)
  if (credentials.image1) formData.append("image", credentials.image1);
  if (credentials.image2) formData.append("image2", credentials.image2);
  if (credentials.image3) formData.append("image3", credentials.image3);
        try {
            if (!token) {
                toast.error("Utilisateur non authentifié !");
                return;
            }

            // Envoie de la réalisation
            const response = await API.post(
                "/vendeur/boutique/ajouterProduit",
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
    Creerboutique: async (credentials) => {
        const token = sessionStorage.getItem("token");
        console.log(credentials); // Debug

        if (!credentials.logo) {
            toast.error("Veuillez ajouter tous les fichiers !");
            return;
        }

        const formData = new FormData();
        formData.append("nom", credentials.nom);
        formData.append("pays", credentials.pays);
        formData.append("ville", credentials.ville);
        formData.append("quartier", credentials.quartier);
        formData.append("description", credentials.description);
        formData.append("logo", credentials.logo);
        try {
            if (!token) {
                toast.error("Utilisateur non authentifié !");
                return;
            }

            // Envoie de la réalisation
            const response = await API.post(
                "/vendeur/creerBoutique",
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

    allProduits: async () => {
        const token = sessionStorage.getItem("token");
        try {
            // Exécuter les deux requêtes en parallèle pour optimiser la performance
            const Produit = await API.get("vendeur/boutique/listeProduit", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Vérifier les réponses et fusionner les données
            console.log("Sujets fusionnés et triés :", Produit.data);
            return Produit.data.produits;
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
        } finally {
            //  setLoading(false);
        }
    },
    Monproduitid: async (id) => {
        //  console.log(credentials);
        console.log(id);
        const token = sessionStorage.getItem("token");
        try {
            const response = await API.get(
                `/vendeur/boutique/voirProduit/${id.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    Maboutique: async () => {
        //  console.log(credentials);

        const token = sessionStorage.getItem("token");
        try {
            const response = await API.get(`/vendeur/voirBoutique`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    Updateboutique: async (credentials) => {
        const token = sessionStorage.getItem("token");
        console.log(credentials); // Debug

        const formData = new FormData();
        formData.append("nom", credentials.nom);
      if (credentials.logo instanceof File) {
    formData.append("logo", credentials.logo);
}
        formData.append("pays", credentials.pays);
        formData.append("ville", credentials.ville);
        formData.append("quartier", credentials.quartier);
        formData.append("description", credentials.description);
       
       
        try {
            if (!token) {
                toast.error("Utilisateur non authentifié !");
                return;
            }

            // Envoie de la réalisation
            const response = await API.post(
                "/vendeur/updateBoutique",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            return response.data;
        } catch (error) {
            toast.error("Erreur lors du téléchargement du fichier.");
            throw error;
        }
    },
    deleteproduit: async (credentials) => {
        console.log(credentials);

        const token = sessionStorage.getItem("token");
        const result = await Swal.fire({
            title: "Suppression produit",
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

        // eslint-disable-next-line no-useless-catch
        try {
            const response = await API.delete(
                `vendeur/boutique/supprimerProduit/${credentials.id}`,
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
    updateproduit: async (credentials) => {
        // console.log(credentials);
        const token = sessionStorage.getItem("token");
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await API.put(
                `/vendeur/boutique/updateProduit/${credentials.id}`,
                {
                    nom: credentials.nom,
                    prix: credentials.prix,
                    categorie: credentials.categorie,
                    description: credentials.description,
                    statut: credentials.statut,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            throw error;
        }
    },
    logout: async () => {
        try {
            const token = sessionStorage.getItem("token");

            const response = await API.get("/vendeur/logout", {
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
    getFilleuls: async () => {
        const token = sessionStorage.getItem("token");
        try {
            const res = await API.get("/vendeur/filleuls", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return res.data.original;
        } catch (error) {
            console.error("Erreur lors de la récupération des sujets :", error);
            return {
                status: "error",
                message: error.response?.data?.message || error.message,
            };
        }
    },
    allBoutiques: async () => {
        try {
            // Exécuter les deux requêtes en parallèle pour optimiser la performance
            const Boutique = await API.get("home/listeboutiques");

            // Vérifier les réponses et fusionner les données
            console.log("Sujets fusionnés et triés :", Boutique.data);
            return Boutique.data.filter(
                (item) => item.vendeur.statut === 'valide'
              );
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
        } finally {
            //  setLoading(false);
        }
    },
   getSolde: async () => {
     const token = sessionStorage.getItem("token");
        try {
            const res = await API.get("/vendeur/soldeCourant", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("solde v",res)
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
            const res = await API.get("/vendeur/lastAbonnement", {
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

    withdrawal: async (montant) => {
        console.log(montant);
        const token = sessionStorage.getItem("token");
        try {
            const res = await API.post(
                "/vendeur/retrait",
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
    forgotPassword: async (email) => {
        try {
            const res = await API.post("/auth/password/email", {
                email: email,
                broker: "vendeurs",
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
