"use client";

import React from "react";
import { useSnackbar } from "notistack";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { LoginProps } from "../../types/login";
import { useLogin } from "../../functions/login";

const LoginForm: React.FC<LoginProps> = ({
  onLogin,
  onForgotPassword,
  onSignUp,
  isLoading = false,
  error,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  // Use isLoading prop for loading state
  const [showPassword, setShowPassword] = React.useState(false);
  const [shake, setShake] = React.useState(false);

  const { formData, handleInputChange, handleSubmit, handleForgotPassword } =
    useLogin(onLogin, onForgotPassword);


  return (
    <div
      className={`w-full relative flex flex-col items-center justify-center px-12 z-10
        transition-all`}
    >
      <div className="relative z-10 w-full">
        <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
        <p className="text-md font-thin text-secondary-bg my-4">
          Login with your admin credential
        </p>

        <form className="w-full min-w-80 space-y-4" onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div
            className={`flex flex-col gap-2 transition-all ${
              shake ? "animate-shake" : ""
            }`}
          >
            <label htmlFor="email" className="text-white text-sm font-medium">
              Email
            </label>

            <div className="relative group">
              <div
                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
                transition-colors group-focus-within:text-red-800"
              >
                <Mail className="h-5 w-5 text-main-bg/70" />
              </div>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Eg.: user@company.edu.in"
                disabled={isLoading}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg
                  border-2 border-main-bg/20 bg-white/10
                  text-secondary-bg placeholder-secondary-bg
                  focus:outline-none focus:ring-2 focus:ring-main-bg
                  focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div
            className={`flex flex-col gap-2 transition-all ${
              shake ? "animate-shake" : ""
            }`}
          >
            <label
              htmlFor="password"
              className="text-white text-sm font-medium"
            >
              Password
            </label>

            <div className="relative group">
              <div
                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
                transition-colors group-focus-within:text-red-800"
              >
                <Lock className="h-5 w-5 text-main-bg/70" />
              </div>

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your secure password"
                disabled={isLoading}
                required
                className="w-full pl-10 pr-14 py-3 rounded-lg
                  border-2 border-main-bg/20 bg-white/10
                  text-secondary-bg placeholder-secondary-bg
                  focus:outline-none focus:ring-2 focus:ring-main-bg
                  focus:border-transparent transition-all"
              />

              {/* Show / Hide */}
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute inset-y-0 right-3 flex items-center
                  text-white/60 hover:text-white transition"
              >
                {showPassword ? (
                  <EyeOff className="ease-in" size={18} />
                ) : (
                  <Eye className="ease-out" size={18} />
                )}
              </button>
            </div>
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-4 h-4 rounded bg-white/10
                  checked:scale-110 transition-transform accent-color-main-bg"
              />
              <label htmlFor="remember" className="text-white text-sm">
                Remember me
              </label>
            </div>

            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={isLoading}
              className="text-main-bg hover:text-red-700 text-sm
                hover:underline transition-all"
            >
              Forgot password?
            </button>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 my-4 bg-black
              hover:bg-black/90 active:scale-[0.98]
              transition-transform disabled:bg-gray-700
              text-white font-medium rounded-lg
              flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0
                       C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Logging In...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
