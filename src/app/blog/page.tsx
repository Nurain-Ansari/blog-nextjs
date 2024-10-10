import { actionGetBlog } from "@/action/actionBlog";
import React from "react";
import Card from "./_components/Card";
import RecentCard from "./_components/RecentCard";
const page = async () => {
  const res = await actionGetBlog({});
  if ("statusCode" in res) {
    return <p>{JSON.stringify(res.message)}</p>;
  }

  return (
    <div>
      {res.results.length >= 2 && (
        <>
          <h1 className="pl-4 lg:pl-7 lg:py-4 text-black bg-white ">
            Recent Blog
          </h1>
          <div className="w-full h-full py-2 bg-white flex-auto lg:flex lg:flex-row lg:flex-wrap lg:gap-3 lg:px-4">
            {res.results.filter((ele, i) => i < 2 ).map((recentCard, i) => {
              return (
                <RecentCard
                  key={i}
                  author={recentCard.author}
                  slug={recentCard}
                  title={recentCard.title}
                  tags={recentCard.tags}
                  categories={recentCard.categories}
                  image={recentCard.images}
                  createdAt={recentCard.createdAt}
                  blogDetail={recentCard.blogDetails}
                />
              );
            })}
          </div>
        </>
      )}

      <h1 className="pl-4 lg:pl-10 lg:py-4 text-black bg-white ">All Blog</h1>
      <div className="bg-white  h-full flex flex-col gap-5 justify-center items-center px-2 py-2   md:flex md:flex-row md:flex-wrap">
        {res.results.length >= 4 &&
          res.results.map((card: any) => {
            return (
              <Card
                key={card._id}
                author={card.author}
                slug={card}
                title={card.title}
                tags={card.tags}
                categories={card.categories}
                image={card.images}
                createdAt={card.createdAt}
                blogDetail={card.blogDetails}
              />
            );
          })}
      </div>
    </div>
  );
};

export default page;
