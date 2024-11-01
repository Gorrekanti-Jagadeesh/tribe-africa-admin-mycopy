import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router';

interface featured {
  title: string;
  redirect: string;
  placeholder: string;
}

interface content {
  image: string;
  title: string;
  redirect: string;
}

interface cardsProps {
  heading: ReactNode;
  data: content[];
  max?: number;
  featuredCard?: featured;
}

const CardsGrid: React.FC<cardsProps> = ({ heading, data, max, featuredCard }) => {
  const navigate = useNavigate();
  return (
    <div className="p-4 max-w-6xl m-auto">
      <h2 className="text-4xl my-4">{heading}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
        {data.slice(0, max).map((item, index) => (
          <div className="w-full inline-block cursor-pointer" onClick={() => navigate(item.redirect)} key={index}>
            <div
              className="aspect-square bg-cover rounded-md"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            ></div>
            <p>{item.title}</p>
          </div>
        ))}
        {featuredCard && max && data.length < max && (
          <div className="w-full inline-block">
            <div className="w-full aspect-square flex rounded-lg bg-black border-2 border-orange-500">
              <div className="text-white text-left m-auto p-4">
                <p className="text-3xl m-4">{featuredCard.title}</p>
                <a className="underline p-4 font-light text-slate-200 cursor-pointer" href={featuredCard.redirect}>
                  {featuredCard.placeholder}
                </a>
              </div>
            </div>
            {/* <div
              className="aspect-square bg-cover rounded-md bg-gradient-to-t from-orange-500 "
              style={{
                backgroundImage: `url(${featuredCard.imageURL})`,
              }}
            ></div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardsGrid;
