import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useRef } from 'react';
import Button from '../../atoms/custom-button/button';
import { useNavigate } from 'react-router';
import { toKebabCase } from '@utils/common';
export const FloatingSibling = ({
  component,
  sibling,
  hasSubcategories,
  mainCategory,
  country,
  pageType,
  heading,
  formType,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [positionStyle, setPositionStyle] = useState({});
  const cardRef = useRef(null);
  const navigation = useNavigate();
  const handleClick = () => {
    if (heading === 'After Work') {
      const afterWorkPath = heading === 'After Work' ? '/afterwork' : '';
      if (!hasSubcategories) {
        if (formType == 1) {
          navigation(`/${country}/${pageType}/${toKebabCase(mainCategory)}${afterWorkPath}/${mainCategory}`);
        } else {
          navigation(`/${country}/${pageType}/find-a-business/${toKebabCase(mainCategory)}/${mainCategory}`);
        }
        return;
      }
    } else {
      if (!hasSubcategories) {
        navigation(`/${country}/${pageType}/details/${toKebabCase(mainCategory)}`);
        return;
      }
    }
    if (!isClicked && cardRef.current && cardRef.current.offsetParent) {
      const cardBounds = cardRef.current.getBoundingClientRect();
      const parentBounds = cardRef.current.offsetParent.getBoundingClientRect();
      let style = {};
      // Check available space within the parent container
      const rightSpace = parentBounds.right - cardBounds.right;
      const leftSpace = cardBounds.left - parentBounds.left;
      // Determine dropdown positioning based on available space
      if (rightSpace >= 200) {
        style = { left: '100%', paddingLeft: '8px' };
      } else if (leftSpace >= 200) {
        style = { right: '100%', paddingRight: '8px' };
      } else {
        style = { left: '50%', transform: 'translateX(-50%)', top: '100%', marginTop: '8px' };
      }
      setPositionStyle(style);
    }
    setIsClicked(!isClicked); // Toggle the clicked state
  };
  return _jsxs('div', {
    className: 'relative',
    ref: cardRef,
    children: [
      _jsx('div', { onClick: handleClick, style: { cursor: 'pointer' }, children: component }),
      isClicked &&
        hasSubcategories &&
        _jsxs('div', {
          className: 'absolute z-20 top-0 transition-opacity duration-300',
          style: positionStyle,
          children: [
            _jsx(Button, {
              className: 'absolute flex justify-center items-center -top-2 -right-2 rounded-full w-8 h-8',
              onClick: () => setIsClicked(false),
              children: 'x',
            }),
            sibling,
          ],
        }),
    ],
  });
};
