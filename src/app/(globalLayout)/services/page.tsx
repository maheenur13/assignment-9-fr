"use client";

import ServiceCard from "@/components/ui/ServiceCard";
import { useGetAllServiceQuery } from "@/redux/api/service.api";
import { Col, Row } from "antd";
import { FC } from "react";
const ServicesPage: FC = () => {
  const { data, isLoading } = useGetAllServiceQuery({});
  return (
    <div className="h-screen container mx-auto p-4">
      <h1>Hello</h1>
      <Row gutter={12} justify={'center'}>
        {data?.services?.map((service, index) => (
          <Col xs={1} sm={2} md={4} key={index}>
            <ServiceCard service={service} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ServicesPage;
