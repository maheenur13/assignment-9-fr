import { IService } from "@/interfaces/common";
import { Badge, Card, Rate, Tag } from "antd";
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
    <Badge.Ribbon
      text={Array.from(uniqueVehicleTypes).map((item, index) => item)}
    >
      <Card
        style={{ width: "100%" }}
        cover={
          <div className="relative overflow-hidden  h-40 ">
            <Image
              // width={300}
              // height={200}
              fill={true}
              style={{ objectFit: "cover" }}
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="example"
              src={
                service?.imageUrl ||
                "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              }
            />
          </div>
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
                {service.description} Test purpose description. Updating soon
                with more content
              </div>
              <div className="mt-2">
                {service.serviceVehicles.map((item, index) => {
                  if (index < 3) {
                    return (
                      <Tag key={index} color={"blue"}>
                        {item.vehicle.model}
                      </Tag>
                    );
                  } else {
                    return "more";
                  }
                })}
              </div>
            </div>
          }
        />
      </Card>
    </Badge.Ribbon>
  );
};

export default ServiceCard;
