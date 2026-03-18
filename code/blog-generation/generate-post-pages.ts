import copyFolderContents from "./copy-folder-contents.ts";
import createDir from "./create-dir.ts";
import createFile from "./create-file.ts";
import deleteFile from "./delete-file.ts";
import readFile from "./read-file.ts";
import createPostPage from "./create-post-page.ts";
import { type PostInfo } from "./types.ts";

const generatePostPages = async (postInfo: PostInfo[]): Promise<void> => {
  const postTemplate = readFile("./src/blog/post/post.html");

  postInfo.forEach(async (postInfo) => {
    const postContent = readFile(
      `./src/blog/post/${postInfo.directory}/content.md`,
    );

    createDir(postInfo.blogDirectory);
    createFile(
      postInfo.blogPage,
      createPostPage(postTemplate, postContent, postInfo),
    );
    await copyFolderContents(
      `./src/blog/post/${postInfo.directory}`,
      `./dist/blog/${postInfo.dateDirectory}`,
    );
    deleteFile(`./dist/blog/${postInfo.dateDirectory}/content.md`);

    console.log(` Directory: ${postInfo.dateDirectory} ${postInfo.name}`);
  });
};

export default generatePostPages;
