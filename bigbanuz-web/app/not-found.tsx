import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sun-gradient text-white shadow-sun-glow mb-8">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <h1 className="text-h1 font-heading font-bold text-black mb-3">
          Page Not Found
        </h1>
        <p className="text-body text-gray-mid mb-8">
          This wave has passed — let&apos;s get you back to shore.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/" variant="primary" size="md">
            Back to Home
          </Button>
          <Button href="/contact" variant="secondary" size="md">
            Get in Touch
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-small text-gray-mid">
          <Link href="/events" className="hover:text-sun transition-colors">
            Events
          </Link>
          <Link href="/surf" className="hover:text-sun transition-colors">
            Surf
          </Link>
          <Link href="/stories" className="hover:text-sun transition-colors">
            Stories
          </Link>
          <Link href="/about" className="hover:text-sun transition-colors">
            About
          </Link>
        </div>
      </div>
    </section>
  );
}
