import { ReactNode } from "react";

export type TToast = {
  message: string;
  type: "error" | "success";
};

export type TAppContext = {
  showToast: (toast: TToast) => void;
  isLoggedIn: boolean;
};

export interface TChildren {
  children: ReactNode;
}

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
