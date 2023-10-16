"use client";

import { Avatar, Button, Dropdown, MenuProps, Space } from "antd";
import Link from "next/link";
import { FC } from "react";
import {
  UserOutlined,
  SecurityScanOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { MenuInfo } from "rc-menu/lib/interface";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";

const NavigationBar: FC = () => {
  const { role } = getUserInfo() as any;
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="/profile">Profile</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: <Link href="/change-password">Change Password</Link>,
      icon: <SecurityScanOutlined />,
    },

    {
      key: "4",
      danger: true,
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: (e) => handleLogout(e),
    },
  ];

  const handleLogout = (e: MenuInfo) => {
    // console.log(e);
    removeUserInfo("accessToken");
  };

  return (
    <>
      <div className="text-primary logo">Metro G</div>
      <div className="w-full flex  justify-end ">
        <Link className="px-6 link-item" href="/home" style={{}}>
          Home
        </Link>
        <Link className="px-6 link-item" href="/about">
          About
        </Link>
        <Link className="px-6 link-item" href="/services">
          Services
        </Link>
        <Link className="px-6 link-item" href="/blog">
          Blog
        </Link>
        <Link className="px-6 link-item" href="/home">
          About
        </Link>
        <div>
          {role ? (
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar size="large" icon={<UserOutlined />} />
                </Space>
              </a>
            </Dropdown>
          ) : (
            <Link href="/login">
              <Button
                style={{
                  borderRadius: "0",
                  height: "100%",
                }}
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

// const LinkItem = styled(Link)<{ active?: "true" | "false" }>`

//   background-color: ${(props) =>
//     props.active === "true" ? "#198dfa" : "transparent"};

//   &:hover {
//     color: ${(props) => (props.active === "true" ? "#303030" : "#ffffff")};
//   }
// `;

export default NavigationBar;
