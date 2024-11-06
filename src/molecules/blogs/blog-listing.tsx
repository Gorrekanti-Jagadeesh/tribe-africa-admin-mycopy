import React from 'react';
import BlogCard from '../../atoms/card/blog-card';

interface BlogCardDataProps {
  _id: string;
  image: string;
  title?: string;
  redirectUrl: string;
}

interface BlogListingProps {
  heading: string;
  data: BlogCardDataProps[];
}

const BlogListing: React.FC<BlogListingProps> = ({ heading, data }) => {
  return (
    <div className="max-w-6xl m-auto">
      <h2 className="text-4xl my-4">{heading}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
        {data.map((item, index) => (
          <BlogCard data={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BlogListing;
