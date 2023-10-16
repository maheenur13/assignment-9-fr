import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import React, { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form';

interface PropsType extends TextAreaProps {
    label:string;
    name:string;
} 

const FormTextArea: FC<PropsType> = (props) => {
    const { name, id, placeholder, size, value,label,...rest } = props;
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
          render={({ field }) =>
              <Input.TextArea
                {...field}
                {...rest}
                value={value || field.value}
              />
          
          }
        />
      </>
    );
  };
  
export default FormTextArea
