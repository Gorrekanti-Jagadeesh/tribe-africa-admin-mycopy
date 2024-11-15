import React from 'react';
import { StarRating } from '../rating/star-rating';
import { Review } from '../../types';
import { sanityImageUrlBuilder } from '../../api';

interface ReviewCardProps {
  reviewData: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ reviewData }) => {
  const {
    reviewer_name,
    created_at,
    review_text,
    images,
    total_rating,
    quality_of_service,
    comfort,
    food_and_beverage,
    location,
    cleanliness,
    reviewer_image,
  } = reviewData;

  return (
    <div className="border rounded-lg p-4 shadow-sm flex">
      {/* User Information */}
      <div className="flex-shrink-0 mr-2">
        <img src={reviewer_image} alt={reviewer_name} className="w-12 h-12 rounded-full" />
      </div>
      <div className="flex-grow">
        <div className="flex gap-4 items-center">
          <h3 className="font-semibold text-lg">{reviewer_name}</h3>
          <span className="text-gray-500 text-sm">{created_at}</span>
        </div>
        {/* <StarRating className='inline-block md:hidden' rating={total} /> */}
        <p className="text-gray-600 mt-2">{review_text}</p>

        {/* Review Images */}
        <div className="flex mt-4 space-x-2 overflow-auto">
          {images &&
            images.map((image, index) => (
              <img
                key={index}
                src={sanityImageUrlBuilder(image.asset._ref).url()}
                alt={`Review image ${index + 1}`}
                className="w-28 aspect-square object-cover rounded-lg"
              />
            ))}
        </div>
      </div>

      {/* Ratings */}
      <div className="ml-6 p-4 h-fit m-auto border rounded-lg border-orange-500">
        <div className="space-y-2 min-w-56">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold whitespace-nowrap">In Total</span>
            <StarRating rating={total_rating.toString()} />
          </div>
          <hr className="border border-black" />
          {/* {ratings.map((rating) => (
            <div className="flex gap-2 justify-between items-center" key={rating.title}>
              <span className="text-sm w-[40%]">{rating.title}</span>
              <StarRating rating={rating.rating} />
            </div>
          ))} */}
          <div className="flex gap-2 justify-between items-center">
            <span className="text-sm w-[40%]">Quality of Service</span>
            <StarRating rating={quality_of_service.toString()} />
          </div>
          <div className="flex gap-2 justify-between items-center">
            <span className="text-sm w-[40%]">Location</span>
            <StarRating rating={location.toString()} />
          </div>
          <div className="flex gap-2 justify-between items-center">
            <span className="text-sm w-[40%]">Comfort</span>
            <StarRating rating={comfort.toString()} />
          </div>
          <div className="flex gap-2 justify-between items-center">
            <span className="text-sm w-[40%]">Food and Beverage</span>
            <StarRating rating={food_and_beverage.toString()} />
          </div>

          <div className="flex gap-2 justify-between items-center">
            <span className="text-sm w-[40%]">Cleanliness</span>
            <StarRating rating={cleanliness.toString()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

// TODO:
// Responsiveness of reviews layout
