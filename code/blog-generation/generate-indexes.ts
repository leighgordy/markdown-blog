import readFile from "./read-file.ts";
import { type PostInfo } from "./types.ts";
import createFile from "./create-file.ts";
import createIndexPage from "./create-index-page.ts";

const NUMBER_POSTS_PER_PAGE = 5;

const generateIndexes = async (posts: PostInfo[]) => {
  console.log("Sort posts in decending order");
  posts.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());

  console.log("Read template");
  const pageTemplate = readFile("./src/blog/page1.html");

  const numberPages = Math.ceil(posts.length / NUMBER_POSTS_PER_PAGE);

  for (let i = 0; i < numberPages; i++) {
    const start = NUMBER_POSTS_PER_PAGE * i;
    const end = start + NUMBER_POSTS_PER_PAGE;

    const pagePosts = posts.slice(start, end);

    createFile(
      `./dist/blog/page${i + 1}.html`,
      createIndexPage(pageTemplate, pagePosts, i, numberPages),
    );
  }
};

export default generateIndexes;
