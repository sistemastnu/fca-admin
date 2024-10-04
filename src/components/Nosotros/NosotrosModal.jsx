"use client";

import { useState } from "react";
import { toast } from "sonner";
import SelectFileModal from "../common/SelectFileModal";

const NosotrosModal = ({ data, refreshData, closeModal }) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    id: data?.id || "",
    name: data?.name || "",
    position: data?.position || "",
    description: data?.descriptions || "",
    photoUrl: data?.photoUrl || "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataSend = new FormData();
    formDataSend.append("name", formData.name);
    formDataSend.append("position", formData.position);
    formDataSend.append("descriptions", formData.description);
    if (formData.photoUrl != "") {
      formDataSend.append("photoUrl", formData.photoUrl);
    } else {
      formDataSend.append("photoUrl", file);
    }

    const method = data ? "PUT" : "POST";
    const endpoint = data
      ? `/api/teamNosotros/${data.id}`
      : "/api/teamNosotros";

    const response = await fetch(endpoint, {
      method,
      body: formDataSend,
    });

    if (response.status === 200) {
      toast.success("Member updated");
      refreshData();
      closeModal();
    } else {
      toast.error("Something went wrong");
      closeModal();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white dark:border-strokedark dark:bg-boxdark rounded-lg p-6 w-full max-w-md z-50">
          {/* Modal Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Agrega un nuevo miembro
            </h3>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg  dark:text-white dark:border-strokedark dark:bg-meta-4 "
                placeholder="Introduzca el nombre"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Posición
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={handleChange}
                name="position"
                id="position"
                className="w-full p-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg dark:text-white dark:border-strokedark dark:bg-meta-4"
                placeholder="Introduzca la posición"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg dark:text-white dark:border-strokedark dark:bg-meta-4"
                placeholder="Introduce una breve descripción"
              ></textarea>
            </div>

            {file && (
              <div className="mt-2 mb-2 text-sm text-gray-600 dark:text-gray-400">
                Selected file: {file.name}
              </div>
            )}

            <SelectFileModal onFileSelect={setFile} selectedFile={file} />

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center bg-blue-700 text-white py-2.5 px-5 rounded-lg hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {data ? "Update Member" : "Add Member"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NosotrosModal;
