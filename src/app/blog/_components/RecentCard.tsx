import Image from "next/image";
import React from "react";
import randonImg from "@/svg/RandomImg.jpg";
import { getCldImageUrl } from "next-cloudinary";
const RecentCard = (props: any) => {
  const {
    author,
    slug,
    title,
    tags,
    categories,
    image,
    createdAt,
    blogDetail,
  } = props;
  // console.log(author,);
  const blogText = JSON.parse(blogDetail).blocks;
  let blogTextPreview = "";
  const getText = (blogText: any) => {
    blogText.forEach((itm: any) => {
      if (itm.type == "paragraph") {
        blogTextPreview += itm.data.text;
      }
    });
  };
  getText(blogText);
  console.log(image);
  return (
    <>
      <div className="h-52  flex sm:max-w-2xl m-auto lg:w-1/2 lg:h-1/3">
        <div className="w-[45%] overflow-hidden">
            <a href={`/blog/${slug}`}>
          <Image
            width={200}
            height={200}
            className=" min-w-36 object-contain"
            style={{ width: "100%", height: "100%" }}
            src={getCldImageUrl({ src: image[0] })}
            alt="some-photo"
          />
          </a>
        </div>
        <div className="w-[55%] p-1 pl-3 flex flex-col justify-around content-center bg-white ">
          <div className=" flex flex-row gap-4 text-black  ">
            <span className="text-sm">{author}</span>
            <span className="text-sm">{createdAt.substring(0, 10)}</span>
          </div>
          <h4 className="text-sm text-black">{title}</h4>
          <p className="text-sm text-black">{blogTextPreview}...</p>
          <div className="my-3 flex flex-wrap gap-2">
            {tags.map((tag: string, index: number) => {
              return (
                <span
                  key={index}
                  className="outline outline-black outline-2 rounded-full text-sm text-black px-2  md:text-md  "
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentCard;
