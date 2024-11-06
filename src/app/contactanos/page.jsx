"use client";

import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import Input from "../ui/Input";
import Loader from "@/components/common";
export const dynamic = "force-dynamic";
const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Contactanos() {
  const { data } = useSWR("/api/contactanos", fetcher);
  const [formData, setFormData] = useState({
    id: "",
    inf: "",
    ubi: "",
    tel: "",
    mail: "",
  });
  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id || "",
        inf: data.informacionEmp || "",
        ubi: data.ubicacion || "",
        tel: data.telefono || "",
        mail: data.mail || "",
      });
    }
  }, [data]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    const response = await fetch("/api/contactanos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.status === 200) {
      toast.success("Event has been created");
    } else {
      toast.error("Something went wrong");
    }
  };

  if (!data) return <Loader />;
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName={"Contactanos"} />
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Contactanos Form
                </h3>
              </div>
              <div className="p-7">
                <Input
                  inputName={"Informacion Empresa"}
                  value={formData.inf}
                  onchange={handleChange}
                  name={"inf"}
                />

                <Input
                  inputName={"Ubicacion"}
                  value={formData.ubi}
                  onchange={handleChange}
                  name={"ubi"}
                />
                <Input
                  inputName={"Telefono"}
                  value={formData.tel}
                  onchange={handleChange}
                  name={"tel"}
                />
                <Input
                  inputName={"Mail"}
                  value={formData.mail}
                  onchange={handleChange}
                  name={"mail"}
                />
                <div className="flex  gap-4.5">
                  <button
                    className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                    onClick={() => handleSubmit()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
