/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../Contexts/AppProvider';



/**
 * Composant de garde d'authentification
 * Protège les routes qui nécessitent une authentification
 * @param {Object} props - Propriétés du composant
 * @param {React.ReactNode} props.children - Composants enfants à rendre si authentifié
 */
const AuthGuard = ({ children }) => {
  const { user, refetchSession, publicRoutes , loadingSession} = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

//   const isPublicRoute = publicRoutes.includes(location.pathname);


  useEffect(() => {
    // Vérifier si la route actuelle est publique
    const isPublicRoute = publicRoutes.includes(location.pathname);
    console.log("loading" + loadingSession);


    if (!isPublicRoute && !user && location.pathname !== "/connexion/academie" ) {
      // Lancer une vérification de session
      refetchSession().catch(() => {
        navigate('/connexion/academie', {
          replace: true,
          state: { from: location.pathname }
        });
      });
    }
  }, [user, location.pathname, refetchSession, navigate]);


  // Si c'est une route publique ou si l'utilisateur est authentifié, rendre les enfants
  const isPublicRoute = publicRoutes.includes(location.pathname);


  if (isPublicRoute || user) {
    return children;
  }

  // Sinon, ne rien rendre (ou un composant de chargement)
  return <div>Vérification de l'authentification...</div>;
};

export default AuthGuard;
