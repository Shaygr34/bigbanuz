"use server";

import { writeClient } from "@/lib/sanity/client";

interface ContactLeadData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitContactLead(data: ContactLeadData) {
  try {
    await writeClient.create({
      _type: "lead",
      name: data.name,
      email: data.email,
      source: "general-contact",
      projectDescription: `Subject: ${data.subject}\n${data.message}`,
      status: "new",
    });

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
            subject: `New Contact Form: ${data.subject} — from ${data.name}`,
            text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\nMessage: ${data.message}`,
          }),
        });
      } catch {
        console.error("Failed to send notification email");
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to submit contact lead:", error);
    return { success: false, error: "Failed to submit. Please try again." };
  }
}
