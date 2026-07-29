"use client";

type FormType = {
  title: string;
  price: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  latitude: number;
  longitude: number;
};

type Props = {
  form: FormType;
  loading: boolean;
};

export default function AdminSummaryCard({
  form,
  loading,
}: Props) {
  return (
    <aside className="sticky top-6 h-fit rounded-2xl bg-white p-6 shadow-xl">

      <h2 className="text-2xl font-bold text-[#0B3D91]">
        Property Summary
      </h2>

      <div className="mt-6 space-y-4">

        <div>
          <span className="font-semibold">Title:</span>{" "}
          {form.title || "Not entered"}
        </div>

        <div>
          <span className="font-semibold">Price:</span>{" "}
          {form.price || "Not entered"}
        </div>

        <div>
          <span className="font-semibold">Type:</span>{" "}
          {form.type}
        </div>

        <div>
          <span className="font-semibold">Bedrooms:</span>{" "}
          {form.bedrooms}
        </div>

        <div>
          <span className="font-semibold">Bathrooms:</span>{" "}
          {form.bathrooms}
        </div>

        <div>
          <span className="font-semibold">Latitude:</span>{" "}
          {form.latitude.toFixed(6)}
        </div>

        <div>
          <span className="font-semibold">Longitude:</span>{" "}
          {form.longitude.toFixed(6)}
        </div>

      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full rounded-xl bg-[#0B3D91] py-3 font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Publishing..." : "Publish Property"}
      </button>

    </aside>
  );
}