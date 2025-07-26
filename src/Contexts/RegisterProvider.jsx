/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../fecths/fecthAcademyUser";
import { toast } from "react-toastify";
// import LoaderTransparent from "../components/LoadersCompoments/LoaderTransparent";

const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
    const [errorMessageRegister, setErrorMessageRegister] = useState({
        error: "",
        message: "",
    });
    const navigate = useNavigate();

    // Fonction pour aller à l etape suivante
    const nextStep = (step) => navigate(`/register/step${step}`);

    const [data, setData] = useState({
        nom: "",
        email: "",
        password: "",
        password_confirmation: "",
        type: "",
        code_parrain: null,
        telephone: "",
        abonnement: "",
        redirect_url: "https://mailpit.axllent.org/docs/",
        //"localhost:5173/connexion/academie",
        faillure_redirect_url: "https://mailpit.axllent.org/docs/",
        //"localhost:5173/page/echec"
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

    const registerUserMutation = useMutation({
        mutationFn: async (credentials) => await authAPI.register(credentials),
        onSuccess: (data) => {
            console.log(data);

            if (data.status === "error") {
                const errors = data.errors;
                if (errors.email) {
                    toast.error(
                        "un compte avec cet email existe deja veuillez le changer"
                    );

                    navigate("/register/step1");
                } else if (errors.telephone) {
                    toast.error(
                        "un compte avec ce numéro de téléphone existe deja veuillez le changer ou vous connecter"
                    );
                    navigate("/register/step2");
                }
            } else if (data.status === "success") {
                localStorage.clear("dataUser");
                let link = data.data.link.data.link;
                
                console.log("carlos test")
                console.log(link);
                window.open(link, "_blank");
                return link;
            }
        },
        onError: (error) => {
            console.log("Erreur de connexion :", error);
            if (error.response?.data) {
                //    const errors = error.response?.data.erros;
            }
        },
    });

    return (
        <RegisterContext.Provider
            value={{
                data,
                setData,
                nextStep,
                registerUserMutation,
                errorMessageRegister,
            }}
        >
            {children}
        </RegisterContext.Provider>
    );
};

export const useRegister = () => useContext(RegisterContext);
