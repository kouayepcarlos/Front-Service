// //import React from "react";
// import Footer from "../components/Footer";
// import NavBar from "../components/navbar/NavBar";
// import "../assets/css/homepage.css";
// import Accordion from "../components/homepage/Accordion";
// import Partenaire from "../components/Partenaire";
// import Topproduit from "../components/homepage/Topproduit";
// import Topcategorie from "../components/homepage/Topcategorie";
// import Recent from "../components/homepage/Recent";
// import Chat from "../components/Chat";
// import Publicite from "../components/Publicite";
// import Redirection from "../components/Redirection";
// import Popup from "../components/homepage/WarningPopup";

// const Homepage = () => {
//     return (
//         <div className="general">
//             <Publicite />
//             <div className="my-custom-div">
//                 <NavBar />
//                 <section className="mb-3 ">
//                     <Redirection
//                         texte={
//                             "Mettez en valeur vos services ou produits sur Nilservice"
//                         }
//                         nomBoutton={"Créer votre compte"}
//                         lien={"/page/inscription"}
//                     />

//                     <div className="container espace-home">
//                         <h2 className="se  mb-4">Post recent</h2>
//                         <Recent />
//                     </div>
//                     <div className="container espace-home">
//                         <h2 className="se  mb-4">Top catégories produits</h2>
//                         <Topcategorie />
//                     </div>
//                     <div className="container espace-home">
//                         <h2 className="se  mb-4">Top catégories Services</h2>
//                         <Topproduit />
//                     </div>

//                     <section className="about-home espace-home">
//                         <div className="about-text">
//                             <span className="fw-bold">
//                                 {" "}
//                                 Choisissez un Professionnel pour vos travaux
//                             </span>
//                             <h3>
//                                 Nous vous mettons en relation avec les
//                                 professionnels de chaque domaine, près de chez
//                                 vous.
//                             </h3>
//                             <div>
//                                 <ul>
//                                     <li>Choississez un professionnel</li>
//                                     <li>
//                                         Discutez avec lui sur vos travaux et sur
//                                         le prix
//                                     </li>
//                                     <li>Payez quand le travail effectué</li>
//                                     <li>Et revenez evaluer le prestataire</li>
//                                 </ul>
//                             </div>
//                         </div>
//                         <div className="about-image prof-image"></div>
//                     </section>

//                     <div className=" espace-home">
//                         <div className="flex-column gap-3 py-4 abonnement espace-abonnement  bg-primary">
//                             <p>
//                                 Des services indépendants à votre portée,
//                                 rejoignez la communauté Nilservice dès
//                                 maintenant!
//                             </p>
//                             <button style={{ backgroundColor: "white" }}>
//                                 <a className="espace-a" href="/page/inscription">
//                                     S’abonner
//                                 </a>
//                             </button>
//                         </div>
//                     </div>
//                     <section className="faq espace-home">
//                         <div className="faq-text">
//                             <h3 className="comment">Comment ça marche</h3>
//                             <Accordion />
//                         </div>
//                     </section>
//                 </section>

//                 <Partenaire />
//                 <Chat />
//                 <Footer />
//                 <Popup />
//             </div>
//         </div>
//     );
// };

// export default Homepage;
//import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/navbar/NavBar";
import "../assets/css/homepage.css";
import Accordion from "../components/homepage/Accordion";
import Partenaire from "../components/Partenaire";
import Topproduit from "../components/homepage/Topproduit";
import Topcategorie from "../components/homepage/Topcategorie";
import Recent from "../components/homepage/Recent";
import Chat from "../components/Chat";
import Publicite from "../components/Publicite";
import Redirection from "../components/Redirection";
import Popup from "../components/homepage/WarningPopup";

const Homepage = () => {
    return (
        <div className="general">
            <Publicite />
            <div className="my-custom-div">
           <NavBar/>
                <section className="mb-3 ">
                    <Redirection
                        texte={
                            "Mettez en valeur vos services ou produits sur Nilservice"
                        }
                        nomBoutton={"Créer votre compte"}
                        lien={"/page/inscription"}
                    />

                    <div className="container espace-home">
                        <h2 className="se  mb-4">Post recent</h2>
                        <Recent />
                    </div>
                    <div className="container espace-home">
                        <h2 className="se  mb-4">Top catégories produits</h2>
                        <Topcategorie />
                    </div>
                    <div className="container espace-home">
                        <h2 className="se  mb-4">Top catégories Services</h2>
                        <Topproduit />
                    </div>

                    <section className="about-home espace-home">
                        <div className="about-text">
                            <span className="fw-bold">
                                {" "}
                                Choisissez un Professionnel pour vos travaux
                            </span>
                            <h3>
                                Nous vous mettons en relation avec les
                                professionnels de chaque domaine, près de chez
                                vous.
                            </h3>
                            <div>
                                <ul>
                                    <li>Choississez un professionnel</li>
                                    <li>
                                        Discutez avec lui sur vos travaux et sur
                                        le prix
                                    </li>
                                    <li>Payez quand le travail effectué</li>
                                    <li>Et revenez evaluer le prestataire</li>
                                </ul>
                            </div>
                        </div>
                        <div className="about-image prof-image"></div>
                    </section>

                    <div className=" espace-home">
                        <div className="flex-column gap-3 py-4 abonnement espace-abonnement  bg-primary">
                            <p>
                                Des services indépendants à votre portée,
                                rejoignez la communauté Nilservice dès
                                maintenant!
                            </p>
                            <button style={{ backgroundColor: "white" }}>
                                <a className="espace-a" href="/page/inscription">
                                    S’abonner
                                </a>
                            </button>
                        </div>
                    </div>
                    <section className="faq espace-home">
                        <div className="faq-text">
                            <h3 className="comment">Comment ça marche</h3>
                            <Accordion />
                        </div>
                    </section>
                </section>

                <Partenaire />
                <Chat />
                <Footer />
                <Popup />
            </div>
        </div>
    );
};

export default Homepage;
