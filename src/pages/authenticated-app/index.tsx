import ProjectList from "../projectList";
import { useAuth } from "../../context/auth_context";
import { Dropdown, Menu, Button } from "antd";
import styled from "@emotion/styled";
import { Row } from "../../components/lib";
import { ReactComponent as SoftwareLogo } from "./../../assets/software-logo.svg";

const AuthenticatedApp = () => {
  const { logout, user } = useAuth();

  return (
    <Container>
      <Header between>
        <HeaderLeft gap>
          <SoftwareLogo width={"1.8rem"} color={"rgb(38,132,255)"} />
          <h3>项目</h3>

          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <Button onClick={logout} type={"link"}>
                    登出
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button type={"link"} onClick={(e) => e.preventDefault()}>
              Hi,{user?.name}
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectList />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
`;
const Main = styled.main`
  height: calc(100vh - 0.6rem);
`;

const Header = styled(Row)`
  height: 0.6rem;
  padding-left: 0.32rem;
  padding-right: 0.32rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

export default AuthenticatedApp;
