import React, { ReactNode, useEffect, useState } from "react";
import { IAuthParams } from "../api/auth_provider";
import * as auth from "../api/auth_provider";
import { IUser } from "../pages/projectList/components/SearchPanel";
import { http } from "../utils/http";

const AuthContext = React.createContext<
  | {
      user: IUser | null;
      login: (form: IAuthParams) => Promise<void>;
      register: (form: IAuthParams) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const login = (form: IAuthParams) => auth.login(form).then(setUser);
  const register = (form: IAuthParams) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  useEffect(() => {
    bootstrapUser().then(setUser);
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("userAuth必须在AuthProvider中使用");
  }
  return context;
};
