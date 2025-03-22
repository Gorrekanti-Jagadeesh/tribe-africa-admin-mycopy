import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import Button from '@/atoms/custom-button/button';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import ReviewCard from '@/atoms/card/review-card';
import { sanityImageUrlBuilder } from '@/api';
const FindaBusinessDetailsScreen = ({ data }) => {
  // const socialLinks = [
  //   { href: 'https://facebook.com', icon: faFacebookF },
  //   { href: 'https://twitter.com', icon: faTwitter },
  //   { href: 'https://twitter.com', icon: faYoutube },
  //   { href: 'https://instagram.com', icon: faInstagram },
  //   { href: 'https://linkedin.com', icon: faLinkedinIn },
  // ];
  const reviews = [
    {
      _id: '1',
      key: 'review:accommodation:12345',
      reviewDescription: 'Great product! The quality is fantastic and it arrived on time.',
      reviewerImage: '',
      ratings: [
        { title: 'Quality', score: 5 },
        { title: 'Value', score: 4 },
      ],
      submittedBy: 'John Doe',
      submittedDate: '2025-01-05',
    },
    {
      _id: '2',
      key: 'review:accommodation:12346',
      reviewDescription: 'Not bad, but could be improved. The material feels a bit cheap.',
      reviewerImage: '',
      ratings: [
        { title: 'Quality', score: 3 },
        { title: 'Value', score: 2 },
      ],
      submittedBy: 'Jane Smith',
      submittedDate: '2025-01-06',
    },
    {
      _id: '3',
      key: 'review:people:67890',
      reviewDescription: 'Excellent customer service. The item exceeded my expectations!',
      reviewerImage: '',
      ratings: [
        { title: 'Service', score: 5 },
        { title: 'Satisfaction', score: 5 },
      ],
      submittedBy: 'Alice Johnson',
      submittedDate: '2025-01-07',
    },
    {
      _id: '4',
      key: 'review:people:67891',
      reviewDescription: 'The product was damaged upon arrival, very disappointed.',
      reviewerImage: '',
      ratings: [
        { title: 'Quality', score: 2 },
        { title: 'Satisfaction', score: 1 },
      ],
      submittedBy: 'Mark Lee',
      submittedDate: '2025-01-08',
    },
    {
      _id: '5',
      key: 'review:accommodation:12347',
      reviewDescription: 'Good value for the price. Would recommend to friends.',
      reviewerImage: '',
      ratings: [
        { title: 'Value', score: 4 },
        { title: 'Comfort', score: 4 },
      ],
      submittedBy: 'Lisa White',
      submittedDate: '2025-01-09',
    },
  ];
  console.log(data, 'erfer');
  return _jsxs('div', {
    className: 'p-2 md:p-4 max-w-6xl m-auto',
    children: [
      _jsxs('div', {
        className: 'flex flex-col justify-end items-end md:pb-8',
        children: [
          _jsx('h1', { className: 'font-bold text-2xl', children: data?.title }),
          _jsx('p', { children: data?.businessMotive }),
        ],
      }),
      _jsxs('div', {
        className: 'overflow-hidden',
        children: [
          _jsxs('div', {
            className: 'gap-14 lg:flex',
            children: [
              _jsxs('div', {
                className: 'lg:w-1/3',
                children: [
                  _jsx('img', {
                    src: sanityImageUrlBuilder(data?.image).url(),
                    alt: 'Room',
                    className: 'w-full h-64 object-cover rounded-lg mb-4',
                  }),
                  _jsxs('div', {
                    children: [
                      _jsx('h1', { className: 'text-lg mb-2', children: 'Socials' }),
                      _jsx('div', {
                        className: 'flex space-x-4 mb-6',
                        children: data?.socialMediaLinks.map((link) =>
                          _jsx(
                            'a',
                            {
                              href: link,
                              target: '_blank',
                              rel: 'noopener noreferrer',
                              className: 'text-gray-600 hover:text-gray-900',
                              children: _jsx(FontAwesomeIcon, { icon: faLinkedinIn, size: '2xl' }),
                            },
                            link
                          )
                        ),
                      }),
                    ],
                  }),
                  _jsx(Button, {
                    className: 'bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 w-full',
                    children: 'Website',
                  }),
                ],
              }),
              _jsxs('div', {
                className: 'lg:w-2/3 md:pt-8 border-t-2 border-orange-400',
                children: [
                  _jsxs('div', {
                    className: 'flex justify-between',
                    children: [
                      _jsxs('div', {
                        className: 'mb-6',
                        children: [
                          _jsx('h2', { className: 'text-lg font-bold mb-2', children: 'Contact Information' }),
                          _jsxs('p', { children: ['Phone: +', data?.businessContactInformation?.phoneNumber] }),
                          _jsxs('p', { children: ['Email: ', data?.businessContactInformation?.email] }),
                          _jsxs('p', { children: ['Website URL: ', data?.businessContactInformation?.website] }),
                        ],
                      }),
                      _jsxs('div', {
                        className: 'mb-6',
                        children: [
                          _jsx('h2', { className: 'text-lg font-bold mb-2', children: 'Owner / Manager Details' }),
                          _jsxs('p', { children: ['Full Name: ', data?.ownerContactInformation?.fullName] }),
                          _jsxs('p', { children: ['Role: ', data?.ownerContactInformation?.role] }),
                          _jsxs('p', { children: ['Phone: +', data?.ownerContactInformation?.phoneNumber] }),
                          _jsxs('p', { children: ['Email: ', data?.ownerContactInformation?.email] }),
                        ],
                      }),
                    ],
                  }),
                  _jsxs('div', {
                    className: 'mb-6 border-t pt-8',
                    children: [
                      _jsx('h2', { className: 'text-lg font-bold mb-2', children: 'Description' }),
                      _jsx('p', { className: 'text-sm leading-relaxed', children: data?.description }),
                    ],
                  }),
                  _jsxs('div', {
                    className: 'sm:py-8 border-t lg:flex justify-between',
                    children: [
                      _jsxs('div', {
                        className: 'mb-6 lg:mb-0',
                        children: [
                          _jsx('h2', { className: 'text-lg font-bold mb-2', children: 'Address' }),
                          _jsxs('p', { children: ['Street Address: ', data?.address?.street] }),
                          _jsxs('p', { children: ['Town/City: ', data?.address?.town] }),
                          _jsxs('p', { children: ['State/Region: ', data?.address?.state] }),
                          _jsxs('p', { children: ['Postal Code: ', data?.address?.postalCode] }),
                          _jsxs('p', { children: ['Country: ', data?.address?.country] }),
                        ],
                      }),
                      _jsxs('div', {
                        children: [
                          _jsx('h2', { className: 'text-lg font-bold mb-2', children: 'Operating Hours' }),
                          _jsx('p', { children: 'Monday: 8:00 AM to 10:00 PM' }),
                          _jsx('p', { children: 'Tuesday: 8:00 AM to 10:00 PM' }),
                          _jsx('p', { children: 'Wednesday: 8:00 AM to 10:00 PM' }),
                          _jsx('p', { children: 'Thursday: 8:00 AM to 10:00 PM' }),
                          _jsx('p', { children: 'Friday: 8:00 AM to 10:00 PM' }),
                          _jsx('p', { children: 'Saturday: 8:00 AM to 4:00 PM' }),
                          _jsx('p', { children: 'Sunday: Holiday' }),
                        ],
                      }),
                    ],
                  }),
                  _jsxs('div', {
                    className: 'sm:py-8 border-t',
                    children: [
                      _jsx('h2', { className: 'text-lg font-bold mb-4', children: 'Payment Methods Accepted' }),
                      _jsx('div', {
                        className: 'flex space-x-4',
                        children: data?.paymentMethods.map((type) =>
                          _jsx('div', { className: 'bg-gray-200 px-4 py-2 rounded-lg', children: type }, type)
                        ),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          _jsxs('div', {
            className: 'my-4 border-t',
            children: [
              _jsxs('div', {
                className: 'flex my-4',
                children: [
                  _jsx('h2', { className: 'text-3xl font-semibold', children: 'Reviews' }),
                  _jsxs('button', {
                    className: 'border-b border-b-black ms-auto flex justify-center items-center gap-2',
                    onClick: () => {},
                    children: [_jsx(FontAwesomeIcon, { icon: faPencil }), ' write a review'],
                  }),
                ],
              }),
              _jsx('div', {
                id: 'reviews',
                className: 'flex flex-col gap-4',
                children: reviews.map((item, index) => _jsx(ReviewCard, { data: item }, index)),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
export default FindaBusinessDetailsScreen;
