import { Select, Space } from "antd";
import type { SelectProps } from "antd";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface PropsType extends SelectProps {
  name: string;
  label: string;
}

const FormSelectDropdown: FC<PropsType> = ({
  name,
  label,
  options,
  defaultValue,
  size,
  placeholder,
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <>
      <div
        style={{
          marginBottom: 4,
        }}
      >
        {label || null}
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Select
            size={size}
            placeholder={placeholder}
            value={value}
            options={options}
            onChange={onChange}
            defaultValue={defaultValue}
            {...rest}
            style={{ ...rest.style, width: rest.style?.width || "100%" }}
          />
        )}
      />
    </>
  );
};

export default FormSelectDropdown;
