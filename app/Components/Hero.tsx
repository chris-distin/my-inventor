import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#072C69] via-[#0B3D91] to-[#1565C0] text-white">

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative mx-auto flex max-w-7xl items-center px-6 py-24">

        <div className="max-w-3xl">

          <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
            🇦🇪 UAE Real Estate Platform
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight md:text-7xl">
            Find Your Dream Property
            <span className="block text-blue-200">
              in the UAE
            </span>
          </h1>

          <p className="mt-8 text-xl leading-8 text-blue-100">
            Buy, sell, rent and invest in premium apartments, villas,
            townhouses and commercial properties across Dubai,
            Abu Dhabi, Sharjah and all Emirates.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/property"
              className="rounded-xl bg-white px-8 py-4 font-bold text-[#0B3D91] transition hover:scale-105 hover:bg-blue-100"
            >
              Explore Properties
            </Link>

            <a
              href="mailto:info@homeforall.ae"
              className="rounded-xl border-2 border-white px-8 py-4 font-bold transition hover:bg-white hover:text-[#0B3D91]"
            >
              Contact an Agent
            </a>

          </div>

          <div className="mt-12 flex flex-wrap gap-6 text-sm text-blue-100">

            <span>📍 Dubai</span>

            <span>📍 Abu Dhabi</span>

            <span>📍 Sharjah</span>

            <span>📍 Ajman</span>

            <span>📍 Ras Al Khaimah</span>

          </div>

        </div>

      </div>

    </section>
  );
}