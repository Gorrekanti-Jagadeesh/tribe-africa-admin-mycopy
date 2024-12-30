import React, { useState } from 'react';

interface AccordionItem {
  id: number;
  name: string;
}

interface AccordionProps {
  mainLabel: string; // Label for the main checkbox
  items: AccordionItem[]; // List of items to show inside the accordion
  onSelectionChange?: (selectedIds: number[]) => void; // Callback when selection changes
}

const AccordionWithCheckboxes: React.FC<AccordionProps> = ({ mainLabel, items, onSelectionChange }) => {
  // State to control the main checkbox and accordion visibility
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // State for individual checkboxes inside the accordion
  const [subCheckboxes, setSubCheckboxes] = useState<{ [key: number]: boolean }>({});

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
  const handleSubCheckboxChange = (id: number) => {
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

  return (
    <div className="space-y-4">
      {/* Main Checkbox and Label */}
      <div className="flex items-center space-x-2">
        <input type="checkbox" checked={isChecked} onChange={handleMainCheckboxChange} className="h-3 w-3" />
        <span>{mainLabel}</span>
      </div>

      {/* Accordion (visible when main checkbox is checked) */}
      {isChecked && (
        <div className="space-y-2 pl-8">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={subCheckboxes[item.id] || false}
                onChange={() => handleSubCheckboxChange(item.id)}
                className="h-3 w-"
              />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordionWithCheckboxes;
