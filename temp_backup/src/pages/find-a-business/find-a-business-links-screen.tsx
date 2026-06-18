import Button from '@atoms/custom-button/button';
import { fromKebabCase, toKebabCase } from '@utils/common';
import React from 'react';
import { useNavigate } from 'react-router';

const data = [
  {
    mainCat: 'Accommodation',
    hasSubCategory: true,
    subItems: [
      { name: 'Hotels', id: 'hotel' },
      { name: 'Resorts', id: 'resort' },
      { name: 'Bed & Breakfast', id: 'bed-breakfast' },
      { name: 'Apartment', id: 'apartment' },
      { name: 'Vacation Rental/Villa', id: 'vacation-rental' },
      { name: 'Camp Ground', id: 'campground' },
      { name: 'Hostel', id: 'hostel' },
      { name: 'Co-living spaces', id: 'co-living' },
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
    id: 'barspubs',
    hasSubCategory: false,
  },
  {
    mainCat: 'Clubs & Special Groups',
    id: 'clubsspecialgroups',
    hasSubCategory: true,
    subItems: [
      { name: 'Rotary Club', id: 'rotaryclubs' },
      { name: 'Lion’s Club', id: 'lionsclub' },
      { name: 'Toastmasters', id: 'toastmasters' },
      { name: 'Masonic Lodges', id: 'masonicloges' },
    ],
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
    id: 'nightclubs',
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
    id: 'religiousinstitutions',
    hasSubCategory: true,
    subItems: [
      { name: 'Churches', id: 'churches' },
      { name: 'Mosques', id: 'mosques' },
      { name: 'Synagogues', id: 'synagogues' },
      { name: 'Bahai Temples', id: 'bahaitemple' },
      { name: 'Hindu Temples', id: 'hindutemple' },
    ],
  },

  {
    mainCat: 'Restaurant & Eateries',
    id: 'restaurantseateries',
    hasSubCategory: true,
    subItems: [
      { name: 'Traditional', id: 'traditional' },
      { name: 'Fine dining', id: 'fine_dining' },
      { name: 'Casual dining', id: 'casual_dining' },
      { name: 'Beach bars', id: 'beach_bars' },
      { name: 'Street food', id: 'street_food' },
      { name: 'Vegetarian & vegan', id: 'vegan_vegetarian' },
    ],
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
    id: 'wellnessbeauty',
    hasSubCategory: true,
    subItems: ['Spas', 'Gyms', 'Beauty Salons', 'Hair Salons', 'Other'],
  },
];

const FindABusinessLinksScreen: React.FC<{ country: string }> = ({ country }) => {
  const navigation = useNavigate();

  return (
    <div className="p-2 md:p-4 m-auto">
      <div className="flex mb-4">
        <h1 className="text-4xl font-bold">Find A Business in {fromKebabCase(country)}</h1>
        <Button
          className="ms-auto"
          onClick={() => {
            navigation('/business-form');
          }}
        >
          List your Business
        </Button>
      </div>
      <div className="flex">
        <div className="md:columns-5">
          {data.map((category, index) => (
            <div className="mb-3" key={index}>
              <h1 className="text-xl font-bold w-3/4 cursor-pointer">{category.mainCat}</h1>
              {category.hasSubCategory ? (
                <ul>
                  {category.subItems.map((sub, subIndex) => (
                    <li
                      className="mb-1 cursor-pointer text-black-600 hover:underline"
                      key={subIndex}
                      onClick={() => {
                        if (category.mainCat === 'Accommodation') {
                          navigation(`/${toKebabCase(country)}/business/${toKebabCase('Accommodation')}/${sub.id}`);
                        } else if (category.mainCat == 'Restaurant & Eateries') {
                          navigation(
                            `/${toKebabCase(country)}/business/${toKebabCase(category.id)}/afterwork/${sub.id}`
                          );
                        } else if (
                          category.mainCat == 'Clubs & Special Groups' ||
                          category.mainCat == 'Religious Institutions'
                        ) {
                          console.log(
                            '---nikhil clicked',
                            `/${toKebabCase(country)}/business/find-a-business/${toKebabCase(category.id)}/${sub.id}`
                          );
                          navigation(
                            `/${toKebabCase(country)}/business/find-a-business/${toKebabCase(category.id)}/${sub.id}`
                          );
                        } else {
                          navigation(
                            `/${country}/business/find-a-business/${toKebabCase(category.id ?? category.mainCat)}/${toKebabCase(sub)}`
                          );
                        }
                      }}
                    >
                      {typeof sub === 'object' ? sub.name : sub}
                    </li>
                  ))}
                </ul>
              ) : (
                <h1
                  className="text-xl font-bold w-3/4 cursor-pointer"
                  onClick={() => {
                    if (category.mainCat == 'Nightclubs' || category.mainCat == 'Bars & Pubs') {
                      // "/algeria/business/restaurantseateries/afterwork/traditional"
                      navigation(
                        `/${country}/business/${toKebabCase(category.id)}/afterwork/${toKebabCase(category.id)}`
                      );
                    } else {
                      navigation(`/${country}/business/find-a-business/${toKebabCase(category.mainCat)}`);
                    }
                  }}
                >
                  {category.mainCat}
                </h1>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindABusinessLinksScreen;
