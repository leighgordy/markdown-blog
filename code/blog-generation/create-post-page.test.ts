import assert from "node:assert";
import { describe, test, mock, beforeEach, afterEach } from "node:test";
import { type PostInfo } from "./types.ts";

describe("Test create-post-page.ts", async () => {
  const markdownHtmlConvertorMock = mock.fn();

  beforeEach(async () => {
    markdownHtmlConvertorMock.mock.mockImplementation(
      (input: string) => `<p>${input}</p>` as any,
    );
    mock.module("./markdown_html_convertor.ts", {
      defaultExport: markdownHtmlConvertorMock,
    });
  });

  afterEach(() => {
    markdownHtmlConvertorMock.mock.resetCalls();
    mock.restoreAll();
  });

  test("Ensure post title, date, and content are injected correctly", async () => {
    const pageTemplate = `
      <html>
        <!--INJECT-POST-TITLE-START-->
        <!--INJECT-POST-TITLE-END-->
        <!--INJECT-POST-DATE-START-->
        <!--INJECT-POST-DATE-END-->
        <!--INJECT-POST-TIME-START-->
        <!--INJECT-POST-TIME-END-->
        <!--INJECT-POST-AUTHOR-START-->
        <!--INJECT-POST-AUTHOR-END-->
        <!--INJECT-POST-CONTENT-START-->
        <!--INJECT-POST-CONTENT-END-->
      </html>
    `;
    const postContent = "Hello world";
    const postInfo: PostInfo = {
      name: "Test Post",
      fileName: "",
      creationDate: new Date("2023-01-02").toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      creationTime: new Date("2023-01-02").toLocaleTimeString("en-GB", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
      creationTimestamp: new Date("2023-01-02").getTime(),
      blogDirectory: "",
      dateDirectory: "",
      directory: "",
      blogPage: "",
      blogUrl: "",
    };

    const testee = await import("./create-post-page.ts");
    const result = testee.default(pageTemplate, postContent, postInfo);

    assert(result.includes("Test Post"));
    assert(result.includes("Monday, 2 January 2023"));
    assert(result.includes("12:00:00 am"));
    assert(result.includes("Joe Bloggs"));
    assert(result.includes("<p>Hello world</p>"));
    assert.strictEqual(markdownHtmlConvertorMock.mock.callCount(), 1);
    assert.strictEqual(
      markdownHtmlConvertorMock.mock.calls[0].arguments[0],
      postContent,
    );
  });
});
