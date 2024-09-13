import Link from "next/link";

const Breadcrumb = ({ pageName, a }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-tittle-md2 font-semibold text-black dark:text-white">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {pageName}
        </h2>
      </div>
      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href={"/"}>
              Dashboard / {a ?? ""}
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
