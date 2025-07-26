/* eslint-disable react/prop-types */
import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { authAPIadmin } from "../fecths/fecthAdmin";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext();

export function AdminProvider({ children }) {
    const [theme, setTheme] = useState("light");
    const [data, setData] = useState([]);
    const [dataadmin, setDataadmin] = useState({});
    const navigate = useNavigate();
    const [messageConnexion, setMessageConnexion] = useState("");
    const publicRoutes = ["/admin/connexion"];

    const { data: sujets, refetch: refetchSujets } = useQuery({
        queryKey: ["sujets"],
        queryFn: authAPIadmin.allSubject,
        retry: false,
        enabled: !!sessionStorage.getItem("token"),
    });

    const { data: admin, refetch: refetchAdmin } = useQuery({
        queryKey: ["admin"],
        queryFn: authAPIadmin.allAdmin,
        retry: false,
        enabled: !!sessionStorage.getItem("token"),
    });

    const { data: partenaire, refetch: refetchPartenaire } = useQuery({
        queryKey: ["partenaire"],
        queryFn: authAPIadmin.allPartenaires,
        retry: false,
        enabled: !!sessionStorage.getItem("token"),
    });

    useEffect(() => {
        const initializeAuth = async () => {
            // Si l'utilisateur est stocké et que la session n'a pas expiré
            if (!sessionStorage.getItem("token")) {
                // En cas d'erreur, rediriger vers la connexion si on n'est pas déjà sur une route publique
                if (!publicRoutes.includes(location.pathname)) {
                    navigate("/admin/connexion");
                    toast.warning("Veuillez vous connecter");
                }
            }
        };

        initializeAuth();
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            const check = await authAPIadmin.checkout();
            if (check) {
                if (check.response?.status === 401) {
                    console.warn("Token invalide ou expiré");
                    sessionStorage.removeItem("token");
                    navigate("/admin/connexion");
                } else {
                    console.error("Erreur inconnue :", error);
                }
            }
        };
        checkAuth();
    }, []);

    // const allsubjetMutation = useMutation({
    //     mutationFn: async (credentials) =>
    //         await authAPIadmin.allSubject(credentials),

    //     onSuccess: (data) => {
    //         if (data) {
    //             console.log(data)
    //             setSujets(data);
    //            // console.log("Utilisateur connecté :", data.user);
    //            // setMessageConnexion("SUCCESS");
    //         } else {
    //             // setMessageConnexion(
    //             //     "Connexion réussie, mais aucune information utilisateur reçue."
    //             // );
    //         }
    //     },
    //     onError: () => {},
    // });

    const deletesubjetMutation = useMutation({
        mutationFn: async (credentials) =>
            await authAPIadmin.deleteSubject(credentials),
        onSuccess: (data) => {
            if (data.status === "success") {
                toast.success(data.message || "Sujet supprimé avec succès !");
                refetchSujets();
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

    const addsubjetMutation = useMutation({
        mutationFn: async (credentials) =>
            await authAPIadmin.addSubject(credentials),

        onSuccess: () => {
            refetchSujets();
            // setSujets(data);
            // console.log("ajout reuissi");

            // setMessageConnexion("SUCCESS");
        },
        onError: (error) => {
            //   console.log(error);
            const errors = error.response?.data;
            toast.error(errors?.message);
        },
    });

    const updateExamenMutation = useMutation({
        mutationFn: async (credentials) =>
            await authAPIadmin.updateExamen(credentials),
        // <<<<<<< HEAD
        //         onSuccess: (data) => {
        //             if (data.status === "ok") toast.success("sujet modifie");
        // =======
        onSuccess: () => {
            // console.log("modifreuissi");
            refetchSujets();
            // setMessageConnexion("SUCCESS");
        },
        onError: (error) => {
            const errors = error.response?.data;

            if (errors?.erreur === "sujet introuvable") {
                toast.error("sujet introuvable");
            } else {
                toast.error(errors?.message);
            }
        },
    });

    const updateUniversiteMutation = useMutation({
        mutationFn: async (credentials) =>
            await authAPIadmin.updateUniversite(credentials),
        // <<<<<<< HEAD
        //         onSuccess: (data) => {
        //             if (data.status === "ok") toast.success("sujet modifie");
        // =======
        onSuccess: () => {
            // console.log("modifreuissi");
            refetchSujets();
            // setMessageConnexion("SUCCESS");
        },
        onError: (error) => {
            const errors = error.response?.data;

            if (errors?.erreur === "sujet introuvable") {
                toast.error("sujet introuvable");
            } else {
                toast.error("Erreur du serveur. Veuillez réessayer plus tard.");
            }
        },
    });
    const downloadSubjetMutation = useMutation({
        mutationFn: async (credentials) =>
            await authAPIadmin.downloadSubjet(credentials),
        onSuccess: () => {},
        onError: () => {},
    });
    const addAdminMutation = useMutation({
        mutationFn: async (credentials) =>
            await authAPIadmin.addAdmin(credentials),
        // <<<<<<< HEAD
        //         onSuccess: (data) => {
        //          //  console.log(data)
        //             if (data?.status === "success") toast.success(data.message);
        // =======
        onSuccess: () => {
            // console.log("ajout reuissi");
            refetchAdmin();
        },
        onError: (error) => {
            // console.log(error)
            const errors = error.response?.data;
            toast.error(errors?.message);
        },
    });

    const definirObjectif = useMutation({
        mutationFn: async (credentials) =>
            await authAPIadmin.definirObjectif(credentials),
        // <<<<<<< HEAD
        //         onSuccess: (data) => {
        //          //  console.log(data)
        //             if (data?.status === "success") toast.success(data.message);
        // =======
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
             console.log(error)
            const errors = error.response?.data;
            toast.error(errors?.message);
        },
    });

    const updateAdminMutation = useMutation({
        mutationFn: async (credentials) =>
            await authAPIadmin.updateAdmin(credentials),
        // <<<<<<< HEAD
        //         onSuccess: (data) => {
        //             if (data.status === "success") toast.success(data.message);
        //             console.log(data)

        // =======
        onSuccess: () => {
            // setSujets(data);
            //  console.log("modifreuissi");
            refetchAdmin();
        },
        onError: (error) => {
            const errors = error.response?.data;
            toast.error(errors?.message);
        },
    });

    const deleteAdminMutation = useMutation({
        mutationFn: async (credentials) =>
            await authAPIadmin.deleteadmin(credentials),
        onSuccess: (data) => {
            if (data.status === "ok") {
                toast.success(data.message);
            }
            console.log(data);
            refetchAdmin();
        },
        onError: (error) => {
            const errors = error.response?.data;
            toast.error(errors?.message);
        },
    });

    const deletePartenaire = useMutation({
        mutationFn: async (credentials) =>
            await authAPIadmin.deletePartenaire(credentials),
        onSuccess: (data) => {
            if (data.status === "ok") {
                toast.success(data.message);
            }
            console.log(data);
            refetchAdmin();
        },
        onError: (error) => {
            const errors = error.response?.data;
            toast.error(errors?.message);
        },
    });
    const loginMutationadmin = useMutation({
        mutationFn: async (credentials) =>
            await authAPIadmin.login(credentials),
        onSuccess: (data) => {
            console.log(data);
            if (data?.token) {
                sessionStorage.setItem("token", data.token);
                // console.log("Utilisateur connecté :", data.token);
                toast.success("SUCCESS");
            } else {
                toast.warning(
                    "Connexion réussie, mais aucune information utilisateur reçue."
                );
            }
        },
        onError: (error) => {
            // console.log("Erreur de connexion :", error.response?.data.message);
            const errors = error.response?.data;
            if (errors?.message === "The selected username is invalid.") {
                toast.error("Le nom d'utilisateur est incorrect");
            } else if (
                errors?.erreur === "username ou mot de passe incorrect."
            ) {
                toast.error("Le nom ou le mot de passe est incorrect");
            } else {
                toast.error("Erreur du serveur. Veuillez réessayer plus tard.");
            }
        },
    });

    const logout = useMutation({
        mutationFn: async () => await authAPIadmin.logout(),
        onSuccess: () => {
            navigate("/admin/connexion");
        },
        onError: (error) => {
            console.error("Erreur lors de la déconnexion:", error);
        },
    });

    return (
        <AdminContext.Provider
            value={{
                theme,
                setTheme,
                // allsubjetMutation,
                deletePartenaire,
                loginMutationadmin,
                logout,
                sujets,
                admin,
                refetchAdmin,
                refetchSujets,
                data,
                setData,
                dataadmin,
                setDataadmin,
                addsubjetMutation,
                updateExamenMutation,
                updateUniversiteMutation,
                downloadSubjetMutation,
                deleteAdminMutation,
                addAdminMutation,
                updateAdminMutation,
                messageConnexion,
                setMessageConnexion,
                deletesubjetMutation,
                partenaire,
                refetchPartenaire,
                definirObjectif,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
}

export const useAdminContext = () => useContext(AdminContext);
