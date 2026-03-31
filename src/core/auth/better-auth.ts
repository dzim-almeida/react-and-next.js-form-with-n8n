import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../db/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      // Implementation for sending verification email
      console.log(`Send verification email to ${user.email} with URL: ${url}`);
      const webhookUrl = process.env.N8N_WEBHOOK;

      if (!webhookUrl) {
        console.error(
          "N8N_WEBHOOK_VERIFY_EMAIL_URL is not defined in environment variables.",
        );
        return;
      }

      const urlRequest = `${webhookUrl}/email`;

      try {
        await fetch(urlRequest, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event: "send_verification_email",
            user: {
              name: user.name,
              email: user.email,
            },
            verificationUrl: url,
          }),
        });
      } catch (error) {
        console.error("Error sending verification email:", error);
      }
    },
  },
});
