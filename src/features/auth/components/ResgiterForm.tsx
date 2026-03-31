import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../schemas";
import { authClient } from "@/src/core/auth/auth-client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import {
  Form,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
} from "@/src/components/ui/form";

interface RegisterFormProps {
  handleTabForm: () => void;
}

export function RegisterForm({ handleTabForm }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    const { data: sessionData, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (error) {
      alert("Registration failed: " + error.message);
    } else {
      alert(
        "Registration successful! Session data: " + JSON.stringify(sessionData),
      );
      handleTabForm();
    }
    setIsLoading(false);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Registre-se em nossa plataforma
        </CardTitle>
        <CardDescription className="text-center">
          Crie uma conta para acessar todos os recursos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ayo lindo"
                      type="text"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="seu@email.com"
                      type="email"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
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
              {isLoading ? "Registrando..." : "Registrar"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
