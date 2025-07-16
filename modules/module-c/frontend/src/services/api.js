import axios from "axios";

export async function getAllPageContent() {
  try {
    const apiUrl = `http://ws01.worldskills.org:3000/01_module_c/api/pages`;
    const pageContent = await axios.get(apiUrl);

    return pageContent.data;
  } catch (error) {
    console.error(`Failed to get content page: ${error}`);
  }
}

export async function getPageContent(fileName) {
  try {
    const apiUrl = `http://ws01.worldskills.org:3000/01_module_c/api/page?path=${fileName}`;
    const pageContent = await axios.get(apiUrl);

    return pageContent.data;
  } catch (error) {
    console.error(`Failed to get content page: ${error}`);
  }
}
