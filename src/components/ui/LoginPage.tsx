"use client";

import { ILoginResponse } from "@/interfaces/common";
import { useUserLoginMutation } from "@/redux/api/auth-api";
import { storeUserInfo } from "@/services/auth.service";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

type PropsType = {
  type: "admin" | "customer";
};

const LoginPage: FC<PropsType> = ({ type }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [userLogin, { isLoading }] = useUserLoginMutation();

  const handleLogin = async (values: any) => {
    try {
      const result: ILoginResponse = await userLogin(values).unwrap();

      if (result.accessToken) {
        message.success("user logged in successfully!");

        storeUserInfo({ accessToken: result?.accessToken });
        if (type === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    } catch (error: any) {
      message.error(error.message);
    }

    //  if(result)
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
            loading={isLoading}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
