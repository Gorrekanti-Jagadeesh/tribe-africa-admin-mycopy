import React from 'react';
import BlogCard from '../../atoms/card/blog-card';

interface BlogCardDataProps {
  image: string;
  title?: string;
  redirectUrl: string;
}

interface BlogListingProps {
  heading: string;
  data: BlogCardDataProps[];
}

const BlogListing: React.FC<BlogListingProps> = (data) => {
  return (
    <div className="max-w-6xl m-auto">
      <h2 className="text-4xl my-4">{data.heading}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
        {data.data.slice(0).map((item, index) => (
          <BlogCard data={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BlogListing;
