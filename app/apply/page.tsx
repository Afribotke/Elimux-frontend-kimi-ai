import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply to your chosen program.",
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Apply</h1>
        <p className="text-gray-600">Application form will be implemented here.</p>
      </div>
    </div>
  );
}
