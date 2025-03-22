import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { query, sanity } from '@utils/sanity';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { Loading } from '@atoms/common/loading';
import { useNavigate } from 'react-router';
import { toKebabCase } from '@utils/common';
import OverLayCard from '@atoms/card/overlay-card';
const MustSeeAndDo = () => {
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
    return _jsx('div', { className: 'flex justify-center items-center', children: _jsx(Loading, {}) });
  }
  if (error) {
    return 'Error occured';
  }
  return _jsxs('div', {
    className: 'p-2 md:p-3',
    children: [
      _jsx('h4', { className: 'text-left text-orange-500 text-lg font-semibold', children: '\u2192 Must see & Do' }),
      _jsx('div', {
        className: 'grid grid-cols-2 md:grid-cols-4 w-full',
        children: data.map((each) =>
          _jsx('div', { className: 'm-4', children: _jsx(OverLayCard, { data: each }) }, each._id)
        ),
      }),
    ],
  });
};
export default MustSeeAndDo;
