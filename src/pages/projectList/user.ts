import { useHttp } from "../../utils/http";
import { useMount } from "../../utils";
import { IUser } from "./components/SearchPanel";
import { useAsync } from "../../utils/use-async";

export const useUsers = () => {
  const httpFetch = useHttp();
  const { run, ...result } = useAsync<IUser[]>();

  useMount(() => {
    run(httpFetch("users"));
  });

  return result;
};
