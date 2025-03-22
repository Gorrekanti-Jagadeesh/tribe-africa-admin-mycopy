import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
const AccordionWithCheckboxes = ({ mainLabel, items, onSelectionChange }) => {
  // State to control the main checkbox and accordion visibility
  const [isChecked, setIsChecked] = useState(false);
  // State for individual checkboxes inside the accordion
  const [subCheckboxes, setSubCheckboxes] = useState({});
  // Handle main checkbox toggle
  const handleMainCheckboxChange = () => {
    setIsChecked((prev) => {
      const newState = !prev;
      if (!newState) {
        // If the accordion is being closed, reset sub-checkboxes
        setSubCheckboxes({});
      }
      return newState;
    });
  };
  // Handle sub-checkbox toggle
  const handleSubCheckboxChange = (id) => {
    setSubCheckboxes((prev) => {
      const newState = {
        ...prev,
        [id]: !prev[id],
      };
      // Notify parent if the onSelectionChange prop is passed
      if (onSelectionChange) {
        onSelectionChange(
          Object.keys(newState)
            .filter((key) => newState[Number(key)])
            .map(Number)
        );
      }
      return newState;
    });
  };
  return _jsxs('div', {
    className: 'space-y-4',
    children: [
      _jsxs('div', {
        className: 'flex items-center space-x-2',
        children: [
          _jsx('input', {
            type: 'checkbox',
            checked: isChecked,
            onChange: handleMainCheckboxChange,
            className: 'h-3 w-3',
          }),
          _jsx('span', { children: mainLabel }),
        ],
      }),
      isChecked &&
        _jsx('div', {
          className: 'space-y-2 pl-8',
          children: items.map((item) =>
            _jsxs(
              'div',
              {
                className: 'flex items-center space-x-2',
                children: [
                  _jsx('input', {
                    type: 'checkbox',
                    checked: subCheckboxes[item.id] || false,
                    onChange: () => handleSubCheckboxChange(item.id),
                    className: 'h-3 w-',
                  }),
                  _jsx('span', { children: item.name }),
                ],
              },
              item.id
            )
          ),
        }),
    ],
  });
};
export default AccordionWithCheckboxes;
