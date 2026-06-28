import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">ElimuX</h3>
            <p className="text-sm text-gray-600">Discover your perfect educational path.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/discover" className="text-gray-600 hover:text-blue-600">Discover</Link></li>
              <li><Link href="/institutions" className="text-gray-600 hover:text-blue-600">Institutions</Link></li>
              <li><Link href="/programs" className="text-gray-600 hover:text-blue-600">Programs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Legal</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/privacy" className="text-gray-600 hover:text-blue-600">Privacy</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-blue-600">Terms</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ElimuX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

