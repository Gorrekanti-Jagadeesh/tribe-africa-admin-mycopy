import React from 'react';
import Button from '../../atoms/custom-button/button';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { Loading } from '@atoms/common/loading';

const PeaceProsperity: React.FC = () => {
  const {
    data: ppInstituteData,
    error: ppInstituteError,
    isLoading: ppInstituteLoading,
  } = useQuery({
    queryKey: ['peace-prosperity-institute-data'],
    queryFn: () => sanity.GET(`*[_type == "peace-prosperity-institute"][1]`), // Handle undefined 'country'
  });

  if (ppInstituteLoading) {
    return <Loading />;
  }

  if (ppInstituteError) {
    return <>Error fetching data..</>;
  }

  return (
    <div className="flex flex-col justify-center p-2 md:p-4">
      <h4 className="text-left text-brand-orange text-lg font-semibold">&rarr; Peace & Prosperity Institute</h4>
      <div className="flex flex-col md:flex-row my-4">
        {ppInstituteData?.video && (
          <div className="w-full max-w-2xl mb-4 mr-2" style={{ flex: '0 0 40%' }}>
            <video autoPlay={true} loop={true} muted={true} className="rounded-lg">
              <source src={ppInstituteData.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        <div style={{ flex: '0 0 60%' }}>
          {ppInstituteData?.paragraphs?.map((each: string, index: number) => (
            <p className="text-start mb-4" key={index}>
              {each}
            </p>
          ))}
        </div>
      </div>

      {ppInstituteData?.coursesUrl && (
        <Button className="md:self-end md:w-48">
          <a
            className="md:self-end md:w-48"
            href={ppInstituteData.coursesUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get the Course
          </a>
        </Button>
      )}
    </div>
  );
};

export default PeaceProsperity;
