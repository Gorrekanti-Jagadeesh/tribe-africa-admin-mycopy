import React, { useEffect, useState } from 'react';
import { EventCategory, NetworkCategory } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { FloatingSibling } from '@molecules/common/floating-sibling';
import { sanity } from '@utils/sanity';
import { sanityImageUrlBuilder } from '@api/index';
import { toKebabCase } from '@utils/common';
import { LinkList } from '@molecules/layout/link-list';
import { networkURLs } from '@data/index';
import { Loading } from '@atoms/common/loading';
import { useNavigate } from 'react-router';

const TribeAfricaPagesNavcategoryItem: React.FC<{ category: NetworkCategory; country: string }> = ({
  category,
  country,
}) => {
  const navigation = useNavigate();
  return (
    <div className="flex justify-between md:flex-col md:justify-start">
      <div className="border-2 border-orange-400 rounded-lg overflow-hidden mb-4 order-2 md:order-1 w-1/2 md:w-full">
        <img
          src={sanityImageUrlBuilder(category.image).url()}
          alt={category.title}
          className="w-full h-48 aspect-square object-cover"
        />
      </div>
      <div className="text-left order-1 md:order-2 w-1/2 md:w-full">
        <h3 className="text-lg md:text-xl font-semibold">{category.title}</h3>
        <ul>
          {category.items.map((eachCategory, index) => {
            return (
              <li className="my-2" key={index}>
                <FloatingSibling
                  component={<span>{eachCategory.label}</span>}
                  sibling={
                    <div className="min-w-40 h-full md:min-w-64 aspect-square overflow-auto text-left p-4 rounded-lg bg-white text-black">
                      <h4 className="text-orange-500 font-semibold">&rarr; {eachCategory.label}</h4>
                      {eachCategory.hasSubcategories &&
                        eachCategory.subCategories.map((item, index) => (
                          <li
                            key={index}
                            onClick={() =>
                              navigation(
                                `/${toKebabCase(country)}/business/${toKebabCase(eachCategory.label)}/${toKebabCase(item)}`
                              )
                            }
                          >
                            {item}
                          </li>
                        ))}
                    </div>
                  }
                  hasSubcategories={eachCategory.hasSubcategories}
                  mainCategory={eachCategory.label}
                  country={country}
                  pageType={'business'}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const EventsNavcategoryItem: React.FC<{ category: EventCategory }> = ({ category }) => (
  <div className="flex justify-between md:flex-col md:justify-start">
    <div className="border-2 border-orange-400 rounded-lg overflow-hidden mb-4 order-2 md:order-1 w-1/2 md:w-full">
      <img src={category.imageUrl} alt={category.title} className="w-full h-48 aspect-square object-cover" />
    </div>
    <LinkList
      heading={<h3 className="text-lg md:text-xl font-semibold">{category.title}</h3>}
      links={category.items}
      className="text-left order-1 md:order-2 w-1/2 md:w-full"
      disable={false}
    />
  </div>
);

const MyTribeNavcategoryItem: React.FC<{ category: NetworkCategory }> = ({ category }) => (
  <div className="flex justify-between md:flex-col md:justify-start">
    <div className="border-2 border-orange-400 rounded-lg overflow-hidden mb-4 order-2 md:order-1 w-1/2 md:w-full">
      <img src={category.image} alt={category.title} className="w-full h-48 aspect-square object-cover" />
    </div>
    <LinkList
      heading={<h3 className="text-lg md:text-xl font-semibold">{category.title}</h3>}
      links={category.items}
      className="text-left order-1 md:order-2 w-1/2 md:w-full"
      disable={true}
    />
  </div>
);

const Network: React.FC<{ country: string }> = ({ country }) => {
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);

  const {
    data: networkData,
    isLoading: networkDataLoading,
    error: networkDataError,
  } = useQuery<NetworkCategory[]>({
    queryKey: ['network'],
    queryFn: () => sanity.GET(`*[_type == "tribe-africa-pages"]`),
  });

  const {
    data: eventsData,
    error: eventsDataError,
    isLoading: eventsDataLoading,
  } = useQuery({
    queryKey: ['country-network-events'],
    queryFn: () =>
      sanity.GET(`*[_type == "event-categories" && category == "Business"]{
        category,
        "imageUrl": categoryImage.asset->url,
        subCategories[] {
          title,
          "subCategoryImage": subCategoryImage.asset->url
        }
      }`),
  });

  useEffect(() => {
    if (eventsData) {
      // Transform data to match eventCategories format
      const formattedData = eventsData.map((category) => ({
        title: category.category, // Category Title
        imageUrl: category.imageUrl, // Category Image URL
        items: category.subCategories.map((subCategory) => ({
          label: subCategory.title,
          url: `/${toKebabCase(country)}/events/${toKebabCase(category.category)}/${toKebabCase(subCategory.title)}`,
          imageUrl: subCategory.subCategoryImage,
        })),
      }));
      setEventCategories(formattedData as EventCategory[]);
    }
  }, [eventsData]);

  if (eventsDataLoading || networkDataLoading) return <Loading />;
  if (eventsDataError || networkDataError) return <div>Error Loading Data</div>;

  return (
    <div>
      <section className="flex flex-col p-2 md:p-4 max-w-6xl m-auto">
        <h4 className=" text-left text-orange-500 text-lg">&rarr; Network</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {networkData?.map((category, index) => (
            <TribeAfricaPagesNavcategoryItem key={index} category={category} country={country} />
          ))}
          {eventCategories.map((category, index) => (
            <EventsNavcategoryItem key={index} category={category} />
          ))}
          <MyTribeNavcategoryItem category={networkURLs} />
        </div>
      </section>
    </div>
  );
};

export default Network;
