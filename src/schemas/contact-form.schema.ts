import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  email: z.string().trim().email("Please enter a valid email address"),

  projectType: z
    .string()
    .trim()
    .min(2, "Project Type must be at least 2 characters")
    .max(100, "Project Type must be at most 100 characters"),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be at most 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
