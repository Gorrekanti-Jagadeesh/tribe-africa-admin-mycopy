import React from 'react';
import OverLayCard from '../../atoms/card/overlay-card';
import { FloatingSibling } from '../common/floating-sibling';
import { sanityImageUrlBuilder } from '@api/index';
import { useNavigate } from 'react-router';
import { toKebabCase } from '@utils/common';

const NavFloatingLayout: React.FC<{
  categories: Array<{
    category: string;
    icon: [];
    hasSubcategories: boolean;
    subcategories: string[];
  }>;
  heading: string;
  country: string;
  pageType: string;
}> = ({ categories, heading, country, pageType }) => {
  console.log('------------', categories, heading, country, pageType);
  const navigation = useNavigate();
  return (
    <div className="p-2 md:p-3">
      <h4 className="text-left text-orange-500 max-w-6xl text-lg font-semibold">&rarr; {heading}</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 w-full">
        {categories.map((each, index) => (
          <FloatingSibling
            key={index}
            component={
              <div className="m-4">
                <OverLayCard
                  data={{
                    title: each.category,
                    image: sanityImageUrlBuilder(each.icon).url(),
                  }}
                />
              </div>
            }
            sibling={
              <div className="min-w-40 h-full md:min-w-64 aspect-square overflow-auto text-left p-4 rounded-lg bg-white text-black">
                <h4 className="text-orange-500 font-semibold">&rarr; {each.category}</h4>
                {each.subcategories &&
                  each.subcategories.map((item, index) => (
                    <p
                      key={index}
                      onClick={() => {
                        console.log('-------clicked', item);
                        const afterWorkPath = heading === 'After Work' ? '/afterwork' : '';
                        const subcategory = typeof item === 'object' ? item?.value : toKebabCase(item); // Handle both object and string cases
                        navigation(
                          `/${country}/${pageType}/${toKebabCase(each.category)}${afterWorkPath}/${subcategory}`
                        );
                      }}
                    >
                      {typeof item === 'object' ? item?.title : item}{' '}
                      {/* Print title if object, otherwise print string */}
                    </p>
                  ))}
              </div>
            }
            hasSubcategories={each.hasSubcategories}
            mainCategory={each.category}
            country={country}
            pageType={pageType}
            // offset="parent"
          />
        ))}
      </div>
    </div>
  );
};

export default NavFloatingLayout;
