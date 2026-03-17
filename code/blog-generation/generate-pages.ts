import copyFile from "./copy-file.ts";
import copyFolderContents from "./copy-folder-contents.ts";
import createDir from "./create-dir.ts";
import createFile from "./create-file.ts";
import deleteFile from "./delete-file.ts";
import readDirectories from "./read-directories.ts";

const generatePages = () => {
  const directories = readDirectories("./src/blog/post/");
  directories.forEach(async (directory) => {
    const [timestamp, fileName] = directory.split("_");
    
    const creationDate = new Date(Number.parseInt(timestamp));
    const name = fileName.replaceAll("-", " ");

    const dateDirectory = `${creationDate.getFullYear()}-${creationDate.getMonth()+ 1}-${creationDate.getDate()}-${creationDate.getHours()}-${creationDate.getMinutes()}-${creationDate.getSeconds()}`;

    createDir(`./dist/blog/${dateDirectory}`);
    createFile(`./dist/blog/${dateDirectory}/${fileName}.html`,"");
    await copyFolderContents(`./src/blog/post/${directory}`, `./dist/blog/${dateDirectory}`);
    deleteFile(`./dist/blog/${dateDirectory}/content.md`);

    console.log(` Directory: ${dateDirectory} ${name}`);
  })
  
};

export default generatePages;
