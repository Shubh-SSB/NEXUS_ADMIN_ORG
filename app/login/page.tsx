"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useAuth } from "@/components/auth";
import Login from "@/components/ui/login";
import { $crud } from "@/factory/crudFactory";
import { apiDataStore } from "@/lib/api-data-store";
import { Router } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  //   useEffect(() => {
  //     refresh();
  //   }, [router]);

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      // Use adminLogin function pattern with reduced code
      const response = await $crud.post("organization/login", credentials);

      // Store API response in data store (store the actual API response)
      //   @ts-ignore
      apiDataStore.setLoginResponse(response.data);

      // Extract token/user from API response (supports multiple response shapes)
      //   @ts-ignore
      const responseData = response?.data ?? response?.data?.data ?? response;
      //   @ts-ignore
      const token = responseData?.token ?? response?.token;
      //   @ts-ignore
      const user = responseData?.user ?? response?.user;

      if (token && user) {
        login(token, user);
        enqueueSnackbar(`Welcome back, ${user.name}!`, { variant: "success" });
        router.replace("/dashboard");
      } else {
        enqueueSnackbar("Login failed", { variant: "error" });
        setIsLoading(false);
      }
    } catch (error: any) {
      enqueueSnackbar(error?.response?.message || "Login failed", {
        variant: "error",
      });
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Implement forgot password logic
    enqueueSnackbar("Forgot password functionality not implemented yet", {
      variant: "info",
    });
  };

  const handleSignUp = () => {
    // Implement sign up logic or redirect
    enqueueSnackbar("Sign up functionality not implemented yet", {
      variant: "info",
    });
  };

  const refresh = () => {
    router.refresh();
  };

  return (
    <>
      <Login
        onLogin={handleLogin}
        //   onForgotPassword={handleForgotPassword}
        onSignUp={handleSignUp}
        isLoading={isLoading}
      />
    </>
  );
}
