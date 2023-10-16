"use client";

import { Tabs, TabsProps } from "antd";
import { FC } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { useRouter } from "next/navigation";

type PropsType = {
  authType: "login" | "register";
};

const AuthPage: FC<PropsType> = ({ authType }) => {
  const router = useRouter();
  const items: TabsProps["items"] = [
    {
      key: "login",
      label: <div>Login</div>,
      children: <LoginPage type="customer" />,
    },
    {
      key: "register",
      label: <div>Register</div>,
      children: <RegisterPage />,
    },
  ];

  const onTabChange = (activeKey: string) => {
    if (activeKey === "login") {
      router.push("/login");
    } else {
      router.push("/register");
    }
  };

  return (
    <div className="h-screen  flex justify-center items-center">
      <div className="bg-white p-4 rounded-md w-80 flex shadow-md flex-col justify-center items-center m-auto">
        <h2 className="text-primary mb-2">Metro G</h2>
        <div className="w-full">
          <Tabs
            className="w-full"
            defaultActiveKey={authType}
            items={items}
            onChange={onTabChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
