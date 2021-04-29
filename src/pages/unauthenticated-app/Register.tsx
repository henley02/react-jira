import { useAuth } from "../../context/auth_context";
import { Form, Input } from "antd";
import { IAuthParams } from "../../api/auth_provider";
import { LongButton } from "./index";

const Item = Form.Item;

const Register = () => {
  const { register } = useAuth();
  const onSubmit = (value: IAuthParams) => {
    register(value);
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
      <Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Item>
    </Form>
  );
};

export default Register;
