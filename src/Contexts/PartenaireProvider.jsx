/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPIPartenaire } from "../fecths/fetchPartenaire";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
// import LoaderTransparent from "../components/LoadersCompoments/LoaderTransparent";

const PartenaireContext = createContext();

export const PartenaireProvider = ({ children }) => {
    const [errorMessageRegister, setErrorMessageRegister] = useState({
        error: "",
        message: "",
    });
    const navigate = useNavigate();

    // Fonction pour aller à l etape suivante
    const nextStep = (step) => navigate(`/partenaire/step${step}`);

    const [data, setData] = useState({
        nom: "",
        prenom: "",
        email: null,
        password: "",
        telephone: "",
    });
    const [user, setUser] = useState(null);

    // Récupération des filleuls
    const { data: filleuls, refetch: refetchFilleuls } = useQuery({
        queryKey: ["filleuls"],
        queryFn: authAPIPartenaire.getFilleuls,
        retry: false,
        enabled:
            !!sessionStorage.getItem("token") &&
            location.pathname === "/partenaire/parrainage",
    });

    const { data: objectifs, refetch: refetchObjectifs } = useQuery({
        queryKey: ["objctifs"],
        queryFn: authAPIPartenaire.getObjectifs,
        retry: false,
        enabled:
            !!sessionStorage.getItem("token") &&
            location.pathname === "/partenaire/mesobjectifs",
    });

    useEffect(() => {
        const storage = localStorage.getItem("dataUser");
        // console.log(storage);

        if (storage) {
            setData(JSON.parse(storage));
        } else {
            localStorage.setItem("dataUser", JSON.stringify(data));
        }
    }, []);

    const registerPartenaireMutation = useMutation({
        mutationFn: async (credentials) =>
            await authAPIPartenaire.register(credentials),
        onSuccess: (data) => {
            console.log(data);

            if (data.status === "error") {
                const errors = data.errors;
                if (errors.email) {
                    toast.error(
                        "un compte avec cet email existe deja veuillez le changer"
                    );

                    navigate("/partenaire/step1");
                } else if (errors.telephone) {
                    toast.error(
                        "un compte avec ce numéro de téléphone existe deja veuillez le changer ou vous connecter"
                    );
                    navigate("/partenaire/step2");
                }
            }else if (data.status === "payment_pending") {
                localStorage.clear("dataUser");
                let link = data.link;
                console.log(link);
                window.open(link, "_blank");
            }
        },
        onError: (error) => {
            // console.log("Erreur de connexion :", error.response?.data);
            if (error.response?.data) {
                //    const errors = error.response?.data.erros;
            }
        },
    });

     const nouvelAbonnementPartenaireMutation = useMutation({
            mutationFn: async (credentials) =>
                await authAPIPartenaire.nouvelAbonnement(credentials),
            onSuccess: (data) => {
                console.log(data)
                if (data.status === true) {
                    localStorage.clear("dataUser");
                    let link = data.data.link;
                    console.log(link);
                    window.open(link, "_blank");
                }
            },
            onError: (error) => {
                console.log("Erreur de connexion :", error);
                if (error.response?.data) {
                    //    const errors = error.response?.data.erros;
                }
            },
        });
    const loginMutationpartenaire = useMutation({
        mutationFn: async (credentials) =>
            await authAPIPartenaire.login(credentials),
        onSuccess: (data) => {
            console.log(data);
            if (data?.token) {
                sessionStorage.setItem("token", data.token);
                setUser(data?.partenaire);
                console.log("user", user);
                toast.success("SUCCESS");
            } else {
                toast.warning(
                    "Connexion réussie, mais aucune information utilisateur reçue."
                );
            }
            //                 localStorage.clear('dataUser');
            //                let  link = data.data.link.data.link
            // console.log(link)
            //                 window.open(link,'_blank');
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
    const me = useMutation({
        mutationFn: async () => await authAPIPartenaire.me(),
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
    const monobjectif = useMutation({
        mutationFn: async () => await authAPIPartenaire.objectifEncours(),
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

    return (
        <PartenaireContext.Provider
            value={{
                data,
                objectifs,
                refetchObjectifs,
                filleuls,
                refetchFilleuls,
                setData,
                nouvelAbonnementPartenaireMutation,
                me,
                nextStep,
                registerPartenaireMutation,
                errorMessageRegister,
                loginMutationpartenaire,
                monobjectif,
            }}
        >
            {children}
        </PartenaireContext.Provider>
    );
};

export const useRegister = () => useContext(PartenaireContext);
