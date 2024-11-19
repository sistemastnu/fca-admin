"use client";
import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import FormLayout from "@/components/layouts/FormLayout";
import { useEffect, useState } from "react";
import { checkErrors } from "../../errors/errorsUtils";
import { toast } from "sonner";
import InputForm from "@/components/FormUI/InputForm";
import SelectFile from "@/components/common/SelectFile";
import ButtonForm from "@/components/FormUI/ButtonForm";
import useSWR from "swr";
import { fetcher } from "@/lib/fetchUtils";
import Loader from "@/components/common";

export default function EditSocial({ params }) {
  const { id } = params;
  const { data, isLoading } = useSWR(`/api/socials/${id}`, fetcher);
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    link: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkErrors(formData, file)) {
      const formDataSend = new FormData();
      formDataSend.append("name", formData.name);
      formDataSend.append("link", formData.link);
      formDataSend.append("icon", file);
      const response = await fetch(`/api/socials/${id}`, {
        method: "POST",
        body: formDataSend,
      });
      if (response.status === 200) {
        toast.success("Success");
      } else {
        toast.error("Error");
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name ?? "",
        link: data.link ?? "",
      });
      setFile(data.icon);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Edicion Red Social"} />
      <FormLayout>
        <InputForm
          tittle={"Nombre de la Red Social"}
          value={formData.name}
          onChange={handleChange}
          name={"name"}
          id={"name"}
        />
        <InputForm
          tittle={"Enlace"}
          value={formData.link}
          name={"link"}
          id={"link"}
          onChange={handleChange}
        />
        <SelectFile
          onFileSelect={setFile}
          selectedFile={file}
          tittle={"Icono"}
        />
        <ButtonForm onClick={handleSubmit} loading={loading} />
      </FormLayout>
    </DefaultLayout>
  );
}
