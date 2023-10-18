"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";
import FormSelectDropdown from "@/components/Forms/FormSelect";
import { SelectOptions } from "@/components/Forms/FormSelectField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAddServiceMutation } from "@/redux/api/service.api";
import { useGetAllCategoryQuery } from "@/redux/api/servicecategory.api";
import { useGetAllVehicleQuery } from "@/redux/api/vehicle-api";
import { Button, Col, Row, message } from "antd";

const CreateDepartmentPage = () => {
  const [addService] = useAddServiceMutation();
  const { data: categories } = useGetAllCategoryQuery({});
  const { data: vehicles } = useGetAllVehicleQuery({});
  const onSubmit = async (data: any) => {
    message.loading("Creating.....");
    data.price = parseInt(data.price);
    data["vehicleIds"] = data?.vehicleIds?.map((id: string) => {
      return {
        vehicleId: id,
      };
    });

    try {
      await addService(data);
      message.success("Service added successfully");
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
          { label: "services", link: `/${base}/manage-service` },
        ]}
      />
      <h2 className="mt-4">Create Service</h2>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="title" label="Service Title" />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="details" label="Details" />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="description" label="Description" />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="price" label="Price" />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormSelectDropdown
              label="Category"
              name="categoryId"
              options={categories?.categories.map((category) => {
                return {
                  label: category.categoryName,
                  value: category.id,
                };
              })}
            />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormMultiSelectField
              label="For Vehicles"
              name="vehicleIds"
              options={
                vehicles?.vehicles.map((vehicle) => {
                  return {
                    label: vehicle.model,
                    value: vehicle.id,
                  };
                }) as SelectOptions[]
              }
            />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          add
        </Button>
      </Form>
    </div>
  );
};

export default CreateDepartmentPage;
