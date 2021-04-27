import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.static("game"));

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}...`);
});
