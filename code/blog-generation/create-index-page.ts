import { type PostInfo } from "./types.ts";

const navHtml = (pageNo: number, maxPage: number) => ` 
  ${pageNo == 0 ? "" : `<a href="./page${pageNo}.html">Previous Page </a>`}
  ${pageNo + 1 >= maxPage ? "" : `<a href="./page${pageNo + 2}.html" disabled>Next Page </a>`}
`;

const createIndexPage = (
  pageTemplate: string,
  posts: PostInfo[],
  pageNo: number,
  maxPage: number,
): string =>
  pageTemplate
    .replace(
      /<!--INJECT-POSTS-START-->([\s\S]*?)<!--INJECT-POSTS-END-->/s,
      () =>
        posts
          .map(
            (post) => `
        <article>
          <h2>${post.name}</h2>
        </article>
        `,
          )
          .join(""),
    )
    .replace(
      /<!--INJECT-POSTS-NAV-START-->([\s\S]*?)<!--INJECT-POSTS-NAV-END-->/s,
      () => navHtml(pageNo, maxPage),
    );

export default createIndexPage;
