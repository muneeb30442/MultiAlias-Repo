import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Please Type Your Full Name"),
  age: z.coerce.number().min(1, "Please enter valid Age"),
  contactNo: z.coerce
    .string()
    .length(10, "Contact number must be exactly 10 digits")
    .regex(/^\d+$/, "Contact number must contain only digits"),
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
