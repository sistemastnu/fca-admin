const MediumInputFormz = ({
  tittle,
  value,
  onChange,
  error,
  name,
  id,
  onKeyDown,
  type = "text",
}) => {
  return (
    <div className="w-full sm:w-1/2">
      <label
        className="mb-3 block text-sm font-medium text-black dark:text-white"
        htmlFor="fullName"
      >
        {tittle}
      </label>
      <div className="relative">
        <input
          className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          type={name}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        {error && <p className="text-red font-bold text-sm italic">{error}</p>}
      </div>
    </div>
  );
};

export default MediumInputFormz;
