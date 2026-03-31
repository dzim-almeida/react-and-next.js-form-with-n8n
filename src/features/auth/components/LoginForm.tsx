import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas";
import { authClient } from "@/src/core/auth/auth-client";
import { redirect } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import ErrorBox from "./common/ErrorBox";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorCode, setErrorCode] = useState("");

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setErrorCode(error.code ?? "UNKNOWN_ERROR");
    } else {
      redirect("/dashboard");
    }
    setIsLoading(false);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Bem-vindo de volta
        </CardTitle>
        <CardDescription className="text-center">
          Digite seu e-mail e senha para acessar sua conta.
        </CardDescription>
        {errorCode && <ErrorBox code={errorCode} />}
      </CardHeader>
      <CardContent>
        {/* Passamos as ferramentas do React Hook Form para o componente Form do Shadcn */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Campo de E-mail */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="seu@email.com"
                      type="email"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  {/* Se houver erro no Zod, a mensagem aparece aqui automaticamente! */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Campo de Senha */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      type="password"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
