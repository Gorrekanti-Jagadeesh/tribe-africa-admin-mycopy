import React from 'react';

interface BlogDataProps {
  title: string;
  image: string;
  content: string;
}

const BlogView: React.FC<BlogDataProps> = (data) => {
  return (
    <div className="p-4 max-w-6xl m-auto flex flex-col gap-6">
      <h1 className="text-4xl my-4 font-semibold">{data.title}</h1>
      <img src={data.image} />
      <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
    </div>
  );
};

export default BlogView;
