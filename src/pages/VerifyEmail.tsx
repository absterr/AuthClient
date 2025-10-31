import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { verifyUserEmail } from "../lib/auth-api";

const verifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, setPending] = useState(true);
  const [response, setResponse] = useState<{
    success: boolean;
    message: string;
  }>({ success: false, message: "" });

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const res = await verifyUserEmail(token);
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

  if (isPending)
    return (
      <section className="flex justify-center h-screen pt-64">
        <LoadingSpinner />
      </section>
    );

  return (
    <section className="flex flex-col items-center h-screen pt-64">
      <h1 className="mb-2 text-2xl font-bold text-black">
        {response.success
          ? "Email verified"
          : response.message === "Invalid or expired token"
          ? response.message
          : "Unable to verify email"}
      </h1>
      <p className="text-gray-600">
        {response.success
          ? "Your email has been successfully verified"
          : response.message === "Invalid or expired token" &&
            "Your token is invalid or has expired"}
      </p>
      {response.success && (
        <div className="pt-6">
          <button className="p-4 bg-indigo-600 text-white rounded-2xl transition-colors hover:bg-indigo-700 focus:outline-none">
            <Link to={"/"}>Go to home</Link>
          </button>
        </div>
      )}
    </section>
  );
};

export default verifyEmail;
