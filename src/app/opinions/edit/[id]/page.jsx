"use client";
import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import InputForm from "@/components/FormUI/InputForm";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import useSWR from "swr";
import { useState, useEffect } from "react";
import Loader from "@/components/common";
import SelectFile from "@/components/common/SelectFile";
import { useRouter } from "next/navigation";
import ButtonForm from "@/components/FormUI/ButtonForm";
import { toast } from "sonner";
const fetcher = (url) => fetch(url).then((r) => r.json());
export default function EditOpinion({ params }) {
  const id = params.id;
  console.log(id);
  const { data } = useSWR(`/api/opinions/${id}`, fetcher);
  const [file, setFile] = useState(null);
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    position: "",
    photo: "",
    relativePath: "",
  });
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        description: data.descriptions,
        position: data.position,
        photo: data.photo,
        relativePath: data.relativePath,
      });
    }
  }, [data]);

  if (!data) return <Loader />;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataSend = new FormData();
    setloading(true);
    formDataSend.append("name", formData.name);
    formDataSend.append("description", formData.description);
    formDataSend.append("position", formData.position);
    if (file) {
      formDataSend.append("photo", file);
    } else {
      formDataSend.append("photo", formData.photo);
      formDataSend.append("relativePath", formData.relativePath);
    }
    const response = await fetch(`/api/opinions/${id}`, {
      method: "PUT",
      body: formDataSend,
    });
    if (response.status === 200) {
      toast.success("Success");
      setloading(false);
      router.push("/opinions");
    } else {
      toast.error("Error");
    }
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Opinions"} a={"Opinions /"} redirect="/opinions" />
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Editar opinión
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
                <div className="p-7">
                  <InputForm
                    tittle={"Nombre"}
                    name={"name"}
                    id={"name"}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <InputForm
                    tittle={"Description"}
                    name={"description"}
                    id={"description"}
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <InputForm
                    tittle={"Position"}
                    name={"position"}
                    id={"position"}
                    value={formData.position}
                    onChange={handleChange}
                  />
                  <SelectFile
                    onFileSelect={setFile}
                    selectedFile={file}
                    relativePath={formData.relativePath}
                  />
                  <ButtonForm loading={loading} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
