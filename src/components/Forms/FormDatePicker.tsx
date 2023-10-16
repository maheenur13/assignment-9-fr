import { DatePicker } from "antd";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";

type PropsType = DatePickerProps & {
  label: string;
  name: string;
};

const FormDatePicker: FC<PropsType> = (props) => {
  const { name, label, onChange, value, ...rest } = props;
  const { control, setValue } = useFormContext();

  const handleChange: DatePickerProps["onChange"] = (value, date) => {
    onChange ? onChange(value, date) : null;
    setValue(name, date || "");
  };

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
        render={({ field }) => (
          <DatePicker
            style={{ ...rest.style, width: rest.style?.width || "100%" }}
            onChange={handleChange}
            defaultValue={field.value ? dayjs(field.value) : undefined}
            {...rest}
          />
        )}
      />
    </>
  );
};
export default FormDatePicker;
