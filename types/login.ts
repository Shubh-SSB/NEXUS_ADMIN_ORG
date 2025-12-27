export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginProps {
  onLogin?: (formData: LoginFormData) => Promise<void>;
  onForgotPassword?: (email: string) => Promise<void>;
  onSignUp?: () => void;
  isLoading?: boolean;
  error?: string;
}

export interface UseLoginReturn {
  formData: LoginFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleForgotPassword: () => Promise<void>;
}
