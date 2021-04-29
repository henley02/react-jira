import { useEffect } from "react";
import { cleanObject } from "../../utils";
import { useAsync } from "../../utils/use-async";
import { IProject } from "./components/SearchList";
import { useHttp } from "../../utils/http";

export const useProject = (debounceParam?: Partial<IProject>) => {
  const { run, ...result } = useAsync<IProject[]>();
  const httpFetch = useHttp();

  useEffect(() => {
    run(httpFetch("projects", { data: cleanObject(debounceParam || {}) }));
    // eslint-disable-next-line
  }, [debounceParam]);

  return result;
};
