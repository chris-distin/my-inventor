import { siteConfig } from "../config/site";

export default function WhatsAppButton() {
  const phone = siteConfig.contact.whatsapp.replace(/\+/g, "");

  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 rounded-full bg-green-500 px-5 py-3 text-white font-semibold shadow-lg transition hover:bg-green-600"
    >
      💬 WhatsApp
    </a>
  );
}