"use client";

export default function AdminHeader() {
  return (
    <header className="flex items-center justify-between rounded-xl bg-white p-6 shadow">
      <div>
        <h2 className="text-2xl font-bold text-blue-900">
          Admin Dashboard
        </h2>

        <p className="text-gray-500">
          Manage Home for All UAE
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-lg bg-blue-900 px-5 py-2 text-white">
          Admin
        </button>
      </div>
    </header>
  );
}