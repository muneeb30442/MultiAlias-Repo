import { useForm } from "react-hook-form";
import schema from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatientDataType } from "./patientDataType";
import { useEffect, useState } from "react";

const usePatientData = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const {
    register,
    setError,
    reset,
    watch,
    handleSubmit,
    getValues, // for consoling form data
    formState: { errors, isSubmitting, isSubmitSuccessful },
    formState,
  } = useForm<PatientDataType>({
    resolver: zodResolver(schema),
    defaultValues: { symptoms: [], image: undefined },
  });

  const watchedImage = watch("image");

  useEffect(()=>{
    const file = watchedImage?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  } else {
    setPreview(null);
  }
  },[watchedImage])
  

  return {
    register,
    formState,
    isSubmitSuccessful,
    handleSubmit,
    getValues,
    isSubmitting,
    preview,
    setError,
    errors,
    reset,
  };
};

export default usePatientData;
