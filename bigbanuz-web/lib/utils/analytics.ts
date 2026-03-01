type GAEventParams = Record<string, string | number | boolean>;

export function trackEvent(eventName: string, params?: GAEventParams): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

// Pre-defined event helpers
export const analytics = {
  whatsappClick: (source: string) =>
    trackEvent("whatsapp_click", { source }),
  emailSubmit: (form: string) =>
    trackEvent("email_submit", { form }),
  igClick: (source: string) =>
    trackEvent("ig_click", { source }),
  collabSubmit: (budgetRange: string) =>
    trackEvent("collab_submit", { budget_range: budgetRange }),
  packageClick: (packageName: string) =>
    trackEvent("package_click", { package: packageName }),
  galleryView: (category: string, lane: string) =>
    trackEvent("gallery_view", { category, lane }),
};
