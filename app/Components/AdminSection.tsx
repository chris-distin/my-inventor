"use client";

import { ReactNode } from "react";

interface AdminSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function AdminSection({
  title,
  description,
  children,
}: AdminSectionProps) {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-lg">
      <div className="mb-6 border-b pb-4">
        <h2 className="text-2xl font-bold text-[#0B3D91]">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-gray-500">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}