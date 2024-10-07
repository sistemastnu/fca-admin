"use client";
import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import Loader from "@/components/common";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Content = () => {
  const { data, mutate } = useSWR("/api/firstpagecontent", fetcher);
  const [formData, setFormData] = useState({
    id: "",
    firstTitle: "",
    firstSubtitle: "",
    secondTitle: "",
    secondSubtitle: "",
  });
  useEffect(() => {
    if (data != null) {
      setFormData({
        id: data.id,
        firstTitle: data.firstTitle,
        firstSubtitle: data.firstSubtitle,
        secondTitle: data.secondTitle,
        secondSubtitle: data.secondSubtitle,
      });
    }
  }, [data]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id == "") {
      delete formData.id;
    }
    const request = await fetch("/api/firstpagecontent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (request.status === 200) {
      toast.success("Success");
    } else {
      toast.error("Error");
    }
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Content"} />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Titulos</h3>
        </div>
        <div className="p-7">
          <form
            action="#"
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                e.preventDefault();
              }
            }}
          >
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full ">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="fullName"
                >
                  Título
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="firstTitle"
                    id="firstTitle"
                    value={formData.firstTitle}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full ">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="fullName"
                >
                  Subtítulo
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="firstSubtitle"
                    id="firstSubtitle"
                    value={formData.firstSubtitle}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className=" border-stroke py-4 dark:border-strokedark">
              <h3 className="font-lg font-bold text-black dark:text-white">
                Nuestros Servicios:
              </h3>
            </div>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full ">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="fullName"
                >
                  Título
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="secondTitle"
                    id="secondTitle"
                    onChange={handleChange}
                    value={formData.secondTitle}
                  />
                </div>
              </div>
            </div>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full ">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="fullName"
                >
                  Subtítulo
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="secondSubtitle"
                    id="secondSubtitle"
                    value={formData.secondSubtitle}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="flex justify-end rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                type="submit"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Content;
