import { useState } from 'react';
import Button from '@atoms/custom-button/button';
import UnderlineHeading from '@atoms/heading/underline-heading';
import BlogCard from '../../atoms/card/blog-card';
import DualHeading from '../../atoms/heading/dual-heading';
import BlogCompose from '@molecules/blogs/blog-compose';
import Modal from '@molecules/modal';

const BlogPageScreen = ({ country, data, banner, blogCategory }) => {
  const [openModal, setOpenModal] = useState(false);

  console.log('hello');

  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      <div className="flex flex-col gap-4">
        <div id="header" className="flex mb-4">
          <UnderlineHeading>{`${country} ${country && '-'} ${blogCategory} Articles`}</UnderlineHeading>
          <Button className="ms-auto">Get Featured</Button>
        </div>
        <div id="banner" className="bg-gray-100 flex justify-center p-12">
          <img className="aspect-square max-w-80" src={banner} />
          <div className="flex flex-col gap-4 bg-white p-4 max-h-48 my-auto relative right-4">
            <h4 className="text-lg font-semibold">Top Businesses in 2024</h4>
            <div className="overflow-auto flex flex-col gap-2">
              {[1, 2, 3, 4, 5].map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-6xl w-full m-auto">
          {/* <Dropdown
            iconVisible={true}
            placeholderText="Language"
            searchable={false}
            options={Languages}
            action={(value: string) => setSelectedLanguage(value)}
            buttonStyles={'md:w-32 '}
          /> */}
          <div className="flex w-full">
            <DualHeading>Recent Articles</DualHeading>
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
