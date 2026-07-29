import AdminPropertyForm from "../../../../Components/AdminPropertyForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPropertyPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-4xl font-bold text-[#0B3D91]">
          Edit Property
        </h1>

        <AdminPropertyForm propertyId={id} />
      </div>
    </main>
  );
}
