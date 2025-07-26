import React from "react"

/**
 * @typedef {Object} Informations
 * @property {Object} listeInformations -objects contenant toutes les informations de l'utilisateur 
 * listeInformations = [{
 * name,
 * defaultvalue,
 * typeInput:"text","number",...
 * readonly:true,false}]
 */
 
 /** 
  *  @param {Informations} params
 * @returns 
 */

const Ajoutinformations = ({listeInformations}) => {

  return (
    <div className="p-4  rounded  w-100" style={{ maxWidth: "600px", margin: "auto" }}>
    <h2 className="text-center " style={{ color: "#ef8f0a" }}>Informations relatives à votre compte</h2>
    <ul className="list-group list-group-flush">
{listeInformations.length!=0 && listeInformations.map((info,index)=>(
 <div key={index}>

<li className="list-group-item"><strong>{info.name}</strong><input type={info.typeInput} name={info.name} defaultValue={info.defaultvalue?info.defaultvalue:""} readOnly={info.readonly}/></li>

 </div>
))
}
</ul>

    </div>
  )
}

export default Ajoutinformations;