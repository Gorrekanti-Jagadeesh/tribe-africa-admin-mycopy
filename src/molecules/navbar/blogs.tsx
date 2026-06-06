import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faSpotify } from '@fortawesome/free-brands-svg-icons';
import Button from '../../atoms/custom-button/button';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { sanityImageUrlBuilder } from '@api/index';
import { useNavigate, useParams } from 'react-router';
import { fromKebabCase, toKebabCase } from '@utils/common';
import Modal from '@molecules/modal';
import BlogCompose from '@molecules/blogs/blog-compose';

const Blogs = () => {
  const { country } = useParams();
  const navigation = useNavigate();
  const customCountry = country ? fromKebabCase(country) : 'Home';
  const [isContributeOpen, setIsContributeOpen] = useState(false);

  const {
    data: blogData,
    error: blogError,
    isLoading: blogLoading,
  } = useQuery({
    queryKey: ['blogs-categories-data'],
    queryFn: () => sanity.GET(`*[_type == "blog-categories" && country == "${customCountry}"][0]`),
  });

  if (blogLoading) return <div className="p-4 font-poppins">Loading...</div>;
  if (blogError) return <div className="p-4 font-poppins text-red-500">Error loading blogs</div>;

  return (
    <div className="p-3 md:p-4">
      <Modal
        isOpen={isContributeOpen}
        setIsOpen={setIsContributeOpen}
        containerClasses="ms-auto"
        customClasses="w-full"
      >
        <BlogCompose className="bg-white overflow-auto p-4 rounded-[10px]" />
      </Modal>
      {/* Header */}
      <div className="flex items-center mb-4 gap-3">
        <h4 className="text-brand-orange font-poppins font-semibold text-lg">&rarr; Blogs</h4>
        <Button className="md:ms-auto" onClick={() => setIsContributeOpen(true)}>
          Contribute
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Blog categories grid */}
        <div className="md:w-2/3 flex flex-col gap-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {blogData?.articles?.map((each, index: number) => (
              <div
                className="w-full cursor-pointer group"
                key={index}
                onClick={() => {
                  country
                    ? navigation(`/${country}/${toKebabCase(each.articleType)}/blogs`)
                    : navigation(`/${toKebabCase(each.articleType)}/blogs`);
                }}
              >
                <img
                  src={sanityImageUrlBuilder(each.categoryImage).url()}
                  alt={each.articleType}
                  className="w-full rounded-[10px] mb-2 object-cover group-hover:ring-2 group-hover:ring-brand-orange transition-all"
                  style={{ aspectRatio: '424/351' }}
                />
                <div className="text-center text-white font-poppins font-medium text-sm">
                  {each.articleType} Articles
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video / podcast sidebar */}
        <div className="md:ml-4 flex flex-col flex-grow gap-3">
          <div
            className="bg-gray-700 text-white rounded-[10px] flex items-center justify-center font-poppins"
            style={{ aspectRatio: '16/9' }}
          >
            <p>Business Videos</p>
          </div>
          <div
            className="bg-gray-700 text-white rounded-[10px] flex items-center justify-center font-poppins"
            style={{ aspectRatio: '16/9' }}
          >
            <p>Holiday Videos</p>
          </div>
          <div
            className="bg-gray-700 text-white rounded-[10px] flex items-center justify-center font-poppins"
            style={{ aspectRatio: '16/9' }}
          >
            <div className="text-center">
              <p className="mb-2">Our Podcast</p>
              <div className="flex gap-4 justify-center text-2xl">
                <FontAwesomeIcon icon={faYoutube} className="hover:text-red-500 transition-colors cursor-pointer" />
                <FontAwesomeIcon icon={faSpotify} className="hover:text-green-500 transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
