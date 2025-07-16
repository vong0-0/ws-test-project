import fs from "fs";

//Helper function: read and parse content file (.txt or .html) into structured JSON

export default function parseContentFile(filepath) {
  const raw = fs.readFileSync(filepath, "utf-8"); // Read file content as string
  const isHtml = filepath.endsWith(".html"); // Check if file is .html

  let frontMatter = {}; // To store parsed front-matter
  let mainContent = ""; // To store main content after front-matter

  // Parse front-matter if present
  if (raw.startsWith("---")) {
    const parts = raw.split("---");
    const fm = parts[1].trim(); // Extract front-matter block
    mainContent = parts.slice(2).join("---").trim(); // Remaining content

    // Convert front-matter lines into key-value pairs
    fm.split("\n").forEach((line) => {
      const [key, ...rest] = line.split(":");
      frontMatter[key.trim()] = rest.join(":").trim();
    });
  } else {
    mainContent = raw.trim(); // No front-matter, use entire content
  }

  // If .html file ➔ return htmlTags array (each non-empty trimmed line)
  if (isHtml) {
    const htmlTags = mainContent
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean); // Remove empty lines

    return {
      frontMatter,
      htmlTags,
    };
  }

  // If .txt file ➔ parse into structured content
  const lines = mainContent.split("\n");
  const content = [];
  let currentList = null; // To track current list block while parsing

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue; // Skip empty lines

    // Check if line is an image filename (no spaces + ends with image extension)
    if (
      !trimmed.includes(" ") &&
      (trimmed.endsWith(".jpg") ||
        trimmed.endsWith(".jpeg") ||
        trimmed.endsWith(".png") ||
        trimmed.endsWith(".gif"))
    ) {
      currentList = null; // End current list if any

      content.push({
        type: "image",
        src: trimmed,
      });
      continue;
    }

    const boldMatch = trimmed.match(/\*\*(.*?)\*\*/); // Match **bold**
    const hasBold = !!boldMatch;

    // Check if line is a list item (starts with '* ')
    if (trimmed.startsWith("* ")) {
      if (!currentList) {
        // Start a new list block
        currentList = { type: "list", items: [] };
        content.push(currentList);
      }

      let itemLine = trimmed.slice(2).trim(); // Remove '* ' prefix

      const itemBoldMatch = itemLine.match(/\*\*(.*?)\*\*/);
      const itemHasBold = !!itemBoldMatch;
      let itemBoldText = itemHasBold ? itemBoldMatch[1] : "";

      // Extract description after bold text (if any)
      let itemDesc = itemHasBold
        ? itemLine
            .replace(/\*\*(.*?)\*\*/, "")
            .trim()
            .replace(/^:/, "") // Remove leading ':' if exists
            .trim()
        : itemLine;

      // Add item to current list
      currentList.items.push({
        text: itemBoldText,
        bold: itemHasBold,
        desc: itemDesc,
      });
    } else {
      currentList = null; // End current list if line is not a list item

      content.push({
        type: "paragraph",
        text: trimmed.replace(/\*\*(.*?)\*\*/g, "$1"), // Remove bold syntax, keep text
        bold: hasBold,
      });
    }
  }

  // Return parsed frontMatter and content
  return {
    frontMatter,
    content,
  };
}
