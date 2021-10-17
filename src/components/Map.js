import React, {useState} from 'react'
import '../App.css'
import quartiers from '../data/quartiers-marseille.geojson'
import schoolsData from "../data/ecoles-marseille-nouveau.json"
import 'leaflet/dist/leaflet.css';
import Legende from './Legende';
import {MapContainer, TileLayer, Marker, Popup, GeoJSON} from 'react-leaflet'

export default function Map() {

    const position = [43.28817965, 5.40450052]; {/* Position de Marseille*/ }

    const [option, selectedOption] = useState('general');

    console.log(option);
 
    return (
        <div id='mapid'>
             


        <MapContainer center={position} zoom={12} scrollWheelZoom={false} style={{ height: '100vh', width: '100%' }}>
          <Legende /> {/* Légende par dessus la map */}
          <GeoJSON  data={quartiers.features} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

        {

    
          schoolsData.map( schl => (

              <Marker 
                key={schl.ecole_RNE}
                position= {[schl.ecole_lat, schl.ecole_long]}
                
                >
                  <Popup>
                    <h2>{schl.ecole_appellation}</h2>
                    
                    <div className='popupInfos'>
                    <select onChange = {(e) => selectedOption(e.target.value)} > {/* Ici la volontée est d'afficher un des composants d'informations en fonction du choix de l'utilisateur */ }
                        <option value='general' >Infos générales</option>
                        <option value='scolarite'>Scolarité</option>
                        <option value='rapport'>Rapports</option>

                    </select>

                   { option === 'general' && 
                      <div id='infosGeneral'>
                      <ul>
                        <li>RNE : {schl.ecole_RNE}</li>
                        <li>Type d'enseignement : {schl.public_prive}</li>
                        <li>Adresse : {schl.ecole_adresse}</li>
                        <li>Code postal : {schl.cp}</li>
                        <li>Téléphone : {schl.telephone}</li>
                        <li>Email : {schl.mail}</li>
                      </ul>
                    </div>

                   }

                   { option ==='scolarite' && 
                     <div id='infosScolarite'>
                                  
                          <ul>
                            <li>Effectif classes : {schl.TOTAL_EFFECTIF}</li>
                            <li>Nombre de classes : {schl.TOTAL_CLASSES}</li>
                            <li>Nombre d'élèves moyen : {schl.NB_ELEVE_CLASSE}</li>
                          </ul>
                    </div>
                   }

                   {
                     // Améliorations possible une fois la DB récupérée
                      option ==='rapport' && 
                      <div id='infosRapport'>
                      <ul>
                        <li>Rapport amiante : A VENIR </li>
                        <li>Rapport commission sécurité: A VENIR </li>
                        <li>Rapport  ERP : A VENIR </li>
                      </ul>
                      </div>
                     
                   }
                    
                   

                    </div>
                  </Popup>
              </Marker>
        ))}

          
         
          
        </MapContainer>

</div>
    )
}
