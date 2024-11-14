import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

interface Option {
  value: string;
  label: string;
}

// Dropdown with Search
interface DropdownProps {
  text: string;
  options: Option[];
  searchable: boolean;
  action: (selectedOption: string) => void;
}

// Dropdown component
const Dropdown: React.FC<DropdownProps> = ({ text, options, searchable, action }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [placeholder, setPlaceholder] = useState(text);

  const ref = useDetectClickOutside({
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

  return (
    <div className="relative inline-block" ref={ref}>
      <button className="w-24 md:w-48 bg-slate-200 p-4 rounded-md cursor-pointer truncate" onClick={handleButtonClick}>
        {placeholder}
      </button>
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
};

export default Dropdown;
