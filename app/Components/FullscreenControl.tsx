"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";


export default function FullscreenControl() {

  const map = useMap();


  useEffect(() => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let L: any;


    async function loadLeaflet() {

      L = await import("leaflet");


      const container = document.createElement("div");


      container.className =
        "leaflet-control leaflet-bar";


      container.innerHTML = `
        <a 
          href="#"
          title="Fullscreen"
          style="
            display:flex;
            align-items:center;
            justify-content:center;
            width:34px;
            height:34px;
            background:white;
            font-size:18px;
          "
        >
          ⛶
        </a>
      `;



      container.onclick = (e) => {

        e.preventDefault();


        const mapContainer =
          map.getContainer();



        if (!document.fullscreenElement) {

          mapContainer.requestFullscreen();

        } else {

          document.exitFullscreen();

        }

      };



      const control =
        L.control({ position: "topleft" });



      control.onAdd = () => container;


      control.addTo(map);



    }



    loadLeaflet();



    return () => {

      map.remove();

    };


  }, [map]);



  return null;

}