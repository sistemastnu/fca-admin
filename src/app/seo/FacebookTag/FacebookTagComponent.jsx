import TextAreaForm from "@/components/FormUI/TextAreaForm";

const FacebookTagComponent = () => {
  return (
    <div>
      <div className="flex flex-row">
        <h1 className="font-bold text-xl text-black pb-2">Facebook Tag:</h1>
      </div>

      <div className="flex flex-col gap-3">
        <TextAreaForm tittle="Etiqueta HTML Facebook Verification" rows={3} />
        <TextAreaForm tittle="Codigo Facebook Pixel" rows={3} />
        <TextAreaForm tittle="Titulo Del sitio" rows={3} />
        <TextAreaForm tittle="Descripcion" rows={3} />
        <TextAreaForm tittle="Metakeywords" rows={3} />
      </div>
    </div>
  );
};

export default FacebookTagComponent;
