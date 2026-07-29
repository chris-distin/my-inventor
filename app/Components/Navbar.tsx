"use client";

import Link from "next/link";
import UserNav from "./UserNav";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-blue-900 bg-[#0B3D91] shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-3xl font-extrabold tracking-wide text-white">
          Home for All
        </Link>

        <UserNav />
      </div>
    </nav>
  );
}