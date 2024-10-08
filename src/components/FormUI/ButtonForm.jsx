const { default: Spinner } = require("../common/Spinner");

const ButtonForm = ({ loading, text = "Save" }) => {
  return (
    <div className="flex justify-end gap-4.5">
      <button
        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
        type="submit"
        disabled={loading}
      >
        {loading ? <Spinner /> : text}
      </button>
    </div>
  );
};

export default ButtonForm;
