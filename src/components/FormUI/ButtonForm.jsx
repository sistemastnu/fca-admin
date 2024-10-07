const { default: Spinner } = require("../common/Spinner");

const ButtonForm = ({ loading }) => {
  return (
    <div className="flex justify-end gap-4.5">
      <button className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
        Cancel
      </button>
      <button
        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
        type="submit"
        disabled={loading}
      >
        {loading ? <Spinner /> : "Save"}
      </button>
    </div>
  );
};

export default ButtonForm;
