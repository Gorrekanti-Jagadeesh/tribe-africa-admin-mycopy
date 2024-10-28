import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faSpotify } from '@fortawesome/free-brands-svg-icons';

const BlogScreen: React.FC = () => {
  return (
    <div className="p-4">
      {/* Blog Title */}
      <div className="text-orange-500  text-xl text-left mb-4">
        <span className="mr-2">→</span>Blog
      </div>

      <div className="flex">
        <div className="w-2/3 gap-4 flex flex-col">
          <button className="bg-orange-500 text-white font-semibold px-4 py-2 rounded-md w-fit ms-auto">
            Contribute
          </button>
          <div className="grid grid-cols-3 gap-4">
            <div className="w-full">
              <img
                src="https://via.placeholder.com/150"
                alt="Business Articles"
                className="w-full h-full rounded-md mb-2"
              />
              <div className="text-center text-white">Business Articles</div>
            </div>

            {/* Holiday Articles */}
            <div className="w-full">
              <img
                src="https://via.placeholder.com/150"
                alt="Holiday Articles"
                className="w-full h-full rounded-md mb-2"
              />
              <div className="text-center text-white">Holiday Articles</div>
            </div>

            {/* Environment & Sustainability Articles */}
            <div className="w-full">
              <img
                src="https://via.placeholder.com/150"
                alt="Environment & Sustainability Articles"
                className="w-full h-full rounded-md mb-2"
              />
              <div className="text-center text-white">Environment & Sustainability Articles</div>
            </div>
          </div>
        </div>

        <div className="ml-6 flex flex-col flex-grow gap-4">
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

export default BlogScreen;
