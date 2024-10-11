"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import SelectFileModal from "./SelectFileModal";
import { useRouter } from "next/navigation";

const SortableItem = ({
  id,
  cardTittle,
  cardContent,
  idService,
  refreshData,
  photo,
  relativePath,
  apiUrl,
  color,
  hoverButton,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const router = useRouter();
  const lastSegment = apiUrl.split("/").pop();

  const [formData, setFormData] = useState({
    idService: idService,
    tittle: cardTittle,
    content: cardContent,
    photo: photo,
    color: color,
    hoverButton: hoverButton,
    relativePath: photo?.replace("http://localhost:3000", ""),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (e, id, url) => {
    e.preventDefault();
    const lastSegment = url.split("/").pop();
    if (lastSegment == "servicios") {
      router.push(`/servicios/edit/${id}`);
    } else if (lastSegment == "otherServices") {
      router.push(`/servicios/editSpecial/${id}`);
    }
  };

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
    if (!formData.content) newErrors.content = "Add Content";
    if (!formData.tittle) newErrors.tittle = "Add a tittle";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const formDataSend = new FormData();
      formDataSend.append("idService", formData.idService);
      formDataSend.append("tittle", formData.tittle);
      formDataSend.append("content", formData.content);
      formDataSend.append("color", formData.color);
      formDataSend.append("hoverColor", formData.hoverButton);
      if (file) {
        formDataSend.append("file", file);
      } else {
        formDataSend.append("photo", formData.photo);
        formDataSend.append("relativePath", formData.relativePath);
      }
      await fetch(apiUrl, {
        method: "POST",
        body: formDataSend,
      });
      refreshData();
    }
    router.push("/servicios");
    setIsModalOpen(false);
  };
  return (
    <>
      <div ref={setNodeRef} style={style}>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div
            className="flex justify-center border-b border-stroke p-5 px-7.5 dark:border-strokedark"
            {...listeners}
            {...attributes}
          >
            <h4 className="text-xl font-semibold text-black dark:text-white">
              {cardTittle}
            </h4>
          </div>
          <div className="px-7.5 pb-9 pt-6" onClick={handleClick}>
            <p className="font-medium">{cardContent}</p>
          </div>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="bg-opacity-50 backdrop-blur-sm fixed inset-0   flex justify-center items-center  py-3">
          <div className="border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark p-6 rounded-lg  max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Service
              </h3>

              <button
                type="button"
                onClick={handleCloseModal}
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
            <form action="#" className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tittle
                  </label>
                  <input
                    type="text"
                    name="tittle"
                    id="tittle"
                    value={formData.tittle}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Introduzca el nombre"
                    required=""
                  />
                </div>
              </div>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Content
                  </label>
                  <input
                    type="text"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    id="content"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Introduzca el titulo"
                    required=""
                  />
                </div>
              </div>

              {lastSegment == "servicios" && (
                <div className="flex flex-row gap-3">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Button Color
                    </label>
                    <input
                      type="color"
                      name="color"
                      id="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                      placeholder="Introduzca el titulo"
                      required=""
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Hover Color
                    </label>
                    <input
                      type="color"
                      name="hoverButton"
                      id="hoverButton"
                      value={formData.hoverButton}
                      onChange={handleChange}
                      className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                      placeholder="Introduzca el titulo"
                      required=""
                    />
                  </div>
                </div>
              )}

              <SelectFileModal
                onFileSelect={setFile}
                selectedFile={file}
                relativePath={formData.relativePath}
              />
            </form>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              className="text-white ml-2 inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => handleEdit(e, idService, apiUrl)}
            >
              Edit Page Content
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SortableItem;
