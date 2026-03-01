"use server";

import { writeClient } from "@/lib/sanity/client";

interface CollabLeadData {
  name: string;
  email: string;
  company?: string;
  projectDescription: string;
  budgetRange?: string;
}

export async function submitCollabLead(data: CollabLeadData) {
  try {
    await writeClient.create({
      _type: "lead",
      name: data.name,
      email: data.email,
      source: "surf-collab",
      projectDescription: `${data.company ? `Company: ${data.company}\n` : ""}${data.projectDescription}`,
      budgetRange: data.budgetRange || "",
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
            subject: `New Surf Collaboration Request from ${data.name}`,
            text: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "N/A"}\nBudget: ${data.budgetRange || "N/A"}\nProject: ${data.projectDescription}`,
          }),
        });
      } catch {
        console.error("Failed to send notification email");
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to submit collab lead:", error);
    return { success: false, error: "Failed to submit. Please try again." };
  }
}
