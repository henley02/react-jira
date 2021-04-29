import { FC } from "react";
import { Table, TableProps } from "antd";
import { IUser } from "./SearchPanel";
import dayjs from "dayjs";

export interface IProject {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ISearchListProps extends TableProps<IProject> {
  users: IUser[];
}

const SearchList: FC<ISearchListProps> = ({ users, ...props }) => {
  return (
    <Table
      pagination={false}
      rowKey="id"
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        { title: "部门", dataIndex: "organization" },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
};

export default SearchList;
