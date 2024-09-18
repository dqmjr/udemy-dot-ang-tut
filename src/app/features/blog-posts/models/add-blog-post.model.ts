import {Category} from "../../category/models/category.model";

export interface AddBlogPost {
  title: string;
  urlHandle: string;
  shortDescription: string;
  content: string;
  FeaturedImageUrl: string;
  publishedDate: Date;
  author: string;
  isVisible: boolean;
  categories: string[];
}
