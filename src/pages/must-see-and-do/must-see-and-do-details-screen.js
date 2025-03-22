import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { sanityImageUrlBuilder } from '@api/index';
import { Loading } from '@atoms/common/loading';
import DualHeading from '@atoms/heading/dual-heading';
import { useQuery } from '@tanstack/react-query';
import { query, sanity } from '@utils/sanity';
import { useParams } from 'react-router';
const MustSeeAndDoDetails = () => {
  const { category, country, id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ['must_see_and_do_data', id],
    queryFn: () => sanity.GET(query.HOLIDAY.MUST_SEE_AND_DO.DETAILS(id)),
  });
  console.log(country, category);
  if (isLoading) {
    return _jsx('div', { className: 'h-screen flex justify-center items-center', children: _jsx(Loading, {}) });
  }
  if (error) {
    console.log(error);
  }
  const { title, image, description } = data?.[0] || {};
  return _jsxs('div', {
    className: 'max-w-6xl m-auto p-4',
    children: [
      title && _jsx(DualHeading, { className: 'my-4', children: title }),
      image &&
        _jsx('img', {
          src: sanityImageUrlBuilder(image.asset._ref).url(),
          className: 'float-right max-w-96',
          alt: title,
        }),
      description && _jsx('div', { children: _jsx('p', { children: description }) }),
    ],
  });
};
export default MustSeeAndDoDetails;
