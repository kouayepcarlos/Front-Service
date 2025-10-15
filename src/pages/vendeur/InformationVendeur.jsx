import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Country, City } from "country-state-city";
import { toast } from "react-toastify";
import { FaRegCopy, FaCheck } from "react-icons/fa";

import { useRegister } from "../../Contexts/VendeurProvider";
import Footer from "../../components/Footer";
import Chat from "../../components/Chat";
import Publicite from "../../components/Publicite";
import Navbarvendeur from "../../components/navbar/Navbarvendeur";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";
import "../../assets/css/homepage.css";

const EditPorfil = () => {
    const navigate = useNavigate();
    const { user,lastabonnement,
        isLoadingAbonnement, Maboutique, creerBoutique,nouvelAbonnementVendeurMutation, updateBoutique } = useRegister();
const [loading,setLoading]=useState(true)
    const [data, setData] = useState({
        logo:null
    });
    const [pays, setPays] = useState(null);
    const [ville, setVille] = useState(null);
    const [copied, setCopied] = useState(false);
    const [boutique, setmaBoutique] = useState(null);
  const [date, setDate] = useState(null);
    const difference = () => {
    if (!lastabonnement) return;
    const dateFin = new Date(lastabonnement?.date_fin);
    const dateAujourdhui = new Date();

    // Calcul de la différence en millisecondes
    const diffMs = dateFin - dateAujourdhui;

    // Conversion en jours (1 jour = 86400000 ms)
    const diffJours = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    setDate(diffJours);
  };
    const nouvelAbonnement =async () =>{
       setLoading(true)
        try{
        await nouvelAbonnementVendeurMutation.mutateAsync({
            redirect_url:"https://nilservice.net/vendeur/connexion",
            //"localhost:5173/connexion/vendeur",
            faillure_redirect_url:"https://nilservice.net/page/echec"
            //"localhost:5173/page/echec"
        });
    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        // Désactive le loader
        setLoading(false)
    }
    }
    const countryOptions = Country.getAllCountries().map((country) => ({
        value: country.isoCode,
        label: country.name,
    }));

    const cityOptions =
        pays &&
        City.getCitiesOfCountry(pays.value).map((city) => ({
            value: city.name,
            label: city.name,
        }));

    const handleChange = (e) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChangeWithName = (name, value) => {
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return toast.error("Aucun fichier sélectionné !");
        if (selectedFile.size > 1024 * 1024)
            return toast.error("Le fichier doit être inférieur à 1 Mo.");

        handleChangeWithName(e.target.name, selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            if (boutique) {
                await updateBoutique.mutateAsync(data);
                toast.success("Boutique mise à jour !");
            } else {
                await creerBoutique.mutateAsync(data);
                toast.success("Boutique créée !");
            }
        } catch (error) {
            toast.error("Erreur lors de la soumission.");
            console.error(error);
        }
        finally{
            setLoading(false)
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(user.code);
        setCopied(true);
    };

    useEffect(() => {
        if (copied) setTimeout(() => setCopied(false), 1000);
    }, [copied]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const result = await Maboutique.mutateAsync();
                if (Object.keys(result).length>0) {
                    
                    const { image, logo, ...rest } = result;
                    setData(rest);
                    setmaBoutique(rest);

                    const paysOpt = countryOptions.find(
                        (c) => c.label.toLowerCase() === result.pays?.toLowerCase()
                    );
                    const villeOpt =
                        paysOpt &&
                        City.getCitiesOfCountry(paysOpt.value).find(
                            (v) => v.name.toLowerCase() === result.ville?.toLowerCase()
                        );

                    setPays(paysOpt || null);
                    setVille(villeOpt ? { label: villeOpt.name, value: villeOpt.name } : null);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération :", error);
            }finally{
                setLoading(false)
            }
        };

        fetchData();
    }, []);
     useEffect(() => {
    difference();
  }, [lastabonnement]);

    return (
        <div className="general">
            {(loading || isLoadingAbonnement) && <LoaderTransparent/>}
            <Publicite />
            <div className="my-custom-div">
                <Navbarvendeur />
                <div className="p-4 rounded w-100" style={{ maxWidth: "600px", margin: "auto" }}>
                    <h2 className="text-center" style={{ color: "#ef8f0a" }}>
                        Informations relatives à votre compte
                    </h2>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <strong>Nom :</strong> {user?.nom}
                        </li>
                        <li className="list-group-item">
                            <strong>Téléphone :</strong> {user?.telephone}
                        </li>
                        <li className="list-group-item">
                            <strong>Email :</strong> {user?.email}
                        </li>
                    </ul>

                    <div className="text-center d-flex flex-column align-items-start gap-2 mt-3">
                        <p className="fw-bold text-success">
                            N'oubliez pas que vous pouvez gagner de l'argent en parrainant
                        </p>
                        <div className="d-flex align-items-center border rounded p-1 w-100">
                            <input
                                type="text"
                                className="form-control text-center"
                                value={user?.code}
                                readOnly
                            />
                            {!copied ? (
                                <FaRegCopy
                                    className="ms-2 text-primary"
                                    style={{ cursor: "pointer" }}
                                    onClick={handleCopy}
                                />
                            ) : (
                                <FaCheck className="text-success" />
                            )}
                        </div>
                    </div>
                      <br />
 {user?.statut != "inscrit" && (
            <div>
              {" "}
              {date > 0 && <p>votre abonnement expire dans {date} jours </p>}
              {date <= 0 && (
                <p>Votre abonnement est expiré , veuillez renouveller</p>
              )}
            </div>
          )}
          <div>
            {user?.statut != "inscrit" ? (
              <button
                className="btn btn-primary"
                onClick={() => {
                  nouvelAbonnement();
                }}
              >
                Renouveller l'abonnement'
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  nouvelAbonnement();
                }}
              >
                payer votre abonnement
              </button>
            )}</div>
                    <button
                        onClick={() => navigate("/vendeur/souscrit")}
                        className="btn btn-outline-primary w-100 mt-3"
                    >
                        Vos statistiques de parrainage ici
                    </button>

{user?.statut == "inscrit" &&  <p>Payez votre abonnement pour modifier votre boutique</p>}
                    {/* Formulaire boutique */}
                { user?.statut !== "inscrit" &&    <form className="mt-4" onSubmit={handleSubmit}>
                        <p className="text-center text-danger">
                            {boutique ? "Modifier votre boutique" : "Créer votre boutique"}
                        </p>

                        <div className="form-group mb-3">
                            <label>Pays</label>
                            <Select
                                name="pays"
                                options={countryOptions}
                                value={pays}
                                onChange={(country) => {
                                    handleChangeWithName("pays", country.label);
                                    setPays(country);
                                    setVille(null);
                                }}
                                placeholder="Sélectionnez un pays"
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Ville</label>
                            <Select
                                name="ville"
                                options={cityOptions}
                                value={ville}
                                onChange={(city) => {
                                    handleChangeWithName("ville", city.label);
                                    setVille(city);
                                }}
                                placeholder="Sélectionnez une ville"
                                isDisabled={!pays}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Nom de la boutique</label>
                            <input
                                type="text"
                                name="nom"
                                value={data?.nom || ""}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Quartier</label>
                            <input
                                type="text"
                                name="quartier"
                                value={data?.quartier || ""}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Logo</label>
                            <input
                                type="file"
                                accept=".jpeg,.png,.jpg"
                                className="form-control"
                                name="logo"
                                required
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Description</label>
                            <textarea
                                name="description"
                                className="form-control"
                                rows={5}
                                value={data?.description || ""}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button className="btn btn-primary w-100" type="submit">
                            {boutique ? "Mettre à jour" : "Créer"}
                        </button>
                    </form>}
                </div>
                <Chat />
                <Footer />
            </div>
        </div>
    );
};

export default EditPorfil;
