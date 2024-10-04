"use client";
import { useState } from "react";
import { toast } from "sonner";
import SelectFileModal from "../common/SelectFileModal";

const SponsorsModal = ({ data, refreshData, closeModal }) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    id: data?.id || "",
    sponsorName: data?.sponsorName || "",
    photoSponsor: data?.photoSponsor || "",
  });
  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataSend = new FormData();
    formDataSend.append("sponsorName", formData.sponsorName);
    if (formData.photoSponsor != "") {
      formDataSend.append("photoSponsor", formData.photoSponsor);
    } else {
      formDataSend.append("file", file);
    }

    const method = data ? "PUT" : "POST";
    const endpoint = data ? `/api/sponsors/${data.id}` : "/api/sponsors";
    const response = await fetch(endpoint, {
      method,
      body: formDataSend,
    });
    if (response.status === 200) {
      toast.success("Success");
      refreshData();
      closeModal();
    } else {
      toast.error("Something went wrong");
      closeModal();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
        <div className="border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark p-6 rounded-lg  max-w-md w-full">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Agrega Un Nuevo Sponsor
            </h3>

            <button
              type="button"
              onClick={closeModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="sponsorName"
                  id="sponsorName"
                  value={formData.sponsorName}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Introduzca el nombre"
                  required=""
                />
              </div>

              {file && (
                <div className="mt-2 mb-2 text-sm text-gray-600 dark:text-gray-400">
                  Selected file: {file.name}
                </div>
              )}

              <SelectFileModal onFileSelect={setFile} selectedFile={file} />
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  cliprule-rule="evenodd"
                ></path>
              </svg>
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SponsorsModal;
