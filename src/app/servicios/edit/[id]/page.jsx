"use client";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import InputForm from "@/components/FormUI/InputForm";
import TextAreaForm from "@/components/FormUI/TextAreaForm";
import SelectFile from "@/components/common/SelectFile";
import ButtonForm from "@/components/FormUI/ButtonForm";

const fetcher = (url) => fetch(url).then((r) => r.json());

const EditService = ({ params }) => {
  const id = params.id;
  const { data } = useSWR(`/api/servicios/${id}`, fetcher);
  const router = useRouter();
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    content: "",
    imagePage: "",
    relative: "",
  });
  useEffect(() => {
    if (data) {
      const baseURL = "http://localhost:3000";
      const result = data.imagePage?.replace(baseURL, "");
      setFormData({
        content: data.contentPage ?? "",
        imagePage: data.imagePage,
        relative: result,
      });
    }
  }, [data]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataSend = new FormData();
    formDataSend.append("contentPage", formData.content);

    if (file) {
      formDataSend.append("file", file);
    } else {
      formDataSend.append("imagePage", formData.imagePage);
    }
    const response = await fetch(`/api/servicios/${id}`, {
      method: "PUT",
      body: formDataSend,
    });
    if (response.ok) {
      router.push("/servicios");
    } else {
      console.error("Error updating service");
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Edit Service"} redirect="/servicios" />
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Editar Contenido Del Servicio
              </h3>
            </div>
            <div className="p-7">
              <form
                action="#"
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    e.preventDefault();
                  }
                }}
              >
                <TextAreaForm
                  onChange={handleChange}
                  value={formData.content}
                  name={"content"}
                  id={"content"}
                />
                <SelectFile
                  selectedFile={file}
                  onFileSelect={setFile}
                  relativePath={formData.relative}
                />
                <ButtonForm />
              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditService;
