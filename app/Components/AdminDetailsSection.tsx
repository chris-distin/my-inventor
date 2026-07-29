"use client";

type Props = {
  form: {
    bedrooms: number;
    bathrooms: number;
    area: string;
    description: string;
  };
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => void;
};

export default function AdminDetailsSection({
  form,
  onChange,
}: Props) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow">

      <h2 className="mb-6 text-2xl font-bold text-[#0B3D91]">
        Property Details
      </h2>

      <div className="grid gap-5 md:grid-cols-3">

        <input
          type="number"
          name="bedrooms"
          min={0}
          value={form.bedrooms}
          onChange={onChange}
          placeholder="Bedrooms"
          className="rounded-xl border p-4"
        />

        <input
          type="number"
          name="bathrooms"
          min={0}
          value={form.bathrooms}
          onChange={onChange}
          placeholder="Bathrooms"
          className="rounded-xl border p-4"
        />

        <input
          type="text"
          name="area"
          value={form.area}
          onChange={onChange}
          placeholder="Area (sq ft)"
          className="rounded-xl border p-4"
        />

      </div>

      <div className="mt-6">

        <label className="mb-2 block font-semibold text-gray-700">
          Property Description
        </label>

        <textarea
          name="description"
          rows={6}
          value={form.description}
          onChange={onChange}
          placeholder="Describe the property..."
          className="w-full rounded-xl border p-4"
        />

      </div>

    </section>
  );
}