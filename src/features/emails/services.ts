'use server';

import { Email, User } from "./types";

export async function sendEmail(email: Email, user: User) {
  const webhookUrl = process.env.N8N_WEBHOOK;

  if (!webhookUrl) {
    console.error("N8N_WEBHOOK is not defined in environment variables.");
    return;
  }

  const urlRequest = `${webhookUrl}/email`;

  const response = await fetch(urlRequest, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event: "send_email",
      email: {
        to: email.to,
        subject: email.subject,
        message: email.message,
      },
      user: {
        name: user.name,
        email: user.email,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send email: ${response.statusText}`);
  }

  return { success: true }
}
