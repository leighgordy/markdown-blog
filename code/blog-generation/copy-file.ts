import * as fs from "fs";

const copyFile = (source: string, destination: string): void => {
  fs.copyFileSync(source, destination);
};

export default copyFile;
