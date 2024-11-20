import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faSpotify } from '@fortawesome/free-brands-svg-icons';
import Button from '../../atoms/custom-button/button';

const ArticleCard: React.FC<{ src: string; alt: string; title: string }> = ({ src, alt, title }) => (
  <div className="w-full">
    <img src={src} alt={alt} className="w-full md:h-full rounded-md mb-2" />
    <div className="text-center text-white">{title}</div>
  </div>
);

const ArticleCardList = [
  { title: 'Business Articles', images: 'https://via.placeholder.com/150' },
  { title: 'Holiday Articles', images: 'https://via.placeholder.com/150' },
  { title: 'Environment & Sustainability Articles', images: 'https://via.placeholder.com/150' },
];

const Blogs: React.FC = () => {
  return (
    <div className="p-2 md:p-4">
      {/* Blog Title */}
      <div className="text-orange-500  text-xl text-left mb-4">
        <span className="mr-2">→</span>Blog
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 gap-4 flex flex-col">
          <Button className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-md w-full md:w-fit md:ms-auto">
            Contribute
          </Button>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ArticleCardList.map((eachArticle, index) => (
              <ArticleCard key={index} src={eachArticle.images} alt={eachArticle.title} title={eachArticle.title} />
            ))}
          </div>
        </div>
        <div className="md:ml-6 flex flex-col flex-grow gap-4">
          <div className="bg-gray-700 text-white rounded-md aspect-video flex">
            <p className="m-auto">Business Videos</p>
          </div>
          <div className="bg-gray-700 text-white rounded-md aspect-video flex">
            <p className="m-auto">Holiday Videos</p>
          </div>
          <div className="bg-gray-700 text-white rounded-md aspect-video flex">
            <div className=" gap-2 m-auto">
              <p>Our Podcast</p>
              <span className="text-white m-4 text-2xl relative top-1">
                {/* Add appropriate icons */}
                <FontAwesomeIcon icon={faYoutube} />
              </span>
              |
              <span className="text-white m-4 text-2xl relative top-1">
                <FontAwesomeIcon icon={faSpotify} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
