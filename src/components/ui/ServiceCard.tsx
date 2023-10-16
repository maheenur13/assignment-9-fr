import { IService } from "@/interfaces/common";
import { Avatar, Card, Rate, Tag } from "antd";
import React, { FC } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Image from "next/image";

type PropsType = {
  service: IService;
};

const { Meta } = Card;

const ServiceCard: FC<PropsType> = ({ service }) => {
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
              <Tag>BIKE</Tag>
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default ServiceCard;
