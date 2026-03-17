import * as fs from "fs";

const readDirectories = (directoryPath: string) => {
  const files = fs.readdirSync(directoryPath, { withFileTypes: true });
  const directories = files
    .filter((file) => file.isDirectory())
    .map((dir) => dir.name);

  return directories;
};

export default readDirectories;
