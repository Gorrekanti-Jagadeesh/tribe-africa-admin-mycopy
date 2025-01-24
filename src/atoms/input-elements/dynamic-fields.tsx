import React, { useEffect, useRef, useState } from 'react';
import { InputProps } from '../../types/index';
import Input from './input';
import Button from '@atoms/custom-button/button';
import Close from '@atoms/custom-button/close-button';

interface ExtendedInputProps extends InputProps {
  setId: string; // Add the setId property to the existing InputProps
}

interface DynamicFormProps {
  fields: InputProps[];
  setValue: (value: Array<object>) => void;
  max?: number;
}

const FieldSet = ({
  fields,
  remove,
  action,
}: {
  fields: ExtendedInputProps[];
  remove: () => void;
  action: (fieldName: string, value: string | number) => void;
}) => {
  return (
    <div className="flex gap-1">
      {fields.map((field) => (
        <Input
          key={field.name}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          className="flex-1"
          onInput={(e) => action(field.name.split('~')[0], e.currentTarget.value)}
          options={field.options}
        />
      ))}
      <Close onClick={remove} className="h-fit m-auto" />
    </div>
  );
};

const DynamicFields: React.FC<DynamicFormProps> = ({ fields, setValue, max = null }) => {
  const [fieldSet, setFieldSet] = useState<{ id: string; fields: InputProps[] }[]>([]);
  const [valueSet, setValueSet] = useState([]);
  const fieldObject = useRef({});

  const addField = () => {
    const newId = `${Date.now()}`;
    setFieldSet((prevSets) => [...prevSets, { id: newId, fields }]);
    setValueSet([...valueSet, fieldObject.current]);
  };

  const removeFieldSet = (id: string, index: number) => {
    setFieldSet((prevSets) => prevSets.filter((set) => set.id !== id));
    setValueSet(valueSet.slice(0, index).concat(valueSet.slice(index + 1)));
  };

  const updateValueSet = (fieldName: string, value: string | number, index: number) => {
    setValueSet((prevValueSet) =>
      prevValueSet.map((item, idx) => (idx === index ? { ...item, [fieldName]: value } : item))
    );
  };

  useEffect(() => setValue(valueSet), [valueSet]);

  useEffect(() => {
    let obj = {};
    fields.forEach((field) => {
      obj[field.name] = null;
    });
    fieldObject.current = obj;
  }, [fields]);

  return (
    <div className="p-2 border">
      <div>
        {fieldSet.map((fieldSet, index) => (
          <FieldSet
            key={fieldSet.id}
            fields={fieldSet.fields.map((field, idx) => ({
              ...field,
              name: `${field.name}~${fieldSet.id}~${idx}`,
              placeholder: `${field.placeholder}`,
              setId: fieldSet.id,
            }))}
            remove={() => removeFieldSet(fieldSet.id, index)}
            action={(field, value) => updateValueSet(field, value, index)}
          />
        ))}
      </div>
      <Button className="w-full" onClick={addField} disabled={max && fieldSet.length == max}>
        Add Field
      </Button>
    </div>
  );
};

export default DynamicFields;
