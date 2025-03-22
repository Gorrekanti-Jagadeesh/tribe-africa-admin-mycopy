import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import OverLayCard from '@atoms/card/overlay-card';
import DualHeading from '@atoms/heading/dual-heading';
import { demoImage } from '@data/index';
import ColsGrid from '@molecules/layout/cols-grid';
const LookOutCollage = () => {
  return _jsxs('div', {
    className: 'max-w-6xl m-auto p-4 animate-on-scroll',
    children: [
      _jsx(DualHeading, { children: 'Things to *Look Out* For!' }),
      _jsx('div', {
        className: 'mt-4',
        children: _jsxs(ColsGrid, {
          cols: 2,
          gap: 3,
          children: [
            _jsx(OverLayCard, { data: { image: demoImage } }),
            _jsx(OverLayCard, { data: { image: demoImage } }),
            _jsx(OverLayCard, { data: { image: demoImage } }),
            _jsx(OverLayCard, { data: { image: demoImage } }),
          ],
        }),
      }),
    ],
  });
};
export default LookOutCollage;
