"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import CategoriesModal from "./CategoriesModal";
import blogSchema, { BlogType } from "@/validations/blog";
import PhotoUpload from "./UploadMedia";

const Blog = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      console.log("Selected File:", file);
      console.log(selectedFile);
    }
  };
  const { handleSubmit } = useForm<BlogType>({
    defaultValues: {
      //   blogId: blogData?._id || "",
      title: "",
      slug: "",
      author: "",
      tags: [],
      categories: [],
      images: [],
      blogDetails: "",
    },
    resolver: zodResolver(blogSchema),
  });

  const onSubmit = async (data: BlogType) => {
    console.log(data);
  };

  return (
    <>
      <div className="">
        <h2>Add Blog</h2>
      </div>
      <div className="">
        <div className="" id="CategoriesModal" tabIndex={-1}>
          {/* <CategoriesModal /> */}
        </div>
      </div>
      <div className="">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          {/* title , author, tag */}

          {/* upload image */}
          <PhotoUpload onFileChange={handleFileChange} />

          {/* discription */}
        </form>
      </div>
    </>
  );
};

export default Blog;
