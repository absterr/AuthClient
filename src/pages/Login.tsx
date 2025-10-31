import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";
import LoadingSpinner from "../components/LoadingSpinner";
import { loginUser } from "../lib/auth-api";
import { loginSchema } from "../lib/auth-schema";

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => navigate("/", { replace: true }),
    onError: (error) => toast.error(error.message),
  });

  const isPending = loginMutation.isPending;

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(values);
  };

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Log in with Auth
            </h2>
            <p className="pt-2 text-base text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                to={"/signup"}
                className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
              >
                Create a free account
              </Link>
            </p>

            <form className="pt-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5">
                {(["email", "password"] as const).map((field) => (
                  <div key={field}>
                    <div className="flex items-center justify-between">
                      <label className="text-base font-medium text-gray-900">
                        {field === "email" ? "Email address" : "Password"}
                      </label>
                      {field === "password" && (
                        <a
                          href="/forgot-password"
                          className="text-sm font-medium text-indigo-600 hover:underline hover:text-indigo-700 focus:text-indigo-700"
                        >
                          Forgot password?
                        </a>
                      )}
                    </div>
                    <div className="pt-2.5">
                      <input
                        type={field}
                        placeholder={
                          field === "email"
                            ? "eg: johndoe@example.com"
                            : "Enter your password"
                        }
                        className="entry"
                        {...form.register(field)}
                      />
                      {form.formState.errors[field] && (
                        <p className="text-sm text-red-500 pt-1">
                          {form.formState.errors[field].message}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                <div>
                  <button
                    type="submit"
                    className="submit__btn"
                    disabled={isPending}
                  >
                    {isPending ? <LoadingSpinner /> : "Log in"}
                  </button>
                </div>
              </div>
            </form>

            <div className="pt-3">
              <button
                type="button"
                className="google__btn"
                disabled={isPending}
              >
                <div className="absolute inset-y-0 left-0 p-4">
                  <svg
                    className="w-6 h-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </div>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
