import { Link, useSearchParams } from "react-router-dom";
import { medievalAndRenaissanceContent, allTags } from "../../constant";
import { useEffect, useState } from "react";
import seoGenerator from "../helper/seoGenerator";

export default function MedievalAndRenaissance() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  //Generate meta tags for SEO
  useEffect(() => {
    seoGenerator(
      "Medieval And Renaissance | Module C",
      "The articles to introduce notable heritage sites in Lyon, France.",
      allTags
    );
  }, []);

  // update URL search params when input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  // Fake current date
  const currentDate = "2029-02-01";

  const filteredPageData = medievalAndRenaissanceContent.filter((data) => {
    // If there is a search query
    if (query) {
      // ➔ Split the query by "/" to get multiple keywords
      // ➔ Trim and convert each keyword to lowercase
      const keywords = query
        .split("/")
        .map((kw) => kw.trim().toLowerCase())
        .filter(Boolean);

      // Convert title (filename) and summary to lowercase for comparison
      const title = (data.fileName || data.folderName || "").toLowerCase();
      const summary = (data.summary || "").toLowerCase();

      // Check if any keyword exists in the title OR summary (OR logic)
      const hasKeyword = keywords.some(
        (kw) => title.includes(kw) || summary.includes(kw)
      );

      // If none of the keywords match ➔ do not display
      if (!hasKeyword) return false;
    }
    if (data?.type === "folder") {
      return true;
    }

    if (data?.type === "folder") {
      console.log("return folder");
      return true;
    }

    // If draft is true ➔ do not display in the list
    if (data.draft) return false;

    // Extract date from filename using regex (format: yyyy-mm-dd)
    const match = data.fileName?.match(/^(\d{4}-\d{2}-\d{2})/);

    // If filename does not contain a date ➔ do not display
    if (!match) return false;

    const fileDate = match[1];

    // If the date in filename is a future date ➔ do not display
    if (fileDate > currentDate) return false;

    // If all conditions pass ➔ include in the list
    return true;
  });

  return (
    <>
      <h1 className="rounded-lg font-bold text-3xl px-10 py-5 border border-solid border-[#333] mx-auto cs-shadow">
        Medieval And Renaissance
      </h1>

      <div className="w-full py-12 my-6 flex items-start">
        <div className="flex-1">
          {filteredPageData.length ? (
            <ul className="flex flex-col gap-6 [&_li:last-child]:border-none">
              {filteredPageData.map((data) => (
                <li
                  key={data.path}
                  className="group pb-2 pl-4 relative border-b border-solid border-stone-400 hover:border-[#333] hover:shadow-[0_5px_0_rgb(0,0,0)] hover:-translate-y-[5px] transition-all duration-300"
                >
                  <Link to={data.path}>
                    {data?.folderName ? (
                      <p className="font-bold">{data?.folderName}</p>
                    ) : (
                      <p className="font-bold">
                        {(() => {
                          const match = data.fileName?.match(
                            /^(\d{4}-\d{2}-\d{2})-(.+)\.(txt|html)$/
                          );
                          return match ? match[2] : data.fileName;
                        })()}
                      </p>
                    )}
                    <p className="text-gray-500">{data.summary}</p>
                  </Link>
                  <div className="absolute top-0 left-0 w-[3px] h-full bg-stone-400 group-hover:bg-[#333] transition-colors duration-300"></div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-3xl italic text-gray-400 underline">
              No articles available
            </p>
          )}
        </div>

        {/* Aside */}
        <aside className="w-[25%] bg-white px-4 py-4 border border-solid border-[#333] sticky top-0">
          <div className="flex items-start gap-2 my-4">
            <label htmlFor="search" className="sr-only">
              Search article
            </label>
            <input
              id="search"
              className="w-full px-4 py-2 outline-none border border-solid border-[#333] focus:shadow-[0_5px_0_rgb(0,0,0)] focus:-translate-y-[5px] transition-all duration-300"
              type="text"
              placeholder="Search..."
              value={query}
              onChange={handleSearchChange}
            />
          </div>
          {/* List all tags */}
          <div className="flex items-start gap-2 my-4">
            <p className="font-bold">Tags:</p>
            <ul className="flex items-start gap-2 flex-wrap">
              {allTags.map((tag) => (
                <li
                  key={tag}
                  className="text-sky-700 border-b border-solid border-sky-800"
                >
                  <Link to={`/tags/${tag}`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
