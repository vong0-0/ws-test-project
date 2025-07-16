export default function seoGenerator(
  title = "module C | WorldSkills",
  description = "What'up world skills",
  keywords = [],
  ogImage = "",
  url = window.location.url
) {
  document.title = `${title}`;
  const metaDescription = document.querySelector("meta[name='description']");
  const metaKeywords = document.querySelector("meta[name='keywords']");

  // Description meta tag
  if (metaDescription) {
    metaDescription.setAttribute("content", description);
  } else {
    const newMeta = document.createElement("meta");
    newMeta.name = "description";
    newMeta.contains = description;
    document.head.append(newMeta);
  }

  // Keywords meta tag
  if (metaKeywords) {
    metaKeywords.setAttribute("content", keywords);
  } else {
    const newMeta = document.createElement("meta");
    newMeta.name = "keywords";
    newMeta.content = keywords;
  }

  // Open Graph tags
  setMetaTag("og:title", title);
  setMetaTag("og:description", description);
  setMetaTag("og:url", url);
  setMetaTag("og:type", "website");
  if (ogImage) {
    setMetaTag("og:image", `/01_module_c/images/${ogImage}`);
  }

  // Twitter open Graph tags
  setTwitterTag("twitter:card", "summary_large_image");
  setTwitterTag("twitter:title", title);
  setTwitterTag("twitter:description", description);
  if (`/01_module_c/images/${ogImage}`) {
    setTwitterTag("twitter:image", ogImage);
  }
}

// Helper function to set or create Open Grahp tags
const setMetaTag = (property, content) => {
  let tag = document.querySelector(`meta[property='${property}']`);
  if (tag) {
    tag.setAttribute("content", content);
  } else {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    tag.setAttribute("content", content);
    document.head.append(tag);
  }
};

// Helper function to set or create Twitter Open Grahp tags
const setTwitterTag = (name, content) => {
  let tag = document.querySelector(`meta[name='${name}']`);
  if (tag) {
    tag.setAttribute("content", content);
  } else {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    tag.setAttribute("content", content);
    document.head.append(tag);
  }
};
