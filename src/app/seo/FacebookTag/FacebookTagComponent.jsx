"use client";
import TextAreaForm from "@/components/FormUI/TextAreaForm";
import SwitcherOne from "@/components/Switchers/SwitcherOne";
import { useState } from "react";

const FacebookTagComponent = ({
  isEnabled,
  setEnabled,
  idToggle,
  setFacebookInformation,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleVisibility = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacebookInformation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEnabled = () => {
    setEnabled(!isEnabled);
    setFacebookInformation((prev) => ({
      ...prev,
      isFacebookEnabled: !isEnabled,
    }));
  };

  return (
    <div>
      <div className="flex flex-row justify-between pb-2">
        <button
          className="font-bold text-xl text-black "
          onClick={toggleVisibility}
        >
          Facebook Tag:
        </button>
        <SwitcherOne
          enabled={isEnabled}
          setEnabled={setEnabled}
          idToggle={idToggle}
          onChange={toggleEnabled}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-3">
          <TextAreaForm
            tittle="Etiqueta HTML Facebook Verification"
            rows={3}
            onChange={handleChange}
            id="htmlVerification"
            name="htmlVerification"
          />
          <TextAreaForm
            tittle="Codigo Facebook Pixel"
            rows={3}
            onChange={handleChange}
            id="pixel"
            name="pixel"
          />
          <TextAreaForm
            tittle="Titulo Del sitio"
            rows={3}
            onChange={handleChange}
            id="siteTitle"
            name="siteTitle"
          />
          <TextAreaForm
            tittle="URL del sitio"
            rows={3}
            onChange={handleChange}
            id="siteUrl"
            name="siteUrl"
          />
          <TextAreaForm
            tittle="Descripcion"
            rows={3}
            onChange={handleChange}
            id="description"
            name="description"
          />
          <TextAreaForm
            tittle="Metakeywords"
            rows={3}
            onChange={handleChange}
            id="metakeywords"
            name="metakeywords"
          />
        </div>
      </div>
    </div>
  );
};

export default FacebookTagComponent;
