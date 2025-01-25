import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RichTextEditor } from '@/atoms/input-elements/rich-text-editor';
import { uploadImage } from '@api/index';
import { processContent, splitRichText } from '@utils/sanity';
import { generateId } from '@utils/common';
import sanityClient from '../../sanityClient';
import { africanCountriesPhoneCodes, Countries, eventTypes } from '@/data';
import { ImageDragAndDrop } from '@/atoms/input-elements/drag-and-drop';
import { Loading } from '@/atoms/common/loading';
import Button from '@/atoms/custom-button/button';
import UnderlineHeading from '@/atoms/heading/underline-heading';
import Input from '@/atoms/input-elements/input';
import { Select } from '@/atoms/input-elements/select';
import { CustomSelect } from '@/atoms/input-elements/cutom-select';
import CustomInput from '@/atoms/input-elements/custom-input';
import MobileNumberInput from '@/atoms/input-elements/contact-custom-input';

type FormData = {
  title: string;
  image: string;
  eventTimings: string;
  email: string;
  location: string;
  countryCode: string;
  country: string;
  website: string;
  phone: string;
  instagram: string;
  twitter: string;
  linkedin: string;
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
    setError,
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
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-white overflow-auto p-6 rounded-lg">
      <UnderlineHeading borderWidth="w-1/2" className="text-2xl">
        Event Enrollment Form
      </UnderlineHeading>
      <form onSubmit={handleSubmit(onSubmit)} className="min-h-[80vh]">
        {loader ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <CustomSelect
                  {...register('category', { required: 'Event Category is required' })}
                  placeholder="Select Event Category"
                  options={categories}
                  label="Event Category"
                  error={errors.category}
                />
              </div>

              {selectedCategoryOptions && (
                <div className="flex flex-col gap-2">
                  <CustomSelect
                    {...register('type', { required: 'Event Sub Category is required' })}
                    placeholder="Select Event Sub Category"
                    options={selectedCategoryOptions.items}
                    label={'Event Sub Category'}
                    error={errors.type}
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <CustomInput
                  {...register('eventBy', { required: 'Event By is required' })}
                  label={'Organisation/Company Name (if applicable)'}
                  placeholder="Event Conducted by"
                  error={errors.eventBy}
                />
              </div>

              <div className="flex flex-col gap-2">
                <MobileNumberInput
                  register={register}
                  errors={[errors.countryCode, errors.phone]}
                  countryCodes={africanCountriesPhoneCodes}
                  label="Enter Your Mobile Number"
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3>Social Media Links (Optional):</h3>
                <CustomInput
                  {...register('instagram')}
                  placeholder="Instagram Profile"
                  error={errors.eventBy}
                  required={false}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Email</label>
                <input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label>Website</label>
                <input
                  {...register('website')}
                  type="url"
                  placeholder="Website"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Title</label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  type="text"
                  placeholder="Title"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label>Business Photo</label>
                <ImageDragAndDrop
                  onFileSelect={(file) => onFileSelect(file, 'business')}
                  placeholder="Upload your Business Photo"
                />
                {errors.businessPhoto && <span className="text-red-500 text-xs">{errors.businessPhoto.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label>Cover Photo</label>
                <ImageDragAndDrop
                  onFileSelect={(file) => onFileSelect(file, 'cover')}
                  placeholder="Upload your Cover Photo"
                />
                {errors.coverPhoto && <span className="text-red-500 text-xs">{errors.coverPhoto.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label>Event Description</label>
                <RichTextEditor
                  placeholder="Enter Event Description"
                  onContentChange={(content) => setValue('description', content)}
                />
                {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label>About Event</label>
                <RichTextEditor
                  placeholder="Share some details About the Event"
                  onContentChange={(content) => setValue('aboutEvent', content)}
                />
                {errors.aboutEvent && <span className="text-red-500 text-xs">{errors.aboutEvent.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label>Event Timings</label>
                <input
                  {...register('eventTimings', { required: 'Event Timings are required' })}
                  placeholder="Event Timings"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.eventTimings && <span className="text-red-500 text-xs">{errors.eventTimings.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label>Location</label>
                <input
                  {...register('location', { required: 'Location is required' })}
                  type="text"
                  placeholder="Location"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.location && <span className="text-red-500 text-xs">{errors.location.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label>Country</label>
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
                {errors.country && <span className="text-red-500 text-xs">{errors.country.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label>Whatsapp Number</label>
                <input
                  {...register('whatsapp')}
                  type="tel"
                  placeholder="WhatsApp Number"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Entry Fee</label>
                <input
                  {...register('amount', { required: 'Entry Fee is required' })}
                  type="number"
                  placeholder="Entry Fee Amount"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.amount && <span className="text-red-500 text-xs">{errors.amount.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label>Ticket Prices Information</label>
                <RichTextEditor
                  placeholder="Enter Ticket Price details"
                  onContentChange={(content) => setValue('ticketPrices', content)}
                />
                {errors.ticketPrices && <span className="text-red-500 text-xs">{errors.ticketPrices.message}</span>}
              </div>
            </div>
            <Button className="float-right my-4 px-4" type="submit">
              Submit
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default EventForm;
