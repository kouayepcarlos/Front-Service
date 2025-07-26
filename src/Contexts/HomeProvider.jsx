/* eslint-disable react/prop-types */
import { useMutation ,useQuery} from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { authAPIPrestataire } from "../fecths/fetchPrestataire";
import { toast } from "react-toastify";
// import LoaderTransparent from "../components/LoadersCompoments/LoaderTransparent";

const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
    const [errorMessageRegister, setErrorMessageRegister] = useState({
        error: "",
        message: "",
    });
   
    const location = useLocation();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    
    return (
        <HomeContext.Provider
            value={{
              
              
              errorMessageRegister,
              setErrorMessageRegister
              
            }}
        >
            {children}
        </HomeContext.Provider>
    );
};

export const useHome = () => useContext(HomeContext);
