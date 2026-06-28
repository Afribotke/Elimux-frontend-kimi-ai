import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the ElimuX support team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Have questions? We are here to help. Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-6">Send a Message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Partnership</option>
                    <option>Data Privacy</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-teal-700" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-gray-600">support@elimux.ke</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-teal-700" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-sm text-gray-600">+254 700 000 000</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-teal-700" />
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-sm text-gray-600">Nairobi, Kenya</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-teal-700" />
                    <div>
                      <div className="font-medium">Hours</div>
                      <div className="text-sm text-gray-600">Mon-Fri: 8AM - 6PM EAT</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
