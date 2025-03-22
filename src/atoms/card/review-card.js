import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { StarRating } from '../rating/star-rating';
import { sanityImageUrlBuilder } from '../../api';
import { fromSnakeCase } from '@utils/common';
const ReviewCard = ({ data }) => {
  const { reviewDescription, reviewerImage, ratings, submittedBy, submittedDate } = data;
  const calculateTotal = (ratings) => {
    return ratings.reduce((acc, each) => each.score + acc, 0);
  };
  return _jsxs('div', {
    className: 'border rounded-lg p-4 shadow-sm flex flex-col md:flex-row',
    children: [
      _jsxs('div', {
        className: 'flex flex-grow',
        children: [
          _jsx('div', {
            className: 'flex-shrink-0 mr-2',
            children: _jsx('img', {
              src: reviewerImage
                ? sanityImageUrlBuilder(reviewerImage).url()
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
              alt: 'Reviewer Image',
              className: 'w-12 h-12 rounded-md',
            }),
          }),
          _jsxs('div', {
            className: 'flex-grow',
            children: [
              _jsxs('div', {
                className: 'flex gap-4 items-center',
                children: [
                  _jsx('h3', { className: 'font-semibold text-lg', children: submittedBy }),
                  _jsx('span', { className: 'text-gray-500 text-sm', children: submittedDate }),
                ],
              }),
              _jsx('p', { className: 'text-gray-600 mt-2', children: reviewDescription }),
            ],
          }),
        ],
      }),
      _jsx('div', {
        className: 'w-full md:w-fit p-4 h-fit border rounded-lg border-orange-500',
        children: _jsxs('div', {
          className: 'space-y-2 min-w-56',
          children: [
            _jsxs('div', {
              className: 'flex justify-between items-center',
              children: [
                _jsx('span', { className: 'text-sm font-semibold whitespace-nowrap', children: 'In Total' }),
                _jsx(StarRating, { rating: calculateTotal(ratings) / ratings.length }),
              ],
            }),
            _jsx('hr', { className: 'border border-black' }),
            Object.keys(ratings).map((rating) =>
              _jsxs(
                'div',
                {
                  className: 'flex gap-2 justify-between items-center',
                  children: [
                    _jsx('span', { className: 'text-sm w-[40%]', children: fromSnakeCase(rating) }),
                    _jsx(StarRating, { rating: ratings[rating].score }),
                  ],
                },
                rating
              )
            ),
          ],
        }),
      }),
    ],
  });
};
export default ReviewCard;
