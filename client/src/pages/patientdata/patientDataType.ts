import { z } from "zod";
import schema from "./schema";

export type PatientDataType = z.infer<typeof schema>;
