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
}> = ({ categories, heading, country }) => {
  const navigation = useNavigate();
  return (
    <div>
      <h4 className="text-left text-orange-500 p-4 max-w-6xl">&rarr; {heading}</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 w-full">
        {categories.map((each, index) => (
          <FloatingSibling
            key={index}
            component={
              <div className="p-4 m-4">
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
                    <p key={index} onClick={() => navigation(`/${country}/${toKebabCase(item)}`)}>
                      {item}
                    </p>
                  ))}
              </div>
            }
            hasSubcategories={each.hasSubcategories}
            mainCategory={each.category}
            country={country}
            // offset="parent"
          />
        ))}
      </div>
    </div>
  );
};

export default NavFloatingLayout;
