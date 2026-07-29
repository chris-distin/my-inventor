"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";


const createIcon = (emoji:string) =>
  L.divIcon({
    html:`<div style="font-size:24px">${emoji}</div>`,
    className:"",
  });



const places = {

schools:[
{
name:"Dubai British School",
lat:25.0578,
lng:55.1515,
},
{
name:"Emirates International School",
lat:25.0987,
lng:55.1698,
},
],


hospitals:[
{
name:"Mediclinic Dubai Marina",
lat:25.0791,
lng:55.1401,
},
{
name:"Saudi German Hospital Dubai",
lat:25.1015,
lng:55.2035,
},
],


malls:[
{
name:"Dubai Marina Mall",
lat:25.0770,
lng:55.1395,
},
{
name:"Mall of the Emirates",
lat:25.1181,
lng:55.2006,
},
],


restaurants:[
{
name:"Pier 7 Restaurants",
lat:25.0780,
lng:55.1405,
},
],


beaches:[
{
name:"JBR Beach",
lat:25.0800,
lng:55.1320,
},
],


airports:[
{
name:"Dubai International Airport",
lat:25.2532,
lng:55.3657,
},
],

};



export function LocationMarkers({

data,
icon,
label,

}:{

data:{
name:string;
lat:number;
lng:number;
}[];

icon:string;

label:string;

}){


return (

<>

{
data.map((place)=>(

<Marker

key={place.name}

position={[
place.lat,
place.lng
]}

icon={createIcon(icon)}

>

<Popup>

{icon} {label}

<br/>

{place.name}

</Popup>


</Marker>

))

}

</>

);

}





export function SchoolsLayer(){

return (

<LocationMarkers

data={places.schools}

icon="🏫"

label="School"

/>

);

}



export function HospitalsLayer(){

return (

<LocationMarkers

data={places.hospitals}

icon="🏥"

label="Hospital"

/>

);

}



export function MallsLayer(){

return (

<LocationMarkers

data={places.malls}

icon="🛒"

label="Mall"

/>

);

}



export function RestaurantsLayer(){

return (

<LocationMarkers

data={places.restaurants}

icon="🍽️"

label="Restaurant"

/>

);

}



export function BeachesLayer(){

return (

<LocationMarkers

data={places.beaches}

icon="🏖️"

label="Beach"

/>

);

}



export function AirportsLayer(){

return (

<LocationMarkers

data={places.airports}

icon="✈️"

label="Airport"

/>

);

}