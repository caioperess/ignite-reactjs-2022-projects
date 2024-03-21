import { IAuthorData } from "./Author";

export interface IPostContent {
  type: "paragraph" | "link";
  content: string;
}

export interface IPostData {
  id: string;
  author: IAuthorData;
  content: IPostContent[];
  publishedAt: Date;
}
