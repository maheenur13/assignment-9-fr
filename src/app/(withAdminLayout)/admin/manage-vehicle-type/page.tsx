"use client";

import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Input, Tag, message } from "antd";
import Link from "next/link";
import React, { FC, useState } from "react";
import { useDebounced } from "@/redux/hooks";
import dayjs from "dayjs";
import UMTable from "@/components/ui/UMTable";
import {
  useDeleteVehicleMutation,
  useDeleteVehicleTypeMutation,
  useGetAllVehicleQuery,
  useGetAllVehicleTypesQuery,
} from "@/redux/api/vehicle-api";

const ManageVehicleType: FC = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteVehicleType] = useDeleteVehicleTypeMutation();

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  const { data, isLoading } = useGetAllVehicleTypesQuery({ ...query });

  const vehicles = data?.vehiclesTypes;
  const meta = data?.meta;

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      //   console.log(data);
      await deleteVehicleType(id);
      message.success("vehicle type Deleted successfully");
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
    },

    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/manage-vehicle-type/edit/${data?.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                // onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => deleteHandler(data?.id)}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };
  return (
    <div>
      <div>
        <UMBreadCrumb
          items={[
            {
              label: "admin",
              link: "/admin",
            },
          ]}
        />

        <ActionBar title="Vehicle Type List">
          <Input
            value={searchTerm}
            type="text"
            size="large"
            placeholder="Search..."
            style={{
              width: "20%",
            }}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <div>
            <Link href="/admin/manage-vehicle-type/create">
              <Button type="primary">Create</Button>
            </Link>
            {(!!sortBy || !!sortOrder || !!searchTerm) && (
              <Button
                onClick={resetFilters}
                type="primary"
                style={{ margin: "0px 5px" }}
              >
                <ReloadOutlined />
              </Button>
            )}
          </div>
        </ActionBar>

        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={vehicles}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
    </div>
  );
};

export default ManageVehicleType;
