import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover Programs",
  description: "Explore education programs worldwide.",
};

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover Programs</h1>
        <p className="text-gray-600">Explore thousands of programs from institutions worldwide.</p>
        {/* Program listing will be implemented here */}
      </div>
    </div>
  );
}
