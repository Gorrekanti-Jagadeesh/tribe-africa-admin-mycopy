import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router';

interface featured {
  imageURL: string;
  info: string;
  redirect: string;
  placeholder: string;
}

interface content {
  imageURL: string;
  info: string;
  redirect: string;
}

interface cardsProps {
  heading: ReactNode;
  data: content[];
  featuredCard?: featured;
}

const CardsGrid: React.FC<cardsProps> = ({ heading, data, featuredCard }) => {
  const navigate = useNavigate();
  return (
    <div className="p-4 max-w-6xl m-auto">
      <h2 className="text-4xl my-4">{heading}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
        {data.map((item) => (
          <div className="w-full inline-block cursor-pointer" onClick={() => navigate(item.redirect)}>
            <div
              className="aspect-square bg-cover rounded-md"
              style={{
                backgroundImage: `url(${item.imageURL})`,
              }}
            ></div>
            <p>{item.info}</p>
          </div>
        ))}
        {featuredCard != undefined && (
          <div className="w-full inline-block relative">
            <div className="w-full aspect-square flex rounded-md bg-gradient-to-t from-orange-500 from-5% via-transparent absolute">
              <div className="text-white text-center mx-auto mt-auto p-4">
                <p className="text-2xl m-4">{featuredCard.info}</p>
                <a className="underline p-4 font-light cursor-pointer" href={featuredCard.redirect}>
                  {featuredCard.placeholder}
                </a>
              </div>
            </div>
            <div
              className="aspect-square bg-cover rounded-md bg-gradient-to-t from-orange-500 "
              style={{
                backgroundImage: `url(${featuredCard.imageURL})`,
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardsGrid;
