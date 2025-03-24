import { z } from "zod";
import schema from "./schema";

export type SignUpType = z.infer<typeof schema>;
