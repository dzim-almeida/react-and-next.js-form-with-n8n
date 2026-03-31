"use client";

interface ErrorBoxProps {
  code: string;
}

export default function ErrorBox({ code }: ErrorBoxProps) {
  const message = () => {
    switch (code) {
      case "INVALID_EMAIL_OR_PASSWORD":
        return "E-mail ou senha incorretos.";
      default:
        return "Ocorreu um erro desconhecido. Por favor, tente novamente.";
    }
  };

  return (
    <div className="p-2 mt-2 w-full bg-red-100 border border-red-500 rounded">
      <p className="text-red-800 text-sm">{message()}</p>
    </div>
  );
}
