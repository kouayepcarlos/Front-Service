/* eslint-disable react/prop-types */
// import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/vendeur/boutique.css";
// import "../../App.css"

// Importation de Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";





const Boutiques = ({boutiques}) => {

const navigate = useNavigate()
  

  return (
    <div className="mx-5 pb-5  ">
       
        <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30} // Espace entre les cartes
            slidesPerView={1} // Par défaut, 1 carte sur les petits écrans
            autoplay={{
            delay: 4000, // Délai entre les slides (2.5 secondes)
            disableOnInteraction: false, // Continue même si l'utilisateur interagit
            }}
            loop={boutiques?.length > 3}// Carrousel infini
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
                slidesPerView: 3, // 4 cartes sur les écrans >= 992px
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
           
            {boutiques?.length!==0 && boutiques?.map((boutique) => (
              
            <SwiperSlide key={boutique?.id}>
                <div className="card  sujet-card text-dark">
                    <img src={boutique?.file_url} className="card-img-top"  />
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{`${boutique?.nom}`}</h5>
                        <p className="card-text">{`${boutique?.ville} ${boutique?.quartier}`}</p>
                        <button className={"btn btn-custom1 mt-auto" } onClick={()=>{navigate(`/vendeur/home/${boutique?.id}`)}}>
                        voir
                    
                        </button>
                    </div>
                </div>
            </SwiperSlide>
            ))}

           
        </Swiper>
    </div>
  );
};

export default Boutiques;