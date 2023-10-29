"use client";

import { Button, Form, Input, message } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

type PropsType = {
  type: "admin" | "customer";
  callbackUrl?: string;
  error?: string;
};

const LoginPage: FC<PropsType> = ({ type, callbackUrl, error }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleLogin = async (values: any) => {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.ok && callbackUrl) {
        router.push(`${callbackUrl}/` ?? "http://localhost:3000");
        message.success("user logged in successfully!");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <Form
        autoComplete="off"
        autoCorrect="false"
        onFinish={handleLogin}
        layout={"vertical"}
        form={form}
        className="w-full"
      >
        <Form.Item
          className="w-full"
          name={"email"}
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="email" />
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
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
