export interface BlogPost {
  _id: string;
  author: string;
  slug: string;
  title: string;
  tags: string[];
  categories: string[];
  images: string[];
  blogDetails: string;
  createdAt: string;
}

export interface BlogCategoryDelete {
  _id: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetAllBlogCategories {
  _id: string;
  category: string;
}
