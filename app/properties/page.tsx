"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import PropertyMap from "../Components/PropertyMap";
import { properties } from "../data/properties";
export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    async function loadProperties() {
      const { data, error } = await supabase
        .from("properties")
        .select("*");

      if (!error) {
        setProperties(data || []);
      }
    }

    loadProperties();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#071A2D",
        padding: "30px",
      }}
    >
      <h1 style={{ color: "white", marginBottom: "20px" }}>
        HOME FOR ALL - PROPERTIES
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          width: "100%",
        }}
      >

        <div
          style={{
            width: "40%",
          }}
        >
          {properties.map((property) => (
            <div
              key={property.id}
              style={{
                background: "white",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "12px",
              }}
            >
              <h2>{property.title}</h2>
              <p>{property.location}</p>
              <p>AED {property.price}</p>
            </div>
          ))}
        </div>


        <div
          style={{
            width: "60%",
            height: "650px",
          }}
        >
          <PropertyMap properties={properties} />
        </div>

      </div>
    </main>
  );
}