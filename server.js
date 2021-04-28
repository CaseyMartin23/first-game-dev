import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static("game"));

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}...`);
});
