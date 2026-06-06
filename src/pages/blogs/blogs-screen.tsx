import { useState } from 'react';
import Button from '@atoms/custom-button/button';
import BlogCard from '../../atoms/card/blog-card';
import BlogCompose from '@molecules/blogs/blog-compose';
import Modal from '@molecules/modal';

const BlogPageScreen = ({ country, data, banner, blogCategory }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="px-4 py-6 max-w-8xl m-auto">
      <div className="flex flex-col gap-6">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-poppins font-normal text-3xl md:text-4xl text-black">
              {`${country}${country && ' — '}${blogCategory} Articles`}
            </h1>
            <div className="border-b-2 border-brand-orange mt-2 w-3/4" />
          </div>
          <Button className="shrink-0 text-lg px-8 py-3" onClick={() => setOpenModal(true)}>
            Get Featured
          </Button>
        </div>

        {/* Banner */}
        <div className="bg-gray-100 rounded-[10px] flex justify-center items-center p-8 gap-4 overflow-hidden">
          <img className="rounded-[10px] object-cover w-64 h-64 shrink-0" src={banner} alt="Blog banner" />
          <div className="bg-white rounded-[10px] p-4 max-h-64 overflow-auto shadow-sm flex flex-col gap-3 min-w-0">
            <h4 className="font-poppins font-semibold text-xl">Top Businesses in 2024</h4>
            <div className="flex flex-col gap-2">
              {[1, 2, 3, 4, 5].map((item, index) => (
                <p key={index} className="font-poppins text-sm text-gray-600">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Articles section */}
        <div className="w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="font-rufina font-normal text-4xl md:text-5xl lg:text-[64px] lg:leading-[79px] text-black">
              Recent Articles
            </h2>
            <Modal
              isOpen={openModal}
              setIsOpen={setOpenModal}
              containerClasses="ms-auto"
              trigger={
                <button
                  onClick={() => setOpenModal(true)}
                  className="font-poppins font-medium text-brand-orange hover:underline"
                >
                  Write a blog
                </button>
              }
              customClasses="w-full"
            >
              <BlogCompose className="bg-white overflow-auto p-4 rounded-[10px]" />
            </Modal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {data.map((item, index) => (
              <BlogCard data={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPageScreen;
