import { type PostInfo } from "./types.ts";

const createPostPage = (
  pageTemplate: string,
  postContent: string,
  postInfo: PostInfo,
): string =>
  pageTemplate
    .replace(
      /<!--INJECT-POST-TITLE-START-->([\s\S]*?)<!--INJECT-POST-TITLE-END-->/s,
      postInfo.name,
    )
    .replace(
      /<!--INJECT-POST-DATE-START-->([\s\S]*?)<!--INJECT-POST-DATE-END-->/s,
      postInfo.creationDate.toDateString(),
    )
    .replace(
      /<!--INJECT-POST-CONTENT-START-->([\s\S]*?)<!--INJECT-POST-CONTENT-END-->/s,
      postContent,
    );

export default createPostPage;
