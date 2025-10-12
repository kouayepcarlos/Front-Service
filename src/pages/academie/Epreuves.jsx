
import Footer from "../../components/Footer";
import NavBar from "../../components/navbar/NavBar";
import "../../assets/css/homepage.css";
import { useEffect, useState } from "react";
//import Sujet from "../../components/academie/sujet";
import Chat from "../../components/Chat";
import Publicite from "../../components/Publicite";
import Redirection from "../../components/Redirection";

const Epreuves = () => {
  const [name, setName] = useState("carlos");
  useEffect(() => {}, []);
  return (
    <div className="general">
      <Publicite />
      <div className="my-custom-div">
        <NavBar />
        <section className="mb-5  ">
          <Redirection
            texte={`Bonjour ${name}, ici tu peux consulter tes anciens sujets de ta
              filière`}
            nomBoutton={"Parrainez un ami"}
            lien={""}
          />
          {/* <Sujet /> */}
        </section>
        <Chat />
        <Footer />
      </div>
    </div>
  );
};

export default Epreuves;
