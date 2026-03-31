import z from "zod";

export const sendEmailSchema = z.object({
  to: z.email("Please enter a valid email address"),
  subject: z.string().min(2).max(100),
  message: z.string().min(10).max(1000),
});

export type SendEmailData = z.infer<typeof sendEmailSchema>
