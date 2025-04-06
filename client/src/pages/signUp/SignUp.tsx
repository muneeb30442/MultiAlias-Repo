import useSignUpForm from "./useSignUpForm";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormSignInType = {
  username: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const { register, errors, isSubmitting, handleSubmit } = useSignUpForm();
  const navigate = useNavigate();

  const onSubmitForm = async (data: FormSignInType) => {
    await new Promise<void>((resolve) => {
      return setTimeout(() => resolve(), 1000);
    });
    localStorage.setItem('user', JSON.stringify(data.username))
    toast.success("Registration Successful, Please SignIn!");
    navigate("/signin");
  };

  return (
    <div className="w-full max-w-[380px] flex flex-col items-center mb-10">
      <p className="font-semibold text-6xl mb-6 self-start">Sign Up</p>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="w-full flex flex-col gap-y-4"
      >
        <div>
          <label className="block" htmlFor={"username"}>
            Username
          </label>
          <input
            {...register("username")}
            id={"text"}
            className={` pl-2 py-2 rounded-lg  border w-full `}
          />
          {errors.username && (
            <p className="text-red-700 text-xs md:text-sm">
              {errors?.username?.message}
            </p>
          )}
        </div>
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
          {isSubmitting ? "Signing Up..." : "SignUp"}
        </button>
      </form>
      <p className="self-start ">
        already registered?{" "}
        <span>
          <Link className="text-[#2cb1bc]" to={"../signin"}>
            sign in
          </Link>
        </span>
      </p>
    </div>
  );
};
export default SignUp;
