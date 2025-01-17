import { useState, useImperativeHandle, forwardRef } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { ChevronDownSVG } from '@assets/svgs/chevron-down-svg';

interface Option {
  value: string;
  label: string;
}

// Custom ref type that includes the method we want to expose
interface DropdownRef {
  triggerDropdown: () => void;
}

// Dropdown with Search
interface DropdownProps {
  ref?: React.Ref<DropdownRef>; // Use the custom ref type
  icon?: React.ReactNode;
  placeholderText: string;
  options: Option[];
  searchable: boolean;
  action: (selectedOption: string) => void;
  iconVisible?: boolean;
  buttonStyles?: string;
}

// Dropdown component with forwardRef
const Dropdown = forwardRef<DropdownRef, DropdownProps>(
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

    const handleOptionClick = (option: Option) => {
      setPlaceholder(option.label);
      setIsOpen(false);
      action(option.value);
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };

    // Expose the handleButtonClick function to the parent via ref
    useImperativeHandle(ref, () => ({
      triggerDropdown: () => setIsOpen(!isOpen),
      ref: dropdownRef,
    }));

    return (
      <div className="relative inline-block w-full" ref={ref ? null : dropdownRef}>
        <div
          className={`flex items-center md:p-2 rounded-md cursor-pointer truncate ${buttonStyles}`}
          onClick={handleButtonClick}
        >
          {icon && <span className="mr-2 w-4">{icon}</span>}
          {placeholder} {iconVisible && <ChevronDownSVG />}
        </div>
        <ul
          className={`absolute top-full left-0 z-10 w-full bg-white border border-gray-300 rounded-md max-h-[200px] overflow-y-auto p-0 m-0 list-none ${isOpen ? 'block' : 'hidden'}`}
        >
          {searchable && (
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md w-full text-center"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          )}
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Dropdown;
