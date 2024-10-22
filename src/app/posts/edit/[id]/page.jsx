"use client";

import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import Loader from "@/components/common";
import SelectFile from "@/components/common/SelectFile";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { toast } from "sonner";
import TextAreaForm from "@/components/FormUI/TextAreaForm";
import MediumInputFormz from "@/components/FormUI/MediumInputForm";
import dynamic from "next/dynamic";

const RichText = dynamic(() => import("@/components/FormUI/RichText"), {
  ssr: false,
});
const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Edit({ params }) {
  const id = params.id;
  const { data } = useSWR(`/api/posts/${id}`, fetcher);
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [editorData, setEditorData] = useState();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    relativePath: "",
    description: "",
  });
  useEffect(() => {
    if (data) {
      setFormData({
        title: data.post.tittle,
        content: data.post.content,
        image: data.post.image,
        relativePath: data.post.image?.replace("http://localhost:3000", ""),
        description: data.post.description,
      });
      setTags(data.tags.map((item) => item.tag));
      setEditorData(data.post.content);
    }
  }, [data]);

  if (!data) return <Loader />;

  const handleEnterTags = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputTag.trim() !== "") {
        setTags([...tags, inputTag.trim()]);
        setInputTag("");
      }
    }
  };

  const removeFromTags = async (e) => {
    const value = e.target.dataset.valor;
    const newArray = tags.filter((item) => item !== value);
    setTags(newArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    console.log(editorData);
    if (!formData.content) newErrors.content = "Add Content";
    if (!formData.title) newErrors.title = "Add Title";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const formDataSend = new FormData();
      formDataSend.append("tittle", formData.title);
      formDataSend.append("content", editorData);
      formDataSend.append("description", formData.description);
      if (file) {
        formDataSend.append("file", file);
      } else {
        formDataSend.append("image", formData.image);
        formDataSend.append("relativePath", formData.relativePath);
      }
      tags.forEach((tag) => formDataSend.append("tags[]", tag));

      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: formDataSend,
      });
      if (response.status === 200) {
        toast.success("Post updated");
        router.push("/posts");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnCancel = (e) => {
    e.preventDefault();
    router.push("/posts");
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Post"} a={"Posts /"} redirect="/posts" />
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                About us
              </h3>
            </div>
            <div className="p-7">
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <MediumInputFormz
                  tittle={"Tittle"}
                  name={"title"}
                  id={"title"}
                  value={formData.title}
                  onChange={handleChange}
                  error={errors.title}
                />
                <MediumInputFormz
                  tittle={"Tags"}
                  value={inputTag}
                  onChange={(e) => setInputTag(e.target.value)}
                  onKeyDown={handleEnterTags}
                />
              </div>
              <div className="my-4">
                {tags.length > 0 && (
                  <div
                    onClick={(e) => removeFromTags(e)}
                    className="flex flex-wrap gap-2 py-2"
                  >
                    Tags:
                    {tags.map((tag, index) => (
                      <div id="tag" key={index}>
                        <span
                          className="rounded-full bg-primary px-4 py-2 text-white"
                          data-valor={tag}
                        >
                          #{tag}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <TextAreaForm
                tittle="Descripcion: "
                name={"description"}
                id={"description"}
                value={formData.description}
                onChange={handleChange}
              />

              <SelectFile
                onFileSelect={setFile}
                selectedFile={file}
                relativePath={formData.relativePath}
              />

              <RichText editorData={editorData} setEditorData={setEditorData} />

              <div className="flex justify-end gap-4.5 pt-6">
                <button
                  className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  onClick={handleOnCancel}
                >
                  Cancel
                </button>
                <button
                  className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
