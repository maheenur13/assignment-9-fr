"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";
import FormSelectDropdown from "@/components/Forms/FormSelect";
import { SelectOptions } from "@/components/Forms/FormSelectField";
import FormTextEditor from "@/components/Forms/FormTextEditor";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { useAddServiceMutation } from "@/redux/api/service.api";
import { useGetAllCategoryQuery } from "@/redux/api/servicecategory.api";
import { useGetAllVehicleQuery } from "@/redux/api/vehicle-api";
import { Button, Col, Row, message } from "antd";

const CreateDepartmentPage = () => {
  const [addService] = useAddServiceMutation();
  const { data: categories } = useGetAllCategoryQuery({});
  const { data: vehicles } = useGetAllVehicleQuery({});
  const onSubmit = async (values: any) => {
    values.price = parseInt(values.price);
    values["vehicleIds"] = values?.vehicleIds?.map((id: string) => {
      return {
        vehicleId: id,
      };
    });
    const obj = { ...values };

    const file = obj["file"];
    delete obj["file"];

    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);

    message.loading("Creating.....");

    try {
      await addService(formData);
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
          <Col span={3} style={{ margin: "10px 0" }}>
            <UploadImage name="file" />
          </Col>
          <Col span={21}>
            <FormTextEditor name="specification" label={"Specifications"} />
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
