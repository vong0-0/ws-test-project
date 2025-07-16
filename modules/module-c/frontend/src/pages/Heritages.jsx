import { useLoaderData, Link } from "react-router-dom";
import { getPageContent } from "../services/api";
import { useEffect, useState } from "react";

// Helper
import seoGenerator from "../helper/seoGenerator";

export async function loader({ request }) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const parts = pathname.split("heritages/");
  const fileName = decodeURIComponent(parts[parts.length - 1]);
  const pageContent = await getPageContent(encodeURIComponent(fileName));

  return pageContent;
}

export default function Heritages() {
  const pageContent = useLoaderData();
  const [openModal, setOpenModal] = useState(false);
  const [effectPosition, setEffectPosition] = useState({
    x: "",
    y: "",
  });

  // Generate meta tags for SEO
  useEffect(() => {
    seoGenerator(
      `${pageContent.name} | Article`,
      pageContent.frontMatter.summary,
      tags,
      pageContent.frontMatter.cover
    );
  }, []);

  // Handle with image modal
  useEffect(() => {
    function handlePageScroll() {
      setOpenModal(false);
    }

    document.addEventListener("scroll", handlePageScroll);

    return () => document.removeEventListener("scroll", handlePageScroll);
  }, [openModal]);

  // Handle function to set x axis and y axis for set the Subtle spotlight effect's position
  function handleMouseMove(e) {
    setEffectPosition({
      ...effectPosition,
      x: e.clientX,
      y: e.clientY,
    });
  }

  const tags = pageContent.frontMatter.tags
    ? pageContent.frontMatter.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "")
    : [];

  const headingTag = pageContent?.htmlTags[0];

  let fallbackHeader = "";

  if (headingTag && headingTag.startsWith("<h1")) {
    // if is h1 -> remove html tags and trim
    fallbackHeader = headingTag.replace(/<[^>]+>/g, "").trim();
  } else {
    // if not h1 -> use filename instead
    fallbackHeader = pageContent.name;
  }

  return (
    <section className="w-full bg-gray-200">
      {/* Image modal */}
      <div
        className={`${openModal ? "visible opacity-1 z-50" : "invisible opacity-0 z-0"} flex justify-center items-center fixed w-screen h-screen transition-all duration-300`}
      >
        <div className="w-full h-full relative">
          <img
            src={`/01_module_c/images/${pageContent.frontMatter.cover || `${pageContent.date}-${pageContent.name.split(" ").join("-")}.jpg`}`}
            alt={pageContent.frontMatter.title}
            className={`${openModal ? "block" : "hidden"} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] cursor-pointer`}
            onClick={() => setOpenModal(false)}
          />

          {/* Overlay dim background */}
          <div
            className="w-full h-full bg-[#333]/50 cursor-pointer"
            onClick={() => setOpenModal(false)}
          ></div>
        </div>
      </div>

      <div
        className="relative h-[50vh] cursor-pointer overflow-hidden"
        onClick={() => setOpenModal(true)}
        onMouseMove={(e) => handleMouseMove(e)}
      >
        {/* Cover image */}
        <img
          className="w-full h-full object-cover"
          src={`/01_module_c/images/${pageContent.frontMatter.cover || `${pageContent.date}-${pageContent.name.split(" ").join("-")}.jpg`}`}
          alt={pageContent.frontMatter.title}
        />

        {/* Subtle spotligth effect backgroud */}
        <div
          style={{
            transform: "translate(-50%, -50%)",
            left: effectPosition.x,
            top: effectPosition.y,
          }}
          className="w-[200%] h-[200%] absolute top-0 left-0 subtle-spotlight-effect"
        ></div>

        {/* Page title */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 px-8 py-4 bg-[#333]">
          <h1 className="font-bold text-white text-4xl text-center common-ligatures capitalize">
            {pageContent.frontMatter?.title || fallbackHeader}
          </h1>
        </div>
      </div>
      <div className="w-11/12 mx-auto py-12 flex items-start">
        {/* Main contain */}
        <div className="w-[75%] bg-white px-4 py-4">
          {pageContent.type === "html"
            ? pageContent.htmlTags.map((tag, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: tag }} />
              ))
            : pageContent.content.map((content) => {
                switch (content.type) {
                  case "paragraph": {
                    return (
                      <div key={content.text}>
                        <p className={`${content.bold ? "font-bold" : ""}`}>
                          {content.text}
                        </p>
                        <br />
                      </div>
                    );
                  }
                  case "list": {
                    return (
                      <div key={content.items[0]?.text || Math.random()}>
                        <ul>
                          {content.items.map((item) => (
                            <li key={item.text} className="list-disc ml-8">
                              <span
                                className={`${item.bold ? "font-bold" : ""}`}
                              >
                                {item.text}
                              </span>
                              <span>{item.desc}</span>
                            </li>
                          ))}
                        </ul>
                        <br />
                      </div>
                    );
                  }
                  case "image": {
                    return (
                      <div key={content.src}>
                        <img
                          src={`/01_module_c/images/${content.src}`}
                          alt={content.src.split(".")[0]}
                        />
                      </div>
                    );
                  }
                  default: {
                    console.log("image is here");
                    return null;
                  }
                }
              })}
        </div>

        {/* Aside */}
        <aside className="w-[25%] bg-white px-4 py-4 border border-solid border-[#333] sticky top-0">
          {/* Article date published */}
          <div className="flex items-start gap-2 flex-wrap">
            <p className="font-bold">Date:</p>
            <p>{pageContent.date}</p>
          </div>

          {/* tags related to the article */}
          <div className="flex items-start gap-2 my-4">
            <p className="font-bold">Tag:</p>
            <ul className="flex items-start gap-2 flex-wrap">
              {tags.map((tag) => (
                <li key={tag}>
                  <Link
                    to={`/tags/${tag}`}
                    className="text-sky-700 border-b border-solid border-sky-800"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Article is drafting state */}
          <div className="flex items-start gap-2 flex-wrap">
            <p className="font-bold">Draft:</p>
            <p>False</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
