import { promises as fs } from "fs";
import * as path from "path";

async function copyFolderContents(src: string, dest: string): Promise<void> {
  // Ensure the destination folder exists
  await fs.mkdir(dest, { recursive: true });

  // Read the contents of the source folder
  const items = await fs.readdir(src);

  // Copy each item from the source to the destination
  await Promise.all(
    items.map(async (item) => {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      const stat = await fs.stat(srcPath);

      if (stat.isDirectory()) {
        // Recursively copy the contents of the directory
        await copyFolderContents(srcPath, destPath);
      } else {
        // Copy the file to the destination
        await fs.copyFile(srcPath, destPath);
      }
    }),
  );

  console.log(`Contents copied from ${src} to ${dest}`);
}

export default copyFolderContents;
