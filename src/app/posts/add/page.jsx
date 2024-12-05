"use client";

import Breadcrumb from "@/components/Breadcrumps/Breadcrumb";
import SelectFile from "@/components/common/SelectFile";
import Spinner from "@/components/common/Spinner";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import MediumInputFormz from "@/components/FormUI/MediumInputForm";
import TextAreaForm from "@/components/FormUI/TextAreaForm";
import { useSession } from "next-auth/react";
import { cleanStringForURL } from "@/app/helpers/StringHelper";
import { calculateReadingTime } from "@/app/helpers/WordsHelper";

const RichText = dynamic(() => import("@/components/FormUI/RichText"), {
  ssr: false,
});
export default function Add() {
  const { data: session } = useSession();
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [editorData, setEditorData] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleEnterTags = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputTag.trim() !== "") {
        setTags([...tags, inputTag.trim()]);
        setInputTag("");
      }
    }
  };

  const removeFromTags = (e) => {
    const value = e.target.dataset.valor;
    const newArray = tags.filter((item) => item !== value);
    setTags(newArray);
  };

  const handleErrors = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Add a title";
    if (file === null) newErrors.file = "Select a file";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postTitle = formData.title;
    const description = formData.description;
    let prettyUrl = cleanStringForURL(postTitle);
    const timeReadMinutes = calculateReadingTime(wordCount);
    handleErrors();
    if (Object.keys(errors).length == 0) {
      setLoading(true);
      const formDataSend = new FormData();
      formDataSend.append("tittle", postTitle);
      formDataSend.append("content", editorData);
      formDataSend.append("description", description);
      formDataSend.append("prettyUrl", prettyUrl);
      formDataSend.append("file", file);
      formDataSend.append("idEditor", session.user.id);
      formDataSend.append("timeRead", timeReadMinutes);
      tags.forEach((tag) => formDataSend.append("tags[]", tag));
      const response = await fetch("/api/posts/", {
        method: "POST",
        body: formDataSend,
      });
      const responseApi = await response.json();
      if (response.status === 200) {
        toast.success("Post was successfully created");
        router.push("/posts");
        setLoading(false);
      } else {
        console.log(responseApi);
        toast.error(responseApi.message);
        setLoading(false);
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

  const handleCancel = (e) => {
    router.push("/posts");
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Post"} a={"Posts /"} redirect="/posts" />
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Posts</h3>
            </div>
            <div className="p-7">
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <MediumInputFormz
                  tittle={"Titulo"}
                  value={formData.title}
                  name={"title"}
                  id={"title"}
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
                tittle="Descripcion"
                name={"description"}
                id={"description"}
                value={formData.description}
                onChange={handleChange}
              />

              <SelectFile onFileSelect={setFile} selectedFile={file} />

              <RichText
                editorData={editorData}
                setEditorData={setEditorData}
                setWordCount={setWordCount}
              />

              <div className="flex justify-end gap-4.5 pt-6">
                <button
                  className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <Spinner /> : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
