export default function formatCaption(filePath) {
  const fileName = filePath.split("/").pop();

  const nameWithoutExtension = fileName.split(".")[0];

  const caption = nameWithoutExtension.replace(/[-_]/g, " ");

  return caption;
}
