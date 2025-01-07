import Button from '@atoms/custom-button/button';
import { fromKebabCase, toKebabCase } from '@utils/common';
import React from 'react';
import { useNavigate } from 'react-router';

const data = [
  {
    mainCat: 'Accommodation',
    hasSubCategory: true,
    subItems: [
      'Hotels',
      'Resorts',
      'Bed & Breakfast',
      'Apartment',
      'Vacation Rental/Villa',
      'Camp Ground',
      'Hostel',
      'Co-living spaces',
    ],
  },
  {
    mainCat: 'Agencies',
    hasSubCategory: true,
    subItems: ['Modelling', 'Talents', 'Sports', 'Security', 'Travel', 'Other'],
  },
  {
    mainCat: 'Agribusiness',
    hasSubCategory: true,
    subItems: ['Farms', 'Fisheries', 'Apiaries/Bee yards', 'Vineyards', 'Other'],
  },
  {
    mainCat: 'Bars & Pubs',
    hasSubCategory: false,
  },
  {
    mainCat: 'Clubs & Special Groups',
    hasSubCategory: true,
    subItems: ['Rotary Club', 'Lion’s Club', 'Sports', 'Toastmasters', 'Masonic Lodges', 'Other'],
  },
  {
    mainCat: 'Construction',
    hasSubCategory: true,
    subItems: ['Construction Companies', 'Equipment Rentals', 'Engineering Firms', 'Other'],
  },
  {
    mainCat: 'Consultancy Firms',
    hasSubCategory: false,
  },
  {
    mainCat: 'Custom Brokers',
    hasSubCategory: false,
  },
  {
    mainCat: 'Design',
    hasSubCategory: true,
    subItems: [
      'Architecture',
      'Interior Design',
      'Landscape Design',
      'Soft Furnishing',
      'Graphic Design',
      'Art Studios',
      'Other',
    ],
  },
  {
    mainCat: 'Education',
    hasSubCategory: true,
    subItems: ['Colleges', 'Schools', 'Universities', 'Other'],
  },
  {
    mainCat: 'Employment Agencies',
    hasSubCategory: true,
    subItems: ['Domestic Staff', 'Security', 'Other'],
  },
  {
    mainCat: 'Entertainment',
    hasSubCategory: true,
    subItems: ['Music Studios', 'Film Studios', 'Dance Studios', 'Other'],
  },
  {
    mainCat: 'Environmental',
    hasSubCategory: true,
    subItems: ['Renewable Energy', 'Other'],
  },
  {
    mainCat: 'Factories',
    hasSubCategory: false,
  },
  {
    mainCat: 'Financial Services',
    hasSubCategory: true,
    subItems: ['Accountancy Firms', 'Banks', '(Make mention of your ATM Locations)', 'Insurance', 'Other'],
  },
  {
    mainCat: 'Hospitality',
    hasSubCategory: true,
    subItems: ['Event Organisers', 'Wedding planners', 'Catering', 'Other'],
  },
  {
    mainCat: 'Home Services',
    hasSubCategory: true,
    subItems: ['Cleaning', 'Plumbing', 'Electrical', 'Painting', 'Other'],
  },
  {
    mainCat: 'Information Technology',
    hasSubCategory: false,
  },
  {
    mainCat: 'Legal',
    hasSubCategory: true,
    subItems: ['Law Courts', 'Law Firms', 'Notary Publics', 'Other'],
  },
  {
    mainCat: 'Logistics',
    hasSubCategory: true,
    subItems: ['Trucking', 'Shipping', 'Air Transport', 'Home/Business Removals', 'Other'],
  },
  {
    mainCat: 'Media',
    hasSubCategory: true,
    subItems: ['TV Stations', 'Radio Stations', 'Other'],
  },
  {
    mainCat: 'Mines',
    hasSubCategory: false,
  },
  {
    mainCat: 'Nightclubs',
    hasSubCategory: false,
  },
  {
    mainCat: 'Public Relations & Marketing',
    hasSubCategory: false,
  },
  {
    mainCat: 'Real Estate',
    hasSubCategory: false,
  },
  {
    mainCat: 'Religious Institutions',
    hasSubCategory: true,
    subItems: ['Churches', 'Mosques', 'Synagogues', 'Bahai Temples', 'Hindu Temples', 'Other'],
  },
  {
    mainCat: 'Restaurant & Eateries',
    hasSubCategory: true,
    subItems: ['Traditional', 'Fine dining', 'Casual dining', 'Beach bars', 'Street food', 'Vegetarian & vegan'],
  },
  {
    mainCat: 'Shopping',
    hasSubCategory: false,
  },
  {
    mainCat: 'Tourism Services',
    hasSubCategory: true,
    subItems: ['Tour Companies', 'Freelance Translators', 'Independent Tour Guides', 'Other'],
  },
  {
    mainCat: 'Transport Services',
    hasSubCategory: true,
    subItems: ['Car Rentals', 'Taxi', 'Chauffeur Service', 'Commercial Transportation', 'Other'],
  },
  {
    mainCat: 'Wellness & Beauty',
    hasSubCategory: true,
    subItems: ['Spas', 'Gyms', 'Beauty Salons', 'Hair Salons', 'Other'],
  },
];

const FindABusinessScreen: React.FC<{ country: string }> = ({ country }) => {
  const navigation = useNavigate();
  return (
    <div className="p-2 md:p-4 m-auto">
      <div className="flex mb-4">
        <h1 className="text-4xl font-bold">Find A Business in {fromKebabCase(country)}</h1>
        <Button className="ms-auto">List your Business</Button>
      </div>
      <div className="flex">
        <div className="md:columns-5">
          {data.map((category, index) => (
            <div className="mb-3" key={index}>
              <h1
                className="text-xl font-bold w-3/4"
                onClick={() => {
                  if (!category.hasSubCategory) {
                    navigation(`/${country}/business/details/${toKebabCase(category.mainCat)}`);
                  }
                }}
              >
                {category.mainCat}
              </h1>
              {category.hasSubCategory && (
                <ul>
                  {category.subItems.map((subCategory, subIndex) => (
                    <li
                      className="mb-1"
                      key={subIndex}
                      onClick={() => {
                        navigation(`/${country}/business/${toKebabCase(category.mainCat)}/${toKebabCase(subCategory)}`);
                      }}
                    >
                      {subCategory}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindABusinessScreen;
