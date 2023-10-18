import React, { FC, useState } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor: FC<ReactQuillProps> = (props) => {
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
