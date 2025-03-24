import { z } from "zod";

const schema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(5).max(20),
});

export default schema;
