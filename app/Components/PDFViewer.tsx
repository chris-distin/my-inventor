type PDFViewerProps = {
  pdfUrl?: string;
};

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  return (
    <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900">
        Property Brochure
      </h2>

      {pdfUrl ? (
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700"
          >
            📄 View Brochure
          </a>

          <a
            href={pdfUrl}
            download
            className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-100"
          >
            ⬇ Download Brochure
          </a>
        </div>
      ) : (
        <div className="mt-6 rounded-lg bg-yellow-50 p-5">
          <p className="text-gray-700">
            📄 Brochure available on request.
          </p>
        </div>
      )}
    </section>
  );
}