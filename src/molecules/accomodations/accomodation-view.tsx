import ReviewCard from '../../atoms/card/review-card';
import { StarRating } from '../../atoms/rating/star-rating';

import shareIcon from '../../assets/icons/share-dotted.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faLocationPin, faPencil, faPhone } from '@fortawesome/free-solid-svg-icons';

interface AccomodationViewProps {
  data: {
    name: string;
    rating: string;
    images: string[];
    description: string;
    reviewCount: string;
    address: string;
    phone: string;
    website: string;
  };
  reviews: {
    user_image: string;
    user_name: string;
    date: string;
    description: string;
    images: string[];
    ratings: {
      title: string;
      rating: string;
    }[];
  }[];
}

const AccomodationImage = ({ source }: { source: string }) => {
  return <img src={source} alt="hotel image" className="w-full h-full object-cover rounded-lg max-h-96" />;
};

const AccomodationView: React.FC<AccomodationViewProps> = ({ data, reviews }) => {
  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{data.name}</h1>
          {/* Rating */}
          <div className="flex mt-2">
            <StarRating rating={'3'} />
            <p className="ml-2 m-auto text-gray-600 text-sm">{data.reviewCount} reviews</p>
          </div>
          {/* Address and Contact */}
          <div className="text-gray-600 mt-2">
            <p className="flex items-center">
              <span className="mr-1">
                <FontAwesomeIcon icon={faLocationPin} />
              </span>
              {data.address}
            </p>
            <span className="flex gap-4">
              <p className="flex items-center">
                <span className="mr-1">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                {data.phone}
              </p>
              <p className="flex items-center">
                <span className="mr-1">
                  <FontAwesomeIcon icon={faGlobe} />
                </span>
                {data.website}
              </p>
            </span>
          </div>
        </div>
        <div className="mb-auto flex gap-8">
          <button>
            <img src={shareIcon} className="w-6" />
          </button>
          <button className="bg-white border border-black px-8 py-2 rounded-md shadow-sm hover:bg-gray-100">
            Book
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="mt-6 flex flex-col lg:flex-row gap-4 lg:max-h-96 overflow-auto">
        {/* Main Image */}
        <div className="flex-1">
          <AccomodationImage source={data.images[0]} />
        </div>
        {/* Side Images */}
        <div className="grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-4 lg:w-1/3">
          <AccomodationImage source={data.images[1]} />
          <AccomodationImage source={data.images[2]} />
        </div>
      </div>

      {/* About Section */}
      <div className="my-6">
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <p className="text-gray-700">{data.description}</p>
      </div>

      {/* Reviews */}
      <div className="my-4">
        <div className="flex my-4">
          <h2 className="text-3xl font-semibold">Reviews</h2>
          <button className="border-b border-b-black ms-auto flex justify-center items-center gap-2">
            <FontAwesomeIcon icon={faPencil} /> write a review
          </button>
        </div>
        <div id="reviews" className="flex flex-col gap-4">
          {reviews.map((item, index) => (
            <ReviewCard
              key={index}
              userImage={item.user_image}
              userName={item.user_name}
              date={item.date}
              reviewText={item.description}
              reviewImages={item.images}
              ratings={item.ratings}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccomodationView;
