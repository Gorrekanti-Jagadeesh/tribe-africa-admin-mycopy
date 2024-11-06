import React, { useEffect, useState } from 'react';
import { StarRating } from '../rating/star-rating';

interface ReviewCardProps {
  userImage: string;
  userName: string;
  date: string;
  reviewText: string;
  reviewImages: string[];
  ratings: {
    title: string;
    rating: string;
  }[];
}

const ReviewCard: React.FC<ReviewCardProps> = ({ userImage, userName, date, reviewText, reviewImages, ratings }) => {
  const [total, setTotal] = useState('5');

  useEffect(() => {
    let sum = 0;
    let count = 0;
    for (let r in ratings) {
      sum += parseInt(ratings[r].rating);
      count++;
    }
    setTotal((sum / count).toString());
  }, []);

  return (
    <div className="border rounded-lg p-4 shadow-sm flex">
      {/* User Information */}
      <div className="flex-shrink-0 mr-2">
        <img src={userImage} alt={userName} className="w-12 h-12 rounded-full" />
      </div>
      <div className="flex-grow">
        <div className="flex gap-4 items-center">
          <h3 className="font-semibold text-lg">{userName}</h3>
          <span className="text-gray-500 text-sm">{date}</span>
        </div>
        {/* <StarRating className='inline-block md:hidden' rating={total} /> */}
        <p className="text-gray-600 mt-2">{reviewText}</p>

        {/* Review Images */}
        <div className="flex mt-4 space-x-2 overflow-auto">
          {reviewImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Review image ${index + 1}`}
              className="w-48 aspect-square object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Ratings */}
      <div className="flex-grow ml-6 p-4 h-fit m-auto border rounded-lg border-orange-500">
        <div className="space-y-2 min-w-56">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold whitespace-nowrap">In Total</span>
            <StarRating rating={total} />
          </div>
          <hr className="border border-black" />
          {ratings.map((rating) => (
            <div className="flex gap-2 justify-between items-center" key={rating.title}>
              <span className="text-sm w-[40%]">{rating.title}</span>
              <StarRating rating={rating.rating} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

// TODO:
// Responsiveness of reviews layout
