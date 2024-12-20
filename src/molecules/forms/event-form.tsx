import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { ImageDragAndDrop } from '@atoms/input-elements/drag-and-drop';
import { uploadImage } from '@api';
import { parseImageUrl } from '@utils/sanity';
import { generateId } from '@utils/common';
import sanityClient from '../../sanityClient';
import { eventTypes } from '../../data';

type FormData = {
  title: string;
  image: string;
  description: string;
  date: string;
  time: string;
  location: string;
  country: string;
  website: string;
  phone: string;
  whatsapp: string;
  amount: string;
  category: string;
  type: string;
};

const categories = eventTypes;

const EventForm: React.FC = () => {
  const [image, setImage] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => {
    uploadImage(image)
      .then((res) => {
        const jsonData = {
          ...data,
          _type: 'event',
          image: parseImageUrl(res._id),
          _id: `drafts.${generateId()}`,
        };
        sanityClient.create(jsonData).then(() => alert('submitted successfully'));
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  const handleFileSelect = (file: File | null): void => setImage(file);

  const selectedCategory = watch('category');
  const selectedCategoryOptions = categories.find((cat) => cat.value === selectedCategory);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 bg-white text-black rounded-lg shadow-md">
      <input
        {...register('title', { required: 'Title is required' })}
        type="text"
        placeholder="Title"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.title && <span className="text-red-500">{errors.title.message}</span>}

      <ImageDragAndDrop onFileSelect={handleFileSelect} />

      <textarea
        {...register('description', { required: 'Description is required' })}
        placeholder="Description"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.description && <span className="text-red-500">{errors.description.message}</span>}

      <input
        {...register('date', { required: 'Date is required' })}
        type="date"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.date && <span className="text-red-500">{errors.date.message}</span>}

      <input
        {...register('time', { required: 'Time is required' })}
        type="time"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.time && <span className="text-red-500">{errors.time.message}</span>}

      <input
        {...register('location', { required: 'Location is required' })}
        type="text"
        placeholder="Location"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.location && <span className="text-red-500">{errors.location.message}</span>}

      <input
        {...register('country', { required: 'Country is required' })}
        type="text"
        placeholder="Country"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.country && <span className="text-red-500">{errors.country.message}</span>}

      <input
        {...register('website')}
        type="url"
        placeholder="Website"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        {...register('phone', { required: 'Phone is required' })}
        type="tel"
        placeholder="Phone"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}

      <input
        {...register('whatsapp')}
        type="text"
        placeholder="WhatsApp"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        {...register('amount', { required: 'Amount is required' })}
        type="number"
        placeholder="Amount"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.amount && <span className="text-red-500">{errors.amount.message}</span>}

      <select
        {...register('category', { required: 'Category is required' })}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="">Select Event Category</option>
        {categories.map((category) => (
          <option key={category.title} value={category.value}>
            {category.title}
          </option>
        ))}
      </select>
      {errors.category && <span className="text-red-500">{errors.category.message}</span>}

      {selectedCategoryOptions && (
        <select
          {...register('type', { required: 'Type is required' })}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Event Type</option>
          {selectedCategoryOptions.items.map((type) => (
            <option key={type.value} value={type.value}>
              {type.title}
            </option>
          ))}
        </select>
      )}
      {errors.type && selectedCategoryOptions && <span className="text-red-500">{errors.type.message}</span>}

      <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default EventForm;
