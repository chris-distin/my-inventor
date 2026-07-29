"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

type AdminProperty = {
  id: string;
  featured_image: string | null;
  title: string | null;
  location: string | null;
  price: number | string | null;
  type: string | null;
  status: string | null;
};

type Props = {
  properties?: unknown;
};

function formatPrice(price: AdminProperty["price"]) {
  const numericPrice = Number(price);

  return Number.isFinite(numericPrice)
    ? `AED ${numericPrice.toLocaleString("en-AE")}`
    : "—";
}

export default function AdminPropertyTable({ properties: legacyProperties }: Props) {
  void legacyProperties;

  const router = useRouter();
  const [properties, setProperties] = useState<AdminProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProperties() {
      const { data, error } = await supabase
        .from("properties")
        .select("id, featured_image, title, location, price, type, status")
        .order("created_at", { ascending: false });

      if (!isMounted) {
        return;
      }

      if (error) {
        setErrorMessage(error.message);
        setProperties([]);
      } else {
        setProperties((data ?? []) as AdminProperty[]);
      }

      setLoading(false);
    }

    loadProperties();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow">
      <table className="w-full">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Type</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan={7} className="p-8 text-center text-gray-500">
                Loading properties...
              </td>
            </tr>
          )}

          {!loading && errorMessage && (
            <tr>
              <td colSpan={7} className="p-8 text-center text-red-600">
                {errorMessage}
              </td>
            </tr>
          )}

          {!loading && !errorMessage && properties.length === 0 && (
            <tr>
              <td colSpan={7} className="p-8 text-center text-gray-500">
                No properties found
              </td>
            </tr>
          )}

          {!loading && !errorMessage && properties.map((property) => (
            <tr key={property.id} className="border-b">
              <td className="p-4">
                {property.featured_image ? (
                  <img
                    src={property.featured_image}
                    alt={property.title ?? "Property"}
                    className="h-[60px] w-20 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-[60px] w-20 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                    No image
                  </div>
                )}
              </td>

              <td className="p-4 font-medium text-gray-800">
                {property.title || "Untitled property"}
              </td>

              <td className="p-4 text-gray-600">{property.location || "—"}</td>

              <td className="p-4 text-gray-800">{formatPrice(property.price)}</td>

              <td className="p-4 text-gray-600">{property.type || "—"}</td>

              <td className="p-4">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-[#0B3D91]">
                  {property.status || "—"}
                </span>
              </td>

              <td className="p-4">
                <button
                  onClick={() => router.push(`/admin/properties/${property.id}/edit`)}
                  className="rounded bg-yellow-500 px-3 py-1 text-white transition hover:bg-yellow-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
