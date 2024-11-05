import { FaShare, FaPencilAlt } from 'react-icons/fa';
import ReviewCard from '../../atoms/card/review-card';
import { StarRating } from '../../atoms/rating/star-rating';

import demo from '../../assets/homepage-welcome-image-3.png';

const AccomodationView = () => {
  return (
    <div className="p-2 md:p-4 max-w-6xl m-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Hotel XYZ</h1>
          {/* Rating */}
          <div className="flex mt-2">
            <StarRating rating={'3'} />
            <p className="ml-2 m-auto text-gray-600 text-sm">101 reviews</p>
          </div>
          {/* Address and Contact */}
          <div className="text-gray-600 mt-2">
            <p className="flex items-center">
              <span className="mr-1">📍</span>Kofi Annan Street, Bakau Algeria
            </p>
            <p className="flex items-center">
              <span className="mr-1">📞</span>23394745677
            </p>
            <p className="flex items-center">
              <span className="mr-1">🌐</span>www.hotelxyz.com
            </p>
          </div>
        </div>
        <div className="mb-auto flex gap-4">
          <button>
            <FaShare className={'text-black'} />
          </button>
          <button className="bg-white border border-black px-8 py-2 rounded-md shadow-sm hover:bg-gray-100">
            Book
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="mt-6 flex gap-4 max-h-96">
        {/* Main Image */}
        <div className="flex-1">
          <img
            src="https://via.placeholder.com/500x300"
            alt="Main hotel"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        {/* Side Images */}
        <div className="grid grid-rows-2 gap-4 w-1/3">
          <img
            src="https://via.placeholder.com/150x150"
            alt="Side view"
            className="w-full h-full object-cover rounded-lg"
          />
          <img
            src="https://via.placeholder.com/150x150"
            alt="Side view"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* About Section */}
      <div className="my-6">
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <p className="text-gray-700">
          Ocean Bay Hotel & Resort is an excellent choice for travelers visiting Bakau, offering a family-friendly
          environment alongside many helpful amenities designed to enhance your stay. Ocean Bay Hotel is a
          family-friendly hotel offering a flat-screen TV, air conditioning, and a minibar in the rooms, and it is easy
          to stay connected during your stay as free WiFi is offered to guests. The hotel features room service and a
          concierge. Plus, guests can enjoy a pool and free breakfast, which have made this a popular choice among
          travelers visiting Bakau. For guests with a vehicle, free parking is available. While you're here, be sure to
          check out Calypso Bar and Restaurant, one of the restaurants in Bakau with tapas on the menu, which is a short
          distance from Ocean Bay Hotel & Resort.
        </p>
      </div>

      {/* Reviews */}
      <div className="my-4">
        <div className="flex my-4">
          <h2 className="text-3xl font-semibold">Reviews</h2>
          <button className="border-b border-b-black ms-auto flex justify-center items-center gap-2">
            <FaPencilAlt /> write a review
          </button>
        </div>
        <div id="reviews" className="flex flex-col gap-4">
          <ReviewCard
            userImage={demo}
            userName="Messi"
            date="4th Oct 2024"
            reviewText="This place is amazing! The staff was very friendly, and the food was delicious. Would love to come back here."
            reviewImages={[demo, demo, demo]}
            ratings={{
              total: '4',
              qualityOfService: '5',
              comfort: '4',
              foodAndBeverage: '5',
              location: '4',
              cleanliness: '4',
            }}
          />

          <ReviewCard
            userImage={demo}
            userName="Messi"
            date="4th Oct 2024"
            reviewText="This place is amazing! The staff was very friendly, and the food was delicious. Would love to come back here."
            reviewImages={[demo, demo, demo]}
            ratings={{
              total: '4',
              qualityOfService: '5',
              comfort: '4',
              foodAndBeverage: '5',
              location: '4',
              cleanliness: '4',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AccomodationView;
