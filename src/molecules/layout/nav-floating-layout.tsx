import React from 'react';
import OverLayCard from '../../atoms/card/overlay-card';
import { FloatingSibling } from '../common/floating-sibling';

const NavFloatingLayout: React.FC<{
  categories: Array<{ title: string; image: string; items: Array<{ title: string }> }>;
}> = ({ categories }) => {
  return (
    <div>
      <h4 className="text-left text-orange-500 p-4 max-w-6xl">&rarr; Out & About</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 w-full">
        {categories.map((category, index) => (
          <FloatingSibling
            key={index}
            component={
              <div className="p-4 m-4">
                <OverLayCard
                  data={{
                    title: category.title,
                    image: category.image,
                  }}
                />
              </div>
            }
            sibling={
              <div className="min-w-40 h-full md:min-w-64 aspect-square overflow-auto text-left p-4 rounded-lg bg-white text-black">
                <h4 className="text-orange-500 font-semibold">&rarr; {category.title}</h4>
                {category.items.map((item, index) => (
                  <p key={index}>{item.title}</p>
                ))}
              </div>
            }
            // offset="parent"
          />
        ))}
      </div>
      {/* <FloatingSibling/> */}
    </div>
  );
};

export default NavFloatingLayout;
