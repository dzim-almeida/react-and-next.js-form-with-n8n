"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/src/components/ui/button";

interface RedirectButtonProps {
    to: string;
}

export default function RedirectButton({ to }: RedirectButtonProps) {
  const router = useRouter();

  function redirect() {
    router.push(to)
  }

  return (
    <Button
      className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded cursor-pointer"
      onClick={redirect}
    >
      Enviar Email
    </Button>
  );
}
