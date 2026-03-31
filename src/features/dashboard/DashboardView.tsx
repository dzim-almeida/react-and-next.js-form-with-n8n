import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/src/core/auth/better-auth";

import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
  CardAction,
} from "@/src/components/ui/card";

import LogoutButton from "./components/LogoutButton";
import RedirectButton from "./components/RedirectButton";

export default async function DashboardView() {
  // Configuração da sessão do usuário
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  // Configuração de classes
  const classEmailVerified = user.emailVerified
    ? "text-green-600"
    : "text-red-600";

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Bem-vindo {user.name}
        </CardTitle>
        <CardDescription>
          Somos a melhor solução do mundo na produção de pastéis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-zinc-700">
          <span className="font-bold">Usuário: </span>
          {user.name}
        </p>
        <p className="text-zinc-700">
          <span className="font-bold">Email: </span>
          {user.email}
        </p>
        <p className={`text-sm ${classEmailVerified}`}>
          {user.emailVerified ? "Email verificado" : "Email não verificado"}
        </p>
      </CardContent>
      <CardAction className="mx-auto space-x-2">
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">Editar Perfil </button> */}
        <LogoutButton />
        <RedirectButton to="/email" />
      </CardAction>
    </Card>
  );
}
