import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Institution Details",
};

export default function InstitutionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Institution</h1>
        <p className="text-gray-600">Institution details page.</p>
      </div>
    </div>
  );
}
