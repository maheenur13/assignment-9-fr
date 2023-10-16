import { Breadcrumb, BreadcrumbItemProps } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

type PropsType = {
  items: {
    label: string;
    link: string;
  }[];
};

const BreadCrumbWrapper: FC<PropsType> = ({ items }) => {
  const breadcrumbItem = [
    {
      title: (
        <Link href="/">
          <HomeOutlined />
        </Link>
      ),
    },
    ...items.map((item) => {
      return {
        title: item.label ? (
          <Link href={item.link}>{item.label}</Link>
        ) : (
          <span>{item.label}</span>
        ),
      };
    }),
  ];

  return <Breadcrumb items={breadcrumbItem}></Breadcrumb>;
};

export default BreadCrumbWrapper;
