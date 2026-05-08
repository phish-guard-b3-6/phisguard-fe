import { z } from "zod";

// ── Signin Schema ─────────────────────────────────────────────────────────────
export const signinSchema = z.object({
  email: z.string().min(1, "Email wajib diisi.").email("Format email tidak valid."),
  password: z.string().min(1, "Password wajib diisi.").min(8, "Password minimal 8 karakter."),
});

export type SigninFormValues = z.infer<typeof signinSchema>;

// ── Signup Schema ─────────────────────────────────────────────────────────────
export const signupSchema = z
  .object({
    firstname: z.string().min(1, "First Name is required."),
    lastname: z.string().min(1, "Last Name is required."),
    email: z.string().min(1, "Email is required.").email("Invalid email format."),
    username: z.string().min(1, "Username is required."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
    isAffiliated: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
