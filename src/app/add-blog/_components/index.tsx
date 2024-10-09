"use client";

import React, {
  KeyboardEventHandler,
  useState,
  useId,
  ChangeEvent,
  useRef,
  useEffect,
} from "react";
import { SubmitHandler, useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select, { StylesConfig } from "react-select";
import blogSchema, { BlogType } from "@/validations/blog";
import { v4 as uuid4 } from "uuid";
import CreatableSelect from "react-select/creatable";
import uploadIcon from "../../../svg/file-upload.svg";
import PlusSign from "../../../svg/circle-plus.svg";
import deleteIcon from "../../../svg/trash.svg";
import Image from "next/image";
// import BlogEditor from "./BlogEditor";
// import Editor from './Editor'
import Modal from "./Modal";
import { OutputData } from "@editorjs/editorjs";

import dynamic from "next/dynamic";
import actionFeaturedImage from "@/action/actionImage";

const EditorOld = dynamic(() => import("./Editor.js"), { ssr: false });

const options = [
  { value: "chocolate1", label: "Chocolate" },
  { value: "strawberry2", label: "Strawberry" },
  { value: "vanilla3", label: "Vanilla" },
  { value: "flavor4", label: "Flavor 4" },
  { value: "flavor5", label: "Flavor 5" },
  { value: "flavor6", label: "Flavor 6" },
  { value: "flavor7", label: "Flavor 7" },
  { value: "flavor8", label: "Flavor 8" },
  { value: "flavor9", label: "Flavor 9" },
  { value: "flavor10", label: "Flavor 10" },
  { value: "flavor11", label: "Flavor 11" },
  { value: "flavor12", label: "Flavor 12" },
  { value: "flavor13", label: "Flavor 13" },
];

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string, i: string) => ({
  label,
  value: i,
});

const Blog = () => {
  type OptionType = { label: string; value: string };
  const [showModal, setShowModal] = useState(false);
  const [slugText, setSlugText] = useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [value, setValue] = React.useState<OptionType[]>([]);
  const [image, setImage] = useState<null | string>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const [editorData, setEditorData] = useState<OutputData>({} as OutputData);
  // const [editorMounted, setEditorMounted] = useState(false);

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createOption(inputValue, uuid4())]);
        setInputValue("");
        event.preventDefault();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      // Ensure it's an image before creating an object URL
      if (file.type.startsWith("image/")) {
        setImage(URL.createObjectURL(file));
      } else {
        alert("Please upload a valid image file (PNG or JPEG).");
      }
    } else {
      console.error("No file selected.");
    }
  };

  const {
    handleSubmit,
    register,
    watch,
    trigger,
    control,
    setValue: hookSetVelue,
    formState: { errors },
  } = useForm<BlogType>({
    defaultValues: {
      title: "",
      slug: "",
      author: "",
      tags: [],
      categories: "",
      images: [],
      blogDetails: "",
    },
    resolver: zodResolver(blogSchema),
  });
  const { field } = useController({ name: "categories", control });
  const {
    value: categoriesValue,
    onChange: categoriesOnChange,
    ...restCategroiesField
  } = field;

  useEffect(() => {
    const arr =
      value.reduce((acc: string[], ele) => {
        acc.push(ele.label);
        return acc;
      }, []) || [];
    hookSetVelue("tags", arr);
  }, []);

  // useEffect(() => {
  //   // setValue('blogDetails', JSON.stringify(editorData));
  //   hookSetVelue('blogDetails', JSON.stringify(editorData));
  // }, [editorData]);

  useEffect(() => {
    hookSetVelue("blogDetails", JSON.stringify(editorData));
  }, [editorData]);
  console.log(watch("blogDetails"));

  useEffect(() => {
    hookSetVelue("slug", slugText);
  }, []);

  const onSubmit: SubmitHandler<BlogType> = (data) => {
    console.log(data);
  };

  const colourStyles: StylesConfig = {
    control: (styles) => ({ ...styles, minHeight: "50px" }),
    option: (styles) => {
      return {
        ...styles,
        color: "#000",
        opacity: "50%",
        width: "95%",
        display: "inline-block",
        margin: "5px",
      };
    },
  };
  const colourStylesCreatable: StylesConfig = {
    control: (styles) => ({
      ...styles,
      minHeight: "56px",
      fontWeight: "500",
      borderRadius: "10px",
    }),
    option: (styles) => ({
      ...styles,
    }),

    multiValue: (styles) => {
      return {
        ...styles,
        color: "#00000059",
        borderRadius: "5px",
        backgroundColor: "hsl(0deg 0% 78.84%)",
      };
    },
  };
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };
  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload an image file");
    }
  };

  useEffect(() => {
    const handleUpload = async () => {
      if (image) {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", image);
        formData.append("folder", "blog");
        const res = await actionFeaturedImage(formData);
        if (!!res && !("statusCode" in res)) {
          hookSetVelue("images", res.url);
          if (trigger) trigger("images", res.url);
        }
        setLoading(false);
      }
    };
    handleUpload();
  }, [image]);

  return (
    <div className="bg-gray-200  h-">
      <h1 className="text-2xl text-black font-medium font-wider px-12 py-8">
        Add Blog{" "}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 mx-8 bg-white rounded-md  xl:bg-whit min-h-96"
      >
        <div className="flex flex-col gap-2 sm:flex sm:flex-row sm:flex-wrap  sm:gap-0 sm:p-2 ">
          <div className="w-full my-2 sm:w-3/6  sm:px-2">
            <label className="flex flex-col text-black font-bold text-lg mb-3 xl:text-2xl xl:my-2">
              Title
            </label>
            <input
              className="outline outline-1 outline-gray-300 rounded-md p-4   placeholder:text-lg placeholder:text-black placeholder:opacity-50 text-gray-700 font-medium w-full focus:ring-4 focus:ring-blue-200 focus:outline-1 focus:outline-blue-300   "
              type="text"
              placeholder="Enter Title"
              {...register("title")}
            />
            {errors.title?.message && (
              <p className="text-red-500">{errors.title?.message}</p>
            )}
          </div>
          <div className="w-full sm:w-3/6 sm:my-2  sm:px-2">
            <label className="flex flex-col text-black font-bold text-lg mb-3 xl:text-2xl xl:my-2">
              Author
            </label>
            <input
              className="outline outline-1 outline-gray-300 rounded-md p-4   placeholder:text-lg placeholder:text-black placeholder:opacity-50 text-gray-700 font-medium w-full focus:ring-4 focus:ring-blue-200 focus:outline-blue-300 "
              type="text"
              placeholder="Enter Author Name"
              {...register("author")}
            />
            {errors.author?.message && (
              <p className="text-red-500">{errors.author?.message}</p>
            )}
          </div>
          <div className="w-full sm:w-3/6  sm:px-2">
            <label className="flex flex-col text-black font-bold text-lg mb-3 xl:text-2xl xl:my-2">
              Tags
            </label>
            <CreatableSelect
              instanceId={useId()}
              components={components}
              inputValue={inputValue}
              isClearable
              isMulti
              menuIsOpen={false}
              onChange={(newValue) => setValue(newValue as OptionType[])}
              onInputChange={(newValue) => setInputValue(newValue)}
              onKeyDown={handleKeyDown}
              placeholder="Type something and press enter..."
              value={value}
              styles={colourStylesCreatable}
            />
            {errors.tags?.message && (
              <p className="text-red-500">{errors.tags?.message}</p>
            )}

            <p></p>
          </div>
          <div className="w-full sm:w-3/6  sm:px-2">
            <label className="flex flex-col text-black font-bold text-lg mb-3 xl:text-2xl xl:my-2">
              Slug
            </label>
            <input
              value={slugText}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setSlugText(
                  e.target.value
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-")
                    .toLowerCase()
                );
              }}
              className="outline outline-1 outline-gray-300 rounded-md p-4   placeholder:text-lg placeholder:text-black placeholder:opacity-50  text-gray-700 font-medium w-full  focus:ring-4 focus:ring-blue-200 focus:outline-blue-300 "
              type="text"
              placeholder="Enter Slug"
            />
            {errors.slug?.message && (
              <p className="text-red-500">{errors.slug?.message}</p>
            )}
          </div>
          <div className="w-full flex flex-col   sm:px-2 sm:ml-[50%]  sm:w-1/2 ">
            <label className="flex flex-col text-black w-full  font-bold text-lg mb-3 xl:text-2xl xl:my-2  ">
              Categories
            </label>
            <Select
              instanceId={useId()}
              className="outline outline-1 outline-gray-300 rounded-md    placeholder:text-lg placeholder:text-black font-medium w-full   focus:ring-4 focus:ring-blue-200 "
              value={
                categoriesValue
                  ? options.find(
                      (currentVal) =>
                        currentVal.value?.toString() ===
                        categoriesValue.toString()
                    )
                  : categoriesValue
              }
              onChange={(option) =>
                categoriesOnChange(option ? (option as OptionType).value : "")
              }
              {...restCategroiesField}
              options={options}
              styles={colourStyles}
            />
            {errors.categories?.message ? (
              <p className="text-red-500  ">Categories is required </p>
            ) : (
              <p className="text-red-500 text-center text-md m-1">
                {errors.categories?.message}
              </p>
            )}
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className=" flex  align-top   items-center    rounded-xl  my-2 font-medium text-lg  sm:w-full  sm:align-baseline sm:max-w-fit place-self-end sm:place-self-end 
              btn group relative  justify-start overflow-hidden  bg-gray-300 px-2.5 py-1.5  transition-all hover:bg-white"
            >
              <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-56 translate-x-full translate-y-full rounded bg-black transition-all duration-500 ease-out group-hover:mb-32 group-hover:ml-0 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                Add New Categories{" "}
              </span>
              <span>&#8239;</span>{" "}
              <Image
                className="z-10 hover:white "
                src={PlusSign}
                alt="plus-sign"
              />
            </button>

            {showModal && <Modal setShowModal={setShowModal} />}
          </div>
          {/* outline-red-500 outline-2 */}
          <div className="w-full h-10/12     ">
            <h4 className="text-3xl text-black font-bold font-wider my-4 ">
              Blogs
            </h4>
            <div
              className=" outline-dashed outline-[#60b6ba] outline-1   rounded-lg flex flex-col"
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              {...register("images")}
            >
              <Image
                className="mx-auto min-h-40 min-w-40 w-auto h-auto py-10 xl:py-0"
                src={uploadIcon}
                alt="upload-file"
              />
              <p className="text-black text-lg font-medium leading-5 my-2 text-center px-4">
                Upload/Drag photos of your property
              </p>
              <p className="text-black text-lg font-medium leading-5 my-2 text-center px-4">
                File Type must be image/png, image/jpeg format and at least
                2048x768
              </p>

              <div className="mx-auto my-4">
                <label
                  className="cursor-pointer inline-block bg-white text-black py-3 px-6 rounded-2xl outline outline-1 font-bold border-black text-md"
                  htmlFor="customFileInput"
                >
                  Browse Files
                </label>
                <input
                  id="customFileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="h-auto mx-auto flex flex-col justify-center content-center ">
              {image ? (
                <>
                  <Image
                    onClick={() => setImage(null)}
                    className="relative left-2/4 h-8 w-8 cursor-pointer  "
                    src={deleteIcon}
                    alt="deleteIcon"
                  />
                  <Image
                    className="mx-auto min-h-40 min-w-40 "
                    priority={true}
                    style={{ width: "auto", height: "auto" }}
                    src={image}
                    width="200"
                    height="200"
                    alt="preview"
                  />
                </>
              ) : null}
              {errors?.images?.message && (
                <p className="text-red-500">Image is required</p>
              )}
            </div>
          </div>

          <div className="w-full h-10/12 text-black">
            <h4 className="text-3xl text-black font-bold font-wider my-4 ">
              Description
            </h4>
            <div className="w-full outline outline-3  outline-gray-300 p-5 rounded-xl  ">
              {/* <BlogEditor
                  setEditorData={setEditorData}
                  editorMounted={editorMounted}
                  setEditorMounted={setEditorMounted}
                  /> */}
              <EditorOld
                setEditorData={setEditorData}
                editorData={editorData}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className=" flex mx-auto align-top   items-center    rounded-xl  my-2 font-medium text-lg  sm:w-full  sm:align-baseline sm:max-w-fit place-self-end sm:place-self-end 
              btn group relative  justify-start overflow-hidden  bg-gray-300 px-2.5 py-1.5  transition-all hover:bg-white"
        >
          <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-56 translate-x-full translate-y-full rounded bg-black transition-all duration-500 ease-out group-hover:mb-32 group-hover:ml-0 group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
            Submit
          </span>
        </button>
      </form>
    </div>
  );
};

export default Blog;
