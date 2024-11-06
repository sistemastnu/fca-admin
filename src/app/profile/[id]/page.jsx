"use client";
import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import Image from "next/image";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Person from "@/components/Icons/Person";
import Mail from "@/components/Icons/Mail";
import ContentIcon from "@/components/Icons/ContentIcon";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Loader from "@/components/common";
import { useEffect, useState } from "react";
import StyleFile from "@/components/Icons/StyleFile";
import { toast } from "sonner";
import ButtonForm from "@/components/FormUI/ButtonForm";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Profile = ({ params }) => {
  const id = params.id;
  const { data, isLoading } = useSWR(`/api/profile/${id}`, fetcher);
  const [loadingPhoto, setPhotoLoading] = useState(false);
  const [loadingForm, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    email: "",
    username: "",
    bio: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id,
        fullName: data.fullName ?? "",
        email: data.email ?? "",
        username: data.username ?? "",
        bio: data.bio ?? "",
        image: data.image ?? "",
      });
      setFile(data.profilePhoto);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    const response = await fetch(`/api/profile/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const dataResponse = await response.json();
    if (dataResponse.status === 200) {
      toast.success("Profile updated");
      setFormLoading(false);
    } else {
      toast.error("Something went wrong");
      setFormLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const savePhoto = async (e) => {
    e.preventDefault();
    setPhotoLoading(true);
    const formDataSend = new FormData();
    formDataSend.append("image", file);
    const response = await fetch(`/api/profile/upload-image/${id}`, {
      method: "PUT",
      body: formDataSend,
    });
    const dataResponse = await response.json();
    if (dataResponse.status === 200) {
      setFormData((prev) => ({
        ...prev,
        image: dataResponse.image,
      }));
      toast.success("Photo updated");
      setPhotoLoading(false);
    } else {
      toast.error("Something went wrong");
      setPhotoLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
              </div>
              <div className="p-7">
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <Person />
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="fullName"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="emailAddress"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail />
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="email"
                      name="emailAddress"
                      id="emailAddress"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="Username"
                  >
                    Username
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    name="Username"
                    id="Username"
                    onChange={handleChange}
                    value={formData.username}
                  />
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="Username"
                  >
                    BIO
                  </label>
                  <div className="relative">
                    <ContentIcon />
                    <textarea
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      name="bio"
                      id="bio"
                      rows={6}
                      onChange={handleChange}
                      value={formData.bio}
                    ></textarea>
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <ButtonForm onClick={handleSubmit} loading={loadingForm} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Your Photo
                </h3>
              </div>
              <div className="p-7">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full">
                    {file ? (
                      <Image
                        src={
                          typeof file === "string"
                            ? file
                            : URL.createObjectURL(file)
                        }
                        width={55}
                        height={55}
                        alt="User"
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <Image
                        src="/path/to/default-image.jpg" // Replace with a valid path to a default image if needed
                        width={55}
                        height={55}
                        alt="User"
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                  </div>
                  <div>
                    <span className="mb-1.5 text-black dark:text-white">
                      Edit your photo
                    </span>
                  </div>
                </div>
                <div
                  id="FileUpload"
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    onChange={handleFileChange}
                  />
                  <StyleFile />
                </div>
                <ButtonForm onClick={savePhoto} loading={loadingPhoto} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
