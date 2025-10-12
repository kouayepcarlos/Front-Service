/* eslint-disable react/prop-types */
import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPIVendeur } from "../fecths/fetchVendeur";
import { toast } from "react-toastify";
import { useLocation, matchPath } from "react-router-dom";
// import LoaderTransparent from "../components/LoadersCompoments/LoaderTransparent";

const VendeurContext = createContext();

export const VendeurProvider = ({ children }) => {
    const [errorMessageRegister, setErrorMessageRegister] = useState({
        error: "",
        message: "",
    });
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { data: produit, refetch: refetchProduit } = useQuery({
        queryKey: ["produit"],
        queryFn: authAPIVendeur.allProduits,
        retry: false,
        enabled:
            !!sessionStorage.getItem("token") &&
            location.pathname === "/vendeur/Mesproduits",
    });

    // Récupération des filleuls
    const { data: filleuls, refetch: refetchFilleuls } = useQuery({
        queryKey: ["filleuls"],
        queryFn: authAPIVendeur.getFilleuls,
        retry: false,
        enabled: !!user && location.pathname === "/vendeur/souscrit",
    });
    const { data: boutiques, refetch: refetchBoutiques } = useQuery({
        queryKey: ["boutique"],
        queryFn: authAPIVendeur.allBoutiques,
        retry: false,
        
    });
    const { data: lastabonnement, refetch:refetchLastabonnement } = useQuery({
            queryKey: ["lastabonnement"],
            queryFn: authAPIVendeur.LastAbonnement,
            retry: false,
            enabled: !!user,
          });

          const { data: solde, refetch:refetchSolde } = useQuery({
              queryKey: ["solde"],
              queryFn: authAPIVendeur.getSolde,
              retry: false,
              enabled: !!user,
            });
    const publicRoutes = [
        "/vendeur/connexion",
        "/vendeur/step1",
        "/vendeur/step2",
        "/vendeur/step3",
        "/vendeur/liste",
        "/vendeur/home/:id",
        "/vendeur/visualisation/:idboutique/:idproduit",
        "/vendeur/passe_oublie",
        "/vendeur/reset",
    ];

    useEffect(() => {
        const checkAuth = async () => {
            if (
                !publicRoutes.some((route) =>
                    matchPath(route, location.pathname)
                )
            ) {
                //si la page actuelle ne correspond a aucune page du public routes
                const check = await authAPIVendeur.checkout();
                if (check) {
                    if (check.response?.status === 401) {
                        console.warn("Token invalide ou expiré");
                        sessionStorage.removeItem("token");
                        navigate("/vendeur/connexion");
                    } else {
                        console.error("Erreur inconnue :", check);
                    }
                } else {
                    setUser(JSON.parse(sessionStorage.getItem("user")));
                    console.log(sessionStorage.getItem(user));
                }
            }
        };
        checkAuth();
    }, []);

    useEffect(() => {
        const storage = localStorage.getItem("dataUser");
        // console.log(storage);

        if (storage) {
            setData(JSON.parse(storage));
        } else {
            localStorage.setItem("dataUser", JSON.stringify(data));
        }
    }, []);

    // Fonction pour aller à l etape suivante
    const nextStep = (step) => navigate(`/vendeur/step${step}`);

    const [data, setData] = useState({
        nom: "",
        email: "",
        mot_de_passe: "",
        mot_de_passe_confirmation: "",

        code_parrain: "",
        telephone: "",
    });

    const loginMutationvendeur = useMutation({
        mutationFn: async (credentials) =>
            await authAPIVendeur.login(credentials),
        onSuccess: (data) => {
            console.log(data);
            if (data?.token) {
                sessionStorage.setItem("token", data.token);
                setUser(data?.vendeur);
                console.log("user", user);
                toast.success("SUCCESS");
            } else {
                toast.warning(
                    "Connexion réussie, mais aucune information utilisateur reçue."
                );
            }

            //             localStorage.clear('dataUser');
            //            let  link = data.data.link.data.link
            // console.log(link)
            //             window.open(link,'_blank');
        },
        onError: (error) => {
            //   console.log("Erreur de connexion :", error.response?.data);
            const errors = error.response?.data;
            if (errors?.message === "Identifiants incorrects") {
                toast.error("Identifiants incorrects");
            } else {
                toast.error("Erreur du serveur. Veuillez réessayer plus tard.");
            }
        },
    });

    const registerVendeurMutation = useMutation({
        mutationFn: async (credentials) =>
            await authAPIVendeur.register(credentials),
        onSuccess: (data) => {
            console.log(data);

            if (data.status === "error") {
                const errors = data.errors;
                if (errors.email) {
                    toast.error(
                        "un compte avec cet email existe deja veuillez le changer"
                    );

                    navigate("/vendeur/step1");
                } else if (errors.telephone) {
                    toast.error(
                        "un compte avec ce numéro de téléphone existe deja veuillez le changer ou vous connecter"
                    );
                    navigate("/vendeur/step2");
                }
            } else if (data.status === "payment_pending") {
                localStorage.clear("dataUser");
                let link = data.link;
                console.log(link);
              //  window.open(link, "_blank");
            }
        },
        onError: (error) => {
            // console.log("Erreur de connexion :", error.response?.data);
            if (error.response?.data) {
                //    const errors = error.response?.data.erros;
            }
        },
    });

     const nouvelAbonnementVendeurMutation = useMutation({
            mutationFn: async (credentials) =>
                await authAPIVendeur.nouvelAbonnement(credentials),
            onSuccess: (data) => {
                console.log(data)
                if (data.status === true) {
                    localStorage.clear("dataUser");
                    let link = data.data.link;
                    console.log(link);
                      window.location.href = link;


            // (Optionnel) Feedback à l’utilisateur
            alert("Vous allez être redirigé vers le paiement. Veuillez finaliser la transaction.");
                }
            },
            onError: (error) => {
                console.log("Erreur de connexion :", error);
                if (error.response?.data) {
                    //    const errors = error.response?.data.erros;
                }
            },
        });

    const Monproduitid = useMutation({
        mutationFn: async (id) => await authAPIVendeur.Monproduitid(id),
        onSuccess: (data) => {
            if (data) {
                return data;
            } else {
                //console.log(response)
            }
            // console.log("delete reuissi");
        },
        onError: (error) => {
            const errors = error.response?.data;
            if (errors?.message === "fichier introuvable") {
                toast.error("fichier introuvable");
            } else {
                toast.error("Erreur du serveur. Veuillez réessayer plus tard.");
            }
        },
    });

    const Maboutique = useMutation({
        mutationFn: async () => await authAPIVendeur.Maboutique(),
        onSuccess: (data) => {
            if (data) {
                return data;
            } else {
                //console.log(response)
            }
            // console.log("delete reuissi");
        },
        onError: (error) => {
            const errors = error.response?.data;
            if (errors?.message === "fichier introuvable") {
                toast.error("fichier introuvable");
            } else {
                toast.error("Erreur du serveur. Veuillez réessayer plus tard.");
            }
        },
    });

    const RealisationId = useMutation({
        mutationFn: async (id) => await authAPIVendeur.allRealisationid(id),
        onSuccess: (data) => {
            if (data.status === "success") {
                return data.data;
            } else {
                //console.log(response)
            }
            // console.log("delete reuissi");
        },
        onError: (error) => {
            const errors = error.response?.data;
            if (errors?.message === "fichier introuvable") {
                toast.error("fichier introuvable");
            } else {
                toast.error("Erreur du serveur. Veuillez réessayer plus tard.");
            }
        },
    });

    const creerBoutique = useMutation({
        mutationFn: async (credentials) =>
            await authAPIVendeur.Creerboutique(credentials),
        onSuccess: (data) => {
            if (data?.message) {
                toast.success(data?.message);
            }
        },
        onError: (error) => {
            console.log(error);
        },
    });
    const updateBoutique = useMutation({
        mutationFn: async (credentials) =>
            await authAPIVendeur.Updateboutique(credentials),
        onSuccess: (data) => {
            if (data?.message) {
                toast.success(data?.message);
            }
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const updateProduit = useMutation({
        mutationFn: async (credentials) =>
            await authAPIVendeur.updateproduit(credentials),
        onSuccess: (data) => {
            if (data?.message) {
                toast.success(data?.message);
            }
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const ajoutProduit = useMutation({
        mutationFn: async (credentials) =>
            await authAPIVendeur.Ajoutproduit(credentials),
        onSuccess: (data) => {
            toast.success(data?.message);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const logout = useMutation({
        mutationFn: async () => await authAPIVendeur.logout(),
        onSuccess: () => {
            navigate("/vendeur/connexion");
        },
        onError: (error) => {
            console.error("Erreur lors de la déconnexion:", error);
        },
    });

    const deleteproduit = useMutation({
        mutationFn: async (credentials) =>
            await authAPIVendeur.deleteproduit(credentials),
        onSuccess: (data) => {
            toast.error(data.message);
            navigate("/vendeur/Mesproduits");
            //console.log(response)

            // console.log("delete reuissi");
        },
        onError: (error) => {
            const errors = error.response?.data;
            if (errors?.message === "fichier introuvable") {
                toast.error("fichier introuvable");
            } else {
                toast.error("Erreur du serveur. Veuillez réessayer plus tard.");
            }
        },
    });

    /**
     * Fonction pour le retrait de gain des utilisateurs academy
     */

    const withdrawal = useMutation({
        mutationFn: async (amount) => await authAPIVendeur.withdrawal(amount),
        onSuccess: (data) => {
            console.log(data);
            if(data?.statut=="success")
      toast.success(data?.message)
        },
    });

    return (
        <VendeurContext.Provider
            value={{
                // realisation,
                // refetchRealisation,
                withdrawal,
                produit,
                refetchProduit,
                Monproduitid,
                Maboutique,
                deleteproduit,
                updateBoutique,
                user,
                logout,
                updateProduit,
nouvelAbonnementVendeurMutation,
                ajoutProduit,
                data,
                setData,
                nextStep,
                // prestation,
                // refetchPrestation,
                registerVendeurMutation,
                loginMutationvendeur,
  lastabonnement,
      refetchLastabonnement,
                filleuls,
                refetchFilleuls,
                RealisationId,
                boutiques,
                refetchBoutiques,
                creerBoutique,
                errorMessageRegister,
                setErrorMessageRegister,
                solde,
                refetchSolde
            }}
        >
            {children}
        </VendeurContext.Provider>
    );
};

export const useRegister = () => useContext(VendeurContext);
