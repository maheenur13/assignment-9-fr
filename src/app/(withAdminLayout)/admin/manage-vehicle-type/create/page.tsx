"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddVehicleTypeMutation } from "@/redux/api/vehicle-api";
import { Button, Col, Row, message } from "antd";

const CreateVehicleType = () => {
  const [addVehicleType] = useAddVehicleTypeMutation();

  const onSubmit = async (data: any) => {
    message.loading("Creating.....");
    try {
      console.log(data);
      await addVehicleType(data);
      message.success("type added successfully");
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };
  const base = "admin";
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "vehicle types", link: `/${base}/manage-vehicle-type` },
        ]}
      />
      <h1>Create Vehicle Type</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="type" label="Vehicle Type" />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          add
        </Button>
      </Form>
    </div>
  );
};

export default CreateVehicleType;
