/* eslint-disable react/prop-types */
// import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import photo from "../../assets/images/sujets/pdf.png";

import "../../assets/css/Academie/CardSujet.css";
// import "../../App.css"

// Importation de Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useAppContext } from "../../Contexts/AppProvider";
import { Sujets } from '../../assets/images/sujets/images_sujets';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";




const CardSujetsbiblio = ({ListeSujets, groupe=''}) => {
    const navigate = useNavigate()

useEffect(()=>{
    console.log("sujetcard",ListeSujets)
},[])
    const {user,downloadSubjetMutation,downloadSubjetUniversiteMutation}=useAppContext()
    console.log("UTILISATEUR actuel:", user,ListeSujets);
    const handleSujets = (id) => {
     
        downloadSubjetMutation.mutateAsync(id);
       
    };
    const handleSujetsUniversite = (id) => {

        downloadSubjetUniversiteMutation.mutateAsync(id);
       
    };
    const image =(matiere)=>{

        matiere=matiere+".png"
         return Sujets.find((img) => {
            const nomImage = img.split("/").pop();
             // extrait le nom de l'image
            return nomImage.toLowerCase() ===matiere.toLowerCase(); // comparaison insensible à la casse
          }) || photo

    }


  return (
    <div className="mx-5 pb-5  ">
        {user.type==="élève" && <h2 className="text-start  mb-4 fw-bold">Anciens Examen de {groupe}</h2>}
       
        <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30} // Espace entre les cartes
            slidesPerView={1} // Par défaut, 1 carte sur les petits écrans
            autoplay={{
            delay: 4000, // Délai entre les slides (2.5 secondes)
            disableOnInteraction: false, // Continue même si l'utilisateur interagit
            }}
            loop={ListeSujets.length > 3}// Carrousel infini
            navigation // Ajoute des flèches de navigation
            // pagination={{ clickable: true }} // Ajoute des points de pagination
            breakpoints={{
            // Responsive breakpoints
            576: {
                slidesPerView: 2, // 2 cartes sur les écrans >= 576px
            },
            768: {
                slidesPerView: 3, // 3 cartes sur les écrans >= 768px
            },
            992: {
                slidesPerView: 4, // 4 cartes sur les écrans >= 992px
            },
            }}
            onMouseEnter={() => {
            // Arrête le carrousel lorsque la souris passe dessus
            const swiper = document.querySelector(".swiper").swiper;
            swiper.autoplay.stop();
            }}
            onMouseLeave={() => {
            // Reprend le carrousel lorsque la souris est enlevée
            const swiper = document.querySelector(".swiper").swiper;
            swiper.autoplay.start();
            }}
        >
            {ListeSujets.length!==0 && ListeSujets.map((sujet) => ( (sujet.matiere===groupe) &&
            <SwiperSlide key={sujet.id}>
                <div className="card  sujet-card shadow-sm">
                    <img src={image(sujet.matiere)} className="card-img-top" alt={sujet.matiere} />
                    <div className="card-body d-flex flex-column">
                       
                        <h5 className="card-title" style={{ color: 'black' }}>{`${sujet.matiere}`}</h5>
<p className="card-text" style={{ color: 'black' }}>{`${sujet.titre} ${sujet.serie} ${sujet.annee}`}</p>

           <a className="btn btn-custom1 mt-auto" href={sujet.file_url} >
                    voir</a>

        


            
                    </div>
                </div>
            </SwiperSlide>
            ))}
           

          




        </Swiper>
    </div>
  );
};

export default CardSujetsbiblio;