import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface DynamicFormProps {
  namePrefix: string;
  fields: FieldValues[];
  append: (value: FieldValues) => void;
  remove: (index: number) => void;
  register: UseFormRegister<any>;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ namePrefix, fields, append, remove, register }) => (
  <div>
    {fields.map((field, index) => (
      <div key={field.id} className="flex items-center space-x-2">
        <input
          {...register(`${namePrefix}.${index}.key` as const)}
          className="border rounded p-2 w-full"
          placeholder="Key"
        />
        <input
          {...register(`${namePrefix}.${index}.value` as const)}
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
