import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ElimuX Privacy Policy - Kenya Data Protection Act compliant.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose max-w-none">
            <p className="text-gray-600">
              ElimuX is committed to protecting your personal data in accordance with the 
              <strong> Kenya Data Protection Act, 2019</strong> and <strong>GDPR</strong>.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Data Controller</h2>
            <p className="text-gray-600">
              <strong>Name:</strong> ElimuX Limited<br />
              <strong>Email:</strong> dpo@elimux.ke<br />
              <strong>Phone:</strong> +254 700 000 000
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li><strong>Account:</strong> Name, email, phone, password</li>
              <li><strong>Profile:</strong> Education history, preferences</li>
              <li><strong>Usage:</strong> Pages visited, searches, clicks</li>
              <li><strong>Device:</strong> IP address, browser, OS</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Your Rights</h2>
            <p className="text-gray-600">Under the Kenya Data Protection Act, you have the right to:</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data (right to be forgotten)</li>
              <li>Object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Contact</h2>
            <p className="text-gray-600">
              For privacy questions, contact our Data Protection Officer at dpo@elimux.ke
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
