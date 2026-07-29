"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Summary = {
  totalProperties: number;
  featuredProperties: number;
  forSale: number;
  forRent: number;
  developers: number;
  totalBedrooms: number;
  propertyTypes: number;
};

export default function AdminStats() {
  const [summary, setSummary] = useState<Summary>({
    totalProperties: 0,
    featuredProperties: 0,
    forSale: 0,
    forRent: 0,
    developers: 0,
    totalBedrooms: 0,
    propertyTypes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      const { data, error } = await supabase
        .from("properties")
        .select("id, purpose, featured, developer, bedrooms, type");

      if (error) {
        setLoading(false);
        return;
      }

      const properties = (data ?? []) as Array<{
        id: string;
        purpose: string | null;
        featured: boolean | null;
        developer: string | null;
        bedrooms: number | null;
        type: string | null;
      }>;

      const developers = new Set(
        properties.map((property) => property.developer).filter(Boolean)
      ).size;
      const propertyTypes = new Set(
        properties.map((property) => property.type).filter(Boolean)
      ).size;

      setSummary({
        totalProperties: properties.length,
        featuredProperties: properties.filter((property) => property.featured).length,
        forSale: properties.filter((property) => property.purpose === "Buy" || property.purpose === "Sale").length,
        forRent: properties.filter((property) => property.purpose === "Rent").length,
        developers,
        totalBedrooms: properties.reduce((total, property) => total + (property.bedrooms ?? 0), 0),
        propertyTypes,
      });
      setLoading(false);
    }

    loadSummary();
  }, []);

  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <div className="rounded-2xl bg-white p-6 shadow">
        <h3 className="text-gray-500">Properties</h3>
        <p className="mt-2 text-4xl font-bold text-[#0B3D91]">
          {loading ? "—" : summary.totalProperties}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
        <h3 className="text-gray-500">Featured</h3>
        <p className="mt-2 text-4xl font-bold text-[#0B3D91]">
          {loading ? "—" : summary.featuredProperties}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
        <h3 className="text-gray-500">For Sale</h3>
        <p className="mt-2 text-4xl font-bold text-[#0B3D91]">
          {loading ? "—" : summary.forSale}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
        <h3 className="text-gray-500">For Rent</h3>
        <p className="mt-2 text-4xl font-bold text-[#0B3D91]">
          {loading ? "—" : summary.forRent}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
        <h3 className="text-gray-500">Developers</h3>
        <p className="mt-2 text-4xl font-bold text-[#0B3D91]">
          {loading ? "—" : summary.developers}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow">
        <h3 className="text-gray-500">Bedrooms</h3>
        <p className="mt-2 text-4xl font-bold text-[#0B3D91]">
          {loading ? "—" : summary.totalBedrooms}
        </p>
      </div>
    </div>
  );
}