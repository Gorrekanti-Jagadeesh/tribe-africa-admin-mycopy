import React, { useState, useEffect } from 'react';

import BlogCard from '../../atoms/card/blog-card';
import DualHeading from '../../atoms/heading/dual-heading';
import BlogCompose from './blog-compose';

import { getDataByEntryType } from '../../api';
import { parseImageUrl } from '../../utils/sanity';

import { BlogContentProps } from '../../types';
import Modal from '../modal';

const BlogListing: React.FC<{ heading: string }> = ({ heading }) => {
  const [blogList, setBlogList] = useState<BlogContentProps[]>([]);
  useEffect(() => {
    getDataByEntryType('blog')
      .then((res: any[]) => {
        setBlogList(
          res.map((item: { _id: any; title: any; image: { asset: { _ref: string } }; content: any }) => {
            return {
              _id: item._id,
              title: item.title,
              image: parseImageUrl(item.image.asset._ref),
              content: item.content,
            };
          })
        );
      })
      .catch((err: any) => console.error(err));
  }, []);
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="max-w-6xl w-full m-auto">
      <div className="flex w-full">
        <DualHeading>{heading}</DualHeading>
        <Modal
          isOpen={openModal}
          setIsOpen={setOpenModal}
          containerClasses="ms-auto"
          trigger={
            <button onClick={() => setOpenModal(true)} className="ms-auto underline">
              write a blog
            </button>
          }
          customClasses="w-full"
        >
          <BlogCompose className="bg-white overflow-auto p-4 rounded-lg" />
        </Modal>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-auto">
        {blogList.map((item, index) => (
          <BlogCard data={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BlogListing;
