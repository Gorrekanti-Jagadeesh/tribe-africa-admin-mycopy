import React from 'react';

interface FeaturedCardProps {
  title: string;
  redirectUrl: string;
  UrlPlaceholder: string;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ title, redirectUrl, UrlPlaceholder }) => {
  return (
    <div className="w-full inline-block">
      <div className="w-full aspect-square flex rounded-lg bg-black border-2 border-orange-500">
        <div className="text-white text-left m-auto p-4">
          <p className="text-3xl m-4">{title}</p>
          <a className="underline p-4 font-light text-slate-200 cursor-pointer" href={redirectUrl}>
            {UrlPlaceholder}
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
