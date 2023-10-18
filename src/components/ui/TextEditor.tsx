"use client";

import dynamic from "next/dynamic";
import React, { FC, useEffect, useState } from "react";
import { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor: FC<ReactQuillProps> = (props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // registerQuill()
  }, []);

  if (!isMounted) return null;
  return (
    <div className="my-4">
      <ReactQuill
        id="quil"
        {...props}
        className="bg-white quil-parent"
        theme="snow"
      />
    </div>
  );
};

export default TextEditor;
