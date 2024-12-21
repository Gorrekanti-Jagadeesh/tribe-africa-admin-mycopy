import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faSpotify } from '@fortawesome/free-brands-svg-icons';
import Button from '../../atoms/custom-button/button';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { sanityImageUrlBuilder } from '@api/index';
import { useNavigate, useParams } from 'react-router';
import { fromKebabCase, toKebabCase } from '@utils/common';

const Blogs = () => {
  const { country } = useParams();
  const navigation = useNavigate();

  const customCountry = country ? fromKebabCase(country) : 'Home';

  const {
    data: blogData,
    error: blogError,
    isLoading: blogLoading,
  } = useQuery({
    queryKey: ['blogs-categories-data'],
    queryFn: () => sanity.GET(`*[_type == "blog-categories" && country == "${customCountry}"][0]`),
  });

  if (blogLoading) {
    return 'loading';
  }

  if (blogError) {
    return 'Error';
  }

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
            {blogData.articles.map((each, index: number) => (
              <div
                className="w-full"
                key={index}
                onClick={() => {
                  country
                    ? navigation(`/${country}/${toKebabCase(each.articleType)}/blogs`)
                    : navigation(`/${toKebabCase(each.articleType)}/blogs`);
                }}
              >
                <img
                  src={sanityImageUrlBuilder(each.categoryImage)}
                  alt={each.articleType}
                  className="w-full md:h-full rounded-md mb-2"
                />
                <div className="text-center text-white">{each.articleType}</div>
              </div>
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
