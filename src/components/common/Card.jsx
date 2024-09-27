const Card = ({ tittle, content, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <div className="flex justify-center border-b border-stroke p-5 px-7.5 dark:border-strokedark">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          {tittle}
        </h4>
      </div>
      <div className="px-7.5 pb-9 pt-6">
        <p className="font-medium">{content}</p>
      </div>
    </div>
  );
};

export default Card;
