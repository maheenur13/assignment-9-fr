import { IService } from "@/interfaces/common";
import { Badge, Descriptions, DescriptionsProps, Rate, Tag } from "antd";
import React, { FC } from "react";

type PropsType = {
  data: IService | undefined;
};

export const ServiceOverview: FC<PropsType> = ({ data }) => {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Service Name",
      children: <div>{data?.title}</div>,
    },
    {
      key: "2",
      label: "Price",
      children: <div className="font-semibold">{data?.price} BDT</div>,
    },

    {
      key: "4",
      label: "Rating By Users",
      children: (
        <div>
          <Rate value={data?.rating} disabled />
        </div>
      ),
    },
    {
      key: "5",
      label: "Applicable Vehicle For",
      children: (
        <div>
          {data?.serviceVehicles?.map((item, index) => {
            return (
              <Tag color="blue-inverse" key={index}>
                {item.vehicle.model}
              </Tag>
            );
          })}
        </div>
      ),
      span: 3,
    },

    {
      key: "8",
      label: "Description",
      children: <div>{data?.description}</div>,
    },
    {
      key: "9",
      label: "Details",
      children: <div>{data?.details}</div>,
    },
  ];
  return (
    <div>
      <Descriptions
        layout="vertical"
        title="User Info"
        bordered
        items={items}
      />
    </div>
  );
};
