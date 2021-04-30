import React, { ReactNode, useEffect } from "react";
import { IAuthParams } from "../api/auth_provider";
import * as auth from "../api/auth_provider";
import { IUser } from "../pages/projectList/components/SearchPanel";
import { http } from "../utils/http";
import { useAsync } from "../utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";

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
  const {
    run,
    data: user,
    error,
    isLoading,
    isError,
    isIdle,
    setData: setUser,
  } = useAsync<IUser | null>();
  const login = (form: IAuthParams) => auth.login(form).then(setUser);
  const register = (form: IAuthParams) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));
  useEffect(() => {
    run(bootstrapUser());
  }, []);

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }
  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }
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
