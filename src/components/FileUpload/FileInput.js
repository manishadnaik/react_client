import React from "react";
import { useState } from "react";
import ImageUploader from "react-images-upload";

const FileInput = (props) => {
  return (
    <>
      <ImageUploader
        {...props}
        withIcon={true}
        onChange={props.onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
        name="image"
      />
    </>
  );
};

export default FileInput;
