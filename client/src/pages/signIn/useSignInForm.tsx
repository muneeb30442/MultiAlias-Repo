import { useForm } from "react-hook-form";
import schema from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInType } from "./signInType";

const useSignInForm = () => {
  const {
    register,
    setError,
    reset,
    handleSubmit,
    getValues, // for consolling form data
    formState: { errors, isSubmitting, isSubmitSuccessful },
    formState,
  } = useForm<SignInType>({
    resolver: zodResolver(schema),
    defaultValues:{
        email: 'zenkop46@gmail.com',
        password: '12345'

    }
  });

  return {
    register,
    formState,
    isSubmitSuccessful,
    handleSubmit,
    getValues,
    isSubmitting,
    setError,
    errors,
    reset,
  };
};

export default useSignInForm;
