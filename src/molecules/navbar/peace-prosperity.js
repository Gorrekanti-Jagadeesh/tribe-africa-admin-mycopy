import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from 'react/jsx-runtime';
import Button from '../../atoms/custom-button/button';
import { useQuery } from '@tanstack/react-query';
import { sanity } from '@utils/sanity';
import { Loading } from '@atoms/common/loading';
const PeaceProsperity = () => {
  const {
    data: ppInstituteData,
    error: ppInstituteError,
    isLoading: ppInstituteLoading,
  } = useQuery({
    queryKey: ['peace-prosperity-institute-data'],
    queryFn: () => sanity.GET(`*[_type == "peace-prosperity-institute"][1]`), // Handle undefined 'country'
  });
  if (ppInstituteLoading) {
    return _jsx(Loading, {});
  }
  if (ppInstituteError) {
    return _jsx(_Fragment, { children: 'Error fetching data..' });
  }
  return _jsxs('div', {
    className: 'flex flex-col justify-center p-2 md:p-4',
    children: [
      _jsx('h4', {
        className: 'text-left text-orange-500 text-lg font-semibold',
        children: '\u2192 Peace & Prosperity Institute',
      }),
      _jsxs('div', {
        className: 'flex flex-col md:flex-row my-4',
        children: [
          _jsx('div', {
            className: 'w-full max-w-2xl mb-4 mr-2',
            style: { flex: '0 0 40%' },
            children: _jsxs('video', {
              autoPlay: true,
              loop: true,
              muted: true,
              className: 'rounded-lg',
              children: [
                _jsx('source', { src: ppInstituteData.video, type: 'video/mp4' }),
                'Your browser does not support the video tag.',
              ],
            }),
          }),
          _jsx('div', {
            style: { flex: '0 0 60%' },
            children: ppInstituteData.paragraphs.map((each, index) =>
              _jsx('p', { className: 'text-start mb-4', children: each }, index)
            ),
          }),
        ],
      }),
      _jsx(Button, {
        className: 'md:self-end md:w-48',
        children: _jsx('a', {
          className: 'md:self-end md:w-48',
          href: ppInstituteData.coursesUrl,
          target: '_blank',
          rel: 'noopener noreferrer',
          children: 'Get the Course',
        }),
      }),
    ],
  });
};
export default PeaceProsperity;
