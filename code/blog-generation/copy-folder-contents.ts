import { promises as fs } from "fs";
import * as path from "path";

async function copyFolderContents(src: string, dest: string): Promise<void> {
  await fs.mkdir(dest, { recursive: true });
  const items = await fs.readdir(src);

  await Promise.all(
    items.map(async (item) => {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      const stat = await fs.stat(srcPath);

      if (stat.isDirectory()) {
        await copyFolderContents(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }),
  );
}

export default copyFolderContents;
