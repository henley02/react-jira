import { useAuth } from "../../context/auth_context";
import { Form, Input } from "antd";
import { IAuthParams } from "../../api/auth_provider";
import { LongButton } from "./index";
import { useAsync } from "../../utils/use-async";

const Item = Form.Item;

interface IState extends IAuthParams {
  confirmPassword: string;
}

const Register = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const onSubmit = ({ confirmPassword, ...value }: IState) => {
    if (confirmPassword !== value.password) {
      onError(new Error("请确认两次输入的密码相同"));
      return;
    }
    run(register(value)).catch(onError);
  };

  return (
    <Form onFinish={onSubmit}>
      <Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input id="username" placeholder={"请输入用户名"} />
      </Item>
      <Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
        <Input.Password id="password" placeholder={"请输入密码"} />
      </Item>
      <Item
        name="confirmPassword"
        rules={[{ required: true, message: "请输入确认密码" }]}
      >
        <Input.Password id="confirmPassword" placeholder={"请输入确认密码"} />
      </Item>
      <Item>
        <LongButton htmlType={"submit"} type={"primary"} loading={isLoading}>
          注册
        </LongButton>
      </Item>
    </Form>
  );
};

export default Register;
