import React from 'react';
import { query, sanity } from '@utils/sanity';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { Loading } from '@atoms/common/loading';
import { useNavigate } from 'react-router';
import { toKebabCase } from '@utils/common';
import OverLayCard from '@atoms/card/overlay-card';

const MustSeeAndDo: React.FC = () => {
  const { country } = useParams();
  const navigate = useNavigate();

  const structureFunction = async () => {
    // Fetching data from the API
    const data = await sanity.GET(query.HOLIDAY.MUST_SEE_AND_DO.CATEGORY);

    if (data) {
      // Mapping over the data to add the `onClick` function dynamically
      const formattedCategoryData = data.map((eachCategory) => ({
        ...eachCategory,
        onClick: () =>
          navigate(`/${country}/holiday/must-see-and-do/${toKebabCase(eachCategory.title)}`, {
            state: eachCategory._id,
          }),
      }));

      // Returning the formatted data
      return formattedCategoryData;
    } else {
      // Handle the case where no data is returned
      console.error('No data found.');
      return [];
    }
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['must_see_and_do_categories', country],
    queryFn: structureFunction, // Use the structureFunction for fetching and formatting data
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  if (error) {
    return 'Error occured';
  }

  return (
    <div className="p-2 md:p-3">
      <h4 className="text-left text-orange-500 text-lg font-semibold">&rarr; Must see & Do</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 w-full">
        {data.map((each) => (
          <div key={each._id} className="m-4">
            <OverLayCard data={each} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MustSeeAndDo;
