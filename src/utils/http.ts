import qs from "qs";
import { apiUrl, logout } from "../api/auth_provider";
import { useAuth } from "../context/auth_context";

interface IConfig extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  url: string,
  { data, token, headers, ...customConfig }: IConfig = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  console.log(data);
  if (config.method.toUpperCase() === "GET") {
    url = `${url}?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}/${url}`, config).then(async (res) => {
    if (res.status === 401) {
      await logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const responseJson = await res.json();
    if (res.ok) {
      return responseJson;
    } else {
      return Promise.reject(responseJson);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[url, config]: Parameters<typeof http>) =>
    http(url, { ...config, token: user?.token });
};
