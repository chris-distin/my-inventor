"use client";

type Props = {
  amenities: string[];
  setAmenities: React.Dispatch<React.SetStateAction<string[]>>;
};

const availableAmenities = [
  "Swimming Pool",
  "Gym",
  "Parking",
  "Balcony",
  "Security",
  "Kids Area",
  "Beach Access",
  "Metro Nearby",
  "Tram Nearby",
  "Smart Home",
];

export default function AdminAmenitiesSection({
  amenities,
  setAmenities,
}: Props) {
  function toggleAmenity(item: string) {
    setAmenities((prev) =>
      prev.includes(item)
        ? prev.filter((a) => a !== item)
        : [...prev, item]
    );
  }

  return (
    <section className="rounded-2xl bg-white p-8 shadow">
      <h2 className="mb-6 text-2xl font-bold text-[#0B3D91]">
        Amenities
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        {availableAmenities.map((item) => (

          <label
            key={item}
            className="flex items-center gap-3 rounded-xl border p-4 hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={amenities.includes(item)}
              onChange={() => toggleAmenity(item)}
            />

            <span>{item}</span>

          </label>

        ))}

      </div>

    </section>
  );
}