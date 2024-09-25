import { BlogPost, GetAllBlogCategories } from "@/types/interface";

export interface CommonResponse<T> {
  success: true;
  message: string;
  data: T;
}

export type CommonError = {
  error?: string;
  statusCode: number;
  message: string[] | string;
};

export type PaginatedResponse<T extends { _id: string }> = {
  count: number;
  page: number;
  totalCount: number;
  totalPages: number;
  results: T[];
};
export type BlogGetResponse = PaginatedResponse<BlogPost>;
export type GetAllBlogCategoriesResponse =
  PaginatedResponse<GetAllBlogCategories>;
