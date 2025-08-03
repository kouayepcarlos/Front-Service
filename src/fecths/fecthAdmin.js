import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

// Instance principale pour les requêtes API
const API = axios.create({
    baseURL: "https://api.nilservice.net/api",
    headers: {
        "Content-Type": "application/json",
    },
    /// withCredentials: true,
});

export const authAPIadmin = {
    login: async (credentials) => {
        try {
            const response = await API.post("/admins/login", credentials);

            //   console.log("Connexion réussie:", response.data);
            //  console.log(credentials)
            sessionStorage.setItem("user", credentials.username);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(
                "Erreur de connexion:",
                error.response?.data || error.message
            );
            throw error;
        }
    },

    logout: async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await API.get("/admins/logout", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            console.error(
                "Erreur de déconnexion:",
                error.response?.data || error.message
            );
            throw error;
        }
    },

    allSubject: async () => {
        const token = sessionStorage.getItem("token");
        try {
            if (!token) {
                toast.error("Utilisateur non authentifié !");
                return;
            }

            // Exécuter les deux requêtes en parallèle pour optimiser la performance
            const [examensResponse, universiteResponse] = await Promise.all([
                API.get("admins/listeSujetsExamen", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                API.get("admins/listeSujetUniversite", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            // Vérifier les réponses et fusionner les données
            if (
                examensResponse.data.status === "ok" &&
                universiteResponse.data.status === "ok"
            ) {
                // console.log("Examens Response:", examensResponse.data.data);
                // console.log("Université Response:", universiteResponse);
                const examen = examensResponse.data.message
                    ? [] // Si `message` existe, on ne prend pas les données
                    : Array.isArray(examensResponse.data.data.data)
                    ? examensResponse.data.data.data.map((item) => ({
                          ...item,
                          categorie: "examen",
                      }))
                    : [];

                const universite = universiteResponse.data.message
                    ? [] // Si `message` existe, on ne prend pas les données
                    : Array.isArray(universiteResponse.data.data.data)
                    ? universiteResponse.data.data.data.map((item) => ({
                          ...item,
                          categorie: "universite",
                      }))
                    : [];
                const allSujets = [...examen, ...universite];

                // Trier par `created_at` (du plus récent au plus ancien)
                allSujets.sort(
                    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
                );
                // console.log(allSujets);
                return allSujets;
            } else {
                toast.error("Erreur lors de la récupération des sujets !");
            }
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
        } finally {
            // setLoading(false);
        }
    },
    deleteSubject: async (credentials) => {
        //  console.log(credentials.categorie);
        const token = sessionStorage.getItem("token");
        const result = await Swal.fire({
            title: "Suppression sujet",
            confirmButtonText: "Confirmer",
            cancelButtonText: "Annuler",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonColor: "#3085d6",
            text: "Etes vous sur de vouloir supprimer ce document?",
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
            let response;
            if (credentials.categorie == "universite") {
                response = await API.delete(
                    `admins/deleteSujetUniversite/${credentials.id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            } else {
                response = await API.delete(
                    `admins/supprimerSujetExamen/${credentials.id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            }

            return response.data;
        } catch (error) {
            //  console.error("Erreur lors de la suppression :", error);
            throw error;
        }
    },
    addSubject: async (credentials) => {
        const token = sessionStorage.getItem("token");
        if (!credentials.file) {
            toast.error("Veuillez sélectionner un fichier !");
            return;
        }

        const formData = new FormData();
        formData.append("fichier", credentials.file);
        formData.append("matiere", credentials.matiere);
        formData.append("type", credentials.type);
        formData.append("annee", credentials.date);
        formData.append("filiere", credentials.filiere);

        try {
            if (!token) {
                toast.error("Utilisateur non authentifié !");
                return;
            }
            let response;
            if (credentials.selectedOption == 1) {
                formData.append("serie", credentials.serie);
                formData.append("titre", credentials.titre);
                response = await API.post(
                    "/admins/chargerSujetExamen",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                formData.append("etablissement", credentials.etablissement);
                formData.append("status", credentials.statut);
                formData.append("niveau", credentials.niveau);
                formData.append("session", credentials.session);

                response = await API.post(
                    "/admins/chargerSujetUniversite",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            return response.data;
        } catch (error) {
            //  console.error("Erreur lors de l'upload :", error);
            toast.error("Erreur lors du téléchargement du fichier.");
            throw error;
        }
    },
    updateExamen: async (credentials) => {
        // console.log(credentials);
        const token = sessionStorage.getItem("token");
        try {
            const response = await API.put(
                `/admins/updateSujetExamen/${credentials.id}`,
                {
                    matiere: credentials.matiere,
                    type: credentials.type,
                    serie: credentials.serie,
                    titre: credentials.titre,
                    filiere: credentials.filiere,
                    annee: credentials.annee,
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
    updateUniversite: async (credentials) => {
        //  console.log(credentials);
        const token = sessionStorage.getItem("token");

        try {
            const response = await API.put(
                `/admins/updateSujetUniversite/${credentials.id}`,
                {
                    matiere: credentials.matiere,
                    type: credentials.type,
                    etablissement: credentials.etablissement,
                    status: credentials.statut,
                    niveau: credentials.niveau,
                    session: credentials.session,
                    filiere: credentials.filiere,
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
    downloadSubjet: async (credentials) => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            toast.error("Utilisateur non authentifié !");
            return;
        }

        try {
            let url;
            if (credentials.categorie === "universite") {
                url = `admins/downloadSujetUniversite/${credentials.id}`;
            } else {
                url = `admins/telechargerSujetExamen/${credentials.id}`;
            }

            const response = await API.get(url, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: "blob",
            });
            console.log(response.data);
            // Ouvrir le fichier dans un nouvel onglet
            const fileURL = URL.createObjectURL(response.data);
            window.open(fileURL, "_blank");
        } catch (error) {
            //  console.error("Erreur lors du téléchargement :", error);
            toast.error("Impossible d'afficher ce sujet.");
        }
    },
    allAdmin: async () => {
        const token = sessionStorage.getItem("token");
        try {
            if (!token) {
                toast.error("Utilisateur non authentifié !");
                return;
            }

            // Exécuter les deux requêtes en parallèle pour optimiser la performance
            const Admin = await API.get("admins/listeadministrateur", {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Vérifier les réponses et fusionner les données
            //console.log("Sujets fusionnés et triés :", Admin.data.data.data);
            return Admin.data.data.data;
        } catch (error) {
            // console.error("Erreur lors de la requête :", error);
        } finally {
            //  setLoading(false);
        }
    },
    deleteadmin: async (credentials) => {
        console.log(credentials);

        const token = sessionStorage.getItem("token");
        const result = await Swal.fire({
            title: "Suppression admin",
            confirmButtonText: "Confirmer",
            cancelButtonText: "Annuler",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonColor: "#3085d6",
            text: "Etes vous sur de vouloir supprimer l'admin?",
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
                `admins/deleteadministateur/${credentials.id}`,
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
    updateAdmin: async (credentials) => {
        const token = sessionStorage.getItem("token");
        try {
            const response = await API.put(
                `/admins/modifieradministrateur/${credentials.id}`,
                {
                    username:
                        credentials.nom == null ? null : credentials.nom.trim(),
                    email:
                        credentials.email == null
                            ? null
                            : credentials.email.trim(),
                    password:
                        credentials.passe == null
                            ? null
                            : credentials.passe.trim(),
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
    addAdmin: async (credentials) => {
        const token = sessionStorage.getItem("token");
        if (!token) return;
        try {
            const response = await API.post(
                "/admins/register",
                {
                    username: credentials.nom.trim(),
                    email: credentials.email.trim(),
                    password: credentials.passe.trim(),
                    password_confirmation: credentials.passe.trim(),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json", // Ajout de l'accept JSON,
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    definirObjectif: async (credentials) => {
        const token = sessionStorage.getItem("token");
        if (!token) return;
        try {
            const response = await API.post(
                `/admins/definirobjectif/${credentials.partenaire}`,
                {
                    objectif_parrainages: credentials.objectif_parrainages,
                    date_debut: credentials.date_debut,
                    date_fin: credentials.date_fin,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json", // Ajout de l'accept JSON
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            return response.data;
        } catch (error) {
            throw error
        
        }
    },

    checkout: async () => {
        const token = sessionStorage.getItem("token");

        try {
            await API.get("admins/check-auth", {
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

    allPartenaires: async () => {
        const token = sessionStorage.getItem("token");
        if (!token) return;
        console.log(token);
        try {
            // Exécuter les deux requêtes en parallèle pour optimiser la performance
            const partenaire = await API.get("admins/listPartner", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Vérifier les réponses et fusionner les données
            console.log("Sujets fusionnés et triés :", partenaire.data);
            return partenaire.data.data;
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
        } finally {
            //  setLoading(false);
        }
    },
    deletePartenaire: async (credentials) => {
        const token = sessionStorage.getItem("token");
        const result = await Swal.fire({
            title: "Suppression admin",
            confirmButtonText: "Confirmer",
            cancelButtonText: "Annuler",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            confirmButtonColor: "#3085d6",
            text: "Etes vous sur de vouloir supprimer le partenaire?",
            customClass: {
                popup: "swal-padding-bottom",
            },
        });
        if (!result.isConfirmed) {
            return;
        }
        if (!token) return;
        console.log(token);
        try {
            // Exécuter les deux requêtes en parallèle pour optimiser la performance
            const partenaire = await API.put(
                `admins/deletePartner/${credentials.id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Vérifier les réponses et fusionner les données

            return partenaire.data;
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
        } finally {
            //  setLoading(false);
        }
    },
    allAcademy: async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
        toast.error("Utilisateur non authentifié !");
        return [];
    }

    try {
        const response = await API.get("/admins/listAcademy", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // ✅ Assurez-vous que la réponse contient bien les données
        // Exemple: response.data.data
        return response.data.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des academies :", error);
        toast.error("Impossible de récupérer les données des académies.");
        return [];
    }
},

allVendeurs: async () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    toast.error("Utilisateur non authentifié !");
    return [];
  }

  try {
    const response = await API.get("/admins/listVendeur", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Erreur récupération vendeurs :", error);
    toast.error("Impossible de récupérer les vendeurs.");
    return [];
  }
},


    
};
