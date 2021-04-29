import { useAuth } from "../../context/auth_context";
import { Form, Input } from "antd";
import { IAuthParams } from "../../api/auth_provider";
import { LongButton } from "./index";
import { useAsync } from "../../utils/use-async";

const Login = ({ onError }: { onError: (error: Error) => void }) => {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const onSubmit = (values: IAuthParams) => {
    run(login(values)).catch(onError);
  };

  const Item = Form.Item;
  return (
    <Form onFinish={onSubmit} name="basic" style={{ marginTop: "20px" }}>
      {user ? (
        <div>
          登录成功，用户名{user?.name},token:{user.token}
        </div>
      ) : null}
      <Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input id="username" placeholder={"请输入用户名"} />
      </Item>
      <Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
        <Input.Password id="password" placeholder={"请输入密码"} />
      </Item>
      <Item>
        <LongButton type="primary" htmlType="submit" loading={isLoading}>
          登录
        </LongButton>
      </Item>
    </Form>
  );
};

export default Login;
