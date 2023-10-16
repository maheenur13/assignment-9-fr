import { FC, ReactElement, ReactNode } from "react";

type PropsType = {
  title: string;
  children?: ReactNode | ReactElement;
};

const ActionBar: FC<PropsType> = ({ title, children }) => {
  return (
    <div>
      <h1 style={{ marginBottom: "10px" }}>{title}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ActionBar;
