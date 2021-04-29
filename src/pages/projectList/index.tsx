import { useEffect, useState } from "react";

import SearchList from "./components/SearchList";
import SearchPanel from "./components/SearchPanel";
import { useDebounce, cleanObject, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";

const ProjectList = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const [users, setUsers] = useState([]);
  const [lists, setLists] = useState([]);

  const debounceParam = useDebounce(param, 500);
  const httpFetch = useHttp();

  useMount(() => {
    httpFetch("users").then(setUsers);
  });

  useEffect(() => {
    httpFetch("projects", { data: cleanObject(debounceParam) }).then(setLists);
    // eslint-disable-next-line
  }, [debounceParam]);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <SearchList list={lists} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding-left: 0.32rem;
  padding-right: 0.32rem;
`;

export default ProjectList;
