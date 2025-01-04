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
  const [content, setContent] = useState({
    title: '',
    onClick: () => console.log('clicked'),
    data: [],
  });

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
    queryFn: () => sanity.GET(`*[_type == "home-discover-section"]`), // Handle undefined 'country'
  });

  if (discoverLoading) {
    return <Loading />;
  }

  if (discoverError) {
    return <>Error fetching data..</>;
  }
  return (
    <div className="p-2 md:p-3">
      <h4 className="text-left text-orange-500 text-lg font-semibold">&rarr; Discover</h4>
      {toggle ? (
        <div className="grid grid-cols-2 md:grid-cols-4 w-full">
          {discoverData.map((each) => (
            <div
              // className="cursor-pointer w-1/3 m-2"
              onClick={() => handleToggle({ data: each.subCategories, title: each.name })}
              key={each._id}
              className="m-4"
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
      ) : (
        <div
          id="sub-layout"
          className="p-2 md:p-8 border border-cyan-400 m-2 text-left bg-white text-black rounded-2xl"
        >
          <h4 className="text-orange-500 text-lg hover:underline cursor-pointer w-fit" onClick={() => setToggle(true)}>
            &larr; {content.title}
          </h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 overflow-auto px-2">
            {content.data.map((each) => (
              <div
                // className="cursor-pointer w-1/3 m-2"
                onClick={() => navigate(`discover/${toKebabCase(content.title)}/${toKebabCase(each.name)}`)}
                key={each._id}
                className="m-4"
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
      )}
    </div>
  );
};

export default Discover;
