"use client";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import InputForm from "@/components/FormUI/InputForm";
import SelectFile from "@/components/common/SelectFile";
import SelectPhoto from "@/components/FormUI/SelectPhoto";
import ButtonForm from "@/components/FormUI/ButtonForm";

const AddOpinon = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    position: "",
    photo: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      try {
        setLoading(true);
        const formDataWithFile = new FormData();
        formDataWithFile.append("name", formData.name);
        formDataWithFile.append("description", formData.description);
        formDataWithFile.append("position", formData.position);
        formDataWithFile.append("photo", file);
        await fetch("/api/opinions/", {
          method: "POST",
          body: formDataWithFile,
        });
        toast.success("Opinion added successfully");
        router.push("/opinions");
        setLoading(false);
      } catch (error) {
        toast.error("Error adding opinion");
      }
    }
  };
  return (
    <DefaultLayout>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Opinions
              </h3>
            </div>
            <form
              action="#"
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  e.preventDefault();
                }
              }}
              onSubmit={handleSubmit}
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
                <SelectFile onFileSelect={setFile} selectedFile={file} />
                <ButtonForm loading={loading} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
export default AddOpinon;
