"use client";
import Services from "@/components/ui/Services";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useGetSingleCategoryQuery } from "@/redux/api/servicecategory.api";
import { Spin } from "antd";
import React from "react";

const Category = ({ params }: any) => {
  const { data, isLoading } = useGetSingleCategoryQuery(params?.id);

  return (
    <Spin spinning={isLoading}>
      <div className="min-h-screen my-3">
        <div className="mb-2">
          <UMBreadCrumb items={[{ label: `home`, link: `/` }]} />
        </div>
        <div className="h-96 bg-slate-400 rounded-md flex justify-center items-center">
          <h2 className="text-slate-950">{data?.category?.categoryName}</h2>
        </div>
        <Services title="Services " query={{ categoryId: params?.id }} />
      </div>
    </Spin>
  );
};

export default Category;
