import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import LoadingSpinner from "../components/LoadingSpinner";

const authRoutes = new Set([
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
]);

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: session, isLoading, isError } = useSession();
  const isAuthRoute = authRoutes.has(pathname);
  const isAuthenticated = !!session && !isError;

  // * THIS APPROACH IS TO OPTIMISTICALLY REDIRECT USERS
  // * IT IS NOT SECURE
  //   useEffect(() => {
  //     if (document.cookie.includes("logged_in=true")) {
  //       if (isAuthRoute) {
  //         navigate("/", { replace: true });
  //       } else {
  //         navigate("/login", { replace: true });
  //       }
  //     }
  //   }, [navigate, isAuthRoute]);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthRoute && !isAuthenticated) {
      navigate("/login", { replace: true });
    } else if (isAuthRoute && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isLoading, isAuthenticated, isAuthRoute, navigate]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );

  return <>{children}</>;
};

export default AuthWrapper;
