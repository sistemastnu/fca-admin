import React, { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function TextEditor() {
  const editor = useRef(null);
  const [content, setContent] = useState("Worlds best html page");

  const config = useMemo(
    () => ({
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
      },
    }),
    []
  );
  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <>
      <main>
        <div className="h-screen w-screen flex items-center flex-col">
          <div className="h-full w-[90vw]">
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onChange={handleChange}
              className="w-full h-[70%] mt-10 bg-white"
            />
            <style>{`.jodit-wysiwyg{height:300px !important}`}</style>
          </div>
        </div>
      </main>
    </>
  );
}
