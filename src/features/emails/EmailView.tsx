import { redirect } from "next/navigation";
import { auth } from "@/src/core/auth/better-auth";
import { headers } from "next/headers";

import SendEmailForm from "./components/SendEmailForm";

export default async function EmailView() {

  const webhookUrl = process.env.N8N_WEBHOOK;

  if (!webhookUrl) {
    console.error("N8N_WEBHOOK is not defined in environment variables.");
    return;
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { user } = session;


  return <SendEmailForm user={({
    name: user.name,
    email: user.email,
  })} />;
}
