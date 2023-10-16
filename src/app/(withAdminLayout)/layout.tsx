"use client";

import ContentWrapper from "@/components/ui/Contents";
import SideBar from "@/components/ui/SideBar";
import { isLoggedIn } from "@/services/auth.service";
import { Layout, Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import React, { FC, ReactNode, useEffect, useState } from "react";

type PropsType = {
  children: ReactNode;
};

const AdminLayout: FC<PropsType> = ({ children }) => {
  const userLoggedIn = isLoggedIn() || true;
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

  return (
    <Layout hasSider>
      <SideBar />
      <ContentWrapper>{children}</ContentWrapper>
    </Layout>
  );
};

export default AdminLayout;
