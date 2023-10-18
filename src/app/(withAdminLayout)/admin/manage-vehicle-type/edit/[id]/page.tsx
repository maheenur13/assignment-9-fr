"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
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
  useGetSingleVehicleTypeQuery,
  useUpdateVehicleTypeMutation,
} from "@/redux/api/vehicle-api";

import { Button, Col, Row, message } from "antd";

const EditTypePage = ({ params }: any) => {
  const { data: vehicleTypeData, isLoading: loading } =
    useGetSingleVehicleTypeQuery(params?.id);
  const [updateVehicleType] = useUpdateVehicleTypeMutation();

  const onSubmit = async (values: any) => {
    try {
      const res = await updateVehicleType({
        id: params?.id,
        body: values,
      }).unwrap();
      if (res?.id) {
        message.success("Vehicle type Successfully Updated!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const defaultValues = {
    type: vehicleTypeData?.vehicleType?.type || "",
  };
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
          {
            label: "vehicle types",
            link: "/admin/manage-vehicle-type",
          },
        ]}
      />
      <h2 className="my-3">Edit Vehicle Type </h2>
      <div>
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput type="text" name="type" label="Vehicle Type" />
            </Col>
          </Row>
          <Button htmlType="submit" type="primary">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditTypePage;
