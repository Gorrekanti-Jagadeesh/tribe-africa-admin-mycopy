import React from 'react';
import { NetworkCategory } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { FloatingSibling } from '@molecules/common/floating-sibling';
import { sanity } from '@utils/sanity';
import { sanityImageUrlBuilder } from '@api/index';

const NavcategoryItem: React.FC<{ category: NetworkCategory }> = ({ category }) => {
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
                        eachCategory.subCategories.map((item, index) => <li key={index}>{item}</li>)}
                    </div>
                  }
                  hasSubcategories={eachCategory.hasSubcategories}
                  mainCategory={eachCategory.label}
                  country={'algeria'}
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
const Network: React.FC<{ country: string }> = ({ country }) => {
  const {
    data: networkCategories,
    isLoading,
    error,
  } = useQuery<NetworkCategory[]>({
    queryKey: ['networkCategories'],
    queryFn: () => sanity.GET(`*[_type == "network"]`),
  });

  if (isLoading) <>Loading...</>;
  if (error) <>Error Occurred</>;

  console.log(country);

  return (
    <div>
      <section className="flex flex-col p-2 md:p-4 max-w-6xl m-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {networkCategories?.map((category, index) => <NavcategoryItem key={index} category={category} />)}
        </div>
      </section>
    </div>
  );
};

export default Network;
