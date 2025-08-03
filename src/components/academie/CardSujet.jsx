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





const CardSujets = ({ListeSujets, isAccess, groupe=''}) => {


    const {user,downloadSubjetMutation,downloadSubjetUniversiteMutation}=useAppContext()
    console.log("UTILISATEUR actuel:", user);
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
        {user.type==="étudiant" && <h2 className="text-start  mb-4 fw-bold">Anciens {groupe}s</h2>}
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
            {ListeSujets.length!==0 && ListeSujets.map((sujet) => ( sujet.type==="BAC" && (sujet.matiere===groupe) &&
            <SwiperSlide key={sujet.id}>
                <div className="card  sujet-card shadow-sm">
                    <img src={image(sujet.matiere)} className="card-img-top" alt={sujet.matiere} />
                    <div className="card-body d-flex flex-column">
                       
                        <h5 className="card-title" style={{ color: 'black' }}>{`${sujet.matiere}`}</h5>
<p className="card-text" style={{ color: 'black' }}>{`${sujet.type} ${sujet.serie} ${sujet.annee}`}</p>

            {/* <button className={isAccess(sujet, user)?"btn btn-custom1 mt-auto" : "bt disabled-button mt-auto"} onClick={()=>handleSujets(sujet.id)}>
                        voir
                    { isAccess(sujet, user) && <i className="fa-solid fa-lock-open pl-2"></i>}
                    { !isAccess(sujet, user) && <i className="fa-solid fa-lock pl-2"></i>}

            </button> */}

            <p className="card-text">{`${sujet.type} ${sujet.serie} ${sujet.annee}`}</p>

                    {console.log("SUJET actuel:", sujet.matiere, "ACCÈS actuel:", isAccess(sujet, user))}
                    <p className="card-text">{`${sujet.type} ${sujet.serie} ${sujet.annee}`}</p>


            <button
                className={isAccess(sujet, user) ? "btn btn-custom1 mt-auto" : "bt disabled-button mt-auto"}
                onClick={() => {
                    if (isAccess(sujet, user)) {
                    handleSujets(sujet.id);
                    }
                }}
                >
                voir
                {isAccess(sujet, user) && <i className="fa-solid fa-lock-open pl-2"></i>}
                {!isAccess(sujet, user) && <i className="fa-solid fa-lock pl-2"></i>}
            </button>
                    </div>
                </div>
            </SwiperSlide>
            ))}
            {ListeSujets.length!==0 && ListeSujets.map((sujet) => ( sujet.type==="CONCOURS" && (sujet.matiere===groupe) &&
            <SwiperSlide key={sujet.id}>
                <div className="card  sujet-card shadow-sm">
                    <img src={image(sujet.matiere)} className="card-img-top" alt={sujet.matiere} />
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{`${sujet.matiere}`}</h5>
                        <p className="card-text">{`${sujet.type}  ${sujet.annee}`}</p>

{console.log("SUJET actuel:", sujet.matiere, "ACCÈS actuel:", isAccess(sujet, user))}

                        <button className={isAccess(sujet, user)?"btn btn-custom1 mt-auto" : "bt disabled-button mt-auto"} onClick={()=>handleSujets(sujet.id)}>
                        voir
                    { isAccess(sujet, user) && <i className="fa-solid fa-lock-open pl-2"></i>}
                    { !isAccess(sujet, user) && <i className="fa-solid fa-lock pl-2"></i>}

                        </button>
                    </div>
                </div>
            </SwiperSlide>
            ))}

            {ListeSujets.length!==0 && ListeSujets.map((sujet) => ( (sujet.type===groupe) &&
            <SwiperSlide key={sujet.id}>
                <div className="card sujet-card shadow-sm">
                <img src={photo} className="card-img-top" alt={sujet.matiere} />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title" style={{ color: 'black' }}>{`${sujet.matiere}`}</h5>
<p className="card-text" style={{ color: 'black' }}>{`${sujet.type} ${sujet.session}`}</p>

                    <button className={isAccess(sujet, user)?"btn btn-custom1 mt-auto" : "bt disabled-button mt-auto"} onClick={()=>handleSujetsUniversite(sujet.id)} >
                    voir
                { isAccess(sujet, user) && <i className="fa-solid fa-lock-open pl-2"></i>}
                { !isAccess(sujet, user) && <i className="fa-solid fa-lock pl-2"></i>}

                    </button>
                </div>
                </div>
            </SwiperSlide>
            ))}

{/* 
            {ListeSujets?.length > 0 &&
  ListeSujets
    .filter(
      (sujet) =>
        user.type === "étudiant" &&
        sujet.status === "public" &&
        sujet.niveau === user.niveau &&
        sujet.filiere.toLowerCase() === user.filiere.toLowerCase()
    )
    .map((sujet) => (
      <SwiperSlide key={sujet.id}>
        <div className="card sujet-card shadow-sm">
          <img src={photo} className="card-img-top" alt={sujet.matiere} />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{sujet.matiere}</h5>
            <p className="card-text">{sujet.type} - {sujet.session}</p>
            <button
              className={isAccess(sujet, user) ? "btn btn-custom1 mt-auto" : "bt disabled-button mt-auto"}
              onClick={() => handleSujetsUniversite(sujet.id)}
            >
              Voir
              {isAccess(sujet, user) && <i className="fa-solid fa-lock-open pl-2"></i>}
              {!isAccess(sujet, user) && <i className="fa-solid fa-lock pl-2"></i>}
            </button>
          </div>
        </div>
      </SwiperSlide>
    ))} */}



        </Swiper>
    </div>
  );
};

export default CardSujets;