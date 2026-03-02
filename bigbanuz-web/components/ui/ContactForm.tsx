"use client";

import { useState } from "react";
import { submitContactLead } from "@/lib/actions/submitContactLead";
import { analytics } from "@/lib/utils/analytics";
import Button from "./Button";

const SUBJECT_OPTIONS = [
  "Event Inquiry",
  "Surf Collaboration",
  "Other",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const result = await submitContactLead(data);

    if (result.success) {
      setSubmitted(true);
      analytics.emailSubmit("contact");
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sun-gradient text-white shadow-sun-glow mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-h3 font-heading font-bold text-black mb-2">
          Message Sent!
        </h3>
        <p className="text-body text-gray-mid">
          Thanks for reaching out. I&apos;ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="contact-name"
          className="block text-small font-medium text-black mb-1"
        >
          Name *
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          required
          className="w-full px-4 py-3 rounded-md border border-gray-200 bg-white-pure text-black placeholder:text-gray-mid focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-small font-medium text-black mb-1"
        >
          Email *
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-md border border-gray-200 bg-white-pure text-black placeholder:text-gray-mid focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block text-small font-medium text-black mb-1"
        >
          Subject *
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          className="w-full px-4 py-3 rounded-md border border-gray-200 bg-white-pure text-black focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        >
          <option value="">Select a subject</option>
          {SUBJECT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-small font-medium text-black mb-1"
        >
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-md border border-gray-200 bg-white-pure text-black placeholder:text-gray-mid focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-y"
          placeholder="Tell me about your project or inquiry..."
        />
      </div>

      {error && (
        <p className="text-small text-red-600" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
