"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import type { Property } from "../data/properties";


mapboxgl.accessToken =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";



interface PropertyMapProps {
  properties: Array<{
    id: string;
    title: string;
    location: string;
    price: string | number;
    image?: string;
    longitude?: number;
    latitude?: number;
  }>;
  selectedProperty?: Property | null;
}



const transport = [
  {
    name: "Dubai Marina Metro Station",
    type: "Metro",
    longitude: 55.1495,
    latitude: 25.0782,
  },
  {
    name: "DMCC Metro Station",
    type: "Metro",
    longitude: 55.1448,
    latitude: 25.0688,
  },
  {
    name: "Dubai Marina Tram Station",
    type: "Tram",
    longitude: 55.1473,
    latitude: 25.0908,
  },
];



const communities = [
  {
    name:"Dubai Marina",
    longitude:55.139,
    latitude:25.080
  },
  {
    name:"Downtown Dubai",
    longitude:55.274,
    latitude:25.197
  },
  {
    name:"Business Bay",
    longitude:55.263,
    latitude:25.186
  },
  {
    name:"Palm Jumeirah",
    longitude:55.139,
    latitude:25.112
  },
  {
    name:"JVC",
    longitude:55.209,
    latitude:25.058
  },
  {
    name:"Dubai Hills",
    longitude:55.244,
    latitude:25.110
  }
];



export default function PropertyMap({

  properties,

  selectedProperty,

}: PropertyMapProps) {



  const mapContainer =
    useRef<HTMLDivElement | null>(null);


  const map =
    useRef<mapboxgl.Map | null>(null);


  const markers =
    useRef<mapboxgl.Marker[]>([]);




  useEffect(()=>{


    if(
      !mapContainer.current ||
      map.current
    )
    return;



    map.current =
      new mapboxgl.Map({

        container:
          mapContainer.current,

        style:
          "mapbox://styles/mapbox/streets-v12",

        center:[
          55.2708,
          25.2048
        ],

        zoom:10.5,

      });



    map.current.addControl(
      new mapboxgl.NavigationControl(),
      "top-right"
    );



    // Satellite switch

    const satelliteButton =
      document.createElement("button");


    satelliteButton.innerHTML="🛰️";


    satelliteButton.style.padding="8px";


    satelliteButton.onclick=()=>{

      const style =
        map.current?.getStyle().sprite;


      map.current?.setStyle(

        map.current
        ?.getStyle()
        .name
        ?.includes("Satellite")

        ?

        "mapbox://styles/mapbox/streets-v12"

        :

        "mapbox://styles/mapbox/satellite-streets-v12"

      );

    };



    const satelliteControl =
      document.createElement("div");


    satelliteControl.className =
      "mapboxgl-ctrl mapboxgl-ctrl-group";


    satelliteControl.appendChild(
      satelliteButton
    );


    document
      .querySelector(".mapboxgl-ctrl-top-right")
      ?.appendChild(satelliteControl);




    return()=>{

      map.current?.remove();

      map.current=null;

    };


  },[]);







  // PROPERTY MARKERS

  useEffect(()=>{


    if(!map.current)
      return;



    markers.current.forEach(
      marker=>marker.remove()
    );


    markers.current=[];




    properties.forEach(property=>{


      const popup =
        new mapboxgl.Popup({
          offset:25
        })
        .setHTML(`

        <div style="width:230px">

        <img
        src="${property.image}"
        style="
        width:100%;
        height:120px;
        object-fit:cover;
        border-radius:8px;
        "
        />

        <h3>${property.title}</h3>

        <p>${property.location}</p>

        <strong>${property.price}</strong>

        </div>

        `);



      const longitude = property.longitude ?? 55.2708;
      const latitude = property.latitude ?? 25.2048;

      const marker =
        new mapboxgl.Marker({
          color:"#003b73"
        })

        .setLngLat([
          longitude,
          latitude
        ])

        .setPopup(popup)

        .addTo(map.current!);



      markers.current.push(marker);


    });




  },[properties]);








  // TRANSPORT + COMMUNITIES

  useEffect(()=>{


    if(!map.current)
      return;




    transport.forEach(item=>{


      const el =
        document.createElement("div");


      el.innerHTML =
        item.type === "Metro"
        ? "🚇"
        : "🚋";


      el.style.fontSize="24px";



      new mapboxgl.Marker({
        element:el
      })

      .setLngLat([
        item.longitude,
        item.latitude
      ])

      .setPopup(
        new mapboxgl.Popup()
        .setHTML(
          `<strong>${item.name}</strong>`
        )
      )

      .addTo(map.current!);


    });





    communities.forEach(area=>{


      new mapboxgl.Marker({
        color:"#d97706"
      })

      .setLngLat([
        area.longitude,
        area.latitude
      ])

      .setPopup(
        new mapboxgl.Popup()
        .setHTML(
          `
          <strong>
          ${area.name}
          </strong>
          <br/>
          Dubai Community
          `
        )
      )

      .addTo(map.current!);


    });



  },[]);







  // SELECT PROPERTY

  useEffect(()=>{


    if(
      !map.current ||
      !selectedProperty
    )
    return;



    map.current.flyTo({

      center:[
        selectedProperty.longitude,
        selectedProperty.latitude
      ],

      zoom:14,

      essential:true

    });



  },[selectedProperty]);







  // 3D BUILDINGS

  useEffect(()=>{


    map.current?.on(
      "load",
      ()=>{


        if(
          !map.current?.getSource(
            "composite"
          )
        )
        return;



        map.current.addLayer({

          id:"3d-buildings",

          source:"composite",

          "source-layer":"building",

          type:"fill-extrusion",

          minzoom:14,


          paint:{

            "fill-extrusion-color":"#aaa",

            "fill-extrusion-height":[
              "get",
              "height"
            ],

            "fill-extrusion-base":[
              "get",
              "min_height"
            ],

            "fill-extrusion-opacity":0.6

          }


        });


      }
    );


  },[]);






  return (

    <div

      ref={mapContainer}

      className="
      w-full
      h-full
      min-h-[350px]
      "

    />

  );

}