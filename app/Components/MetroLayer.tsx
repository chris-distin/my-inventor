"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";


const metroIcon = L.icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
  iconSize: [30, 30],
});


const metroStations = [
  {
    name: "DMCC Metro Station",
    latitude: 25.0688,
    longitude: 55.1408,
  },
  {
    name: "Dubai Marina Metro Station",
    latitude: 25.0796,
    longitude: 55.1547,
  },
  {
    name: "Jumeirah Lakes Towers Metro Station",
    latitude: 25.0699,
    longitude: 55.1454,
  },
];



export default function MetroLayer() {

  return (

    <>

      {metroStations.map((station)=>(

        <Marker

          key={station.name}

          position={[
            station.latitude,
            station.longitude
          ]}

          icon={metroIcon}

        >

          <Popup>
            🚇 {station.name}
          </Popup>


        </Marker>

      ))}

    </>

  );

}