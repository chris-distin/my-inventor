import Link from "next/link";

type PropertyCardProps = {
  id: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
};

export default function PropertyCard({
  id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  image,
}: PropertyCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <img
        src={image}
        alt={title}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">

        <h3 className="text-xl font-bold text-gray-900">
          {title}
        </h3>

        <p className="mt-2 text-gray-600">
          📍 {location}
        </p>

        <p className="mt-3 text-lg font-bold text-blue-700">
          {price}
        </p>

        <div className="mt-3 flex gap-4 text-sm text-gray-600">
          <span>🛏 {bedrooms} Beds</span>
          <span>🚿 {bathrooms} Baths</span>
          <span>📐 {area}</span>
        </div>

        <Link
          href={`/property/${id}`}
          className="mt-5 block rounded-lg bg-blue-700 px-4 py-3 text-center text-white hover:bg-blue-800"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}