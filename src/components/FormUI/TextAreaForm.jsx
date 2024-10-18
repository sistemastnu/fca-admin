const TextAreaForm = ({ value, onChange, name, id, tittle = "Contenido" }) => {
  return (
    <div>
      <label
        className="mb-3 block text-sm font-medium text-black dark:text-white"
        htmlFor={id}
      >
        {tittle}
      </label>
      <textarea
        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        rows={6}
        placeholder="Write content here"
      ></textarea>
    </div>
  );
};

export default TextAreaForm;
