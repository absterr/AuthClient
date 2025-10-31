import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type z from "zod";
import LoadingSpinner from "../components/LoadingSpinner";
import { forgotUserPassword } from "../lib/auth-api";
import { emailSchema } from "../lib/auth-schema";

const ForgotPassword = () => {
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotUserPassword,
    onSuccess: (data) => console.log("Success.", data),
    onError: (error) => console.error("Error!", error),
  });

  const isPending = forgotPasswordMutation.isPending;

  const onSubmit = (values: z.infer<typeof emailSchema>) => {
    forgotPasswordMutation.mutate(values);
  };

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Forgot password
            </h2>

            <form className="pt-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5">
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="pt-2.5">
                    <input
                      type="email"
                      placeholder="eg: johndoe@example.com"
                      className="entry"
                      {...form.register("email")}
                    />
                  </div>
                </div>
                {form.formState.errors["email"] && (
                  <p className="text-sm text-red-500 pt-1">
                    {form.formState.errors["email"].message}
                  </p>
                )}
                <div>
                  <button
                    type="submit"
                    className="submit__btn"
                    disabled={isPending}
                  >
                    {isPending ? <LoadingSpinner /> : "Verify email"}
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

export default ForgotPassword;
