"use client";

import ContentWrapper from "@/components/ui/Contents";
import SideBar from "@/components/ui/SideBar";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Layout, Row, Space, Spin } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, ReactNode, useEffect, useState } from "react";

type PropsType = {
  children: ReactNode;
};

const AdminLayout: FC<PropsType> = ({ children, ...props }) => {
  const { role } = getUserInfo() as any;
  const pathname = usePathname();
  const userLoggedIn = isLoggedIn() || true;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    if (role === "CUSTOMER") {
      router.back();
    }
    setIsLoading(true);
  }, [router, isLoading, userLoggedIn, role]);

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

  if (pathname.includes("login")) {
    return <div>{children}</div>;
  }

  // if(router.)

  return (
    <Layout hasSider>
      <SideBar />
      <ContentWrapper>{children}</ContentWrapper>
    </Layout>
  );
};

export default AdminLayout;
