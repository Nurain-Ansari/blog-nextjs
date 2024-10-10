import Image from 'next/image';
import React from 'react'
import RandomImg from '@/svg/RandomImg.jpg'
import parse from 'html-react-parser'
import { getCldImageUrl } from 'next-cloudinary';

const Card = (props : any) => {
  const {author, slug, title, tags, categories, image , createdAt, blogDetail} = props;
  const formattedDate: string = new Date(createdAt).toLocaleDateString('en-GB').slice(0, 8).replace(/\//g, '-');
  const blogText = JSON.parse(blogDetail).blocks; 
  let blogTextPreview  = "";
  const getText = (blogText:any) => { 
    blogText.forEach((itm:any) => { 
        if(itm.type == 'paragraph') { 
            blogTextPreview += itm.data.text;
        }
    })
  }
  getText(JSON.parse(blogDetail).blocks)
  return (
    <>
        <div className=" max-w-prose  p-2 bg-white  md:w-5/12 lg:w-[23%] ">
            {/* <Image className='aspect-video' src={RandomImg} alt={"upload img"} style={{width : 'auto'}} /> */}
            <a href={`/blog/${slug}`}>

            <Image
            width={200}
            height={200}
            className="min-w-36 object-contain"
            style={{ width: "100%", height: "100%" }}
            src={getCldImageUrl({ src: image[0] })}
            alt="some-photo"
            />
            </a>
            <span className='text-black opacity-80 my-3 max-w-fit md:text-md lg:text-lg'>{author}</span>
                    <span  className='text-sm text-black mx-2'>{formattedDate}</span>
            <h4 className='text-black my-3 max-w-fit md:text-sm '>{title}</h4>
            <p className=' text-black opacity-60 leading-tight text-sm  text-justify text-wrap md:text-sm'>{parse(blogTextPreview.substring(0,100))}...</p>
            <div className='my-3 flex flex-wrap gap-2'>
                <span className='outline outline-black outline-2 rounded-full text-sm text-black px-2  md:text-md'>asdfasf</span>
                {
                  tags.map((tag:string, index:number) => { 
                    return <span key={index} className='outline outline-black outline-2 rounded-full text-sm text-black px-2  md:text-md'>{tag}</span>
                  })
                }
                {
                    categories.map((tag:string, index:number) => { 
                      return <span key={index} className='outline outline-black outline-2 rounded-full text-sm text-black px-2  md:text-md'>{tag}</span>
                    })
                }

                
            </div>
        </div>
    </>
  )
}

export default Card;