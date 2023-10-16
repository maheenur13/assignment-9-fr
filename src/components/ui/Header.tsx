"use client";

import { Col, Dropdown, Layout, Row, Button, Avatar, Space } from "antd";
import type { MenuProps } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const { Header: AntHeader } = Layout;
const Header = () => {
  const { role } = getUserInfo() as any;
  const router = useRouter();
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // message.info('Click on left button.');
    // console.log('click left button', e);
  };

  const handleLogout = () => {
    removeUserInfo("accessToken");
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <Button onClick={handleLogout} danger>
          Logout
        </Button>
      ),
      key: "1",
    },
  ];

  const menuProps = {
    items,
  };
  return (
    <AntHeader
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0px 0px 4px 0.1px #000000",
      }}
    >
      <Row justify={"end"} align={"middle"}>
        <Col>
          {" "}
          <p
            style={{
              marginRight: 8,
            }}
          >
            {role}
          </p>
        </Col>
        <Col>
          <Dropdown menu={menuProps}>
            <Space wrap size={16}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Space>
          </Dropdown>
        </Col>
      </Row>
    </AntHeader>
  );
};

export default Header;
