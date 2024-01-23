import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { RegisterFormData } from "../interfaces/interfaces";
import * as apiClient from "../utils/apiClient";
import { useMutation } from "react-query";
import { useAppContext } from "../context/AppContext";

export default function Register() {
  const {
    register,
    watch,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<RegisterFormData>();
  //  const queryClient = useQueryClient()

  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () =>
      showToast({ message: "Registration Successful", type: "success" }),
    onError: (err: Error) =>
      showToast({
        message: err.message || "registration failed",
        type: "error",
      }),
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    // reset();
  });
  return (
    <div className="container max-w-sm lg:max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <form
        className="bg-gray-50 px-6 py-8 rounded shadow-md text-black w-full"
        onSubmit={onSubmit}
      >
        <h1 className="mb-8 text-3xl text-center">Create An Account</h1>
        <div className="w-full flex gap-2">
          <div>
            <input
              type="text"
              className="block border border-gray-200 w-full p-3 rounded mb-4"
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
              className="block border border-gray-200 w-full p-3 rounded mb-4"
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
        <input
          type="email"
          className="block border border-gray-200 w-full p-3 rounded mb-4"
          placeholder="Email"
          {...register("email", { required: "email is required" })}
          autoComplete="true"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
        <input
          type="password"
          className="block border border-gray-200 w-full p-3 rounded mb-4"
          placeholder="Password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          autoComplete="true"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
        <input
          type="password"
          className="block border border-gray-200 w-full p-3 rounded mb-4"
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
        <button
          type="submit"
          className="w-full text-center py-3 rounded bg-cyan-500 hover:bg-cyan-600 text-white hover:bg-green-dark focus:outline-none my-1 active:transition active:translate-y-1 duration-200"
        >
          Create Account
        </button>

        <div className="text-center text-sm text-grey-dark mt-4">
          By signing up, you agree to the Terms of Service and Privacy Policy
        </div>
      </form>

      <div className="text-grey-dark mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-cyan-500">
          Log in.
        </Link>
      </div>
    </div>
  );
}
