import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { TRegisterFormData } from "../interfaces/interfaces";
import * as apiClient from "../utils/apiClient";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../context/AppContext";
import cn from "../lib/cn";

export default function Register() {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TRegisterFormData>();
  const queryClient = useQueryClient();

  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      showToast({ message: "Registration Successful", type: "success" });
      queryClient.invalidateQueries("validateToken");
      reset();
      navigate("/");
    },
    onError: (err: Error) =>
      showToast({
        message: err.message || "registration failed",
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
        <h1 className="mb-8 text-3xl text-center">Create An Account</h1>
        {/* firstname lastname */}
        <div className="w-full flex justify-between gap-1 lg:gap-0 mb-4">
          <div>
            <input
              type="text"
              className="block border border-gray-400 w-full p-3 rounded"
              placeholder="First Name"
              {...register("firstName", { required: "First Name is required" })}
              autoComplete="true"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div>
            <input
              type="text"
              className="block border border-gray-400 w-full p-3 rounded"
              placeholder="Last Name"
              {...register("lastName", { required: "Last Name is required" })}
              autoComplete="true"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

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
        <div className="mb-4">
          <input
            type="password"
            className="block border border-gray-400 w-full p-3 rounded"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              validate: (val) => {
                if (!val) {
                  return "This field is required";
                } else if (watch("password") !== val) {
                  return "Your passwords do no match";
                }
              },
            })}
            autoComplete="true"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
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
          {mutation.isLoading ? "wait..." : "Create Account"}
        </button>

        <div className="text-center text-sm text-grey-dark mt-4">
          By signing up, you agree to the Terms of Service and Privacy Policy
        </div>
        <div className="text-center text-grey-dark mt-2">
          Already have an account?{" "}
          <Link to="/signin" className="text-cyan-500 font-semibold underline">
            Log in.
          </Link>
        </div>
      </form>
    </div>
  );
}
