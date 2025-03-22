import { jsx as _jsx } from 'react/jsx-runtime';
const ColsGrid = ({ cols = 3, gap = 2, children }) => {
  return _jsx('div', {
    className: `max-w-6xl m-auto grid gap-${gap}`,
    style: {
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    },
    children: children,
  });
};
export default ColsGrid;
