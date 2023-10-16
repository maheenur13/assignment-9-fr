"use client";

import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import React, { FC, useState } from "react";

import { getUserInfo } from "@/services/auth.service";
import { sidebarItems } from "@/constants/sidebarItems";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const SideBar: FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { role } = getUserInfo() as any;
  // const role = USER_ROLE.SUPER_ADMIN;

  return (
    <Sider
      collapsible
      width={280}
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          padding: 18,
          textAlign: "center",
          fontWeight: 800,
          fontSize: "2rem",
          color: "#297af4",
        }}
      >
        Metro G
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems("admin")}
      />
    </Sider>
  );
};

export default SideBar;
