import { IBookingPayload } from "@/interfaces/common";
import { Descriptions, DescriptionsProps } from "antd";
import React, { FC } from "react";

type PropsType = {
  bookingData: IBookingPayload;
};

const FinalBooking: FC<PropsType> = ({ bookingData }) => {
  const userItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Phone Number",
      children: <div>{bookingData?.phoneNumber}</div>,
    },
    {
      key: "2",
      label: "Address",
      children: <div>{bookingData?.address}</div>,
    },
    {
      key: "3",
      label: "Service Avail Date",
      children: <div>{bookingData.serviceAvailDate}</div>,
    },
    {
      key: "4",
      label: "Service Avail Time",
      children: <div>{bookingData.serviceAvailTime}</div>,
    },
    {
      key: "5",
      label: "Totsl",
      children: <div>{bookingData.total}</div>,
    },
  ];
  return (
    <div className="p-5">
      <Descriptions column={1} layout="horizontal" bordered items={userItems} />
    </div>
  );
};

export default FinalBooking;
