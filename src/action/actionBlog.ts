"use server";

import { BlogCategoryType, BlogType } from "@/validations/blog";
import { revalidateTag } from "next/cache";
import { getOptionString } from "@/utils/misc";
import {
  BlogGetResponse,
  CommonError,
  GetAllBlogCategoriesResponse,
} from "@/types/serverActionResponse";
import { BlogCategoryDelete, BlogPost } from "@/types/interface";

export default async function actionCreateBlog(
  data: BlogType
): Promise<BlogType | CommonError> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await res.json();
  revalidateTag("actionBlogDetails");
  return resData;
}

export interface BlogGetOptions {
  page?: number;
  limit?: number;
}

export async function actionGetBlog(
  options: BlogGetOptions = {}
): Promise<BlogGetResponse | CommonError> {
  const queryString = getOptionString(options, { page: 1, limit: 10 });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blog?${queryString}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["actionGetBlog"],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function actionGetSingleBlog(
  slug: string
): Promise<BlogPost | CommonError> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blog/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["actionGetBlogBySlug"],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

// Blog Category

export async function actionBlogCategoryCreate(
  data: BlogCategoryType
): Promise<BlogCategoryType | CommonError> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  revalidateTag("actionBlogCategoryGet");
  const resData = await res.json();
  return resData;
}

export async function actionBlogCategoryGet(): Promise<GetAllBlogCategoriesResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["actionBlogCategoryGet"],
      },
    }
  );
  const resData = await res.json();
  return resData;
}

export async function actionBlogCategoryDelete(
  id: string
): Promise<BlogCategoryDelete | CommonError> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["actionBlogCategoryGet"],
      },
    }
  );
  revalidateTag("actionBlogCategoryGet");
  const resData = await res.json();
  return resData;
}
