import React, { useEffect, useState, useCallback, useRef } from 'react';
import Input from './input';
import Button from '@atoms/custom-button/button';
import Close from '@atoms/custom-button/close-button';

interface DynamicFormProps {
  setValue: (value: string[]) => void;
  max?: number;
}

const DynamicFields: React.FC<DynamicFormProps> = ({ setValue, max = 6 }) => {
  const [fields, setFields] = useState<string[]>([]);
  const prevFieldsRef = useRef<string[]>([]);

  // Function to add a new field
  const addField = useCallback(() => {
    setFields((prevFields) => (prevFields.length >= max ? prevFields : [...prevFields, '']));
  }, [max]);

  // Function to remove a field
  const removeField = useCallback((index: number) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
  }, []);

  // Function to update a field value
  const updateField = useCallback((index: number, value: string) => {
    setFields((prevFields) => prevFields.map((item, i) => (i === index ? value : item)));
  }, []);

  // Update parent state only when fields change
  useEffect(() => {
    if (JSON.stringify(fields) !== JSON.stringify(prevFieldsRef.current)) {
      setValue(fields);
      prevFieldsRef.current = fields;
    }
  }, [fields, setValue]);

  return (
    <div className="p-2 border mt-2 mb-6 rounded-md">
      <div className="space-y-2">
        {fields.map((value, index) => (
          <div key={index} className="flex gap-2">
            <Input
              type="text"
              value={value}
              placeholder={`Highlight ${index + 1}`}
              onChange={(e) => updateField(index, e.target.value)}
            />
            <Close onClick={() => removeField(index)} className="h-fit m-auto cursor-pointer text-red-500" />
          </div>
        ))}
      </div>
      {fields.length < max && (
        <Button className="w-full mt-2" onClick={addField}>
          Add Highlight
        </Button>
      )}
    </div>
  );
};

export default DynamicFields;
