"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";


const tramIcon = L.icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/2554/2554978.png",
  iconSize: [30, 30],
});



const tramStations = [

  {
    name:"Dubai Marina Tram Station",
    latitude:25.0737,
    longitude:55.1342,
  },

  {
    name:"Jumeirah Beach Residence Tram Station",
    latitude:25.0765,
    longitude:55.1328,
  },

  {
    name:"JBR 2 Tram Station",
    latitude:25.0779,
    longitude:55.1307,
  },

];



export default function TramLayer(){

return (

<>

{tramStations.map((station)=>(


<Marker

key={station.name}

position={[
station.latitude,
station.longitude
]}

icon={tramIcon}

>


<Popup>

🚊 {station.name}

</Popup>


</Marker>


))}


</>

);

}