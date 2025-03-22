import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState, useCallback, useRef } from 'react';
import Input from './input';
import Button from '@atoms/custom-button/button';
import Close from '@atoms/custom-button/close-button';
const DynamicFields = ({ setValue, max = 6, formType }) => {
  const [fields, setFields] = useState([]);
  const prevFieldsRef = useRef([]);
  // Reset fields when formType changes
  useEffect(() => {
    setFields([]);
  }, [formType]);
  // Function to add a new field
  const addField = useCallback(() => {
    setFields((prevFields) => (prevFields.length >= max ? prevFields : [...prevFields, '']));
  }, [max]);
  // Function to remove a field
  const removeField = useCallback((index) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
  }, []);
  // Function to update a field value
  const updateField = useCallback((index, value) => {
    setFields((prevFields) => prevFields.map((item, i) => (i === index ? value : item)));
  }, []);
  // Update parent state only when fields change
  useEffect(() => {
    if (JSON.stringify(fields) !== JSON.stringify(prevFieldsRef.current)) {
      setValue(fields);
      prevFieldsRef.current = fields;
    }
  }, [fields, setValue]);
  return _jsxs('div', {
    className: 'p-2 border mt-2 mb-6 rounded-md',
    children: [
      _jsx('div', {
        className: 'space-y-2',
        children: fields.map((value, index) =>
          _jsxs(
            'div',
            {
              className: 'flex gap-2',
              children: [
                _jsx(Input, {
                  required: true,
                  type: 'text',
                  value: value,
                  placeholder: `Highlight ${index + 1}`,
                  onChange: (e) => updateField(index, e.target.value),
                }),
                _jsx(Close, {
                  onClick: () => removeField(index),
                  className: 'h-fit m-auto cursor-pointer text-red-500',
                }),
              ],
            },
            index
          )
        ),
      }),
      fields.length < max && _jsx(Button, { className: 'w-full mt-2', onClick: addField, children: 'Add Highlight' }),
    ],
  });
};
export default DynamicFields;
