//import React from "react";
import Footer from "../../components/Footer";
import "../../assets/css/homepage.css";
// import Partenaire from "../../components/Partenaire";
import Chat from "../../components/Chat";
import Publicite from "../../components/Publicite";
import { useRegister } from "../../Contexts/PrestataireProvider";
import Navbarprestataire from "../../components/navbar/Navbarprestataire";
import { useState, useEffect } from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa"; // Icône pour copier le code de parrainage
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Select from "react-select";
import { Country, City } from "country-state-city";
import { toast } from "react-toastify";
import LoaderTransparent from "../../components/LoadersCompoments/LoaderTransparent";

const EditPorfil = () => {
    const { completedAccountMutation, me ,nouvelAbonnementPrestataireMutation } = useRegister();
    const [data, setData] = useState({});
    const [pays, setPays] = useState({});
    const [ville, setVille] = useState({});
    const [copied, setCopied] = useState(false);
    const [maBoutique, setmaBoutique] = useState({});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
const nouvelAbonnement =async () =>{
    setLoading(true)
    try{
    await nouvelAbonnementPrestataireMutation.mutateAsync({
        redirect_url:"https://nilservice.net/connexion/partenaire",
        //"localhost:5173/connexion/prestataire",
        faillure_redirect_url:"https://nilservice.net/page/echec"
        //"localhost:5173/page/echec"
    });
} catch (error) {
    console.error("Erreur :", error);
} finally {
    setLoading(false); // Désactive le loader
}
}
    const handleChange = (e) => {
        setData((preventStae) => ({
            ...preventStae,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(data);
        setLoading(true);
        try {
            await completedAccountMutation.mutateAsync(data);
            const result = await me.mutateAsync();
            console.log(result);
            setUser(result);
        } catch (error) {
            console.error("Erreur :", error);
        } finally {
            setLoading(false); // Désactive le loader
        }
    };

    // Fonction pour copier le code de parrainage dans le presse-papiers
    const handleCopy = () => {
        navigator.clipboard.writeText(user.code);
        setCopied(true); // Changer l'icône en icône de validation
    };

    useEffect(() => {
        if (copied) setTimeout(() => setCopied(false), 500); // Revenir à l'icône de copie après 2s
    }, [copied]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await me.mutateAsync();
                console.log(result);
                setUser(result);
            } catch (error) {
                console.error("Erreur lors de la récupération :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();

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

    const handleChangeWithName = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(e.target.name);

        if (!selectedFile) {
            toast.error("Aucun fichier sélectionné !");
            return;
        }

        if (selectedFile.size > 1024 * 1024) {
            //  console.log(selectedFile.size);
            toast.error("Le fichier doit être inférieur à 1024ko.");

            return;
        }

        // Vérifier l'extension du fichier

        // Si tout est bon, on met à jour le fichier
        handleChangeWithName(e.target.name, selectedFile);
    };

    return (
        <div className="general">
            {loading && <LoaderTransparent />}
            <Publicite />
            <div className="my-custom-div">
                <Navbarprestataire />
                <div
                    className="p-4  rounded  w-100"
                    style={{ maxWidth: "600px", margin: "auto" }}
                >
                    <h2 className="text-center " style={{ color: "#ef8f0a" }}>
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
                        <li className="list-group-item">
                            <strong>Profession :</strong> {user?.profession}
                        </li>
                        <li className="list-group-item">
                            <strong>Pays :</strong> {user?.pays}
                        </li>
                        <li className="list-group-item">
                            <strong>Ville :</strong> {user?.ville}
                        </li>
                        <li className="list-group-item">
                            <strong>Quartier :</strong> {user?.quartier}
                        </li>
                        <li className="list-group-item">
                            <strong>Description :</strong> {user?.description}
                        </li>
                        {/* {user?.cv && (
                            <li className="list-group-item">
                                <strong>CV :</strong> <a href={user?.cv}>CV</a>
                            </li>
                        )}
                        {user?.cni && (
                            <li className="list-group-item">
                                <strong>CNI :</strong>{" "}
                                <a href={user?.cni}>CNI</a>
                            </li>
                        )}
                        {user?.photo && (
                            <li className="list-group-item">
                                <strong>Photo :</strong>{" "}
                                <a href={user?.photo}>Photo</a>
                            </li>
                        )} */}
                    </ul>

                    <div>
                        <button className="btn btn-primary" onClick={()=>{nouvelAbonnement()}}>Renouveller l'abonnement</button>
                    </div>
                    <div className="text-center d-flex flex-column align-items-start gap-2 mt-3">
                        <p className="fw-bold text-success">
                            n'oubliez pas que vous pouvez gagner de l'argent en
                            parrainant
                        </p>
                        <div className="d-flex align-items-center border rounded p-1 w-100">
                            <input
                                type="text"
                                className="form-control text-center"
                                value={user?.code}
                                readOnly
                            />
                            {!copied && (
                                <FaRegCopy
                                    className="ms-2 text-primary"
                                    style={{ cursor: "pointer" }}
                                    onClick={handleCopy}
                                />
                            )}
                            {copied && <FaCheck className="text-success" />}
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/prestataire/souscrit")}
                        className="btn btn-outline-primary w-100 mt-3"
                    >
                        Vos statistiques de parrainage ici
                    </button>

                    {/* {(!user.filiere && !user.serie) && ( */}
                    {!user?.pays && (
                        <form className="mt-4" onSubmit={handleSubmit}>
                            <p className="text-center text-danger">
                                Complétez votre profil
                            </p>
                            <div className="form-group">
                                <label htmlFor="code">Pays</label>

                                <Select
                                    name="pays"
                                    options={countryOptions}
                                    value={pays}
                                    onChange={(country) => {
                                        handleChangeWithName(
                                            "pays",
                                            country.label
                                        );
                                        setPays(country);
                                        handleChangeWithName("ville", null);
                                    }}
                                    placeholder="Sélectionnez un pays"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ville">Ville</label>

                                <Select
                                    name="ville"
                                    options={cityOptions}
                                    value={ville}
                                    onChange={(city) => {
                                        handleChangeWithName(
                                            "ville",
                                            city.label
                                        );
                                        setVille(city);
                                    }}
                                    placeholder="Sélectionnez une ville"
                                    isDisabled={!pays}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="quartier">Quartier</label>
                                <input
                                    type="text"
                                    name="quartier"
                                    id="quartier"
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cv">CV</label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    className="form-control"
                                    name="cv"
                                    id="cv"
                                    onChange={(e) => {
                                        handleFileChange(e);
                                    }}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cv">CNI</label>
                                <input
                                    type="file"
                                    accept=".jpeg,.png,.jpg,.pdf"
                                    className="form-control"
                                    name="cni"
                                    id="cni"
                                    onChange={(e) => {
                                        handleFileChange(e);
                                    }}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cv">photo</label>
                                <input
                                    type="file"
                                    accept=".jpeg,.png,.jpg,.pdf"
                                    className="form-control"
                                    name="photo"
                                    id="photo"
                                    onChange={(e) => {
                                        handleFileChange(e);
                                    }}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cv">description</label>
                                <textarea
                                    name="description"
                                    id=""
                                    className="form-control"
                                    onChange={handleChange}
                                    rows={5}
                                    required
                                ></textarea>
                            </div>
                            <button
                                className="btn btn-primary w-100"
                                type="submit"
                            >
                                Compléter
                            </button>
                        </form>
                    )}
                    {/* )} */}
                </div>

                <Chat />
                <Footer />
            </div>
        </div>
    );
};

export default EditPorfil;
