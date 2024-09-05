import React from "react";
import FileUpload from "@/components/FileUpload";
import { Policies } from "@/components/Policies";

export default function UploadPolicyPage() {
  return (
    <>
      <FileUpload></FileUpload>
      <Policies></Policies>
    </>
  );
}
