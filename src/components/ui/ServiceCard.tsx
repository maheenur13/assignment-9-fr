import { IService } from "@/interfaces/common";
import { Avatar, Card, Rate, Tag } from "antd";
import React, { FC } from "react";

import Image from "next/image";

type PropsType = {
  service: IService;
  type?: string;
};

const { Meta } = Card;

const ServiceCard: FC<PropsType> = ({ service, type }) => {
  const uniqueVehicleTypes = new Set(
    service.serviceVehicles.map((item) => item.vehicle.vehicleType)
  );
  return (
    <Card
      style={{ width: "100%" }}
      cover={
        <Image
          width={260}
          height={180}
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <div key="price" className="font-semibold text-">
          <Tag>{service.price} TK</Tag>
        </div>,
        <div key="rate" className="">
          <Rate
            style={{ fontSize: "16px" }}
            disabled
            defaultValue={service.rating}
          />
        </div>,
      ]}
    >
      <Meta
        title={service.title}
        description={
          <div>
            <div>
              {service.description} Test purpose description. Updating soon with
              more content
            </div>
            <div className="mt-2">
              {type ? (
                <Tag color={"blue"}>{type}</Tag>
              ) : (
                Array.from(uniqueVehicleTypes).map((item, index) => (
                  <Tag key={index} color={"blue"}>
                    {item}
                  </Tag>
                ))
              )}
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default ServiceCard;
