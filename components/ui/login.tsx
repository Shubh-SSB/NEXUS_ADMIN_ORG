"use client";
import React from "react";
import { CrowdCanvas } from "./skiper-ui/skiper39";
import { LoginProps } from "../../types/login";
import LoginForm from "./login-form";

const Login: React.FC<LoginProps> = ({
  onLogin,
  onForgotPassword,
  onSignUp,
  isLoading = false,
  error,
}) => {
  return (
    <div className="relative h-full w-full flex items-center justify-center bg-blue-100 overflow-hidden">
      {/* Branding Logo - Top Left */}
      <div className="absolute top-6 left-6 z-20 flex items-center space-x-3">
        <div className="w-10 h-10 bg-black/20 backdrop-blur-sm border border-black rounded-lg flex items-center justify-center">
          <span className="text-black font-bold text-lg">O</span>
        </div>
        <span className="text-black font-semibold text-xl tracking-wide">
          ORG
        </span>
      </div>

      <CrowdCanvas src="/images/all-peeps.png" rows={15} cols={7} />
      <LoginForm
        onLogin={onLogin}
        onForgotPassword={onForgotPassword}
        onSignUp={onSignUp}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default Login;
