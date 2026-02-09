"use client";
import { useState } from "react";
import { LoginFormData, UseLoginReturn } from "../types/login";
import { $crud } from "../factory/crudFactory";
import { redirect } from "next/navigation";
import { setAuthToken, setUserData } from "../lib/auth";

export const useLogin = (
  onLogin?: (formData: LoginFormData) => Promise<void>,
  onForgotPassword?: (email: string) => Promise<void>,
): UseLoginReturn => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation only
    if (!formData.email || !formData.password) {
      return; // Let CrudFactory handle empty field errors
    }

    await onLogin?.(formData); // CrudFactory handles all errors/success
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      return; // Let user know they need email
    }

    await onForgotPassword?.(formData.email); // CrudFactory handles errors/success
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    handleForgotPassword,
  };
};

export const adminLogin = async (formData: LoginFormData): Promise<void> => {
  const response = await $crud.post("organization/login", {
    email: formData.email,
    password: formData.password,
    // remember_me: formData.rememberMe,
  });

  // Extract token/user from API response (supports multiple response shapes)
  // @ts-ignore
  const responseData = response?.data ?? response?.data?.data ?? response;
  // @ts-ignore
  const token = responseData?.token ?? response?.token;
  // @ts-ignore
  const user = responseData?.user ?? response?.user;

  if (token && user) {
    setAuthToken(token);
    setUserData(user);
  }

  // Redirect on success
  redirect("/dashboard");
};

export const forgotPassword = async (email: string): Promise<void> => {
  await $crud.post("auth/forgot-password", { email });
};
