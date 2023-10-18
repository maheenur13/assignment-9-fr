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

import { Button, Col, Row, message } from "antd";

const EditAdminPage = ({ params }: any) => {
  const { data: categoryData, isLoading: loading } = useGetSingleCategoryQuery(
    params?.id
  );
  const [updateCategory] = useUpdateCategoryMutation();

  const onSubmit = async (values: any) => {
    try {
      const res = await updateCategory({
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
    categoryName: categoryData?.category?.categoryName || "",
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
            label: "category",
            link: "/admin/manage-category",
          },
        ]}
      />
      <h2 className="my-3">Edit Category {params?.id}</h2>
      <div>
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={8} style={{ margin: "10px 0" }}>
              <FormInput
                type="text"
                name="categoryName"
                label="Category Name"
              />
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

export default EditAdminPage;
