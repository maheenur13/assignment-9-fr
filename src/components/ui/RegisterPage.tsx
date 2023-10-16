import { useUserRegisterMutation } from "@/redux/api/auth-api";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { FC } from "react";

const RegisterPage: FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const [userRegister, { isLoading }] = useUserRegisterMutation();

  const handleCreateAccount = async (data: any) => {
    try {
      const result: any = await userRegister(data);

      if (result.data?.id) {
        message.success("User created successfully!");
        router.push("/login");
      }
    } catch (error: any) {
      message.error(String(error.message));
    }
  };
  return (
    <div>
      <Form
        autoComplete="off"
        autoCorrect="false"
        onFinish={handleCreateAccount}
        layout={"vertical"}
        form={form}
        className="w-full"
      >
        <Form.Item
          className="w-full"
          name={"name"}
          label="Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          className="w-full"
          name={"email"}
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="email" />
        </Form.Item>
        <Form.Item
          className="w-full"
          name={"contactNo"}
          label="Phone Number"
          rules={[{ required: true }]}
        >
          <Input placeholder="phone number" />
        </Form.Item>
        <Form.Item
          name={"password"}
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password placeholder="password" />
        </Form.Item>
        <Form.Item className="text-center">
          <Button
            style={{ borderRadius: 2 }}
            className="w-full"
            htmlType="submit"
            type="primary"
            loading={isLoading}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
