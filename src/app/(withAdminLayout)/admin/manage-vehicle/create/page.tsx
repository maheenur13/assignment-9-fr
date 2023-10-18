"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectDropdown from "@/components/Forms/FormSelect";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  useAddVehicleMutation,
  useGetAllVehicleTypesQuery,
} from "@/redux/api/vehicle-api";
import { Button, Col, Row, message } from "antd";

const CreateVehicle = () => {
  const { data: vehicleTypes, isLoading } = useGetAllVehicleTypesQuery({});
  const [addVehicle] = useAddVehicleMutation();

  const onSubmit = async (data: any) => {
    data.cc = parseInt(data.cc);
    data.weight = parseInt(data.weight);
    message.loading("Creating.....");
    try {
      await addVehicle(data);
      message.success("vehicle added successfully");
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
          { label: "vehicle", link: `/${base}/manage-vehicle` },
        ]}
      />
      <h1>Create Service</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="model" label="Model name" />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormSelectDropdown
              options={vehicleTypes?.vehiclesTypes.map((item) => {
                return {
                  label: item.type,
                  value: item.type,
                };
              })}
              allowClear
              name="vehicleType"
              label="Vehicle Type"
            />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="brand" label="Brand Name" />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="cc" label="CC" />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="weight" label="Weight" />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          add
        </Button>
      </Form>
    </div>
  );
};

export default CreateVehicle;
