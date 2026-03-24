import AuthView from "@/src/features/auth/AuthView";

export default function LoginPage() {

  return (
    // Usamos Tailwind para centralizar o formulário perfeitamente no meio da tela
    <main className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <AuthView />
      </div>
    </main>
  );
}