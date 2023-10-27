"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import { useGetSingleServiceQuery } from "@/redux/api/service.api";
import { useGetSingleUserQuery } from "@/redux/api/user-api";
import { getUserInfo } from "@/services/auth.service";
import {
  Button,
  Col,
  Descriptions,
  DescriptionsProps,
  Modal,
  Row,
  Spin,
  Tag,
  message,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { FC, useState, useEffect } from "react";
import dayjs from "dayjs";
import FormTextArea from "@/components/Forms/FormTextArea";
import { IBookingPayload } from "@/interfaces/common";
import FinalBooking from "@/components/ui/BookingFinal";
import { useAddBookingMutation } from "@/redux/api/booking-api";
import { useRouter } from "next/navigation";

type PropsType = {
  params: { id: string };
};

const serviceAvailPlace = [
  {
    label: "Service Point",
    value: "SERVICE_POINT",
  },
  {
    label: "At Home",
    value: "AT_HOME",
  },
];
const Booking: FC<PropsType> = ({ params }) => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const userData: any = getUserInfo();
  const { data: userInfo } = useGetSingleUserQuery(userId);
  const { data: ServiceData, isLoading } = useGetSingleServiceQuery(params.id);

  const [addBooking] = useAddBookingMutation();

  const [open, setOpen] = useState<boolean>(false);

  const [finalPayload, setFinalPayload] = useState<IBookingPayload>();

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };
  const range: any = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const disabledDateTime = () => ({
    disabledHours: () =>
      range(0, 24).filter((hour: number) => hour < 8 || hour >= 20),
  });
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Service Name",
      children: <div>{ServiceData?.service?.title}</div>,
    },
    {
      key: "2",
      label: "Price",
      children: (
        <div className="font-semibold">{ServiceData?.service.price} BDT</div>
      ),
    },
    {
      key: "3",
      label: "Applicable Vehicle For",
      children: (
        <div>
          {ServiceData?.service.serviceVehicles?.map((item, index) => {
            return (
              <Tag color="blue-inverse" key={index}>
                {item.vehicle.model}
              </Tag>
            );
          })}
        </div>
      ),
    },
  ];
  const userItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "User Name",
      children: <div>{userInfo?.name}</div>,
    },
    {
      key: "2",
      label: "Email",
      children: <div>{userInfo?.email}</div>,
    },
    {
      key: "21",
      label: "Phone Number",
      children: (
        <FormInput name="phoneNumber" defaultValue={userInfo?.contactNo} />
      ),
    },
    {
      key: "3",
      label: "Select Your Vehicle",
      children: (
        <div>
          <FormSelectField
            name="vehicleId"
            options={
              ServiceData?.service.serviceVehicles.map((vehicleItem) => {
                return {
                  label: vehicleItem.vehicle.model,
                  value: vehicleItem.vehicle.id,
                };
              }) || []
            }
          />
        </div>
      ),
    },
    {
      key: "3",
      label: "Address",
      children: <FormInput name="address" />,
    },
    {
      key: "4",
      label: "Service Avail Date",
      children: (
        <FormDatePicker
          disabledDate={disabledDate}
          label=""
          picker="date"
          name="serviceAvailDate"
        />
      ),
    },
    {
      key: "5",
      label: "Service Avail Time",
      children: (
        <FormDatePicker
          disabledTime={disabledDateTime}
          label=""
          picker="time"
          name="serviceAvailTime"
        />
      ),
    },
    {
      key: "6",
      label: "Service Point",
      children: (
        <FormSelectField name="orderPlaceAt" options={serviceAvailPlace} />
      ),
    },

    {
      key: "8",
      label: "Additional Information",
      children: <FormTextArea name="additionalInfo" label="" />,
    },
  ];

  const onSubmit = (values: any) => {
    const payload: IBookingPayload = {
      phoneNumber: values.phoneNumber,
      address: values.address,
      customerId: userInfo?.id,
      addiotionalInfo: values.additionalInfo,
      serviceAvailDate: values.serviceAvailDate,
      serviceAvailTime: values.serviceAvailTime,
      vehicleId: values.vehicleId,
      orderPlaceAt: values.orderPlaceAt,
      serviceId: ServiceData?.service.id as string,
      total: ServiceData?.service.price as number,
    };
    setFinalPayload(payload);
    showModal();
  };

  const onFinalSubmit = async () => {
    try {
      const result: any = await addBooking(finalPayload);
      console.log({ result });
      if (result?.data?.id) {
        message.success("Booking Successfully!");
        hideModal();
        router.push("/");
      } else {
        message.error("Something went wrong!");
      }
    } catch (error: any) {
      message.error(error?.message);
    }
  };

  useEffect(() => {
    if (userData) {
      setUserId(userData?.id);
    }
  }, [userData]);

  return (
    <Spin spinning={isLoading}>
      <Form submitHandler={onSubmit} isFormResetable={false}>
        <div className="min-h-screen p-4 mt-6 container mx-auto">
          <Row gutter={24}>
            <Col span={14}>
              <Descriptions
                column={1}
                layout="horizontal"
                title="Service Info"
                bordered
                items={items}
              />
            </Col>
            <Col span={10}>
              <Descriptions
                column={1}
                layout="horizontal"
                title="Booking Info"
                bordered
                items={userItems}
              />
            </Col>
          </Row>
        </div>
        <div className="mb-4 text-right px-7">
          <Button htmlType="submit" type="primary" style={{ borderRadius: 4 }}>
            Confirm Booking
          </Button>
        </div>
      </Form>
      <Modal
        title="Are your sure?"
        open={open}
        onOk={onFinalSubmit}
        onCancel={hideModal}
        width={700}
        okText="Submit"
        cancelText="Cancel"
      >
        <FinalBooking bookingData={finalPayload as IBookingPayload} />
      </Modal>
    </Spin>
  );
};

export default Booking;
