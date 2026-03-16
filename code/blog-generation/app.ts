import generatePages from "./generate-pages.ts";
import generateIndexes from "./generate-indexes.ts";
import deleteDirContents from "./delete-dir-contents.ts";
import copyFolderContents from "./copy-folder-contents.ts";

console.log("++++++++++++++++++++++++++++++");
console.log("Delete dist directory contents");
console.log("++++++++++++++++++++++++++++++\n");

await deleteDirContents("dist");

console.log("++++++++++++++++++++++++++++++");
console.log("Copy static assets");
console.log("++++++++++++++++++++++++++++++\n");

await copyFolderContents("src", "dist");

await deleteDirContents("dist/blog");

console.log("++++++++++++++++++");
console.log("Generating Blog content");
console.log("++++++++++++++++++");

generatePages();
console.log("++++++++++++++++++");
generateIndexes();
console.log("++++++++++++++++++");

console.log("++++++++++++++++++++++++++++++");
console.log("Program ended");
console.log("++++++++++++++++++++++++++++++\n");
