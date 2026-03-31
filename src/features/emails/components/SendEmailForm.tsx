"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendEmailSchema, SendEmailData } from "../schemas";
import { useRouter } from "next/navigation";
import { sendEmail } from "../services";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";

import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";

interface SendEmailFormProps {
  user: {
    name: string;
    email: string;
  };
}

export default function SendEmailForm({ user }: SendEmailFormProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  function redirectToDashBoard() {
    router.push("/dashboard");
  }

  const form = useForm<SendEmailData>({
    defaultValues: {
      to: "",
      subject: "",
      message: "",
    },
    resolver: zodResolver(sendEmailSchema),
  });

  const onSubmit = async (data: SendEmailData) => {
    setIsLoading(true);
    try {
      const response = await sendEmail(data, user);
      if (response?.success) {
        console.log("Email sent successfully");
        form.reset();
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Enviar Email
        </CardTitle>
        <CardDescription className="text-center">
          Preencha os campos abaixo para enviar um email
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Para</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="destinatario@example.com"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assunto</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Assunto do email"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-32"
                      {...field}
                      placeholder="Digite sua mensagem aqui..."
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full cursor-pointer">
              Enviar
            </Button>
          </form>
        </Form>
        <Button
          className="w-full bg-zinc-500 hover:bg-zinc-400 cursor-pointer"
          onClick={redirectToDashBoard}
        >
          Voltar
        </Button>
      </CardContent>
    </Card>
  );
}
