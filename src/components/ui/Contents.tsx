"use client";

import { Layout, Space } from "antd";
import React, { FC, ReactNode } from "react";
import Header from "./Header";

type PropsType = {
  children: ReactNode;
};

const { Content } = Layout;

const ContentWrapper: FC<PropsType> = ({ children }) => {
  const base = "admin";

  return (
    <Content
      style={{
        minHeight: "100vh",
        color: "darkgray",
      }}
    >
      <Header/>
     
     
    <div style={{
      padding:12
    }}>
    {children}
    </div>
    
    </Content>
  );
};

export default ContentWrapper;
