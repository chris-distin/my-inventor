"use client";

import Link from "next/link";

import AdminSidebar from "../Components/AdminSidebar";
import AdminHeader from "../Components/AdminHeader";
import AdminStats from "../Components/AdminStats";
import AdminPropertyTable from "../Components/AdminPropertyTable";

import { properties } from "../data/properties";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8">
          <AdminHeader />

          {/* Top Actions */}
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0B3D91]">
                Property Management
              </h1>

              <p className="mt-2 text-gray-600">
                Manage all Home for All UAE listings from one dashboard.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/properties/add"
                className="rounded-xl bg-[#0B3D91] px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
              >
                + Add Property
              </Link>

              <Link
                href="/property"
                className="rounded-xl border border-[#0B3D91] px-6 py-3 font-semibold text-[#0B3D91] transition hover:bg-blue-50"
              >
                View Website
              </Link>
            </div>
          </div>

          {/* Statistics */}
          <AdminStats />

          {/* Search & Filters */}
          <div className="mt-10 rounded-2xl bg-white p-6 shadow">
            <div className="grid gap-4 lg:grid-cols-4">
              <input
                type="text"
                placeholder="Search property..."
                className="rounded-xl border p-3 outline-none focus:border-[#0B3D91]"
              />

              <select className="rounded-xl border p-3">
                <option>All Types</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Penthouse</option>
                <option>Townhouse</option>
              </select>

              <select className="rounded-xl border p-3">
                <option>All Developers</option>
                <option>Emaar</option>
                <option>Nakheel</option>
                <option>DAMAC</option>
                <option>Sobha</option>
              </select>

              <button className="rounded-xl bg-[#0B3D91] p-3 font-semibold text-white hover:bg-blue-800">
                Search
              </button>
            </div>
          </div>

          {/* Property Table */}
          <div className="mt-10">
            <AdminPropertyTable properties={properties} />
          </div>

          {/* Quick Summary */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow">
              <h3 className="text-lg font-semibold text-[#0B3D91]">
                Total Properties
              </h3>

              <p className="mt-4 text-4xl font-bold">
                {properties.length}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
              <h3 className="text-lg font-semibold text-[#0B3D91]">
                Buy Listings
              </h3>

              <p className="mt-4 text-4xl font-bold">
                {
                  properties.filter(
                    (property) => property.purpose === "Buy"
                  ).length
                }
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
              <h3 className="text-lg font-semibold text-[#0B3D91]">
                Rent Listings
              </h3>

              <p className="mt-4 text-4xl font-bold">
                {
                  properties.filter(
                    (property) => property.purpose === "Rent"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}