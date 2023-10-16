import LoginPage from "@/components/ui/LoginPage";
import { Col, Row } from "antd";
import React, { FC } from "react";

const AdminLogin: FC = () => {
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <Col className="bg-white p-6 rounded shadow" span={4}>
        <h2 className="text-primary mb-5 text-center ">Metro G Admin Login</h2>
        <LoginPage type="admin" />
      </Col>
    </Row>
  );
};

export default AdminLogin;
