import { actionGetSingleBlog } from "@/action/actionBlog";
import Image from "next/image";
import React from "react";
import RandomImg from '@/svg/RandomImg.jpg'
import { getCldImageUrl } from "next-cloudinary";
import EditorOutput from  './_components/EditorOutput'

interface Props {
  params: { slug: string };
}

export default async function page({ params }: Props) {
  const res = await actionGetSingleBlog(params.slug);
  console.log(res);

  if ("statusCode" in res) {
    return <h1 className="text-center mt-8">{res.message}</h1>;
  }
  console.log(JSON.parse(res.blogDetails).blocks);

  

  return (<div className="h-full bg-[#f2f1ed]  text-black">
        <h2 className="text-xl leading-snug mx-3 py-10   sm:mx-[5%] sm:text-2xl  md:text-3xl ">{res.title}</h2>
            <div className="flex  flex-col md:flex sm:flex-row sm:mx-[5%] flex-wrap sm:gap-3 gap-1 mx-3">
                <p className="text-lg font-medium">Published By - <span className="opacity-40 font-normal">{res.author}</span></p>
                <p className="text-lg font-medium">Categories - <span className="opacity-40 font-normal">{res.categories}</span></p>
                <p className="text-lg font-medium">
                    tags -
                    {
                        res.tags.map((tag:any, i:number)=> { 
                            return <span key={i} className="outline outline-black outline-2 rounded-full text-sm text-black px-2 mx-2  md:text-md">{tag}</span>
                        })
                    }
                </p>
            </div>
            <div className="my-10  ">
                <Image className="w-[90%]  mx-auto lg:max-w-[60%] lg:h-[30%]   " src={getCldImageUrl({src :res.images[0] })} alt="random-photo" width={200} height={200} />
               
                <br />
                <EditorOutput blocks={JSON.parse(res.blogDetails).blocks} />
            </div>
    {/* {params.slug} */}
  </div>);
}
