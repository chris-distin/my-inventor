"use client";

import AdminPropertyForm from "../../../Components/AdminPropertyForm";

export default function AddPropertyPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-[#0B3D91]">
          Add New Property
        </h1>

        <AdminPropertyForm />
      </div>
    </main>
  );
}