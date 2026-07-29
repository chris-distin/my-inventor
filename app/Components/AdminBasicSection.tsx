"use client";

type Props = {
  form: {
    title: string;
    price: string;
    purpose: string;
    type: string;
    location: string;
    developer: string;
  };
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => void;
};

export default function AdminBasicSection({
  form,
  onChange,
}: Props) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow">

      <h2 className="mb-6 text-2xl font-bold text-[#0B3D91]">
        Basic Information
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        <input
          name="title"
          placeholder="Property Title"
          value={form.title}
          onChange={onChange}
          className="rounded-xl border p-4"
          required
        />

        <input
          name="price"
          placeholder="Price (AED)"
          value={form.price}
          onChange={onChange}
          className="rounded-xl border p-4"
          required
        />

        <select
          name="purpose"
          value={form.purpose}
          onChange={onChange}
          className="rounded-xl border p-4"
        >
          <option value="Buy">Buy</option>
          <option value="Rent">Rent</option>
        </select>

        <select
          name="type"
          value={form.type}
          onChange={onChange}
          className="rounded-xl border p-4"
        >
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Penthouse">Penthouse</option>
          <option value="Commercial">Commercial</option>
        </select>

        <input
          name="location"
          placeholder="Dubai Marina, Downtown..."
          value={form.location}
          onChange={onChange}
          className="rounded-xl border p-4"
        />

        <input
          name="developer"
          placeholder="Developer"
          value={form.developer}
          onChange={onChange}
          className="rounded-xl border p-4"
        />

      </div>

    </section>
  );
}