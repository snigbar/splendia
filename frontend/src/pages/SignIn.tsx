import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TRegisterFormData } from "../interfaces/interfaces";
import * as apiClient from "../utils/apiClient";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../context/AppContext";
import cn from "../lib/cn";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Partial<TRegisterFormData>>();

  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: () => {
      showToast({ message: "login Successful", type: "success" });
      queryClient.invalidateQueries("validateToken");
      reset();
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (err: Error) =>
      showToast({
        message: err.message || "signin failed",
        type: "error",
      }),
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <div className="container max-w-sm lg:max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2 my-4">
      <form
        className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
        onSubmit={onSubmit}
      >
        <h1 className="mb-8 text-3xl text-center">Sign In</h1>
        {/* email */}
        <div className="mb-4">
          <input
            type="email"
            className="block border border-gray-400 w-full p-3 rounded"
            placeholder="Email"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            autoComplete="true"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        {/* password */}
        <div className="mb-4">
          <input
            type="password"
            className="block border border-gray-400 w-full p-3 rounded"
            placeholder="Password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              maxLength: {
                value: 20,
                message: "Password should not exceed 20 characters",
              },
            })}
            autoComplete="true"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className={cn(
            "w-full text-center py-3 rounded bg-cyan-500 hover:bg-cyan-600 text-white hover:bg-green-dark focus:outline-none my-1 active:transition active:translate-y-1 duration-200",
            { disabled: mutation.isLoading }
          )}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "wait..." : "Log In"}
        </button>

        <div className="text-center text-sm text-grey-dark mt-4">
          By signing up, you agree to the Terms of Service and Privacy Policy
        </div>
        <div className="text-center text-grey-dark mt-2">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-500 font-semibold underline"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
