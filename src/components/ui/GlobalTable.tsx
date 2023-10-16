import { PaginationProps, Space, Table, Tag } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import React, { CSSProperties, FC, ReactElement, ReactNode } from "react";

type PropsType<T> = {
  columns: ColumnsType<T | any>;
  dataSource: T[];
  onPaginationChange?: (page: number, pageSize: number) => void;
  onTableChange?: TableProps<Record<string, any>>["onChange"];
  loading?: boolean;
  pageSize?: number;
  total?: number;
  paginationClassName?: string;
  paginationStyle?: CSSProperties;
  paginationDisabled?: boolean;
  showPagination?: boolean;
  bordered?: boolean;
  className?: string;
  footer?: TableProps<Record<string, any>>["footer"];
  title?: TableProps<Record<string, any>>["title"];
  showSizeChanger?: boolean;
};

const GlobalTable: FC<PropsType<Record<string, any>>> = ({
  columns,
  dataSource,
  onPaginationChange,
  onTableChange,
  loading = false,
  pageSize,
  total,
  paginationClassName,
  paginationStyle,
  paginationDisabled,
  showPagination = true,
  bordered = false,
  footer,
  className,
  title,
  showSizeChanger = true,
}) => {
  const paginationConfig: PaginationProps = {
    pageSize,
    total,
    pageSizeOptions: [5, 10, 20],
    showSizeChanger: showSizeChanger,
    onChange: onPaginationChange,
    className: paginationClassName,
    style: paginationStyle,
    disabled: paginationDisabled,
  };

  return (
    <Table
      loading={loading}
      onChange={onTableChange}
      columns={columns}
      dataSource={dataSource}
      pagination={showPagination ? paginationConfig : false}
      bordered={bordered}
      footer={footer}
      className={className}
      title={title}
    />
  );
};

export default GlobalTable;
