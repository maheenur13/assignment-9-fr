"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectDropdown from "@/components/Forms/FormSelect";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import {
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/servicecategory.api";
import {
  useGetSingleVehicleQuery,
  useUpdateVehicleMutation,
} from "@/redux/api/vehicle-api";

import { Button, Col, Row, message } from "antd";

const EditAdminPage = ({ params }: any) => {
  const { data: vehicleData, isLoading: loading } = useGetSingleVehicleQuery(
    params?.id
  );
  const [updateVehicle] = useUpdateVehicleMutation();

  const onSubmit = async (values: any) => {
    values.cc = parseInt(values.cc);
    values.weight = parseInt(values.weight) || 0;
    try {
      const res = await updateVehicle({
        id: params?.id,
        body: values,
      }).unwrap();
      if (res?.id) {
        message.success("Category Successfully Updated!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const defaultValues = {
    model: vehicleData?.vehicle?.model || "",
    brand: vehicleData?.vehicle?.brand || "",
    cc: vehicleData?.vehicle?.cc || "",
    weight: vehicleData?.vehicle?.weight || "",
    vehicleType: vehicleData?.vehicle?.vehicleType || "",
  };
  return (
    <div>
      <div>
        <UMBreadCrumb
          items={[
            { label: `admin`, link: `/admin` },
            { label: "vehicle", link: `/admin/manage-vehicle` },
          ]}
        />
        <h2>Edit Service</h2>
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput name="model" label="Model name" />
            </Col>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormSelectDropdown
                defaultValue={defaultValues.vehicleType}
                options={[
                  {
                    label: "Bike",
                    value: "BIKE",
                  },
                  {
                    label: "Car",
                    value: "CAR",
                  },
                ]}
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
    </div>
  );
};

export default EditAdminPage;
