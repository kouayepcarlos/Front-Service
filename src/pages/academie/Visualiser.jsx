import React ,{useEffect,useState} from 'react'
import { useParams } from "react-router-dom";
// Importation des dépendances et composants nécessaires
import Footer from "../../components/Footer"; // Pied de page
import "../../assets/css/homepage.css"; // Fichier CSS spécifique à la page
import Chat from "../../components/Chat"; // Composant de chat
import Publicite from "../../components/Publicite"; // Composant de publicité
import { useNavigate } from 'react-router-dom';
import { Viewer,Worker } from '@react-pdf-viewer/core';
import Navbaracademie from '../../components/navbar/Navbaracademie'; // Barre de navigation spécifique
import '@react-pdf-viewer/core/lib/styles/index.css';
import "../../assets/css/Academie/visualiser.css"

const Visualiser = () => {
  const [scale, setScale] = useState(1.0);

useEffect(() => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 768) setScale(0.75); // plus petit pour mobile
  else setScale(1.0);
}, []);
  const { lien } = useParams();
  const file = decodeURIComponent(lien)
  const navigate = useNavigate()
  return (
    <div className="general">
    {/* Affichage de la publicité */}
    <Publicite />
    <div className="my-custom-div">
        {/* Barre de navigation spécifique à l'Académie */}
        <Navbaracademie />
        <section className="mb-0 " >
          <button className='btn btn-primary ml-3 ' onClick={()=> navigate("/homeAcademy")}>Retouner a HomeAcademy</button>
          <div className='message-pdf-container'>
           <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                 <Viewer fileUrl={file} defaultScale={scale}/>
                                 </Worker> 
                                 </div>
        </section>
       
<Chat />
<Footer />
</div>
{/* Pied de page, partenaires et chat */}

</div>
  )
}

export default Visualiser