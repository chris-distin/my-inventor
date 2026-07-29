type PropertyAmenitiesProps = {
  amenities: string[];
};

export default function PropertyAmenities({
  amenities,
}: PropertyAmenitiesProps) {
  return (
    <section className="mt-8">

      <h2 className="text-2xl font-bold text-gray-900">
        Amenities
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">

        {amenities.map((amenity, index) => (
          <div
            key={index}
            className="rounded-lg border bg-white p-4 text-center shadow-sm"
          >
            <span className="text-gray-700">
              {amenity}
            </span>
          </div>
        ))}

      </div>

    </section>
  );
}