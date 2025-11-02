import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import { Toaster } from "sonner";
import AuthWrapper from "./components/AuthWrapper";

function App() {
  return (
    <>
      <AuthWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </AuthWrapper>
      <Toaster
        richColors
        position="top-center"
        toastOptions={{
          classNames: {
            toast: "rounded-xl shadow-md border text-sm",
            success: "bg-green-50 border-green-500 text-green-800",
            error: "bg-red-50 border-red-500 text-red-800",
          },
        }}
      />
    </>
  );
}

export default App;
