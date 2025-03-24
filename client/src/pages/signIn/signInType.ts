import { z } from "zod";
import schema from "./schema";

export type SignInType = z.infer<typeof schema>;
