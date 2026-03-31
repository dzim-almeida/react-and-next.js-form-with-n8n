import EmailView from "@/src/features/emails/EmailView";

export default function EmailPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <EmailView></EmailView>
      </div>
    </main>
  )
}
