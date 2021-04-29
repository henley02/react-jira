import { useState } from "react";

import SearchList from "./components/SearchList";
import SearchPanel from "./components/SearchPanel";
import { useDebounce } from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useUsers } from "./user";
import { useProject } from "./project";

const ProjectList = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const debounceParam = useDebounce(param, 200);
  const { error, isLoading, data: lists } = useProject(debounceParam);
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <SearchList
        dataSource={lists || []}
        users={users || []}
        loading={isLoading}
      />
    </Container>
  );
};
const Container = styled.div`
  padding-left: 0.32rem;
  padding-right: 0.32rem;
`;

export default ProjectList;
