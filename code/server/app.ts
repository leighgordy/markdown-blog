import express from "express";
const app = express();
const port = 8080;

const dir = process.argv[2] || "dist";

console.log(`Serving from directory ${dir}`);

app.use(express.static(dir));

app.listen(port, () => {
  console.log(`Express Server running on port ${port}`);
});
