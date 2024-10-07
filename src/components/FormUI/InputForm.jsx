const InputForm = ({ tittle, value, onChange, name, id, type }) => {
  return (
    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
      <div className="w-full ">
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor="fullName"
        >
          {tittle}
        </label>
        <div className="relative">
          <input
            className="w-full rounded border border-stroke bg-gray py-3 pl-2.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type="text"
            name={name}
            id={id}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};
export default InputForm;
