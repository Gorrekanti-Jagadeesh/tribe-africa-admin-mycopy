import React from 'react';

interface CheckboxProps {
  label: string;
  onChange: (checked: boolean) => void;
  props?: React.HTMLAttributes<HTMLInputElement>;
}

// Use React.forwardRef to forward the ref to the input element
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ label, onChange, ...props }, ref) => {
  const inputId = `checkbox-${Math.random().toString(36).substr(2, 9)}`; // Generate a unique ID for the checkbox

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
        className="mr-2"
        id={inputId}
        ref={ref}
        {...props}
      />
      <label htmlFor={inputId}>{label}</label>
    </div>
  );
});

export default Checkbox;
