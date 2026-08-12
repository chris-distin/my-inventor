"use client";

import { useCallback, useMemo, useState } from "react";

import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  ScaleControl,
  Source,
  Layer,
} from "react-map-gl/mapbox";

import type {
  MapMouseEvent,
  MarkerDragEvent,
} from "react-map-gl/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";


interface Props {
  latitude: number;
  longitude: number;
  onLocationChange: (
    lat: number,
    lng: number
  ) => void;
}


const MAPBOX_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN;



export default function PropertyLocationPicker({
  latitude,
  longitude,
  onLocationChange,
}: Props) {


  const [satellite, setSatellite] = useState(false);



  const mapStyle = satellite
    ? "mapbox://styles/mapbox/satellite-streets-v12"
    : "mapbox://styles/mapbox/streets-v12";



  const markerData = useMemo(
    () => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          longitude,
          latitude,
        ],
      },
    }),
    [
      latitude,
      longitude,
    ]
  );



  const handleMapClick = useCallback(
    (event: MapMouseEvent) => {

      onLocationChange(
        event.lngLat.lat,
        event.lngLat.lng
      );

    },
    [
      onLocationChange,
    ]
  );



  if (!MAPBOX_TOKEN) {

    return (

      <div className="rounded-xl bg-red-100 p-5 text-red-700">

        Mapbox token missing.
        Add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local

      </div>

    );

  }



  return (

    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">


      {/* Header */}

      <div className="flex items-center justify-between border-b bg-white p-4">


        <div>

          <h2 className="text-xl font-bold text-[#0B3D91]">
            Property Location
          </h2>


          <p className="text-sm text-gray-500">
            Click on the map to place the property
          </p>


        </div>



        <button

          type="button"

          onClick={() =>
            setSatellite(!satellite)
          }

          className="rounded-xl bg-[#0B3D91] px-4 py-2 font-semibold text-white hover:bg-blue-800"

        >

          {satellite
            ? "Street View"
            : "Satellite"}

        </button>


      </div>





      {/* Map */}

      <Map

        mapboxAccessToken={MAPBOX_TOKEN}


        initialViewState={{

          longitude,

          latitude,

          zoom: 11,

        }}


        mapStyle={mapStyle}


        style={{

          width: "100%",

          height: 450,

        }}


        onClick={handleMapClick}

      >



        <NavigationControl
          position="top-right"
        />



        <FullscreenControl
          position="top-right"
        />



        <GeolocateControl
          position="top-right"
        />



        <ScaleControl />



        <Marker

          longitude={longitude}

          latitude={latitude}

          draggable


          onDragEnd={(event: MarkerDragEvent) => {

            onLocationChange(

              event.lngLat.lat,

              event.lngLat.lng

            );

          }}

        />




        <Source

          id="property-marker"

          type="geojson"

          data={markerData as GeoJSON.Feature}

        >


          <Layer

            id="property-circle"

            type="circle"

            paint={{

              "circle-radius": 12,

              "circle-color": "#0B3D91",

              "circle-stroke-width": 3,

              "circle-stroke-color": "#ffffff",

            }}

          />


        </Source>



      </Map>





      {/* Coordinates */}

      <div className="grid gap-4 bg-gray-50 p-5 md:grid-cols-2">


        <div>

          <label className="mb-2 block font-semibold">
            Latitude
          </label>


          <input

            readOnly

            value={latitude}

            className="w-full rounded-lg border bg-white p-3"

          />

        </div>





        <div>

          <label className="mb-2 block font-semibold">
            Longitude
          </label>


          <input

            readOnly

            value={longitude}

            className="w-full rounded-lg border bg-white p-3"

          />

        </div>


      </div>



    </div>

  );

}