import readDirectories from "./read-directories.ts";
import { type PostInfo } from "./types.ts";
import {
  blogProductionPath,
  postSourcePath,
  postUrlPath,
} from "./app-config.ts";

const generatePostInfo = (): PostInfo[] => {
  const directories = readDirectories(postSourcePath);
  const postInfo = directories.map((directory) => {
    const [timestamp, fileName] = directory.split("_");

    const postDate = new Date(Number.parseInt(timestamp));
    const name = fileName.replaceAll("-", " ");

    const creationDate = postDate.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const creationTime = postDate.toLocaleTimeString("en-GB", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    const creationTimestamp = postDate.getTime();

    const dateDirectory = `${postDate.getFullYear()}-${postDate.getMonth() + 1}-${postDate.getDate()}-${postDate.getHours()}-${postDate.getMinutes()}-${postDate.getSeconds()}`;
    const blogDirectory = `${blogProductionPath}/${dateDirectory}`;
    const blogPage = `${blogProductionPath}/${dateDirectory}/${fileName}.html`;
    const blogUrl = `${postUrlPath}/${dateDirectory}/${fileName}.html`;

    return {
      fileName,
      creationDate,
      creationTime,
      creationTimestamp,
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
