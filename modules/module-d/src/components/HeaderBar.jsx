export default function HeaderBar({ currentPage }) {
  return (
    <div className="flex-center w-full bg-black dark:bg-white shadow-lg">
      <h1 className="text-3xl font-bold text-white dark:text-black py-4 capitalize">
        {currentPage}
      </h1>
    </div>
  );
}
