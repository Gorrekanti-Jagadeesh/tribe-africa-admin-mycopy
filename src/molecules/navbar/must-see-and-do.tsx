import React, { useEffect, useState } from 'react';
import CardsGrid from '@molecules/layout/cards-grid';
import { query, sanity } from '@utils/sanity';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { Loading } from '@atoms/common/loading';
import { useNavigate } from 'react-router';
import { toKebabCase } from '@utils/common';

const MustSeeAndDo: React.FC = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const [msdCategory, setMsdCategory] = useState([]);

  const { data, error, isLoading } = useQuery({
    queryKey: ['must_see_and_do_categories'],
    queryFn: () => sanity.GET(query.HOLIDAY.MUST_SEE_AND_DO.CATEGORY),
  });

  useEffect(() => {
    if (data) {
      const formattedCategoryData = data?.map((eachCategory) => {
        return {
          ...eachCategory,
          onClick: () =>
            navigate(`/${country}/holiday/must-see-and-do/${toKebabCase(eachCategory.title)}`, {
              state: eachCategory._id,
            }),
        };
      });
      setMsdCategory(formattedCategoryData);
    }
  }, [data, country]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return 'Error occured';
  }

  return (
    <div className="md:p-4">
      <h4 className="text-left text-orange-500 text-lg">&rarr; Must see & Do</h4>
      <CardsGrid data={msdCategory} />
    </div>
  );
};

export default MustSeeAndDo;
