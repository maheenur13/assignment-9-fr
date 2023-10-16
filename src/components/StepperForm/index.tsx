"use client";

import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { Button, message, Steps } from "antd";
import type { StepsProps } from "antd";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { useRouter } from "next/navigation";
type ISteps = {
  title: string;
  content: ReactNode | ReactElement;
};
type FormConfig = {
  defaultValues?: Record<string, any>;
};

type PropsType = {
  steps: ISteps[];
  submitHandler: (values: any) => Promise<void>;
  navigateLink?: string;
  persistKey?: string;
};
type IFormPropsType = {
  children?: ReactNode | ReactElement;
  submitHandler: SubmitHandler<any>;
} & FormConfig;

const StepperForm: React.FC<PropsType> = ({
  steps,
  submitHandler,
  navigateLink,
  persistKey,
}) => {
  const router = useRouter();
  const [current, setCurrent] = useState<number>(
    !!getFromLocalStorage("step")
      ? Number(JSON.parse(getFromLocalStorage("step") as string)?.step)
      : 0
  );

  const [savedValues, setSavedValues] = useState(
    !!getFromLocalStorage(persistKey as string)
      ? JSON.parse(getFromLocalStorage(persistKey as string) as string)
      : ""
  );

  const formConfig: FormConfig = {};

  useEffect(() => {
    setToLocalStorage("step", JSON.stringify({ ["step"]: current }));
  }, [current]);

  // if (!!defaultValues) formConfig["defaultValues"] = defaultValues;

  const methods = useForm({ defaultValues: savedValues });
  const { handleSubmit, reset } = methods;

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items: StepsProps["items"] = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const watch = methods.watch();

  useEffect(() => {
    setToLocalStorage(persistKey as string, JSON.stringify(watch));
  }, [watch, persistKey, methods]);

  const onSubmit = (data: any) => {
    submitHandler(data);
    reset();
    setToLocalStorage("step", JSON.stringify({ ["step"]: 0 }));
    if (navigateLink) {
      router.push(navigateLink);
    }
  };

  return (
    <>
      <Steps current={current} items={items} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>{steps[current].content}</div>
          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                htmlType="submit"
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default StepperForm;
