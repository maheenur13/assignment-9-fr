"use client";
import { useGetSingleServiceQuery } from "@/redux/api/service.api";
import { useGetSingleUserQuery } from "@/redux/api/user-api";
import { getUserInfo } from "@/services/auth.service";
import {
  Button,
  Col,
  DatePicker,
  Descriptions,
  DescriptionsProps,
  Form,
  Input,
  Modal,
  Row,
  Select,
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
  const [form] = Form.useForm();

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
        <Form.Item
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Phone number required!",
            },
          ]}
        >
          <Input defaultValue={userInfo?.contactNo} />
        </Form.Item>
      ),
    },
    {
      key: "3",
      label: "Select Your Vehicle",
      children: (
        <div>
          <Form.Item
            name="vehicleId"
            rules={[
              {
                required: true,
                message: "Vehicle ID required!",
              },
            ]}
          >
            <Select
              options={
                ServiceData?.service.serviceVehicles.map((vehicleItem) => {
                  return {
                    label: vehicleItem.vehicle.model,
                    value: vehicleItem.vehicle.id,
                  };
                }) || []
              }
            />
          </Form.Item>
        </div>
      ),
    },
    {
      key: "3",
      label: "Address",
      children: (
        <Form.Item
          name="address"
          rules={[
            {
              required: true,
              message: "Address required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      ),
    },
    {
      key: "4",
      label: "Service Avail Date",
      children: (
        <Form.Item
          name="serviceAvailDate"
          rules={[
            {
              required: true,
              message: "Avail date required!",
            },
          ]}
        >
          <DatePicker
            className="w-full"
            disabledDate={disabledDate}
            picker="date"
          />
        </Form.Item>
      ),
    },
    {
      key: "5",
      label: "Service Avail Time",
      children: (
        <Form.Item
          name="serviceAvailTime"
          rules={[
            {
              required: true,
              message: "Avail Time required!",
            },
          ]}
        >
          <DatePicker
            className="w-full"
            disabledTime={disabledDateTime}
            picker="time"
            format="h:mm a"
            minuteStep={30}
          />
        </Form.Item>
      ),
    },
    {
      key: "6",
      label: "Service Point",
      children: (
        <Form.Item
          name="orderPlaceAt"
          rules={[
            {
              required: true,
              message: "Order Place required!",
            },
          ]}
        >
          <Select className="w-full" options={serviceAvailPlace} />
        </Form.Item>
      ),
    },

    {
      key: "8",
      label: "Additional Information",
      children: (
        <Form.Item name="additionalInfo">
          <Input.TextArea />
        </Form.Item>
      ),
    },
  ];

  const onSubmit = (values: any) => {
    const payload: IBookingPayload = {
      phoneNumber: values.phoneNumber,
      address: values.address,
      customerId: userInfo?.id,
      additionalInfo: values.additionalInfo,
      serviceAvailDate: values.serviceAvailDate.format("YYYY-MM-DD"),
      serviceAvailTime: values.serviceAvailTime.format("h:mm a"),
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
      <Form onFinish={onSubmit} form={form}>
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
              <div className="mt-6 text-center ">
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ borderRadius: 4 }}
                >
                  Confirm Booking
                </Button>
              </div>
            </Col>
          </Row>
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
