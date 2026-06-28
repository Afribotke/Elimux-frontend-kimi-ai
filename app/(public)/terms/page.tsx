import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ElimuX Terms of Service.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose max-w-none">
            <p className="text-gray-600">
              By using ElimuX, you agree to these Terms of Service. If you do not agree, please do not use our platform.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Use of Platform</h2>
            <p className="text-gray-600">
              ElimuX provides education discovery and application services. You must be at least 18 years old or have parental consent.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Accounts</h2>
            <p className="text-gray-600">
              You are responsible for maintaining the security of your account. Notify us immediately of unauthorized access.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Prohibited Activities</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Submitting false information</li>
              <li>Scraping or automated access</li>
              <li>Impersonating others</li>
              <li>Uploading malicious content</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Governing Law</h2>
            <p className="text-gray-600">
              These Terms are governed by the laws of Kenya. Disputes shall be resolved in Nairobi courts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
