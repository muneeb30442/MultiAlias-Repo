import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  age: z.coerce.number().min(18),
  contactNo: z.coerce
    .string()
    .min(10, "Contact number must be at least 10 digits"),
  symptoms: z
    .array(z.string())
    .nonempty({ message: "Please Select A Symptom" }),
  image: z.custom<FileList>(
    (val) => val instanceof FileList && val.length > 0,
    {
      message: "Image is required",
    }
  ),
  // image: z
  //   .custom<FileList>((file) => file instanceof FileList && file.length > 0, {
  //     message: "Image is required",
  //   })
  //   .transform((files) => files[0])
  //   .refine((file) => file.size <= 2 * 1024 * 1024, {
  //     message: "Max file size is 2MB",
  //   })
  //   .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
  //     message: "Only JPG/PNG files allowed",
  //   }),
});

export default schema;
