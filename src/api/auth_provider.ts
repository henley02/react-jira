import { IUser } from "../pages/projectList/components/SearchPanel";

const localStorageKey = "__auth-provider-token__";

export const apiUrl = process.env.REACT_APP_API_URL;

export interface IAuthParams {
  username: string;
  password: string;
}

export const getToken = () => localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: IUser }) => {
  localStorage.setItem(localStorageKey, user.token);
  return user;
};

/**
 * 登录
 * @param data
 */
export const login = (data: IAuthParams) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res && res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(data);
    }
  });
};

/**
 * 注册
 * @param data
 */
export const register = (data: IAuthParams) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res && res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(data);
    }
  });
};

/**
 * 登出
 */
export const logout = async () => localStorage.removeItem(localStorageKey);
