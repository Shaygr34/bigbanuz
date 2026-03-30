"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { submitCollabLead } from "@/lib/actions/submitCollabLead";
import { analytics } from "@/lib/utils/analytics";
import Button from "./Button";

export default function CollabForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const t = useTranslations("Collab");

  const BUDGET_OPTIONS = [
    t("budgetUnder500"),
    t("budget500to1000"),
    t("budget1000to5000"),
    t("budget5000plus"),
    t("budgetDiscuss"),
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      projectDescription: formData.get("projectDescription") as string,
      budgetRange: formData.get("budgetRange") as string,
    };

    const result = await submitCollabLead(data);

    if (result.success) {
      setSubmitted(true);
      analytics.collabSubmit(data.budgetRange || "not specified");
    } else {
      setError(result.error || t("errorDefault"));
    }

    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ocean/20 text-ocean mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-h3 font-heading font-bold text-black mb-2">
          {t("successTitle")}
        </h3>
        <p className="text-body text-ink-muted">
          {t("successMessage")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-text mx-auto">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="collab-name"
            className="block text-small font-medium text-black mb-1"
          >
            {t("nameLabel")}
          </label>
          <input
            type="text"
            id="collab-name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-md border border-sand-dark dark:border-white/10 bg-sand-light text-black placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-ocean focus:border-transparent"
            placeholder={t("namePlaceholder")}
          />
        </div>
        <div>
          <label
            htmlFor="collab-email"
            className="block text-small font-medium text-black mb-1"
          >
            {t("emailLabel")}
          </label>
          <input
            type="email"
            id="collab-email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-md border border-sand-dark dark:border-white/10 bg-sand-light text-black placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-ocean focus:border-transparent"
            placeholder={t("emailPlaceholder")}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="collab-company"
          className="block text-small font-medium text-black mb-1"
        >
          {t("companyLabel")}
        </label>
        <input
          type="text"
          id="collab-company"
          name="company"
          className="w-full px-4 py-3 rounded-md border border-sand-dark dark:border-white/10 bg-sand-light text-black placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-ocean focus:border-transparent"
          placeholder={t("companyPlaceholder")}
        />
      </div>

      <div>
        <label
          htmlFor="collab-project"
          className="block text-small font-medium text-black mb-1"
        >
          {t("projectLabel")}
        </label>
        <textarea
          id="collab-project"
          name="projectDescription"
          required
          rows={4}
          className="w-full px-4 py-3 rounded-md border border-sand-dark dark:border-white/10 bg-sand-light text-black placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-ocean focus:border-transparent resize-y"
          placeholder={t("projectPlaceholder")}
        />
      </div>

      <div>
        <label
          htmlFor="collab-budget"
          className="block text-small font-medium text-black mb-1"
        >
          {t("budgetLabel")}
        </label>
        <select
          id="collab-budget"
          name="budgetRange"
          className="w-full px-4 py-3 rounded-md border border-sand-dark dark:border-white/10 bg-sand-light text-black focus:outline-none focus:ring-2 focus:ring-ocean focus:border-transparent"
        >
          <option value="">{t("budgetPlaceholder")}</option>
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
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
