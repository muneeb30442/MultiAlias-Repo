import useSignInForm from "./useSignInForm";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


type FormSignInType ={
  email: string,
  password: string
}

const SignIn = () => {
  const { register, errors, isSubmitting, handleSubmit, getValues } =
    useSignInForm();
  const navigate = useNavigate();

  const onSubmitForm = async (data:FormSignInType) => {
    await new Promise<void>((resolve) => {
      return setTimeout(() => resolve(), 1000);
    });
    console.log(data);
    toast.success('SignIn Successful')
    navigate("/dashboard");
  };

  return (
    <div className="w-full max-w-[380px] flex flex-col items-center mb-10">
      <p className="font-semibold text-6xl mb-6 self-start">Sign In</p>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="w-full flex flex-col gap-y-4"
      >
        <div>
          <label className="block" htmlFor={"email"}>
            Email
          </label>
          <input
            {...register("email")}
            id={"email"}
            className={` pl-2 py-2 rounded-lg  border w-full `}
          />
          {errors.email && (
            <p className="text-red-700 text-xs md:text-sm">
              {errors?.email?.message}
            </p>
          )}
        </div>
        <div>
          <label className="block" htmlFor={"password"}>
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            id={"password"}
            className={` pl-2 py-2 rounded-lg  border w-full `}
          />
          {errors.password && (
            <p className="text-red-700 text-xs md:text-sm">
              {errors?.password?.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className=" bg-[#2cb1bc] rounded-lg text-base py-[.4rem] text-white font-semibold w-full disabled:opacity-50"
        >
          {isSubmitting ? "Signing..." : "SignIn"}
        </button>
      </form>
      <p className="self-start ">
        not registered yet?{" "}
        <span>
          <Link className="text-[#2cb1bc]" to={"../signup"}>
            sign up
          </Link>
        </span>
      </p>
    </div>
  );
};
export default SignIn;
