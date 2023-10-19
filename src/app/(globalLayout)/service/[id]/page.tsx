"use client";

import { ServiceOverview } from "@/components/ui/Service";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetSingleServiceQuery } from "@/redux/api/service.api";
import { Button, Spin, Tabs, TabsProps } from "antd";
import Image from "next/image";
import React, { FC } from "react";

type PropsType = {
  params: any;
};

const Service: FC<PropsType> = ({ params }) => {
  const { data, isLoading } = useGetSingleServiceQuery(params?.id);

  const tabItems: TabsProps["items"] = [
    {
      label: "Overview",
      key: "overview",
      children: <ServiceOverview data={data?.service} />,
    },
    {
      label: "Specification",
      key: "specs",
      children: (
        <div
          className="px-4"
          dangerouslySetInnerHTML={{
            __html: data?.service?.specification as string,
          }}
        ></div>
      ),
    },
    {
      label: "Reviews",
      key: "reviews",
      children: <div>Reviews</div>,
    },
  ];

  return (
    <Spin spinning={isLoading}>
      <div className="min-h-screen my-3">
        <div className="mb-2">
          <UMBreadCrumb items={[{ label: `home`, link: `/` }]} />
        </div>
        <div className="h-96 shadow-md overflow-hidden rounded-md flex justify-center items-center relative">
          <Image
            fill={true}
            style={{ objectFit: "contain", zIndex: 0 }}
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="image"
            src={
              data?.service?.imageUrl ||
              "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            }
          />
        </div>
        <div className="mt-4 text-right">
          <Button type="primary">Book</Button>
        </div>
        <Tabs className="my-4" tabPosition={"left"} items={tabItems} />
      </div>
    </Spin>
  );
};

export default Service;
