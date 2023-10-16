"use client";

import React, { FC, ReactNode, ReactElement, useEffect } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";

type FormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type PropsType = {
  children?: ReactNode | ReactElement;
  submitHandler: SubmitHandler<any>;
  autoComplete?: string | undefined;
  autoCapitalize?: string | undefined;
  autoCorrect?: string | undefined;
  autoSave?: string | undefined;
} & FormConfig;

const Form: FC<PropsType> = ({
  children,
  submitHandler,
  defaultValues,
  resolver,
  ...rest
}) => {
  const formConfig: FormConfig = {};

  if (!!defaultValues) formConfig["defaultValues"] = defaultValues;
  if (!!resolver) formConfig["resolver"] = resolver;

  const methods = useForm<PropsType>(formConfig);
  const { handleSubmit, reset } = methods;

  const onSubmit = (data: any) => {
    submitHandler(data);
    reset();
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset, methods]);

  return (
    <FormProvider {...methods}>
      <form {...rest} onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
