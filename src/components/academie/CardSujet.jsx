/* eslint-disable react/prop-types */
// import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import photo from "../../assets/images/sujets/pdf.png";

import "../../assets/css/Academie/CardSujet.css";

import { useAppContext } from "../../Contexts/AppProvider";
import { Sujets } from "../../assets/images/sujets/images_sujets";
import LoaderTransparent from "../LoadersCompoments/LoaderTransparent";
import { useState } from "react";
import SlideGrid from "./Swipersligegrid";
import SlideGridconcours from "./Swipersligegridconcours";
import SlideGriduniversite from "./Swipersligegriduniversite";
const CardSujets = ({ ListeSujets, isAccess, groupe = "" }) => {
  const [loading, setLoading] = useState(false);

  const {
    user,
    downloadSubjetMutation,
    downloadSubjetUniversiteMutation,
    downloadSubjetUniversitecorrectionMutation,
    downloadSubjetcorrectionMutation,
  } = useAppContext();
  console.log("UTILISATEUR actuel:", user);
  const handleSujets = async(id) => {
    setLoading(true);
   await downloadSubjetMutation.mutateAsync(id);
    setLoading(false);
  };
  const handleSujetscorrection = async(id) => {
    setLoading(true);
    await downloadSubjetcorrectionMutation.mutateAsync(id);
    setLoading(false);
  };
  const handleSujetsUniversite = async(id) => {
    setLoading(true);
   await  downloadSubjetUniversiteMutation.mutateAsync(id);
    setLoading(false);
  };
  const handleSujetsUniversitecorrection = async(id) => {
    setLoading(true);
   await downloadSubjetUniversitecorrectionMutation.mutateAsync(id);
    setLoading(false);
  };
  const image = (matiere) => {
    matiere = matiere + ".png";
    return (
      Sujets.find((img) => {
        const nomImage = img.split("/").pop();
        // extrait le nom de l'image
        return nomImage.toLowerCase() === matiere.toLowerCase(); // comparaison insensible à la casse
      }) || photo
    );
  };

  return (
    <div className="mx-5 pb-5  ">
      {loading && <LoaderTransparent />}
      {user.type === "élève" && (
        <h2 className="text-start  mb-4 fw-bold">Anciens Examen de {groupe}</h2>
      )}
      {user.type === "étudiant" && (
        <h2 className="text-start  mb-4 fw-bold">Anciens {groupe}s</h2>
      )}
     
       
                <SlideGrid
      sujets={ListeSujets.filter(
        (s) => s.type === "BAC" && s.matiere === groupe
      ).map((s) => ({ ...s, image: image(s.matiere) }))}
      isAccess={isAccess}
      handleDownload={handleSujets}
      handleDownloadcorrection={handleSujetscorrection}
      itemsPerPage={12}
      user={user}
    />
           

           <SlideGridconcours
      sujets={ListeSujets.filter(
        (s) => s.type === "CONCOURS" && s.matiere === groupe
      ).map((s) => ({ ...s, image: image(s.matiere) }))}
      isAccess={isAccess}
      handleDownload={handleSujets}
      handleDownloadcorrection={handleSujetscorrection}
      itemsPerPage={12}
        user={user}
    />
       
 <SlideGriduniversite
      sujets={ListeSujets.filter((s) => s.type === groupe).map((s) => ({
        ...s,
        image: s.image || photo,
      }))}
      isAccess={isAccess}
      handleDownload={handleSujetsUniversite}
      handleDownloadcorrection={handleSujetsUniversitecorrection}
      itemsPerPage={12}
        user={user}
    />
       
    </div>
  );
};

export default CardSujets;
