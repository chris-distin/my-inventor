import Link from "next/link";

export default function PaymentPlan() {
  return (
    <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">
        Payment Plan
      </h2>

      <div className="mt-4 rounded-xl bg-blue-50 p-6">
        <h3 className="text-xl font-semibold text-blue-700">
          Payment Plan Available on Request
        </h3>

        <p className="mt-3 text-gray-600">
          Payment plans vary depending on the developer, project,
          unit type, and current promotions. Contact our team to
          receive the latest payment schedule and exclusive offers.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <button className="rounded-lg bg-blue-700 px-6 py-3 text-white hover:bg-blue-800">
            Request Payment Plan
          </button>

          <Link
            href="https://wa.me/971501234567"
            target="_blank"
            className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
          >
            WhatsApp
          </Link>

          <Link
            href="mailto:sales@homeforall.ae"
            className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-100"
          >
            Email Us
          </Link>
        </div>
      </div>
    </section>
  );
}