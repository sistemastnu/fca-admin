"use client";
import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Image from "next/image";
import { useState } from "react";
import email from "../../../../public/icons/email.svg";
import passwordIcon from "../../../../public/icons/password.svg";
import person from "../../../../public/icons/person.svg";

const AddUser = () => {
  //const [selectedOption, setSelectedOption] = useState("");
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    rol: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.username) newErrors.username = "Please fill out this field.";
    if (!formData.password) newErrors.password = "Please fill out this field.";
    if (!formData.email) {
      newErrors.email = "Please fill out this field.";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.rol) newErrors.rol = "Please fill out this field.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName={"Add User"} />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Add User
                </h3>
              </div>
              <div className="p-7">
                <form
                  action="#"
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      e.preventDefault();
                    }
                  }}
                  onSubmit={handleSubmit}
                >
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Username
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <Image
                            src={person}
                            width={20}
                            height={20}
                            alt="iconPerson"
                          />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          value={formData.username}
                          name="username"
                          id="username"
                          onChange={handleChange}
                        />

                        {errors.username && (
                          <p className="text-red-500 text-xs italic">
                            {errors.username}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Tags"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <Image
                            src={email}
                            alt="emailIcon"
                            width={20}
                            height={20}
                          />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          value={formData.email}
                          id="email"
                          name="email"
                          onChange={handleChange}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs italic">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <Image
                            src={passwordIcon}
                            width={20}
                            height={20}
                            alt="iconPassword"
                          />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="password"
                          name="password"
                          value={formData.password}
                          id="password"
                          onChange={handleChange}
                        />
                        {errors.password && (
                          <p className="text-red-500 text-xs italic">
                            {errors.password}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Rol
                      </label>

                      <div className="relative z-20 bg-transparent dark:bg-form-input">
                        <select
                          value={formData.rol}
                          onChange={(e) => {
                            handleChange(e);
                            changeTextColor();
                          }}
                          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                            isOptionSelected ? "text-black dark:text-white" : ""
                          }`}
                          id="rol"
                        >
                          <option
                            value=""
                            disabled
                            className="text-body dark:text-bodydark"
                          >
                            Selecciona el rol
                          </option>
                          <option
                            value="admin"
                            className="text-body dark:text-bodydark"
                          >
                            Admin
                          </option>
                          <option
                            value="editor"
                            className="text-body dark:text-bodydark"
                          >
                            Editor
                          </option>
                        </select>

                        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                          <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill=""
                              ></path>
                            </g>
                          </svg>
                        </span>
                      </div>
                      {errors.rol && (
                        <p className="text-red-500 text-xs italic">
                          {errors.rol}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default AddUser;
