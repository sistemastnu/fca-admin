"use client";
import Image from "next/image";

const SelectFile = ({ onFileSelect, selectedFile, relativePath, tittle }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        {tittle}
      </label>
      <div className="flex flex-row  mb-5">
        {relativePath && (
          <div className="h-full rounded-md">
            <p className="text-black font-bold my-2">Old Image: </p>
            <Image
              src={relativePath}
              alt="File preview"
              width="300"
              height="300"
            />
          </div>
        )}
        {selectedFile && (
          <div className="ml-2 h-full rounded-md mb-5">
            <p className="text-black font-bold my-2">New Image: </p>
            <Image
              src={URL.createObjectURL(selectedFile)}
              alt="File preview"
              width="300"
              height="300"
            />
          </div>
        )}
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

        <div className="flex flex-col items-center justify-center space-y-3">
          <p>
            <span className="text-primary">Click to upload</span> or drag and
            drop
          </p>
          <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
          <p>(max, 800 X 800px)</p>
        </div>
      </div>
    </div>
  );
};

export default SelectFile;
