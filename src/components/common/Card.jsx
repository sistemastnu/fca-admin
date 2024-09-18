const Card = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke p-5 px-7.5 dark:border-strokedark">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Card Tittle
        </h4>
      </div>
      <div className="px-7.5 pb-9 pt-6">
        <p className="font-medium">
          Lorem ipsum dolor sit amet, vehiculaum ero felis loreum fitiona
          fringilla goes scelerisque Interdum et.
        </p>
      </div>
    </div>
  );
};

export default Card;
