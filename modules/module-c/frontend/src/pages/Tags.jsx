import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import { indexContent } from "../../constant";
import { useEffect, useState } from "react";
import seoGenerator from "../helper/seoGenerator";
import { useSearchParams } from "react-router-dom";

export async function loader({ params }) {
  const tag = await params.tag;
  return tag;
}

export default function Tags() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const tag = useLoaderData();

  // Generate meta tags for SEO
  useEffect(() => {
    seoGenerator(`${tag} | tags`, `All articles about ${tag} in Lyon`, tag);
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

  const filteredPageData = indexContent.filter((data) => {
    // Check draft if it's true no display in the list
    if (data.draft) return false;

    // Extract date from filename with regex
    const match = data.fileName?.match(/^(\d{4}-\d{2}-\d{2})/);

    // If in the filename don't provide the date no display in the list
    if (!match) return false;

    const fileDate = match[1];

    //if date in fileName is future date no display in the list
    if (fileDate > currentDate) return false;

    const tagArray = data.tags.split(",").map((t) => t.trim());
    if (!tagArray.includes(tag)) return false;

    if (query) {
      // ➔ Split the query by "/" to get multiple keywords
      // ➔ Trim and convert each keyword to lowercase
      const keywords = query
        .split("/")
        .map((kw) => kw.trim().toLowerCase())
        .filter(Boolean);

      // Convert title (filename) and summary to lowercase for comparison
      const title = (data.fileName || "").toLowerCase();
      const summary = (data.summary || "").toLowerCase();

      // Check if any keyword exists in the title OR summary (OR logic)
      const hasKeyword = keywords.some(
        (kw) => title.includes(kw) || summary.includes(kw)
      );

      // If none of the keywords match ➔ do not display
      if (!hasKeyword) return false;
    }

    return true;
  });

  return (
    <section className="flex flex-col">
      <div className="flex flex-col items-start w-11/12 my-8 mx-auto">
        <h1 className="rounded-lg font-bold text-3xl px-10 py-5 border border-solid border-[#333] mx-auto cs-shadow">
          {tag} tag
        </h1>

        <div className="w-full py-12 my-6 flex justify-between items-start">
          <div className="flex-1">
            {filteredPageData.length ? (
              <ul className="flex flex-col gap-6 [&_li:last-child]:border-none">
                {filteredPageData.map((data) => (
                  <li
                    key={data.path}
                    className="group pb-2 pl-4 relative border-b border-solid border-stone-400 group-hover:border-[#333] transition-colors duration-300"
                  >
                    <Link to={data.path}>
                      {data.folderName ? (
                        <p className="font-bold">{data.folderName}</p>
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
          <aside className="w-[25%] bg-white px-4 py-4 border border-solid border-[#333] sticky top-0">
            {/* Search input */}
            <div className="flex items-start gap-2 my-4">
              <label htmlFor="search" className="sr-only">
                Search article
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 outline-none border border-solid border-[#333] focus:shadow-[0_5px_0_rgb(0,0,0)] focus:-translate-y-[5px] transition-all duration-300"
                onChange={handleSearchChange}
                value={query}
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
