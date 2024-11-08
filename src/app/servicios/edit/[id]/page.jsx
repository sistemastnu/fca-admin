"use client";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import InputForm from "@/components/FormUI/InputForm";
import ButtonForm from "@/components/FormUI/ButtonForm";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const RichText = dynamic(() => import("@/components/FormUI/RichText"), {
  ssr: false,
});

const fetcher = (url) => fetch(url).then((r) => r.json());

const EditService = ({ params }) => {
  const id = params.id;
  const { data } = useSWR(`/api/serviciosPage/${id}`, fetcher);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [editorData, setEditorData] = useState("");
  const [tittle, setTittle] = useState("");
  const [words, setWordsCount] = useState(0);

  useEffect(() => {
    if (data) {
      setTittle(data.tittle);
      setEditorData(data.content);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formDataSend = new FormData();
    formDataSend.append("tittle", tittle);
    formDataSend.append("content", editorData);
    let method = "POST";
    if (data) {
      method = "PUT";
    }
    const response = await fetch(`/api/serviciosPage/${id}`, {
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
    setTittle(e.target.value);
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
              <InputForm
                tittle={"Título"}
                name={"tittle"}
                id={"tittle"}
                value={tittle}
                onChange={handleChange}
              />
              <div className="no-tailwindcss-base pb-6">
                <RichText
                  editorData={editorData}
                  setEditorData={setEditorData}
                  setWordCount={setWordsCount}
                />
              </div>

              <ButtonForm onClick={handleSubmit} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditService;
