"use client";

import { authClient } from "@/src/core/auth/auth-client";
import { useRouter } from "next/navigation";

import { Button } from "@/src/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  }

  return (
    <Button
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      onClick={logout}
    >
      Sair
    </Button>
  );
}
