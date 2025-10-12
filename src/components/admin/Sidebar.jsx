import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAdminContext } from "../../Contexts/AdminProvider";
import {
    MessageSquare,
    User,
     GraduationCap,
     Briefcase,
     ShoppingBag,
     Handshake,
     LogOut,
} from "lucide-react";
import "../../assets/css/admin/sidebar.css";
import LoaderTransparent from "../LoadersCompoments/LoaderTransparent";

const Sidebar = () => {
    const {logout} = useAdminContext()
    const [loading,setLoading]=useState(false)

    const deconnexion = async () =>{
        setLoading(true)
        try{
        await logout.mutateAsync()
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
       
    }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }
    const lien = [
        {
            nom: "Sujets",
            lien: "/admin/listesujet",
            icon: <MessageSquare size={18} />,
        },

        { nom: "Academie", lien: "/admin/academy", icon: <GraduationCap size={18} /> },
        {
            nom: "Prestataires",
            lien: "/admin/prestataires",
            icon: <Briefcase size={18} />,
        },
        { nom: "Vendeurs", lien: "/admin/vendeurs", icon: <ShoppingBag size={18} /> },
        {
            nom: "Partenaires",
            lien: "/admin/partenaires",
            icon: <Handshake size={18} />,
        },

        {
            nom: "Contacts",
            lien: "/admin/contacts",
            icon: <MessageSquare size={18} />,
        },
          {
            nom: "Newsletter",
            lien: "/admin/newsletter",
            icon: <MessageSquare size={18} />,
        },
       
    ];

    const superadmin = [
        {
            nom: "Sujets",
            lien: "/admin/listesujet",
            icon: <MessageSquare size={18} />,
        },
        { nom: "Admins", lien: "/admin/admins", icon: <User size={18} /> },
        { nom: "Academie", lien: "/admin/academy", icon: <GraduationCap size={18} /> },
        {
            nom: "Prestataires",
            lien: "/admin/prestataires",
            icon: <Briefcase size={18} />,
        },
        { nom: "Vendeurs", lien: "/admin/vendeurs", icon: <ShoppingBag size={18} /> },
        {
            nom: "Partenaires",
            lien: "/admin/partenaires",
            icon: <Handshake size={18} />,
        },

        {
            nom: "Contacts",
            lien: "/admin/contact",
            icon: <MessageSquare size={18} />,
        },
         {
            nom: "Newsletter",
            lien: "/admin/newsletter",
            icon: <MessageSquare size={18} />,
        },

         {
            nom: "Statistiques",
            lien: "/admin/totale",
            icon: <MessageSquare size={18} />,
        },
        
    ];

    const location = useLocation();
    const locationName = location.pathname;

    const isSuperAdmin = sessionStorage.getItem("user") === "ange";

    const menuItems = isSuperAdmin ? superadmin : lien;

    return (
        <div className="sidebar">
            {loading && <LoaderTransparent/>}
            <div className="menu">
                {menuItems.map((item) => (
                    <a
                        key={item.nom}
                        href={item.lien}
                        className={`${
                            item.lien === locationName ? "active" : ""
                        }`}
                    >
                        <span className="icon">{item.icon}</span> &nbsp;
                        <span className="label">{item.nom}</span>
                    </a>
                ))}
                <span className="deconnexion" onClick={async()=>{await deconnexion()}}> <span className="icon"> <LogOut size={18}/> Deconnexion</span> &nbsp;
               </span>
            </div>

            <span className="version">Version 1.0.0</span>
        </div>
    );
};

export default Sidebar;
