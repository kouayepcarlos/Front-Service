import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { startOfWeek, addWeeks,endOfWeek,format, isBefore,addDays } from "date-fns";
import Form from "react-bootstrap/Form";
import { Button } from "primereact/button";
import "../../assets/css/admin/objectifpartenaire.css"
import { fr } from "date-fns/locale";
import { useAdminContext } from "../../Contexts/AdminProvider";
import LoaderTransparent from "../LoadersCompoments/LoaderTransparent";
const Objectifpartenaire = ({partenaire}) => {
     const {definirObjectif} = useAdminContext()
  const [selectedDate, setSelectedDate] = useState(null);
  const [weekText, setWeekText] = useState("");
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [nombre, setNombre] = useState(1);
    const [nom,setNom] =useState("charlie")
    const [debut,setDebut] = useState(new Date())
    const [fin,setFin] = useState(new Date())
const [loading,setLoading]=useState(false)

   const handleChange = (date) => {
  if (!isBefore(date, new Date())) {
    setSelectedDate(date);
    setSelectedWeek(date);

    const start = date; // la date choisie
    setDebut(start);

    const end = addDays(date, 7); // 7 jours après
    setFin(end);

    const formattedStart = format(start, "EEEE dd MMMM yyyy", { locale: fr });
    const formattedEnd = format(end, "EEEE dd MMMM yyyy", { locale: fr });
console.log(end)
    setWeekText(`Du ${formattedStart} au ${formattedEnd}`);
    console.log(weekText)
  }
};
    const handleSubmit = async (event) => {
        event.preventDefault();
setLoading(true)
        try {
            console.log(debut,fin,nombre)
            await definirObjectif.mutateAsync({
                partenaire: partenaire?.id,
               date_debut:debut,
               date_fin:fin,
               objectif_parrainages:nombre
            });

         
        } catch (error) {
          //  console.log(error)
        } finally {
             setLoading(false);
        }
    };

    return (
        <>
            <div className=" p-4 shadow-md rounded-md content content-partenaire">
                <h3>Ajout objectif</h3>
                {loading && <LoaderTransparent/>}
                <div className="card flex px-sm-4 pt-5 justify-content-center">
                    <Form  className="px-2 pb-2" onSubmit={handleSubmit}>
                        <div className="flex flex-column h-12rem pr-3   gap-5">
                            {" "}
                            <Form.Control
                                className="mb-3 h-12rem"
                                value={partenaire?.nom}
                              
                                type="text"
                               readOnly
                                placeholder="Nom du partenaire"
                            />
                            <div className="mb-3">
                              
                               
                                <DatePicker
                                    selected={selectedWeek}
                                    onChange={handleChange}
                                    showWeekNumbers
                                    showPopperArrow={false}
                                    
                                    filterDate={(date) => date >=new Date()}
                                    placeholderText="Selectionner la semaine"
                                />
                               <br />
                               
                            </div>
                            <p className="text-dark">{weekText}</p>
                            <Form.Control
                                className="mb-3 h-12rem"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                type="number"
                                min={1}
                                placeholder="Entrer l'objectif de la semaine"
                            />
                        </div>

                        <Button
                            type="submit"
                            label="Ajouter"
                            className="p-button-success mt-4"
                        />
                    </Form>
                </div>
            </div>
            <div style={{ marginBottom: "150px" }}></div>
        </>
    );
};

export default Objectifpartenaire;
