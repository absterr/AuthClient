import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import type z from "zod";
import LoadingSpinner from "../components/LoadingSpinner";
import { resetUserPassword, verifyPasswordResetToken } from "../lib/auth-api";
import { resetPasswordSchema } from "../lib/auth-schema";
import { toast } from "sonner";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [isPending, setPending] = useState(true);
  const [response, setResponse] = useState({ success: false, message: "" });

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await verifyPasswordResetToken(token);
        setResponse({
          success: res.success,
          message: res.message,
        });
      } catch (error) {
        console.log("An error occured.", error);
      } finally {
        setPending(false);
      }
    })();
  }, [token]);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetUserPassword,
    onSuccess: () => {
      navigate("/login", { replace: true });
      toast.success("Password reset successful. Login to continue");
    },
    onError: (error) => {
      if (error.message === "Invalid or expired token.")
        toast.error(error.message);
      else toast.error("Unable to log in. Try again or something.");
    },
  });

  const pending = resetPasswordMutation.isPending;

  const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    resetPasswordMutation.mutate(values);
  };

  if (isPending) {
    return (
      <section className="flex justify-center h-screen pt-64">
        <LoadingSpinner />
      </section>
    );
  }

  if (!response.success) {
    return (
      <section className="flex flex-col items-center h-screen pt-64">
        <h1 className="mb-2 text-2xl font-bold text-black">
          {response.message === "Invalid or expired token"
            ? response.message
            : "Unable to verify email"}
        </h1>
        {response.message === "Invalid or expired token" && (
          <p className="text-gray-600">Your token is invalid or has expired</p>
        )}
      </section>
    );
  }

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Reset password
            </h2>

            <form className="pt-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5">
                {(["password", "confirmPassword"] as const).map((field) => (
                  <div key={field}>
                    <label className="text-base font-medium text-gray-900">
                      {field === "password" ? "Password" : "Confirm password"}
                    </label>
                    <div className="pt-2.5">
                      <input
                        type="password"
                        placeholder={
                          field === "password"
                            ? "Enter you new password"
                            : "Confirm password"
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
                    disabled={pending}
                  >
                    {pending ? <LoadingSpinner /> : "Set new password"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
