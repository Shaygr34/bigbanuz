"use server";

import { writeClient } from "@/lib/sanity/client";

interface EventLeadData {
  name: string;
  email: string;
  phone?: string;
  packageInterest?: string;
  message?: string;
}

export async function submitEventLead(data: EventLeadData) {
  try {
    // Create lead in Sanity
    await writeClient.create({
      _type: "lead",
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      source: "events-contact",
      packageInterest: data.packageInterest || "",
      projectDescription: data.message || "",
      status: "new",
    });

    // Send email notification (when RESEND_API_KEY is configured)
    if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "bigbanuz.com <noreply@bigbanuz.com>",
            to: process.env.NOTIFICATION_EMAIL,
            subject: `New Event Inquiry from ${data.name}`,
            text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "N/A"}\nPackage: ${data.packageInterest || "N/A"}\nMessage: ${data.message || "N/A"}`,
          }),
        });
      } catch {
        // Email failure shouldn't block lead creation
        console.error("Failed to send notification email");
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to submit event lead:", error);
    return { success: false, error: "Failed to submit. Please try again." };
  }
}
