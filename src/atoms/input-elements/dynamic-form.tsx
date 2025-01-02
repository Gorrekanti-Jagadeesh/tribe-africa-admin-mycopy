import React from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AccommodationFormInputs } from '@molecules/forms/accomodation-creation-form';

interface DynamicFormProps {
  namePrefix: keyof AccommodationFormInputs; // Ensure `namePrefix` is a valid key
  fields: { id: string }[]; // Array of dynamic field objects
  append: (value: FieldValues) => void;
  remove: (index: number) => void;
  register: UseFormRegister<AccommodationFormInputs>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ namePrefix, fields, remove, register }) => (
  <div>
    {fields.map((field, index) => (
      <div key={field.id} className="flex items-center space-x-2">
        <input
          {...register(`${namePrefix}.${index}.key` as `dynamicFields.${number}.key`)}
          className="border rounded p-2 w-full"
          placeholder="Key"
        />
        <input
          {...register(`${namePrefix}.${index}.value` as `dynamicFields.${number}.value`)}
          className="border rounded p-2 w-full"
          placeholder="Value"
        />
        <button type="button" onClick={() => remove(index)} className="text-red-500">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    ))}
  </div>
);

export default DynamicForm;
