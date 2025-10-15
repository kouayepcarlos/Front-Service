/* eslint-disable react/prop-types */
import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPIPrestataire } from "../fecths/fetchPrestataire";
import { toast } from "react-toastify";
import { useLocation, matchPath } from "react-router-dom";
// import LoaderTransparent from "../components/LoadersCompoments/LoaderTransparent";

const PrestataireContext = createContext();

export const PrestataireProvider = ({ children }) => {
    const [errorMessageRegister, setErrorMessageRegister] = useState({
        error: "",
        message: "",
    });
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { data: realisation, refetch: refetchRealisation, isLoading: isLoadingRealisation } = useQuery({
        queryKey: ["realisation"],
        queryFn: authAPIPrestataire.allRealisation,
        retry: false,
        enabled:
            !!sessionStorage.getItem("token") &&
            location.pathname === "/prestataire/realisation", //la fonction est executee si la page est /prestataire/realisation et qu'il existe un token
    });
    const { data: prestation, refetch: refetchPrestation, isLoading: isLoadingPrestataire } = useQuery({
        queryKey: ["prestation"],
        queryFn: authAPIPrestataire.allPrestataires,
        retry: false,
        enabled: location.pathname === "/prestataire/liste",
    });
    // Récupération des filleuls
    const { data: filleuls, refetch: refetchFilleuls, isLoading: isLoadingFilleuls } = useQuery({
        queryKey: ["filleuls"],
        queryFn: authAPIPrestataire.getFilleuls,
        retry: false,
        enabled: !!user && location.pathname === "/prestataire/souscrit",
    });

    const { data: solde, refetch:refetchSolde, isLoading: isLoadingSolde } = useQuery({
        queryKey: ["solde"],
        queryFn: authAPIPrestataire.getSolde,
        retry: false,
        enabled: !!user && location.pathname === "/prestataire/souscrit",
      });

     const { data: lastabonnement, refetch:refetchLastabonnement, isLoading: isLoadingAbonnement } = useQuery({
        queryKey: ["lastabonnement"],
        queryFn: authAPIPrestataire.LastAbonnement,
        retry: false,
        enabled: !!user,
      });
    const publicRoutes = [
        "/prestataire/connexion",
        "/prestataire/liste",
        "/prestataire/visualisation/:id",
        "/prestataire/passe_oublie",
        "/prestataire/reset",
        "/prestataire/step1",
        "/prestataire/step2",
        "/prestataire/step3",
    ];

    useEffect(() => {
        const checkAuth = async () => {
            if (
                !publicRoutes.some((route) =>
                    matchPath(route, location.pathname)
                )
            ) {
                //si la page actuelle ne correspond a aucune page du public routes
                const check = await authAPIPrestataire.checkout();
                if (check) {
                    if (check.response?.status === 401) {
                        console.warn("Token invalide ou expiré");
                        sessionStorage.removeItem("token");
                        navigate("/prestataire/connexion");
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
    const nextStep = (step) => navigate(`/prestataire/step${step}`);

    const [data, setData] = useState({
        nom: "",
        email: "",
        mot_de_passe: "",
        mot_de_passe_confirmation: "",
        profession: "",
        code_parrain: "",
        telephone: "",
    });

    const loginMutationprestataire = useMutation({
        mutationFn: async (credentials) =>
            await authAPIPrestataire.login(credentials),
        onSuccess: (data) => {
            console.log(data);
            if (data?.token) {
                sessionStorage.setItem("token", data.token);
                setUser(data?.prestataire);
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

    const registerPrestataireMutation = useMutation({
        mutationFn: async (credentials) =>
            await authAPIPrestataire.register(credentials),
        onSuccess: (data) => {
            if (data.status != "payment_pending") toast.error(data.message);

            if (data.status === "error") {
                const errors = data.errors;
                if (errors.email) {
                    toast.error(
                        "un compte avec cet email existe deja veuillez le changer"
                    );

                    navigate("/prestataire/step1");
                } else if (errors.telephone) {
                    toast.error(
                        "un compte avec ce numéro de téléphone existe deja veuillez le changer ou vous connecter"
                    );
                    navigate("/prestataire/step2");
                }
            }  else if (data.status === "payment_pending") {
                localStorage.clear("dataUser");
                let link = data.link;
                console.log(link);
               // window.open(link, "_blank");
            }
        },
        onError: (error) => {
            console.log("Erreur de connexion :", error);
            if (error.response?.data) {
                //    const errors = error.response?.data.erros;
            }
        },
    });

    const nouvelAbonnementPrestataireMutation = useMutation({
        mutationFn: async (credentials) =>
            await authAPIPrestataire.nouvelAbonnement(credentials),
        onSuccess: (data) => {
            console.log(data)
            if (data.status === true) {
                localStorage.clear("dataUser");
                let link = data.data.link;
                console.log(link);
                
                   window.location.href =link;


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

    const PrestataireId = useMutation({
        mutationFn: async (id) => await authAPIPrestataire.Prestataireid(id),
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

    const RealisationId = useMutation({
        mutationFn: async (id) => await authAPIPrestataire.allRealisationid(id),
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

    const me = useMutation({
        mutationFn: async () => await authAPIPrestataire.me(),
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

    const completedAccountMutation = useMutation({
        mutationFn: async (credentials) =>
            await authAPIPrestataire.completedAccount(credentials),
        onSuccess: (data) => {
            if (data.status == "success") {
                toast.success("Informations ajoutees");
                window.location.reload()
            }
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const ajoutRealisation = useMutation({
        mutationFn: async (credentials) =>
            await authAPIPrestataire.Ajoutproduit(credentials),
        onSuccess: (data) => {
            console.log(data);
            if (data.success == true) {
                toast.success("Informations ajoutees");
            }
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const logout = useMutation({
        mutationFn: async () => await authAPIPrestataire.logout(),
        onSuccess: () => {
            navigate("/prestataire/connexion");
        },
        onError: (error) => {
            console.error("Erreur lors de la déconnexion:", error);
        },
    });

    const deleterealisation = useMutation({
        mutationFn: async (credentials) =>
            await authAPIPrestataire.deleterealisation(credentials),
        onSuccess: (data) => {
            if (data.status === "success") {
                toast.success(
                    data.message || "realisation supprimé avec succès !"
                );
            } else {
                toast.error(data.message);
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

    /**
     * Fonction pour le retrait de gain des utilisateurs academy
     */

    const withdrawal = useMutation({
        mutationFn: async (amount) =>
            await authAPIPrestataire.withdrawal(amount),
        onSuccess: (data) => {
            console.log(data);
            if(data?.statut=="success")
      toast.success(data?.message)
        },
    });

    return (
        <PrestataireContext.Provider
            value={{
                realisation,
                withdrawal,
                refetchRealisation,
                me,
                deleterealisation,
                user,
                logout,
                filleuls,
                refetchFilleuls,

                ajoutRealisation,
                data,
                setData,
                nextStep,
                prestation,
                refetchPrestation,
                registerPrestataireMutation,
                loginMutationprestataire,
                PrestataireId,
                RealisationId,
                nouvelAbonnementPrestataireMutation,
                completedAccountMutation,
                errorMessageRegister,
                setErrorMessageRegister,
                  lastabonnement,
      refetchLastabonnement,
      solde,refetchSolde,
      isLoadingAbonnement,
      isLoadingFilleuls,
      isLoadingPrestataire,
      isLoadingRealisation,
      isLoadingSolde
            }}
        >
            {children}
        </PrestataireContext.Provider>
    );
};

export const useRegister = () => useContext(PrestataireContext);
