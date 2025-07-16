import app from "./src/app.js";
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://ws01.worldskills.org:${PORT}`);
});
