/* eslint-disable react/prop-types */
import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../fecths/fecthAcademyUser";
import { authAPIadmin } from "../fecths/fecthAdmin";
import { toast } from "react-toastify";
// import axios from "axios";

import { useNavigate, useLocation } from "react-router-dom";
import LoaderTransparent from "../components/LoadersCompoments/LoaderTransparent";

/**
 * Contexte principal de l'application
 * Gère l'état global, l'authentification et le thème
 */
const AppContext = createContext();

// Liste des routes qui ne nécessitent pas d'authentification
const publicRoutes = [
  "/contact",
  "/partenaire/objectif",
  "/partenaire/parrainage",
  "/page/inscription",
  "/connexion/academie",
  "/email-verified",

  "/register/step1",
  "/maintenance",
  "/register/step2",
  "/register/step3",
  "/connexion/passe_oublie",
  "/",
  "/forgot-password",
  "/reset-password",
  // '/homeacademy'
];

// Durée de session en millisecondes (30 minutes)
const SESSION_TIMEOUT = 10 * 60 * 1000;

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);
  const [messageConnexion, setMessageConnexion] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [transactionId, setTransactionId] = useState(null);
  const [messagesChat, setMessagesChat] = useState([]);

  /**
   * Vérifie l'état de l'utilisateur (Session active ou expirée)
   * Utilise react-query pour gérer le cache et les rechargements
   */
  // Vérifie si l'utilisateur est authentifié et initialise la session
  const {
    data: sessionUser,
    isError: errorUser,
    refetch: refetchSession,
    isLoading: loadingSession,
  } = useQuery({
    queryKey: ["session"],
    queryFn: authAPI.checkAuth,
    retry: false,
    enabled: false,
  });

  // Récupération des filleuls
  const { data: filleuls, refetch: refetchFilleuls, isLoading: isLoadingFilleuls, } = useQuery({
    queryKey: ["filleuls"],
    queryFn: authAPI.getFilleuls,
   
    retry: false,
    enabled: !!user,
  });

  // Récupération des filleuls
  const { data: fichier, refetch: refetchFichier, isLoading: isLoadingFichier } = useQuery({
    queryKey: ["fichier"],
    queryFn: authAPI.allfichier,
    retry: false,
    enabled: !!user,
  });

  const { data: lastabonnement, refetch: refetchLastabonnement, isLoading: isLoadingAbonnement } = useQuery({
    queryKey: ["lastabonnement"],
    queryFn: authAPI.LastAbonnement,
    retry: false,
    enabled: !!user,
  });
  const { data: solde, refetch: refetchSolde, isLoading: isLoadingSolde } = useQuery({
    queryKey: ["solde"],
    queryFn: authAPI.getSolde,
    retry: false,
    enabled: !!user,
  });

  // Récupération des sujets d'examen
  const { data: listeSujets, refetch: refetchSujets , isLoading: isLoadingSujet} = useQuery({
    queryKey: ["listeSujets"],
    queryFn: authAPI.fetchSujets,
    retry: false,
    enabled: !!user, // Ne charge que si l'utilisateur est connecté
  });

  // Récupération des sujets d'examen
  const { data: listeSujetsUniversites, refetch: refetchSujetsUniversites, isLoading: isLoadingUniv } =
    useQuery({
      queryKey: ["listeSujetsUniversites"],
      queryFn: authAPI.fetchSujetsUniversites,
      retry: false,
      enabled: !!user, // Ne charge que si l'utilisateur est connecté
    });

  // Récupération des messages
  //  const { data: allMessages, refetch: refetchMessages } = useQuery({
  //   queryKey: ["allMessages"],
  //   queryFn: authAPI.allMessage,
  //   retry: false,
  //   enabled: !!user, // Ne charge que si l'utilisateur est connecté
  // });

  // Mise à jour automatique des filleuls et des sujets quand l'utilisateur change

  /**
   * Initialisation de l'état d'authentification
   * Vérifie le localStorage et la session côté serveur
   */
  useEffect(() => {
    const initializeAuth = async () => {
      // Vérifier si l'utilisateur est stocké localement
      const storedUser = authAPI.getStoredUser();

      // Si l'utilisateur est stocké et que la session n'a pas expiré
      if (storedUser && !authAPI.isSessionExpired(SESSION_TIMEOUT)) {
        setUser(storedUser);

        // Vérifier la session côté serveur en arrière-plan
        refetchSession().catch(() => {
          // En cas d'erreur, rediriger vers la connexion si on n'est pas déjà sur une route publique
          if (!publicRoutes.includes(location.pathname)) {
            navigate("/connexion/academie");
          }
        });
      } else if (!publicRoutes.includes(location.pathname)) {
        // Si pas d'utilisateur stocké ou session expirée, rediriger vers la connexion
        navigate("/connexion/academie");
      }

      setIsInitialized(true);
    };

    initializeAuth();
  }, []);

  /**
   * Mise à jour de l'état utilisateur quand les données de session changent
   */
  useEffect(() => {
    if (sessionUser?.user) {
      setUser(sessionUser.user);
      //   console.log('changement');
    }
    if (errorUser && !publicRoutes.includes(location.pathname)) {
      setUser(null);
      navigate("/connexion/academie");
    }
  }, [sessionUser, errorUser, navigate, location.pathname]);

  /**
   * Vérification périodique de l'expiration de session
   * Vérifie toutes les minutes si la session a expiré
   */
  useEffect(() => {
    const checkSessionInterval = setInterval(() => {
      if (
        authAPI.isAuthenticated() &&
        authAPI.isSessionExpired(SESSION_TIMEOUT)
      ) {
        // Session expirée, déconnecter l'utilisateur
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("lastActivity");

        if (!publicRoutes.includes(location.pathname)) {
          navigate("/connexion/academie");
        }
      }
    }, 60000); // Vérifier chaque minute

    return () => clearInterval(checkSessionInterval);
  }, [navigate, location.pathname]);

  /**
   * Mise à jour du timestamp de dernière activité lors des interactions utilisateur
   */
  useEffect(() => {
    const updateLastActivity = () => {
      if (authAPI.isAuthenticated()) {
        localStorage.setItem("lastActivity", Date.now().toString());
      }
    };

    const events = ["mousemove", "click", "keypress"];
    events.forEach((event) =>
      window.addEventListener(event, updateLastActivity)
    );

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, updateLastActivity)
      );
    };
  }, []);

  /**
   * Mutation pour la connexion utilisateur
   */
  const loginUserMutation = useMutation({
    mutationFn: async (credentials) => await authAPI.login(credentials),
    onSuccess: (data) => {
      if (data?.user) {
        setUser(data.user);
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

  /**
   * Fonction de déconnexion de l utilisateur
   */
  const logout = async () => {
    try {
      const res = await authAPI.logout();
      if (res?.data) {
        setUser(null);
      }

      return res.data;
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const completedAccountMutation = useMutation({
    mutationFn: authAPI.completedAccount,
    onSuccess: (data) => {
      if (data.status == "success") {
        toast.success("Informations ajoutees");
        setTimeout(() => {
         
          window.location.reload();
        }, 1500);
      }
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  /**
   * Fonction pour le retrait de gain des utilisateurs academy
   */

  const withdrawal = useMutation({
    mutationFn: async (amount) => await authAPI.withdrawal(amount),
    onSuccess: (data) => {
      if (data?.statut == "success") toast.success(data?.message);
      else toast.error("Une erreur est survenue");
      console.log(data);
    },
  });

  /**
   * Fonction pour effectuer un abonnement
   */
  const Abonnement = useMutation({
    mutationFn: async (abonnement) => await authAPI.fetchAbonnement(abonnement),
    onSuccess: (data) => {
      if (data?.paiement) {
        // console.log(data.paiement);
        return data;
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //fonction pour recuperer les informations d'un user par son id
  const getUser = useMutation({
    mutationFn: async (id) => await authAPI.getUser(id),
    onSuccess: (data) => {
      return data.data;
    },
    onError: (error) => {
      console.log(error);
    },
  });
  //fonction pour envoyer un message du chat
  const sendMessages = useMutation({
    mutationFn: async (message, replyMessage) =>
      await authAPI.sendMessage(message, replyMessage),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const addFichier = useMutation({
    mutationFn: async (credentials) => await authAPI.Ajoutfichier(credentials),
    onSuccess: (data) => {
      toast.success(data?.message);
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //fonction d'affichage des messages

  const allMessages = useMutation({
    mutationFn: async () => await authAPI.allMessage(),
    onSuccess: (data) => {
      console.log(data);
      return data;
    },
    onError: (error) => {
      console.log(error);
    },
  });
  //fonction pour envoyer une image du chat
  const sendImage = useMutation({
    mutationFn: async ({ fichier, replyMessage }) =>
      await authAPI.sendImage(fichier, replyMessage),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //fonction pour envoyer un pdf du chat
  const sendPdf = useMutation({
    mutationFn: async ({ fichier, replyMessage }) =>
      await authAPI.sendPdf(fichier, replyMessage),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const nouvelAbonnementsuereMutation = useMutation({
    mutationFn: async (credentials) =>
      await authAPI.nouvelAbonnement(credentials),
    onSuccess: (data) => {
      console.log(data);
      if (data.status === true) {
        localStorage.clear("dataUser");
        let link = data.data.link;
        console.log(link);
        window.location.href = link;

        // (Optionnel) Feedback à l’utilisateur
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

  //fonction pour telecharger un fichier du chat
  const downloadDoc = useMutation({
    mutationFn: async (id) => await authAPI.downloadDoc(id),

    onSuccess: (file) => {},
    onError: (error) => {
      console.log(error);
    },
  });

  /**
   * Fonction pour la vérification d'une transaction
   */
  const { data: checkTransaction, refetch: refetchCheckTransaction } = useQuery(
    {
      queryKey: ["check_transaction", transactionId], // Ajout de transactionId pour le rendre dynamique
      queryFn: async () => {
        if (!transactionId) return null;
        return await authAPI.fetchCheckTransaction(transactionId);
      },
      enabled: !!transactionId, // Ne s'exécute que si transactionId est défini
      retry: false,
    }
  );

  const downloadSubjetMutation = useMutation({
    mutationFn: async (id) => await authAPI.downloadSubjet(id),

    onSuccess: (file) => {
      console.log(file);
      if (file) navigate(`/visualiser/${encodeURIComponent(file)}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const downloadSubjetcorrectionMutation = useMutation({
    mutationFn: async (id) => await authAPI.downloadSubjetcorrection(id),

    onSuccess: (file) => {
      console.log(file);
      if (file) navigate(`/visualiser/${encodeURIComponent(file)}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const downloadSubjetUniversiteMutation = useMutation({
    mutationFn: async (id) => await authAPI.downloadSubjetUniversite(id),

    onSuccess: (file) => {
      console.log(file);
      if (file) navigate(`/visualiser/${encodeURIComponent(file)}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const downloadSubjetUniversitecorrectionMutation = useMutation({
    mutationFn: async (id) =>
      await authAPI.downloadSubjetUniversitecorrection(id),

    onSuccess: (file) => {
      console.log(file);
      if (file) navigate(`/visualiser/${encodeURIComponent(file)}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const loginMutationadmin = useMutation({
    mutationFn: async (credentials) => await authAPIadmin.login(credentials),
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
      } else if (errors?.erreur === "username ou mot de passe incorrect.") {
        toast.error("Le nom ou le mot de passe est incorrect");
      } else {
        toast.error("Erreur du serveur. Veuillez réessayer plus tard.");
      }
    },
  });

  // Ne pas rendre les enfants tant que l'initialisation n'est pas terminée
  if (!isInitialized && !publicRoutes.includes(location.pathname)) {
    return (
      <div>
        <LoaderTransparent />
      </div>
    ); // Ou un composant de chargement plus élaboré
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        loginUserMutation,
        loginMutationadmin,
        user,
        messageConnexion,
        setMessageConnexion,
        logout,
        refetchSession,
        loadingSession,
        publicRoutes,
        nouvelAbonnementsuereMutation,
        completedAccountMutation,
        filleuls,
        refetchFilleuls,
        listeSujets,
        withdrawal,
        refetchSujets,
        Abonnement,
        transactionId,
        setTransactionId,
        listeSujetsUniversites,
        refetchSujetsUniversites,
        downloadSubjetMutation,
        downloadSubjetUniversiteMutation,
        sendMessages,
        sendImage,
        sendPdf,
        allMessages,
        messagesChat,
        setMessagesChat,
        // refetchMessages,
        downloadDoc,
        getUser,
        solde,
        refetchSolde,
        lastabonnement,
        fichier,
        refetchFichier,
        refetchLastabonnement,
        addFichier,
        downloadSubjetUniversitecorrectionMutation,
        downloadSubjetcorrectionMutation,
        isLoadingAbonnement,
        isLoadingFichier,
        isLoadingFilleuls,
        isLoadingSolde,
        isLoadingSujet,
        isLoadingUniv
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
