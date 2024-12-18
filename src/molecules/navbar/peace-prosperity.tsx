import React from 'react';
import Button from '../../atoms/custom-button/button';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { Loading } from '@atoms/common/loading';
import { useNavigate } from 'react-router';

const PeaceProsperity: React.FC = () => {
  const {
    data: discoverData,
    error: discoverError,
    isLoading: discoverLoading,
  } = useQuery({
    queryKey: ['peace-prosperity-institute-data'],
    queryFn: () => sanity.GET(`*[_type == "peace-prosperity-institute"][0]`), // Handle undefined 'country'
  });

  if (discoverLoading) {
    return <Loading />;
  }

  if (discoverError) {
    return <>Error fetching data..</>;
  }
  console.log(discoverData, 'ppppoo');
  return (
    <div className="flex flex-col justify-center p-2 md:p-4">
      <h4 className="text-left text-orange-500 text-lg">&rarr; Peace & Prosperity Institute</h4>
      <div className="flex flex-col md:flex-row my-4">
        <div className="w-full max-w-2xl mb-4 mr-2" style={{ flex: '0 0 40%' }}>
          <video autoPlay={true} loop={true} muted={true} className="rounded-lg">
            <source src={discoverData.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div style={{ flex: '0 0 60%' }}>
          {discoverData.paragraphs.map((each: string) => (
            <p className="text-start mb-4">{each}</p>
          ))}
        </div>
      </div>

      <Button className="md:self-end md:w-48">
        <a className="md:self-end md:w-48" href={discoverData.coursesUrl} target="_blank" rel="noopener noreferrer">
          Get the Course
        </a>
      </Button>
    </div>
  );
};

export default PeaceProsperity;
