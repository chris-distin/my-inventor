"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/admin", icon: "📊" },
  { name: "Properties", href: "/admin/properties", icon: "🏠" },
  { name: "Add Property", href: "/admin/properties/add", icon: "➕" },
  { name: "Agents", href: "/admin/agents", icon: "👨‍💼" },
  { name: "Developers", href: "/admin/developers", icon: "🏗️" },
  { name: "Inquiries", href: "/admin/inquiries", icon: "📩" },
  { name: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-blue-950 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        Home for All
      </h1>

      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
              pathname === item.href
                ? "bg-blue-700"
                : "hover:bg-blue-900"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}