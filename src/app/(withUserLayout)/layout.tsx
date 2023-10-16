"use client";

import { isLoggedIn } from "@/services/auth.service";
import { Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import React, { FC, ReactNode, useEffect, useState } from "react";

type PropsType = {
  children: ReactNode;
};

const PublicLayout: FC<PropsType> = ({ children }) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router, isLoading, userLoggedIn]);

  if (!isLoading) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Space>
          <Spin tip="Loading" size="large"></Spin>
        </Space>
      </Row>
    );
  }
  return <div>{children}</div>;
};

export default PublicLayout;
