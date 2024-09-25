import { z } from 'zod';

const blogSchema = z.object({
  author: z.string().min(1, 'author is required'),
  slug: z.string(),
  title: z.string().min(1, 'Title is required'),
  tags: z
    .array(z.string().min(1, 'Tag should not be empty'))
    .min(1, 'At least one tag is required'),
  categories: z.array(z.string()).min(1, 'Tag should not be empty'),
  images: z
    .array(z.string().min(1, 'Image URL should not be empty'))
    .min(1, 'At least one image is required'),
  blogDetails: z.string().min(100, 'Description is required'),
});

export type BlogType = z.infer<typeof blogSchema>;

export default blogSchema;

export const blogCategorySchema = z.object({
  category: z.string().min(1, 'Category should not be empty'),
});

export type BlogCategoryType = z.infer<typeof blogCategorySchema>;
