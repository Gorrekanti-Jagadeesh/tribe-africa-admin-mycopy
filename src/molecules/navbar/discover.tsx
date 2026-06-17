import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { sanity } from '@utils/sanity';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@atoms/common/loading';
import { sanityImageUrlBuilder } from '@api/index';
import { toKebabCase } from '@utils/common';
import OverLayCard from '@atoms/card/overlay-card';

const Discover: React.FC = () => {
  const [toggle, setToggle] = useState(true);
  const [content, setContent] = useState({ title: '', onClick: () => {}, data: [] });
  const navigate = useNavigate();

  const handleToggle = (data) => {
    setToggle(false);
    setContent(data);
  };

  const {
    data: discoverData,
    error: discoverError,
    isLoading: discoverLoading,
  } = useQuery({
    queryKey: ['home-discover-section-data'],
    queryFn: () => sanity.GET(`*[_type == "home-discover-section"]`),
  });

  if (discoverLoading) return <Loading />;
  if (discoverError) return <>Error fetching data..</>;

  return (
    <div className="p-3 md:p-4">
      <h4 className="text-left text-brand-orange font-poppins font-semibold text-lg mb-3">&rarr; Discover</h4>

      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-3 ${toggle ? 'block' : 'hidden'}`}>
        {discoverData.map((each) => (
          <div
            key={each._id}
            className="cursor-pointer"
            onClick={() => handleToggle({ data: each.subCategories, title: each.name })}
          >
            <OverLayCard
              data={{
                title: each.name,
                image: sanityImageUrlBuilder(each.image).url(),
              }}
            />
          </div>
        ))}
      </div>

      <div
        id="sub-layout"
        className={`p-3 md:p-6 border border-brand-orange/30 m-2 text-left bg-white text-black rounded-[10px] ${toggle ? 'hidden' : 'block'}`}
      >
        <h4
          className="text-brand-orange font-poppins font-medium text-lg hover:underline cursor-pointer w-fit mb-4"
          onClick={() => setToggle(true)}
        >
          &larr; {content.title}
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 overflow-auto px-2">
          {content.data.map((each) => (
            <div
              key={each._id}
              className="cursor-pointer"
              onClick={() => navigate(`discover/${toKebabCase(content.title)}/${toKebabCase(each.name)}`)}
            >
              <OverLayCard
                data={{
                  title: each.name,
                  image: sanityImageUrlBuilder(each.image).url(),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
