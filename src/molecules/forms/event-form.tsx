import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RichTextEditor } from '@/atoms/input-elements/rich-text-editor';
import { uploadImage } from '@api/index';
import { processContent, splitRichText } from '@utils/sanity';
import { generateId } from '@utils/common';
import sanityClient from '../../sanityClient';
import { Countries, eventTypes } from '@/data';
import { ImageDragAndDrop } from '@/atoms/input-elements/drag-and-drop';
import { Loading } from '@/atoms/common/loading';

type FormData = {
  title: string;
  image: string;
  eventTimings: string;
  email: string;
  location: string;
  country: string;
  website: string;
  phone: string;
  whatsapp: string;
  amount: string;
  category: string;
  type: string;
  eventBy: string;
  description: string;
  aboutEvent: string;
  ticketPrices: string;
  businessPhoto: File;
  coverPhoto: File;
};

const categories = eventTypes;
const EventForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const selectedCategory = watch('category');
  const selectedCategoryOptions = categories.find((cat) => cat.value === selectedCategory);

  const [businessPhoto, setBusinessPhoto] = useState<File | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const onFileSelect = (file: File, type: 'business' | 'cover') => {
    if (type === 'business') {
      setBusinessPhoto(file);
      setValue('businessPhoto', file); // Sync with form state
    } else if (type === 'cover') {
      setCoverPhoto(file);
      setValue('coverPhoto', file); // Sync with form state
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Handle image uploads
      setLoader(true);
      // Convert RichText fields to Portable Text format
      const description = await processContent(splitRichText(data.description));
      const aboutEvent = await processContent(splitRichText(data.aboutEvent));
      const ticketPrices = await processContent(splitRichText(data.ticketPrices));
      const coverPhotoUrl = await uploadImage(coverPhoto);
      const businessPhotoUrl = await uploadImage(businessPhoto);

      // Submit to Sanity
      await sanityClient.create({
        _type: 'event', // Sanity schema type
        _id: `drafts.${generateId()}`, // Unique ID
        ...data,
        description,
        aboutEvent,
        ticketPrices,
        coverPhoto: {
          _type: 'image',
          asset: { _ref: coverPhotoUrl._id },
        },
        businessPhoto: {
          _type: 'image',
          asset: { _ref: businessPhotoUrl._id },
        },
      });

      alert('Submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data. Please try again.');
      setLoader(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 space-y-4 bg-white text-black rounded-lg shadow-md min-h-screen"
    >
      {loader ? (
        <Loading />
      ) : (
        <>
          <input
            {...register('title', { required: 'Title is required' })}
            type="text"
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.title && <span className="text-red-500">{errors.title.message}</span>}

          <ImageDragAndDrop
            onFileSelect={(file) => onFileSelect(file, 'business')}
            placeholder="Upload your Business Photo"
          />
          {errors.businessPhoto && <span className="text-red-500">{errors.businessPhoto.message}</span>}

          <ImageDragAndDrop
            onFileSelect={(file) => onFileSelect(file, 'cover')}
            placeholder="Upload your Cover Photo"
          />
          {errors.coverPhoto && <span className="text-red-500">{errors.coverPhoto.message}</span>}

          <input
            {...register('eventBy', { required: 'eventBy is required' })}
            placeholder="Event Conducted by"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.eventBy && <span className="text-red-500">{errors.eventBy.message}</span>}

          <input
            {...register('eventTimings', { required: 'Event Timings are required' })}
            placeholder="Event Timings"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.eventTimings && <span className="text-red-500">{errors.eventTimings.message}</span>}

          <input
            {...register('location', { required: 'Location is required' })}
            type="text"
            placeholder="Location"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.location && <span className="text-red-500">{errors.location.message}</span>}

          <select
            {...register('country', { required: 'Country is required' })}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Country</option>
            {Countries.map((country) => (
              <option key={country.label} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          {errors.country && <span className="text-red-500">{errors.country.message}</span>}

          <input
            {...register('website')}
            type="url"
            placeholder="Website"
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            placeholder="Enter Email Address"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}

          <input
            {...register('phone', { required: 'Phone is required' })}
            type="tel"
            placeholder="Phone"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}

          <input
            {...register('whatsapp')}
            type="tel"
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
            {...register('category', { required: 'Event Category is required' })}
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
              {...register('type', { required: 'Event Type is required' })}
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

          {/* RichTextEditor for Description */}
          <RichTextEditor
            placeholder="Enter Event Description"
            onContentChange={(content) => setValue('description', content)}
          />
          {errors.description && <span className="text-red-500">{errors.description.message}</span>}

          {/* RichTextEditor for About Event */}
          <RichTextEditor
            placeholder="Share some details About the Event"
            onContentChange={(content) => setValue('aboutEvent', content)}
          />
          {errors.aboutEvent && <span className="text-red-500">{errors.aboutEvent.message}</span>}

          {/* RichTextEditor for Event Timings */}
          <RichTextEditor
            placeholder="Enter Ticket Price details"
            onContentChange={(content) => setValue('ticketPrices', content)}
          />
          {errors.ticketPrices && <span className="text-red-500">{errors.ticketPrices.message}</span>}

          <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Submit
          </button>
        </>
      )}
    </form>
  );
};

export default EventForm;
