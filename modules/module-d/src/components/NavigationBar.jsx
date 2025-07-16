// Constant
import { PAGES } from "../constant";

export default function NavigationBar({ currentPage, handleSetCurrentPage }) {
  return (
    <nav className="w-full px-4 py-8 bg-black dark:bg-white">
      <ul className="flex justify-between">
        {PAGES.map((page) => (
          <li
            key={page.name}
            className={`${currentPage === page.name ? "nav-link-btn active" : "nav-link-btn"}`}
          >
            <button
              className="font-bold capitalize px-4 py-3 inline-block"
              onClick={() => handleSetCurrentPage(page.name)}
            >
              {page.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
