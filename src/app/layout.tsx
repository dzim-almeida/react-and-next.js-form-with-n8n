import type { Metadata } from "next";
import "../assets/globals.css"; // A nossa chave geral do Tailwind!

// Metadados para SEO (Aparece na aba do navegador e no Google)
export const metadata: Metadata = {
  title: "NextAuth - Login Moderno com BetterAuth",
  description: "Sistema de Login moderno construído com Next.js e BetterAuth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // A tag HTML principal indicando o idioma
    <html lang="pt-BR">
      {/* O antialiased deixa as fontes mais suaves e bonitas no Windows/Mac */}
      <body className="antialiased min-h-screen bg-mist-900 text-foreground">
        {/* É aqui dentro do 'children' que a nossa página de Login vai ser injetada! */}
        {children}
      </body>
    </html>
  );
}