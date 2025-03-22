import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
const getPosition = (pos, offset) => {
  let positions = pos.split('-');
  let style = {};
  positions.forEach((position) => {
    if (position === 'top' || position === 'bottom') {
      style[position] = offset; // Apply offset for top or bottom
    } else if (position === 'left' || position === 'right') {
      style[position] = offset; // Apply offset for left or right
    } else if (position === 'center') {
      // Centering logic
      if (!positions.includes('top') && !positions.includes('bottom')) {
        style.top = '50%';
        style.transform = 'translateY(-50%)'; // Vertically center
      }
      if (!positions.includes('left') && !positions.includes('right')) {
        style.left = '50%';
        style.transform = style.transform
          ? `${style.transform} translateX(-50%)` // Horizontally center
          : 'translateX(-50%)';
      }
    }
  });
  return style;
};
const BackgroundImageWrapper = ({
  image,
  position = 'center',
  offset = '0px',
  opacity = '1',
  size = '384px',
  scale = 'contain',
  repeat = false,
  children,
}) => {
  return _jsxs('div', {
    className: 'relative overflow-hidden',
    children: [
      _jsx('div', {
        className: `absolute bg-${scale} ${repeat ? '' : 'bg-no-repeat'}`,
        style: {
          backgroundImage: `url(${image})`,
          opacity: opacity,
          width: size,
          height: size,
          ...getPosition(position, offset),
        },
      }),
      _jsx('div', {
        className: 'overflow-auto h-full w-full flex',
        children: _jsx('span', { className: 'm-auto w-full z-10', children: children }),
      }),
    ],
  });
};
export default BackgroundImageWrapper;
