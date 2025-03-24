import { z } from "zod";

const schema = z.object({
  username: z.string().min(1, { message: "This field is required" }).max(30),
  email: z.string().min(1).email(),
  password: z.string().min(5).max(20),
});

export default schema;
