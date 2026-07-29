import Link from "next/link";
import { notFound } from "next/navigation";

import PropertyAgent from "../../Components/PropertyAgent";
import PropertyAmenities from "../../Components/PropertyAmenities";
import PropertyBasicInfo from "../../Components/PropertyBasicInfo";
import PropertyDetails from "../../Components/PropertyDetails";
import PropertyGallery from "../../Components/PropertyGallery";
import { supabase } from "../../lib/supabase";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

type PropertyDetailData = {
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
  images: string[];
  description: string;
  amenities: string[];
  latitude: number;
  longitude: number;
};

function normalizeProperty(row: any): PropertyDetailData {
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
    images,
    description: row?.description ?? "",
    amenities: Array.isArray(row?.amenities) ? row.amenities : [],
    latitude: row?.latitude ?? 25.2048,
    longitude: row?.longitude ?? 55.2708,
  };
}

function formatPrice(value: string | number | null | undefined) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return "Contact us";
  }
  return `AED ${numericValue.toLocaleString("en-AE")}`;
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const { data, error } = await supabase
    .from("properties")
    .select(
      "id,title,price,location,type,purpose,bedrooms,bathrooms,area,developer,images,featured_image,description,amenities,latitude,longitude"
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const property = normalizeProperty(data);
  const parking = property.id.includes("villa") ? 4 : property.id.includes("penthouse") ? 3 : 2;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/property"
          className="mb-6 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0B3D91] shadow-sm transition hover:bg-blue-50"
        >
          ← Back to Properties
        </Link>

        <section className="overflow-hidden rounded-[28px] bg-white shadow-xl">
          <div className="bg-gradient-to-r from-[#0B3D91] to-[#1d4ed8] px-6 py-8 text-white sm:px-8 lg:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-blue-100">Featured Listing</p>
                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{property.title}</h1>
                <p className="mt-3 text-base text-blue-100">{property.location}</p>
              </div>
              <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur">
                <p className="text-sm text-blue-100">Starting From</p>
                <p className="text-2xl font-bold">{property.price}</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <PropertyGallery images={property.images.length > 0 ? property.images : [property.image]} />

            <div className="mt-10">
              <PropertyDetails
                title={property.title}
                price={property.price}
                location={property.location}
                developer={property.developer}
                propertyType={property.type}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                area={property.area}
                parking={parking}
                status="Available"
                description={property.description}
              />
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <PropertyAmenities amenities={property.amenities} />
              </div>
              <div className="rounded-3xl bg-[#f8fafc] p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-[#0B3D91]">Why this property stands out</h2>
                <ul className="mt-4 space-y-3 text-gray-700">
                  <li>• Premium location with strong resale potential</li>
                  <li>• Spacious interiors and modern finishes</li>
                  <li>• Access to concierge, security, and lifestyle amenities</li>
                  <li>• Flexible viewing options with our property team</li>
                </ul>
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <PropertyBasicInfo
                form={{
                  title: property.title,
                  price: property.price,
                  purpose: property.purpose,
                  type: property.type,
                  location: property.location,
                  developer: property.developer,
                }}
                onChange={() => undefined}
              />
            </div>

            <div className="mt-10">
              <PropertyAgent />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
