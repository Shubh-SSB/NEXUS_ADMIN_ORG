"use client";
import React from "react";
import { LoginProps } from "../../types/login";
import LoginForm from "./login-form";
import Lottie from "./dotlottie";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Login: React.FC<LoginProps> = ({
  onLogin,
  onForgotPassword,
  onSignUp,
  isLoading = false,
  error,
}) => {
  return (
    <div className="h-screen w-screen items-center bg-foreground overflow-hidden ">
      {/* Top left logo */}
      <div className="absolute top-6 left-6 z-20 flex items-center space-x-3">
        <div className="w-12 h-12 text-white bg-white/20 backdrop-blur-sm border border-white rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">
            <DotLottieReact
              src="https://lottie.host/a7b9f14d-2086-4292-9b5b-480f20aa2c11/vgNJBeL1Pr.lottie"
              className="w-10 h-10"
              loop
              autoplay
            />
          </span>
        </div>
        <span className="text-white font-semibold text-xl tracking-wide">
          NEXUS ORG
        </span>
      </div>
      <div className="flex flex-row items-center justify-center h-screen w-full">
        <div className="bg-main-bg/90 h-full flex-1 items-center relative overflow-visible min-w-0">
          {/* Decorative Scribbles */}
          <Image
            src="/images/scribble/Scribble-3.svg"
            alt="Scribble 3"
            width={120}
            height={120}
            className="absolute -top-10 -left-10 opacity-60 rotate-12 z-0 pointer-events-none select-none"
            aria-hidden="true"
          />
          <Image
            src="/images/scribble/Scribble-9.svg"
            alt="Scribble 21"
            width={100}
            height={100}
            className="absolute bottom-1/4 right-20 opacity-40 rotate-10 z-0 pointer-events-none select-none"
            aria-hidden="true"
          />
          <Image
            src="/images/scribble/Scribble-7.svg"
            alt="Scribble 21"
            width={100}
            height={100}
            className="absolute top-1/2 left-0 opacity-40 rotate-3 z-0 pointer-events-none select-none"
            aria-hidden="true"
          />
          <Image
            src="/images/scribble/Scribble-21.svg"
            alt="Scribble 21"
            width={100}
            height={100}
            className="absolute top-8 right-1/6 rotate-3 z-0 pointer-events-none select-none"
            aria-hidden="true"
          />
          {/* Main Illustration */}
          <Image
            src="/images/login-illu.png"
            alt="Login-illustration"
            height={200}
            width={200}
            className="h-full w-full object-cover relative z-10"
          />
        </div>
        <div className="h-full py-4 divider-horizontal divider mx-0.5" />
        <div className="flex-1 h-full flex items-center justify-start">
          <LoginForm
            onLogin={onLogin}
            onForgotPassword={onForgotPassword}
            onSignUp={onSignUp}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
