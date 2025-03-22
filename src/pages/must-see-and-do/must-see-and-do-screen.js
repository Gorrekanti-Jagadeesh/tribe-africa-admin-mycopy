import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import DualHeading from '../../atoms/heading/dual-heading';
import OverLayCard from '@atoms/card/overlay-card';
const MustSeeAndDoScreen = ({ category, data }) => {
  return _jsxs('div', {
    className: 'max-w-6xl m-auto',
    children: [
      _jsx(DualHeading, { className: 'text-left max-w-6xl my-4', children: category }),
      _jsx('div', {
        className: 'grid grid-cols-2 md:grid-cols-4 w-full gap-6 ',
        children: data.map((each) => _jsx('div', { children: _jsx(OverLayCard, { data: each }) }, each._id)),
      }),
    ],
  });
};
export default MustSeeAndDoScreen;
