import React from 'react';
import { StarRating } from '../rating/star-rating';
import { ReviewProps } from '@/types';
import { sanityImageUrlBuilder } from '../../api';
import { fromSnakeCase } from '@utils/common';

interface ReviewCardProps {
  data: ReviewProps;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ data }) => {
  const { reviewDescription, reviewerImage, ratings, submittedBy, submittedDate } = data;

  const calculateTotal = (ratings) => {
    return ratings.reduce((acc: number, each) => each.score + acc, 0);
  };

  return (
    <div className="border rounded-[10px] p-4 shadow-sm flex flex-col md:flex-row">
      {/* User Information */}
      <div className="flex flex-grow">
        <div className="flex-shrink-0 mr-2">
          <img
            src={
              reviewerImage
                ? sanityImageUrlBuilder(reviewerImage).url()
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            }
            alt={'Reviewer Image'}
            className="w-12 h-12 rounded-md"
          />
        </div>
        <div className="flex-grow">
          <div className="flex gap-4 items-center">
            <h3 className="font-semibold text-lg">{submittedBy}</h3>
            <span className="text-gray-500 text-sm">{submittedDate}</span>
          </div>
          {/* <StarRating className='inline-block md:hidden' rating={total} /> */}
          <p className="text-gray-600 mt-2">{reviewDescription}</p>
        </div>
      </div>

      {/* Ratings */}
      <div className="w-full md:w-fit p-4 h-fit border rounded-[10px] border-brand-orange">
        <div className="space-y-2 min-w-56">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold whitespace-nowrap">In Total</span>
            <StarRating rating={calculateTotal(ratings) / ratings.length} />
          </div>
          <hr className="border border-black" />
          {Object.keys(ratings).map((rating) => (
            <div className="flex gap-2 justify-between items-center" key={rating}>
              <span className="text-sm w-[40%]">{fromSnakeCase(rating)}</span>
              <StarRating rating={ratings[rating].score} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

// TODO:
// Get user details(username, image) with the userid in submittedBy key.
