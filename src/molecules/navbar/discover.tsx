import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { sanity } from '@utils/sanity';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@atoms/common/loading';
import { sanityImageUrlBuilder } from '@api/index';
import { toKebabCase } from '@utils/common';

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
    <div className="md:p-4">
      <h4 className="text-left text-orange-500 text-lg">&rarr; Discover</h4>
      {toggle ? (
        <div className="flex">
          {discoverData.map((each) => (
            <div
              className="cursor-pointer w-1/3 m-2"
              onClick={() => handleToggle({ data: each.subCategories, title: each.name })}
              key={each._id}
            >
              <img
                className="rounded-md aspect-square hover:border hover:border-orange-500"
                src={sanityImageUrlBuilder(each.image)}
              />
              <p>{each.name}</p>
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
          <div className="flex">
            {content.data.map((each) => (
              <div
                className="cursor-pointer w-1/3 m-2"
                onClick={() => navigate(`discover/${toKebabCase(content.title)}/${toKebabCase(each.name)}`)}
                key={each._id}
              >
                <img className="rounded-md aspect-square" src={sanityImageUrlBuilder(each.image)} />
                <p>{each.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;
