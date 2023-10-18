import { Input } from "antd";
import type { TextAreaProps } from "antd/es/input";
import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextEditor from "../ui/TextEditor";
import { ReactQuillProps } from "react-quill";

interface PropsType extends ReactQuillProps {
  label: string;
  name: string;
}

const FormTextEditor: FC<PropsType> = (props) => {
  const { name, id, placeholder, value, label, ...rest } = props;
  const { control } = useFormContext();

  return (
    <>
      <div
        style={{
          marginBottom: 3,
        }}
      >
        {label || null}
      </div>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextEditor
            {...field}
            {...rest}
            defaultValue={value || field.value}
          />
        )}
      />
    </>
  );
};

export default FormTextEditor;
