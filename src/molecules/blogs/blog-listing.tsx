import React from 'react';

import BlogCard from '../../atoms/card/blog-card';
import DualHeading from '../../atoms/heading/dual-heading';

import { BlogContentProps } from '../../types';

const BlogListing: React.FC<{ heading: string; blogList: BlogContentProps[] }> = ({ heading, blogList }) => {
  return (
    <div className="max-w-6xl w-full m-auto">
      <DualHeading>{heading}</DualHeading>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-auto">
        {blogList.map((item, index) => (
          <BlogCard data={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BlogListing;
