"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";
import FormSelectDropdown from "@/components/Forms/FormSelect";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import { IService } from "@/interfaces/common";
import {
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/service.api";
import {
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/servicecategory.api";
import { useGetAllVehicleQuery } from "@/redux/api/vehicle-api";

import { Button, Col, Row, message } from "antd";

const EditAdminPage = ({ params }: any) => {
  const { data: serviceData, isLoading: loading } = useGetSingleServiceQuery(
    params?.id
  );
  const { data: categories } = useGetAllCategoryQuery({});
  const { data: vehicles } = useGetAllVehicleQuery({});
  const [updateService] = useUpdateServiceMutation();

  const onSubmit = async (values: any) => {
    values.price = parseInt(values.price);
    delete values.categoryId;
    values.vehicleIds = values.vehicleIds.map((id: string) => {
      return {
        vehicleId: id,
      };
    });
    try {
      const res = await updateService({
        id: params?.id,
        body: values,
      }).unwrap();
      if (res?.id) {
        message.success("Service Successfully Updated!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const defaultValues: Partial<IService> = {
    title: serviceData?.service.title,
    description: serviceData?.service.description,
    details: serviceData?.service.details,
    price: serviceData?.service.price,
    categoryId: serviceData?.service.categoryId,
    vehicleIds: serviceData?.service
      ? [...serviceData.service.serviceVehicles].map((item) => {
          return item.vehicleId;
        })
      : [],
  };
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `admin`, link: `/admin` },
          { label: "services", link: `/admin/manage-service` },
        ]}
      />
      <h2 className="mt-4">Update Service</h2>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
              disabled
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
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditAdminPage;
