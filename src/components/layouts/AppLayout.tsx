"use client";

import { ReactNode, useEffect, useState } from "react";
import { FloatButton, Layout, Row, Space, Spin } from "antd";
import NavigationBar from "../ui/Navigationbar";

const { Header, Content, Footer } = Layout;

type PropsType = {
  children: ReactNode | JSX.Element;
};

export const AppLayout: React.FC<PropsType> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
  }, [isLoading]);

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
          <Spin size="large"></Spin>
        </Space>
      </Row>
    );
  }

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          zIndex: 999,
          top: "0",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#374151",
        }}
      >
        <NavigationBar />
      </Header>
      <div>
        <Content>
          <div className="site-layout-content ">{children}</div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "#374151",
            color: "#ffffff",
          }}
        >
          Simple E-commerce
        </Footer>
      </div>
      <FloatButton.BackTop />
    </Layout>
  );
};
