import * as fs from "fs";

const deleteFile = (filePath: string): void => {
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error(`Error deleting file: ${error}`);
  }
};

export default deleteFile;
