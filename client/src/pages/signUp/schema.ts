import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is Required" })
    .max(30, "Exceeding the limit of 30 Characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(5, "Password must be at least 5 Characters")
    .max(20, "Password Exceeding the Limit of 20 Characters"),
});

export default schema;
