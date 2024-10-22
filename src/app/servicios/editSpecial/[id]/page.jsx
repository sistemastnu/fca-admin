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
import { toast } from "sonner";
import Loader from "@/components/common";
import dynamic from "next/dynamic";

const fetcher = (url) => fetch(url).then((r) => r.json());

const RichText = dynamic(() => import("@/components/FormUI/RichText"), {
  ssr: false,
});

const EditService = ({ params }) => {
  const id = params.id;
  const { data } = useSWR(`/api/serviciosEspe/${id}`, fetcher);
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editorData, setEditorData] = useState("");
  const [formData, setFormData] = useState({
    tittle: "",
    content: "",
    imagePage: "",
    relative: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        tittle: data.tittle,
        content: data.content ?? "",
        imagePage: data.mediaContent,
        relative: data.mediaContent?.replace("http://localhost:3000", ""),
      });
      setEditorData(data.content);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formDataSend = new FormData();
    let method = "POST";
    if (data) {
      method = "PUT";
    }
    formDataSend.append("tittle", formData.tittle);
    formDataSend.append("content", formData.content);
    if (file) {
      formDataSend.append("file", file);
    } else {
      formDataSend.append("imagePage", formData.imagePage);
    }
    const response = await fetch(`/api/serviciosEspe/${id}`, {
      method: method,
      body: formDataSend,
    });
    if (response.status === 200) {
      toast.success("Servicio actualizado");
      router.push("/servicios");
      setIsLoading(false);
    } else {
      toast.error("Algo salio mal");
      setIsLoading(false);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  if (!data) return <Loader />;
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
                <InputForm
                  tittle={"Título"}
                  name={"tittle"}
                  id={"tittle"}
                  value={formData.tittle}
                  onChange={handleChange}
                />
                <div className="no-tailwindcss-base pb-6">
                  <RichText
                    editorData={editorData}
                    setEditorData={setEditorData}
                  />
                </div>
                <ButtonForm isLoading={isLoading} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditService;
