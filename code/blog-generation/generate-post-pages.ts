import copyFolderContents from "./copy-folder-contents.ts";
import createDir from "./create-dir.ts";
import createFile from "./create-file.ts";
import deleteFile from "./delete-file.ts";
import readFile from "./read-file.ts";
import createPostPage from "./create-post-page.ts";
import { type PostInfo } from "./types.ts";
import {
  postSourcePath,
  blogProductionPath,
  postPageTemplate,
} from "./app-config.ts";

const generatePostPages = async (postInfo: PostInfo[]): Promise<void> => {
  const postTemplate = readFile(postPageTemplate);

  postInfo.forEach(async (postInfo) => {
    const postContent = readFile(
      `${postSourcePath}/${postInfo.directory}/content.md`,
    );

    createDir(postInfo.blogDirectory);
    createFile(
      postInfo.blogPage,
      createPostPage(postTemplate, postContent, postInfo),
    );
    await copyFolderContents(
      `${postSourcePath}/${postInfo.directory}`,
      `${blogProductionPath}/${postInfo.dateDirectory}`,
    );
    deleteFile(`${blogProductionPath}/${postInfo.dateDirectory}/content.md`);
  });
};

export default generatePostPages;
