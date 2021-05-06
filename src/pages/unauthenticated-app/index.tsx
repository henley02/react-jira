import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { Button, Card, Divider, Typography } from "antd";
import styled from "@emotion/styled";

import logo from "./../../assets/logo.svg";
import left from "./../../assets/left.svg";
import right from "./../../assets/right.svg";
import { useDocumentTitle } from "../../utils";

const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  useDocumentTitle("登录或注册", false);

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? "注  册" : "登  录"}</Title>
        {error ? (
          <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        ) : null}
        {isRegister ? (
          <Register onError={setError} />
        ) : (
          <Login onError={setError} />
        )}
        <Divider />
        <Button
          type={"link"}
          onClick={() => {
            setIsRegister(!isRegister);
            setError(null);
          }}
        >
          {isRegister ? "已经有账号了？直接登录" : "没有账号？注册新的账号"}
        </Button>
      </ShadowCard>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 0.5rem 0;
  background-size: 0.8rem;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 4rem) / 2) - 0.32rem),
    calc(((100vw - 4rem) / 2) - 0.32rem), cover;
  background-image: url(${left}), url(${right});
`;
const Title = styled.h2`
  margin-bottom: 0.24rem;
  color: rgb(94, 108, 132);
`;
const ShadowCard = styled(Card)`
  width: 4rem;
  min-height: 5.6rem;
  padding: 0.32rem 0.04rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;
export const LongButton = styled(Button)`
  width: 100%;
`;
export default UnauthenticatedApp;
