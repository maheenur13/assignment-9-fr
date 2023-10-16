"use client";

import { getErrorMessages } from "@/utils/schema-validator";
import { Input } from "antd";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface PropsType {
  type:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validate?: object;
  label?: string;
}
const FormInput: FC<PropsType> = (props) => {
  const { name, type, value, label, ...rest } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessages = getErrorMessages(errors, name);

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
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              type={type}
              {...field}
              value={value || field.value}
            />
          ) : (
            <Input
              type={type}
              {...field}
              value={value || field.value}
              {...rest}
            />
          )
        }
      />
      <small style={{ color: "red" }}>{errorMessages}</small>
    </>
  );
};

export default FormInput;
