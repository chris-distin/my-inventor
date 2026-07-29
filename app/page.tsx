"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Hero from "./Components/Hero";
import SearchBar from "./Components/SearchBar";
import { supabase } from "./lib/supabase";

type PropertyCardData = {
  id: string;
  title: string;
  price: string;
  location: string;
  type: string;
  purpose: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  developer: string;
  image: string;
  description: string;
};

function formatPrice(value: string | number | null | undefined) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return "Contact us";
  }
  return `AED ${numericValue.toLocaleString("en-AE")}`;
}

function normalizeProperty(row: any): PropertyCardData {
  const images = Array.isArray(row?.images) ? row.images : [];
  return {
    id: row?.id ?? "",
    title: row?.title ?? "Untitled Property",
    price: formatPrice(row?.price),
    location: row?.location ?? "Dubai, UAE",
    type: row?.type ?? "Apartment",
    purpose: row?.purpose ?? "Buy",
    bedrooms: row?.bedrooms ?? 0,
    bathrooms: row?.bathrooms ?? 0,
    area: row?.area?.toString() ?? "—",
    developer: row?.developer ?? "Home for All",
    image: images[0] ?? row?.featured_image ?? "/favicon.ico",
    description: row?.description ?? "",
  };
}

export default function Home() {
  const [properties, setProperties] = useState<PropertyCardData[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyCardData[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadProperties() {
      const { data, error } = await supabase
        .from("properties")
        .select("id,title,price,location,type,purpose,bedrooms,bathrooms,area,developer,images,featured_image,description")
        .order("created_at", { ascending: false });

      if (!isMounted) {
        return;
      }

      if (!error) {
        const normalized = (data ?? []).map(normalizeProperty);
        setProperties(normalized);
        setFilteredProperties(normalized);
      }

      setLoading(false);
    }

    loadProperties();
    return () => {
      isMounted = false;
    };
  }, []);

  function handleSearch(filters: {
    location: string;
    type: string;
    purpose: string;
    bedrooms: string;
    budget: string;
  }) {
    const results = properties.filter((property) => {
      const locationMatch =
        !filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase());
      const typeMatch = !filters.type || property.type === filters.type;
      const purposeMatch = !filters.purpose || property.purpose === filters.purpose;
      const bedroomMatch = !filters.bedrooms || property.bedrooms >= Number(filters.bedrooms);

      const priceValue = Number(property.price.replace(/[^0-9.-]+/g, ""));
      let budgetMatch = true;
      if (filters.budget === "1") {
        budgetMatch = priceValue < 1_000_000;
      } else if (filters.budget === "2") {
        budgetMatch = priceValue >= 1_000_000 && priceValue <= 5_000_000;
      } else if (filters.budget === "5") {
        budgetMatch = priceValue > 5_000_000;
      }

      return locationMatch && typeMatch && purposeMatch && bedroomMatch && budgetMatch;
    });

    setFilteredProperties(results);
  }

  function toggleFavorite(id: string) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  return (
    <main className="bg-white">
      <Hero />
      <SearchBar onSearch={handleSearch} />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-8 text-4xl font-bold text-[#0B3D91]">Explore UAE Properties</h2>

        {loading ? (
          <p className="text-gray-600">Loading listings from the live database...</p>
        ) : filteredProperties.length === 0 ? (
          <p className="text-gray-600">No properties match your current search.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <div key={property.id} className="overflow-hidden rounded-2xl border bg-white shadow transition hover:shadow-2xl">
                <div className="relative">
                  <img src={property.image} alt={property.title} className="h-56 w-full object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#0B3D91] px-4 py-2 text-white">
                    {property.purpose}
                  </span>
                  <button onClick={() => toggleFavorite(property.id)} className="absolute right-4 top-4 rounded-full bg-white p-3 shadow">
                    {favorites.includes(property.id) ? "❤️" : "🤍"}
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#0B3D91]">{property.title}</h3>
                  <p className="mt-3 text-2xl font-bold text-gray-900">{property.price}</p>
                  <p className="mt-3 text-gray-600">📍 {property.location}</p>

                  <div className="mt-4 flex flex-wrap gap-4 text-gray-700">
                    <span>🛏 {property.bedrooms} Beds</span>
                    <span>🚿 {property.bathrooms} Baths</span>
                    <span>📐 {property.area}</span>
                  </div>

                  <p className="mt-4 text-gray-600">🏢 {property.developer}</p>

                  <Link href={`/property/${property.id}`} className="mt-6 inline-block rounded-xl bg-[#0B3D91] px-5 py-3 font-semibold text-white hover:bg-blue-800">
                    View Property
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
