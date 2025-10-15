/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPIPartenaire } from "../fecths/fetchPartenaire";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useLocation, matchPath } from "react-router-dom";

const PartenaireContext = createContext();

export const PartenaireProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const nextStep = (step) => navigate(`/partenaire/step${step}`);

  const [data, setData] = useState({
    nom: "",
    prenom: "",
    email: null,
    password: "",
    telephone: "",
   
  });
  const [user, setUser] = useState(null);

  const {
    data: solde,
    refetch: refetchSolde,
    isLoading: isLoadingSolde,
  } = useQuery({
    queryKey: ["solde"],
    queryFn: authAPIPartenaire.getSolde,
    retry: false,
    enabled: !!sessionStorage.getItem("token"),
  });

  const {
    data: me,
    refetch: refetchMe,
    isLoading: isLoadingMe,
  } = useQuery({
    queryKey: ["me"],
    queryFn: authAPIPartenaire.me,
    retry: false,
    enabled: !!sessionStorage.getItem("token"),
  });

  const publicRoutes = [
    "/partenaire/connexion",
    "/partenaire/passe_oublie",
    "/partenaire/reset",
    "/partenaire/step1",
    "/partenaire/step2",
  ];

  useEffect(() => {
    const checkAuth = async () => {
      if (!publicRoutes.some((route) => matchPath(route, location.pathname))) {
        //si la page actuelle ne correspond a aucune page du public routes
        const check = await authAPIPartenaire.checkout();
        if (check) {
          if (check.response?.status === 401) {
            sessionStorage.removeItem("token");
            navigate("/partenaire/connexion");
          } else {
            //console.error("Erreur inconnue :", check);
          }
        } else {
          setUser(JSON.parse(sessionStorage.getItem("user")));
          console.log(sessionStorage.getItem(user));
        }
      }
    };
    checkAuth();
  }, []);

  // Récupération des filleuls
  const { data: filleuls, refetch: refetchFilleuls } = useQuery({
    queryKey: ["filleuls"],
    queryFn: authAPIPartenaire.getFilleuls,
    retry: false,
    enabled:
      !!sessionStorage.getItem("token") &&
      location.pathname === "/partenaire/parrainage",
  });

  const { data: lastabonnement, refetch: refetchLastabonnement } = useQuery({
    queryKey: ["lastabonnement"],
    queryFn: authAPIPartenaire.LastAbonnement,
    retry: false,
    enabled: !!user,
  });

  const {
    data: objectifs,
    refetch: refetchObjectifs,
    isLoading: isLoadingObjectif,
  } = useQuery({
    queryKey: ["objctifs"],
    queryFn: authAPIPartenaire.getObjectifs,
    retry: false,
    enabled:
      !!sessionStorage.getItem("token") &&
      location.pathname === "/partenaire/mesobjectifs",
  });

  const {
    data: monobjectif,
    refetch: refetchMonObjectifs,
    isLoading: isLoadingMonObjectif,
  } = useQuery({
    queryKey: ["monobjectif"],
    queryFn: authAPIPartenaire.objectifEncours,
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
      if (data.status === "success") {
        localStorage.clear("dataUser");
        let link = data.data.link.data.link;
        console.log("carlos test");
        console.log(link);
        return { status: "payment_pending", link };
      }
    },
    onError: (error) => {
      console.log(error)
      if (error.response && error.response.data ) {
        const errors = error.response.data;
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

  const nouvelAbonnementPartenaireMutation = useMutation({
    mutationFn: async (credentials) =>
      await authAPIPartenaire.nouvelAbonnement(credentials),
    onSuccess: (data) => {
      console.log(data);
      if (data.status === true) {
        localStorage.clear("dataUser");
        let link = data.data.link;
        console.log(link);
        window.location.href = link;
        alert(
          "Vous allez être redirigé vers le paiement. Veuillez finaliser la transaction."
        );
      }
    },
    onError: (error) => {
      console.log("Erreur de connexion :", error);
      if (error.response?.data) {
        //    const errors = error.response?.data.erros;
      }
    },
  });

  const withdrawal = useMutation({
    mutationFn: async (amount) => await authAPIPartenaire.withdrawal(amount),
    onSuccess: (data) => {
      console.log(data);
      if (data?.statut == "success") toast.success(data?.message);
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
        toast.success("Connexion reuissie");
      } else {
        toast.warning(
          "Connexion réussie, mais aucune information utilisateur reçue."
        );
      }
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

  const logout = useMutation({
    mutationFn: async () => await authAPIPartenaire.logout(),
    onSuccess: () => {
      navigate("/partenaire/connexion");
    },
    onError: (error) => {
      console.error("Erreur lors de la déconnexion:", error);
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
        loginMutationpartenaire,
        monobjectif,
        isLoadingMonObjectif,
        lastabonnement,
        refetchLastabonnement,
        logout,
        solde,
        refetchSolde,
        withdrawal,
        isLoadingSolde,
        refetchMe,
        isLoadingMe,
        refetchMonObjectifs,
        isLoadingObjectif,
      }}
    >
      {children}
    </PartenaireContext.Provider>
  );
};

export const useRegister = () => useContext(PartenaireContext);
