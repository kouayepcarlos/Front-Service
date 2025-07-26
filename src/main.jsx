import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css"
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'primereact/resources/themes/lara-light-blue/theme.css'; /* Thème PrimeReact */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


//pour la gestion automatique du cache, refetching  et des erreurs.
const queryClient=new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* //permet à tous les composants d'utiliser React Query. */}
       <QueryClientProvider client={queryClient}>
            <ToastContainer position="top-right" autoClose={3000} />
            <App />
       </QueryClientProvider>
  </React.StrictMode>
);
