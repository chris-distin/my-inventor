import { siteConfig } from "../config/site";

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-8 text-center">
        <h2 className="text-xl font-bold text-blue-700">
          {siteConfig.name}
        </h2>

        <p className="mt-2 text-gray-600">
          {siteConfig.description}
        </p>

        <div className="mt-4 space-y-1 text-sm text-gray-600">
          <p>{siteConfig.contact.phone}</p>
          <p>{siteConfig.contact.email}</p>
          <p>{siteConfig.office.address}</p>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}