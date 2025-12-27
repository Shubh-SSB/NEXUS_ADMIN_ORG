"use client";
import React from "react";
import { LoginProps } from "../../types/login";
import { useLogin } from "../../functions/login";

const LoginForm: React.FC<LoginProps> = ({
  onLogin,
  onForgotPassword,
  onSignUp,
  isLoading = false,
  error,
}) => {
  const { formData, handleInputChange, handleSubmit, handleForgotPassword } =
    useLogin(onLogin, onForgotPassword);

  return (
    <div className="h-auto rounded-2xl w-96 border-2 backdrop-blur-md bg-black/25 relative flex flex-col items-center justify-center p-8 z-10">
      <h2 className="text-4xl font-bold text-white mb-8">Nexus Admin</h2>

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <label htmlFor="email" className="text-white text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:opacity-50"
          placeholder="Enter your email"
          disabled={isLoading}
          required
        />

        <div className="space-y-2">
          <label htmlFor="password" className="text-white text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:opacity-50"
            placeholder="Enter your password"
            disabled={isLoading}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              id="remember"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-400 focus:ring-2 focus:ring-blue-400  disabled:opacity-50"
              disabled={isLoading}
            />
            <label htmlFor="remember" className="text-white text-sm">
              Remember me
            </label>
          </div>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-blue-300 hover:text-blue-200 text-sm font-medium transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-black hover:bg-gray-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent flex items-center justify-center"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
