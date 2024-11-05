import React from 'react';
import { StarRating } from '../rating/star-rating';

interface ReviewCardProps {
  userImage: string;
  userName: string;
  date: string;
  reviewText: string;
  reviewImages: string[];
  ratings: {
    total: string;
    qualityOfService: string;
    comfort: string;
    foodAndBeverage: string;
    location: string;
    cleanliness: string;
  };
}

const ReviewCard: React.FC<ReviewCardProps> = ({ userImage, userName, date, reviewText, reviewImages, ratings }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm flex">
      {/* User Information */}
      <div className="flex-shrink-0">
        <img src={userImage} alt={userName} className="w-12 h-12 rounded-full" />
      </div>
      <div className="flex-grow">
        <div className="flex gap-4 items-center">
          <h3 className="font-semibold text-lg">{userName}</h3>
          <span className="text-gray-500 text-sm">{date}</span>
        </div>
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
      {/* <div className="flex-grow ml-6 p-4 h-fit m-auto border rounded-lg border-orange-500">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold">In Total</span>
            <StarRating rating={ratings.total} />
          </div>
          <hr className='border border-black'/>
          <div className="flex">
            <span className="text-sm">Quality of Service</span>
            <StarRating rating={ratings.qualityOfService} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Comfort</span>
            <StarRating rating={ratings.comfort} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Food & Beverage</span>
            <StarRating rating={ratings.foodAndBeverage} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Location</span>
            <StarRating rating={ratings.location} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Cleanliness</span>
            <StarRating rating={ratings.cleanliness} />
          </div>
        </div>
      </div> */}

      <div className="p-4 border rounded-lg border-orange-500">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="text-sm font-semibold border-t border-gray-200 py-2">In Total</th>
              <th className="border-t border-gray-200 py-2">
                <StarRating rating={ratings.total} />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-sm border-t border-gray-200 py-2">Quality of Service</td>
              <td className="border-t border-gray-200 py-2">
                <StarRating rating={ratings.qualityOfService} />
              </td>
            </tr>
            <tr>
              <td className="text-sm border-t border-gray-200 py-2">Comfort</td>
              <td className="border-t border-gray-200 py-2">
                <StarRating rating={ratings.comfort} />
              </td>
            </tr>
            <tr>
              <td className="text-sm border-t border-gray-200 py-2">Food & Beverage</td>
              <td className="border-t border-gray-200 py-2">
                <StarRating rating={ratings.foodAndBeverage} />
              </td>
            </tr>
            <tr>
              <td className="text-sm border-t border-gray-200 py-2">Location</td>
              <td className="border-t border-gray-200 py-2">
                <StarRating rating={ratings.location} />
              </td>
            </tr>
            <tr>
              <td className="text-sm border-t border-gray-200 py-2">Cleanliness</td>
              <td className="border-t border-gray-200 py-2">
                <StarRating rating={ratings.cleanliness} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewCard;
