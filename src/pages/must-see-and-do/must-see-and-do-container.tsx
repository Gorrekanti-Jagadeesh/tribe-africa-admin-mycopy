import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import MustSeeAndDoScreen from './must-see-and-do-screen';
import { sanity } from '../../utils/sanity';
import { useQuery } from '@tanstack/react-query';
import { query } from '@utils/sanity';
import { Loading } from '@atoms/common/loading';
import { fromKebabCase } from '@utils/common';

const MustSeeAndDo = () => {
  const location = useLocation();
  const categoryId = location.state;

  const { country, category } = useParams();
  const navigate = useNavigate();

  const structureFunction = async () => {
    // Fetching data from the API
    const data = await sanity.GET(query.HOLIDAY.MUST_SEE_AND_DO.DATA(fromKebabCase(country), categoryId));
    if (data) {
      // Adding `onClick` function dynamically after the data is fetched
      const dataa = data.map((item) => ({
        ...item,
        onClick: () => navigate(`/${country}/holiday/must-see-and-do/${category}/${item._id}`), // Navigation link
      }));

      // If you want to use `dataa` further, you can return it or do something with it here
      return dataa; // Returning the mapped data
    } else {
      // Handle case where no data is returned, if necessary
      console.error('No data found.');
      return [];
    }
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['must_see_and_do_data', category],
    queryFn: structureFunction,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  if (error) {
    return;
  }

  return (
    <div>
      <MustSeeAndDoScreen category={fromKebabCase(category)} data={data} />
    </div>
  );
};

export default MustSeeAndDo;
