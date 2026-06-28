import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Ready to Start Your Journey?
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Join thousands of students who found their perfect education path through ElimuX.
          Create your free account today.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/register">Create Free Account</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/discover">Explore Programs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
