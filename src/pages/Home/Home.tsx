import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getUserDetails,
  logoutUser,
  type GetUserResponse,
} from "../../lib/user-api";
import Lead from "./Lead";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<GetUserResponse>({
    queryKey: ["user"],
    queryFn: getUserDetails,
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onMutate: () => toast.loading("Logging out..."),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Logout successfull");
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.dismiss();
      const message =
        error instanceof Error ? error.message : "Couldn't log out.";
      toast.error(message);
    },
  });

  const isPending = logoutMutation.isPending;

  const handleClick = () => {
    logoutMutation.mutate();
  };

  if (isLoading) return null;

  return (
    <section className="flex flex-col items-center justify-center pt-64 gap-12">
      {error || !user ? (
        <Lead />
      ) : (
        <>
          <h1 className="text-4xl font-semibold leading-snug">
            Hello, {user.user.name}
          </h1>
          <button
            className="transition-all rounded-full text-black px-6 py-4 text-xl border border-gray-400 hover:bg-gray-400 focus:outline-none"
            disabled={isPending}
            onClick={handleClick}
          >
            {isPending ? "Logging out..." : "Log out"}
          </button>
        </>
      )}
    </section>
  );
};

export default Home;
