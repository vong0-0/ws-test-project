import fs from "fs";
import parseContentFile from "../helpers/parseContentFile.js";
import path from "path";

export function getAllContentPage(req, res) {
  const dir = "./content-pages";
  const pages = [];

  /**
   * Helper: read files recursively in all subdirectories
   */
  function readFilesRecursively(currentDir) {
    const items = fs.readdirSync(currentDir);

    items.forEach((item) => {
      const itemPath = path.join(currentDir, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        // If item is a folder ➔ recursively read its contents
        readFilesRecursively(itemPath);
      } else if (itemPath.endsWith(".txt") || itemPath.endsWith(".html")) {
        // If item is a .txt or .html file ➔ parse its content
        const data = parseContentFile(itemPath);

        const relativePath = path.relative(dir, itemPath); // path relative to content-pages

        const filename = path.basename(item, path.extname(item)); // filename without extension
        const decodedFilename = decodeURIComponent(filename);

        // Extract date from filename (format: yyyy-mm-dd)
        const dateMatch = decodedFilename.match(/(\d{4}-\d{2}-\d{2})/);
        const extractedDate = dateMatch ? dateMatch[1] : null;

        // Extract name after date and replace hyphens with spaces
        const nameMatch = decodedFilename.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
        const extractedName = nameMatch
          ? nameMatch[1].replace(/-/g, " ")
          : decodedFilename;

        // Push parsed page data into pages array
        pages.push({
          type: itemPath.endsWith(".html") ? "html" : "txt",
          frontMatter: data.frontMatter,
          date: extractedDate,
          name: extractedName,
          path: relativePath.replace(/\\/g, "/").replace(/\.(txt|html)$/, ""), // path with unix-style slashes and no extension
          htmlTags: data.htmlTags || [],
          content: data.content || [],
        });
      }
    });
  }

  // Start recursive reading from root directory
  readFilesRecursively(dir);

  // Return all parsed pages as JSON response
  res.json(pages);
}

export function getContentPage(req, res) {
  const pathParam = req.query.path;
  console.log(pathParam);

  const filepathTxt = `./content-pages/${pathParam}.txt`;
  const filepathHtml = `./content-pages/${pathParam}.html`;

  let filepath = null;

  if (fs.existsSync(filepathHtml)) {
    filepath = filepathHtml;
  } else if (fs.existsSync(filepathTxt)) {
    filepath = filepathTxt;
  } else {
    // If file not found ➔ return 404 error
    return res.status(404).json({ error: "File not found" });
  }

  // Extract date from path (format: yyyy-mm-dd)
  const dateMatch = pathParam.match(/(\d{4}-\d{2}-\d{2})/);
  const extractedDate = dateMatch ? dateMatch[1] : null;

  // decodeURIComponent to convert %20 to space
  const decodedPath = decodeURIComponent(pathParam);

  // Get only the last segment (filename) of the path
  const pathSegments = decodedPath.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  // Extract name after date and replace hyphens with spaces
  const nameMatch = lastSegment.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
  const extractedName = nameMatch
    ? nameMatch[1].replace(/-/g, " ")
    : lastSegment.replace(/-/g, " ");

  const data = parseContentFile(filepath);

  // Return parsed page data as JSON response
  res.json({
    type: filepath.endsWith(".html") ? "html" : "txt",
    frontMatter: data.frontMatter,
    date: extractedDate,
    name: extractedName,
    htmlTags: data.htmlTags || [],
    content: data.content || [],
  });
}
