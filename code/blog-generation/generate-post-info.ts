import readDirectories from "./read-directories.ts";
import { type PostInfo } from "./types.ts";

const generatePostInfo = (): PostInfo[] => {
  const directories = readDirectories("./src/blog/post/");
  const postInfo = directories.map((directory) => {
    const [timestamp, fileName] = directory.split("_");

    const creationDate = new Date(Number.parseInt(timestamp));
    const name = fileName.replaceAll("-", " ");

    const dateDirectory = `${creationDate.getFullYear()}-${creationDate.getMonth() + 1}-${creationDate.getDate()}-${creationDate.getHours()}-${creationDate.getMinutes()}-${creationDate.getSeconds()}`;
    const blogDirectory = `./dist/blog/${dateDirectory}`;
    const blogPage = `./dist/blog/${dateDirectory}/${fileName}.html`;
    const blogUrl = `/blog/${dateDirectory}/${fileName}.html`;

    return {
      fileName,
      creationDate,
      name,
      directory,
      blogDirectory,
      dateDirectory,
      blogPage,
      blogUrl,
    };
  });

  return postInfo;
};

export default generatePostInfo;
