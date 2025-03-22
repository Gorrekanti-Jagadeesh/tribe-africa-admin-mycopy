import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { ChevronDownSVG } from '@assets/svgs/chevron-down-svg';
// Dropdown component with forwardRef
const Dropdown = forwardRef(
  ({ icon, placeholderText, options, searchable, action, iconVisible = false, buttonStyles }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [placeholder, setPlaceholder] = useState(placeholderText);
    const dropdownRef = useDetectClickOutside({
      onTriggered: () => {
        setIsOpen(false);
      },
    });
    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
    const handleButtonClick = () => {
      setIsOpen(!isOpen);
    };
    const handleOptionClick = (option) => {
      setPlaceholder(option.label);
      setIsOpen(false);
      action(option.value);
    };
    const handleSearchInputChange = (event) => {
      setSearchTerm(event.target.value);
    };
    // Expose the handleButtonClick function to the parent via ref
    useImperativeHandle(ref, () => ({
      triggerDropdown: () => setIsOpen(!isOpen),
      ref: dropdownRef,
    }));
    return _jsxs('div', {
      className: 'relative inline-block w-full',
      ref: ref ? null : dropdownRef,
      children: [
        _jsxs('div', {
          className: `flex items-center md:p-2 rounded-md cursor-pointer truncate ${buttonStyles}`,
          onClick: handleButtonClick,
          children: [
            icon && _jsx('span', { className: 'mr-2 w-4', children: icon }),
            placeholder,
            ' ',
            iconVisible && _jsx(ChevronDownSVG, {}),
          ],
        }),
        _jsxs('ul', {
          className: `absolute top-full left-0 z-50 w-full bg-white border border-gray-300 rounded-md max-h-[200px] overflow-y-auto p-0 m-0 list-none ${isOpen ? 'block' : 'hidden'}`,
          children: [
            searchable &&
              _jsx('input', {
                type: 'text',
                className: 'p-2 border border-gray-300 rounded-md w-full text-center',
                placeholder: 'Search...',
                value: searchTerm,
                onChange: handleSearchInputChange,
              }),
            filteredOptions.map((option) =>
              _jsx(
                'li',
                {
                  className: 'p-2 cursor-pointer hover:bg-gray-100',
                  onClick: () => handleOptionClick(option),
                  children: option.label,
                },
                option.value
              )
            ),
          ],
        }),
      ],
    });
  }
);
export default Dropdown;
