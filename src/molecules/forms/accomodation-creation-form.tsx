import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler, useFieldArray } from 'react-hook-form';
import FileUploadWithPreview from '@atoms/input-elements/file-upload-with-preview';
import { RichTextEditor } from '@atoms/input-elements/rich-text-editor';
import DynamicForm from '@atoms/input-elements/dynamic-form'; // Assuming this is your custom component
import Dropdown from '@atoms/dropdown/dropdown-search';
import AccordionWithCheckboxes from '@molecules/accordion/check-boxes-accordion';

interface AccommodationFormInputs {
  name: string;
  address: string;
  website: string;
  phone_no: string;
  email: string;
  amount: string;
  images: FileList;
  about: {
    title: string;
    description: string;
  };
  policy: string[];
  paymentMethods: {
    card: boolean;
    cash: boolean;
    online: boolean;
  };
  acceptedCards: {
    masterCard: boolean;
    visaCard: boolean;
    americanExpress: boolean;
    discover: boolean;
    jcb: boolean;
  };
  landmarks: { title: string; distance: string }[];
  attractions: { title: string; distance: string }[];
  location: {
    latitude: string;
    longitude: string;
  };
  amenities: {
    title: string;
    list: { title: string; description: string }[];
  };
  dynamicFields: { key: string; value: string }[]; // Dynamic Fields for Key-Value pairs
}

const AccommodationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AccommodationFormInputs>({
    defaultValues: {
      dynamicFields: [{ key: '', value: '' }],
    },
  });

  // State for tracking selected items from each accordion
  const [selectedIds, setSelectedIds] = useState<{ [key: string]: number[] }>({});

  // Callback to handle selection changes in each accordion
  const handleSelectionChange = (accordionKey: string, selectedIds: number[]) => {
    setSelectedIds((prevState) => ({
      ...prevState,
      [accordionKey]: selectedIds,
    }));
  };

  // Data for all accordions (dynamic data for each accordion)
  const accordionsData = [
    {
      mainLabel: 'Select Options for Accordion 1',
      items: [
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
        { id: 3, name: 'Option 3' },
        { id: 4, name: 'Option 4' },
        { id: 5, name: 'Option 5' },
      ],
    },
    {
      mainLabel: 'Select Options for Accordion 2',
      items: [
        { id: 1, name: 'Option 6' },
        { id: 2, name: 'Option 7' },
        { id: 3, name: 'Option 8' },
        { id: 4, name: 'Option 9' },
        { id: 5, name: 'Option 10' },
      ],
    },
    {
      mainLabel: 'Select Options for Accordion 3',
      items: [
        { id: 1, name: 'Option 11' },
        { id: 2, name: 'Option 12' },
        { id: 3, name: 'Option 13' },
        { id: 4, name: 'Option 14' },
        { id: 5, name: 'Option 15' },
      ],
    },
    {
      mainLabel: 'Select Options for Accordion 4',
      items: [
        { id: 1, name: 'Option 16' },
        { id: 2, name: 'Option 17' },
        { id: 3, name: 'Option 18' },
        { id: 4, name: 'Option 19' },
        { id: 5, name: 'Option 20' },
      ],
    },
    {
      mainLabel: 'Select Options for Accordion 5',
      items: [
        { id: 1, name: 'Option 21' },
        { id: 2, name: 'Option 22' },
        { id: 3, name: 'Option 23' },
        { id: 4, name: 'Option 24' },
        { id: 5, name: 'Option 25' },
      ],
    },
    {
      mainLabel: 'Select Options for Accordion 6',
      items: [
        { id: 1, name: 'Option 26' },
        { id: 2, name: 'Option 27' },
        { id: 3, name: 'Option 28' },
        { id: 4, name: 'Option 29' },
        { id: 5, name: 'Option 30' },
      ],
    },
  ];

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dynamicFields',
  });

  const onSubmit: SubmitHandler<AccommodationFormInputs> = (data) => {
    console.log(data);
  };

  const atmCards = [
    { value: 'mastercard', label: 'MasterCard' },
    { value: 'visa', label: 'Visa' },
    { value: 'amex', label: 'American Express' },
    { value: 'discover', label: 'Discover' },
    { value: 'jcb', label: 'JCB' },
    { value: 'unionpay', label: 'UnionPay' },
    { value: 'rupay', label: 'RuPay' },
    { value: 'interac', label: 'Interac' },
    { value: 'eftpos', label: 'EFTPOS' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Accommodation Registration Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            {...register('name', { required: 'Name is required' })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-200"
            placeholder="Enter name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Website */}
        <div>
          <label htmlFor="website" className="block text-sm font-medium mb-1">
            Website
          </label>
          <input
            id="website"
            {...register('website', { required: 'Website is required' })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-200"
            placeholder="Enter website URL"
          />
          {errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone_no" className="block text-sm font-medium mb-1">
            Phone Number
          </label>
          <input
            id="phone_no"
            {...register('phone_no', { required: 'Phone number is required' })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-200"
            placeholder="Enter phone number"
          />
          {errors.phone_no && <p className="text-red-500 text-sm">{errors.phone_no.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-200"
            placeholder="Enter email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">
            Address
          </label>
          <input
            id="address"
            {...register('address', { required: 'Address is required' })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-200"
            placeholder="Enter address"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        {/* Description */}
        <div>
          <p className="block text-sm font-medium mb-1">Description</p>
          <Controller
            name="about.description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <textarea
                {...field}
                className="w-full h-48 p-2 border rounded outline-none"
                placeholder="Write your review..."
              />
            )}
          />
        </div>

        {/* Accommodation Images */}
        <div>
          <p className="block text-sm font-medium mb-1">Add some Photos</p>
          <FileUploadWithPreview control={control} />
        </div>

        {/* Accommodation Policies */}
        <div>
          <p className="block text-sm font-medium mb-1">Accommodation Policies</p>
          <RichTextEditor onContentChange={() => {}} />
        </div>

        {/* Dynamic Key-Value Pair Creation Operation seasons */}
        <div>
          <label className="block text-sm font-medium mb-1">Operation seasons</label>
          {/* Pass append, remove, and fields to the DynamicForm component */}
          <DynamicForm namePrefix="dynamicFields" fields={fields} append={append} remove={remove} register={register} />
          <button
            type="button"
            onClick={() => append({ key: '', value: '' })}
            className="bg-green-500 text-white py-2 px-4 rounded mt-2"
          >
            Add Custom Field
          </button>
        </div>

        {/* Dynamic Key-Value Pair Creation Near by Attractions */}
        <div>
          <label className="block text-sm font-medium mb-1">Near by Attractions</label>
          {/* Pass append, remove, and fields to the DynamicForm component */}
          <DynamicForm namePrefix="dynamicFields" fields={fields} append={append} remove={remove} register={register} />
          <button
            type="button"
            onClick={() => append({ key: '', value: '' })}
            className="bg-green-500 text-white py-2 px-4 rounded mt-2"
          >
            Add Custom Field
          </button>
        </div>

        {/* Payment Methods */}
        <div>
          <label className="block text-sm font-medium mb-1">Payment Accepted</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input type="checkbox" {...register('paymentMethods.card')} className="mr-2" />
              Card
            </label>
            <label className="flex items-center">
              <input type="checkbox" {...register('paymentMethods.cash')} className="mr-2" />
              Cash
            </label>
            <label className="flex items-center">
              <input type="checkbox" {...register('paymentMethods.online')} className="mr-2" />
              Online
            </label>
          </div>
        </div>

        {/* Accepted Cards Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">Near by Attractions</label>
          <Dropdown
            iconVisible={true}
            placeholderText="Master Card"
            searchable={false}
            options={atmCards}
            action={() => {}}
            buttonStyles={'md:w-24 py-1 px-2 border'}
          />
        </div>

        {/* Dynamic Key-Value Pair Creation Near by Attractions */}
        <div>
          <label className="block text-sm font-medium mb-1">Distance to Key Locations</label>
          {/* Pass append, remove, and fields to the DynamicForm component */}
          <DynamicForm namePrefix="dynamicFields" fields={fields} append={append} remove={remove} register={register} />
          <button
            type="button"
            onClick={() => append({ key: '', value: '' })}
            className="bg-green-500 text-white py-2 px-4 rounded mt-2"
          >
            Add Custom Field
          </button>
        </div>

        {/* Dynamic Key-Value Pair Creation Near by Attractions */}
        <div>
          <label className="block text-sm font-medium mb-1">Hotel Room & Bathroom details</label>
          {/* Pass append, remove, and fields to the DynamicForm component */}
          <DynamicForm namePrefix="dynamicFields" fields={fields} append={append} remove={remove} register={register} />
          <button
            type="button"
            onClick={() => append({ key: '', value: '' })}
            className="bg-green-500 text-white py-2 px-4 rounded mt-2"
          >
            Add Custom Field
          </button>
        </div>

        <div className="p-6">
          <h1 className="text-xl font-bold mb-4">Dynamically Rendered Accordions</h1>

          {/* Dynamically render all accordions */}
          {accordionsData.map((accordion, index) => (
            <AccordionWithCheckboxes
              key={index}
              mainLabel={accordion.mainLabel}
              items={accordion.items}
              onSelectionChange={(selectedIds) => handleSelectionChange(`accordion${index + 1}`, selectedIds)}
            />
          ))}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccommodationForm;
