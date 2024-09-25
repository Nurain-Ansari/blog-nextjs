// "use client";

// import React, { useEffect, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import BlogsSchemaType, { IBlogsSchemaType } from "@/schemas/Blog";
// import { zodResolver } from "@hookform/resolvers/zod";
// import UploadMedia from "./UploadMedia";
// import api from "@/lib/api";
// import Select from "react-select";
// import { useSearchParams } from "next/navigation";
// import CategoriesModal from "./CategoriesModal";
// import Editor from "./oldEditor";
// import { IUploadedImages } from "@/types/interface";

// const Blog = () => {
//   const blogSlug = useSearchParams().get("slug");
//   const [uploadedImages, setUploadedImages] = useState<IUploadedImages[]>([]);
//   const [editorData, setEditorData] = useState({});
//   const [blogData, setBlogData] = useState<IBlogsSchemaType | any>();

//   const customStyles = {
//     control: (styles: any) => ({
//       ...styles,
//       boxShadow: "0 0 0 0 #fff",
//       padding: "0.5rem 0.5rem",
//     }),
//     option: (styles: any, { isFocused, isSelected, isHovered }: any) => {
//       let backgroundColor = "";
//       const margin = "5px auto";
//       const width = "96%";
//       const borderRadius = "3px";

//       if (isSelected) {
//         backgroundColor = "#509f97";
//       } else if (isHovered) {
//         backgroundColor = "#509f9712";
//       } else if (isFocused) {
//         backgroundColor = "#509f9712";
//       }

//       return {
//         ...styles,
//         backgroundColor,
//         margin,
//         width,
//         borderRadius,
//       };
//     },
//   };

//   const {
//     register,
//     watch,
//     setValue,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<IBlogsSchemaType>({
//     defaultValues: {
//       blogId: blogData?._id || "",
//       title: blogData?.title || "",
//       slug: blogData?.slug || "",
//       publishedBy: blogData?.publishedBy || "",
//       tags: blogData?.tags.join(",") || "",
//       categories: blogData?.categories || "",
//       images: blogData?.images || "",
//       blogDetails: blogData?.blogDetails || "",
//     },
//     resolver: zodResolver(BlogsSchemaType),
//   });

//   // generate tag based on title

//   // image
//   // editor

//   const onSubmit = async (data) => {
//     console.log(data);
//   };

//   return (
//     <>
//       <div className="row mb-4 px-3 ">
//         <h2> Add Blog</h2>
//       </div>
//       <div className="advance-feature-modal position-relative">
//         <div
//           className="modal fade"
//           id="CategoriesModal"
//           tabIndex={-1}
//           aria-labelledby="CategoriesModalLabel"
//           aria-hidden="true"
//         >
//           <CategoriesModal />
//         </div>
//       </div>
//       <div className="bgc-white bdrs12 default-box-shadow2 p30 mb30">
//         <form action="" onSubmit={handleSubmit(onSubmit)}>
//           {/* title , author, tag */}
//           <div className="row">
//             {/* title */}
//             <div className="col-sm-6">
//               <div className="mb20">
//                 <label className="heading-color ff-heading fw600 mb10">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter Title"
//                   {...register("title")}
//                 />
//                 {errors.title && (
//                   <p className="fz13 pl10 text validation-error">
//                     {errors.title?.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//             {/* author */}
//             <div className="col-sm-6">
//               <div className="mb20">
//                 <label className="heading-color ff-heading fw600 mb10">
//                   Author
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter Author Name"
//                   {...register("publishedBy")}
//                 />
//                 {errors.publishedBy && (
//                   <p className="fz13 pl10 text validation-error">
//                     {errors.publishedBy?.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//             {/* tags */}
//             <div className="col-sm-6">
//               <div className="mb20">
//                 <label className="heading-color ff-heading fw600 mb10">
//                   Tags
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter Tags"
//                   {...register("tags", {
//                     onChange: (e) => {
//                       const value = e.target.value.replace(/[\s]/g, ",");
//                       console.log(value);
//                       if (value) {
//                         setValue("tags", value);
//                       }
//                     },
//                   })}
//                 />
//                 {errors.tags && (
//                   <p className="fz13 pl10 text validation-error">
//                     {errors.tags?.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//             {/* Categories */}
//             <div className="col-sm-6">
//               <div className="mb20">
//                 <label className="heading-color ff-heading fw600 mb10">
//                   Categories
//                 </label>
//                 <Select
//                   styles={customStyles}
//                   classNamePrefix="select"
//                   placeholder="Search Categories..."
//                   onChange={(selectedOption: any) => {
//                     handleChange(selectedOption);
//                   }}
//                   value={
//                     watch("categories") && {
//                       label: watch("categories"),
//                       value: watch("categories"),
//                     }
//                   }
//                   options={options}
//                   noOptionsMessage={() => (
//                     <div className="no-options-message">
//                       No Categories Added.
//                     </div>
//                   )}
//                 />

//                 <div className="w-100 d-flex justify-content-end">
//                   <button
//                     type="button"
//                     style={{
//                       fontSize: "1rem",
//                     }}
//                     className="lead mt-2 ud-btn btn-dark"
//                     data-bs-toggle="modal"
//                     data-bs-target="#CategoriesModal"
//                   >
//                     Add New Categories
//                     <i
//                       style={{
//                         transform: "rotate(0deg)",
//                       }}
//                       className="fa-regular fa-circle-plus ms-2"
//                     ></i>
//                   </button>
//                 </div>
//                 {/* <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Select Categories"
//                   {...register('categories')}
//                 /> */}
//                 {errors.categories && (
//                   <p className="fz13 pl10 text validation-error">
//                     {errors?.categories?.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//           {/* upload image */}
//           <div className="row p-0">
//             <UploadMedia
//               uploadedImages={uploadedImages}
//               setUploadedImages={setUploadedImages}
//               featured={"Blogs"}
//               fileType={""}
//             />
//             {errors.images && (
//               <p className="fz13 pl10 text validation-error">
//                 {errors?.images?.message}
//               </p>
//             )}
//           </div>

//           {/* discription */}
//           <div className="col-sm-12">
//             {Object.keys(editorData).length !== 0 && blogSlug !== null && (
//               <>
//                 <label className="heading-color ff-heading fw600 mb10">
//                   Description
//                 </label>
//                 <Editor setEditorData={setEditorData} editorData={editorData} />
//               </>
//             )}
//             {(Object.keys(editorData).length === 0 || blogSlug === null) && (
//               <>
//                 <label className="heading-color ff-heading fw600 mb10">
//                   Description
//                 </label>
//                 <Editor setEditorData={setEditorData} editorData={editorData} />
//               </>
//             )}
//             {/* {editorData && <Output blocks={editorData} />} */}
//           </div>
//           <div className="row justify-content-center">
//             <div className="col-2">
//               <button className="ud-btn btn-thm ra-na" type="submit">
//                 Submit
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Blog;
