import { type PostInfo } from "./types.ts";
import markdownHtmlConvertor from "./markdown_html_convertor.ts";
import { author } from "./app-config.ts";

const createPostPage = (
  pageTemplate: string,
  postContent: string,
  postInfo: PostInfo,
): string =>
  pageTemplate
    .replaceAll(
      /<!--INJECT-POST-TITLE-START-->([\s\S]*?)<!--INJECT-POST-TITLE-END-->/g,
      postInfo.name,
    )
    .replace(
      /<!--INJECT-POST-DATE-START-->([\s\S]*?)<!--INJECT-POST-DATE-END-->/s,
      postInfo.creationDate.toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    )
    .replace(
      /<!--INJECT-POST-TIME-START-->([\s\S]*?)<!--INJECT-POST-TIME-END-->/s,
      postInfo.creationDate.toLocaleTimeString("en-GB", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
    )
    .replace(
      /<!--INJECT-POST-AUTHOR-START-->([\s\S]*?)<!--INJECT-POST-AUTHOR-END-->/s,
      author,
    )
    .replace(
      /<!--INJECT-POST-CONTENT-START-->([\s\S]*?)<!--INJECT-POST-CONTENT-END-->/s,
      markdownHtmlConvertor(postContent),
    );

export default createPostPage;
