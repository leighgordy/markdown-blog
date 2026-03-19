import * as fs from "fs";

const copyFile = (source: string, destination: string): void => {
  try {
    fs.copyFileSync(source, destination);
  } catch (error) {
    console.error(`Error copying file: ${error}`);
  }
};

export default copyFile;
