import * as fs from "fs";

const readFile = (filePath: string): string => {
  const data = fs.readFileSync(filePath, "utf-8");
  return data;
};

export default readFile;
