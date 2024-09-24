"use client";

const SelectFile = ({ onFileSelect, selectedFile }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };
  return (
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
          <span className="text-primary">Click to upload</span> or drag and drop
        </p>
        <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
        <p>(max, 800 X 800px)</p>
      </div>
    </div>
  );
};

export default SelectFile;
