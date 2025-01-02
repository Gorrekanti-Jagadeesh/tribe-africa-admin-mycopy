import React from 'react';
import { networkURLs } from '../../data';
import { NetworkCategory } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { LinkList } from '@molecules/layout/link-list';
import { FloatingSibling } from '@molecules/common/floating-sibling';
import { Link } from 'react-router-dom';

const NavcategoryItem: React.FC<{ category: NetworkCategory }> = ({ category }) => {
  return (
    <div className="flex justify-between md:flex-col md:justify-start">
      <div className="border-2 border-orange-400 rounded-lg overflow-hidden mb-4 order-2 md:order-1 w-1/2 md:w-full">
        <img src={category.imageUrl} alt={category.title} className="w-full h-48 aspect-square object-cover" />
      </div>
      {category.items.length === 1 ? (
        <div className="text-left order-1 md:order-2 w-1/2 md:w-full">
          <h3 className="text-lg md:text-xl font-semibold">{category.title}</h3>
          <ul>
            {category.items[0]?.subItems?.map((eachCategory, index) => {
              return (
                <li className="my-2 inline-block" key={index}>
                  <FloatingSibling
                    component={<span>{eachCategory.subTitle}</span>}
                    sibling={
                      <div className="min-w-40 h-full md:min-w-64 aspect-square overflow-auto text-left p-4 rounded-lg bg-white text-black">
                        <h4 className="text-orange-500 font-semibold">&rarr; {eachCategory.subTitle}</h4>
                        {eachCategory.subItems.map((item, index) => (
                          <Link to={item.url} key={index} className="block">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    }
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <LinkList
          heading={<h3 className="text-lg md:text-xl font-semibold">{category.title}</h3>}
          links={category.items}
          className="text-left order-1 md:order-2 w-1/2 md:w-full"
        />
      )}
    </div>
  );
};
const Network: React.FC<{ country: string }> = ({ country }) => {
  const fetchNetworkCategories = async (): Promise<NetworkCategory[]> => {
    // Ensure the data structure matches NetworkCategory[]
    return networkURLs as NetworkCategory[];
  };

  console.log('coutmr', country);

  const {
    data: networkCategories,
    isLoading,
    error,
  } = useQuery<NetworkCategory[]>({
    queryKey: ['networkCategories'],
    queryFn: fetchNetworkCategories,
  });

  if (isLoading) <>Loading...</>;
  if (error) <>Error Occurred</>;

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
