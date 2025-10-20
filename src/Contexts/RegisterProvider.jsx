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
        redirect_url: "https://nilservice.net/page-connexion",
        //"localhost:5173/connexion/academie",
        faillure_redirect_url: "https://nilservice.net/page/echec",
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
            if (data.status === "success") {
                localStorage.clear("dataUser");
                let link = data.data.link.data.link;
                
                console.log("carlos test")
                console.log(link);
                //window.open(link, "_blank");
                return { status: "payment_pending", link };
              
            }
        },
        onError: (error) => {
             console.log(error)
      if (error.response && error.response.data && error.response.data.errors ) {
        const errors = error.response.data.errors;
        // Parcours toutes les clés et messages
        Object.keys(errors).forEach((key) => {
          errors[key].forEach((msg) => toast.error(msg));
        });
      } else if(error.status === 429){
        toast.error(error.response.data.message)
      }
      else{
        // Message générique si erreur inconnue
        toast.error("Une erreur est survenue, veuillez réessayer.");
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
