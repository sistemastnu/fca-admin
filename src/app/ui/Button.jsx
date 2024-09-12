import Link from "next/link";
const ButtonWithIcon = ({ tittle, onclick, icon }) => {
  return (
    <Link
      href="#"
      onClick={onclick}
      className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
    >
      <span>{icon}</span>
      {tittle}
    </Link>
  );
};

export default ButtonWithIcon;
