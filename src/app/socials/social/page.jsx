"use client";
import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import SelectFile from "@/components/common/SelectFile";
import ButtonForm from "@/components/FormUI/ButtonForm";
import InputForm from "@/components/FormUI/InputForm";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import FormLayout from "@/components/layouts/FormLayout";
import { useState } from "react";
import { toast } from "sonner";
import { checkErrors } from "../errors/errorsUtils";

export default function Social() {
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    icon: "",
  });
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataSend = new FormData();
    if (!checkErrors(formData, file)) {
      formDataSend.append("title", formData.name);
      formDataSend.append("link", formData.link);
      formDataSend.append("icon", file);
      const response = await fetch("/api/socials/", {
        method: "POST",
        body: formDataSend,
      });
      if (response.status === 200) {
        toast.success("Creado Correctamente");
      } else {
        toast.error("Error al crear");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Add a social media"} />
      <FormLayout>
        <InputForm
          tittle={"Name"}
          value={formData.title}
          onChange={handleChange}
          name={"title"}
          id={"title"}
        />
        <InputForm
          tittle={"Link"}
          value={formData.link}
          onChange={handleChange}
          name={"link"}
          id={"link"}
        />
        <SelectFile
          tittle={"Icono: "}
          onFileSelect={setFile}
          selectedFile={file}
        />
        <ButtonForm onClick={handleSubmit} />
      </FormLayout>
    </DefaultLayout>
  );
}
