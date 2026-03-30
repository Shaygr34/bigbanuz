"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { submitContactLead } from "@/lib/actions/submitContactLead";
import { analytics } from "@/lib/utils/analytics";
import Button from "./Button";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const t = useTranslations("Contact");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: "General Inquiry",
      message: [
        formData.get("phone") ? `Phone: ${formData.get("phone")}` : "",
        formData.get("message") as string,
      ]
        .filter(Boolean)
        .join("\n"),
    };

    const result = await submitContactLead(data);

    if (result.success) {
      setSubmitted(true);
      analytics.emailSubmit("contact");
    } else {
      setError(result.error || t("errorDefault"));
    }

    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-ocean text-white">
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-h3 font-bold text-ink mb-2">
          {t("successTitle")}
        </h3>
        <p className="text-body text-ink-muted">
          {t("successMessage")}
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md border border-sand-dark bg-white px-4 py-3 text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-ocean focus:border-transparent";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="block text-small font-medium text-ink mb-1">
          {t("nameLabel")}
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          required
          className={inputClass}
          placeholder={t("namePlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-small font-medium text-ink mb-1">
          {t("emailLabel")}
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          className={inputClass}
          placeholder={t("emailPlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="contact-phone" className="block text-small font-medium text-ink mb-1">
          {t("phoneLabel")}
        </label>
        <input
          type="tel"
          id="contact-phone"
          name="phone"
          className={inputClass}
          placeholder={t("phonePlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-small font-medium text-ink mb-1">
          {t("messageLabel")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className={`${inputClass} resize-y`}
          placeholder={t("messagePlaceholder")}
        />
      </div>

      {error && (
        <p className="text-small text-red-600" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" disabled={loading}>
        {loading ? t("sending") : t("sendMessage")}
      </Button>
    </form>
  );
}
