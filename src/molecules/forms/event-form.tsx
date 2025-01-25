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
import { CustomSelect } from '@/atoms/input-elements/cutom-select';
import CustomInput from '@/atoms/input-elements/custom-input';
import MobileNumberInput from '@/atoms/input-elements/contact-custom-input';

export type EventFormData = {
  title: string;
  image: string;
  eventStartDate: string;
  eventEndDate: string;
  eventStartTime: string;
  eventEndTime: string;
  email: string;
  location: string;
  countryCode: string;
  country: string;
  website: string;
  phone: string;
  instagram: string;
  twitter: string;
  facebook: string;
  otherSocialMedia: string;
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
  } = useForm<EventFormData>();

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

  const onSubmit: SubmitHandler<EventFormData> = async (data) => {
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
                  {...register('category', { required: 'Event Type is required' })}
                  placeholder="Select Event Type"
                  options={categories}
                  label="Event Type"
                  error={errors.category}
                />
              </div>

              {selectedCategoryOptions && (
                <div className="flex flex-col gap-2">
                  <CustomSelect
                    {...register('type', { required: 'Event Category is required' })}
                    placeholder="Select Event Category"
                    options={selectedCategoryOptions.items}
                    label={'Event Category'}
                    error={errors.type}
                  />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <CustomInput
                  {...register('eventBy')}
                  label={'Organisation/Company Name (if applicable)'}
                  placeholder="Event Conducted by"
                  error={errors.eventBy}
                  required={false}
                />
              </div>

              <div className="flex flex-col gap-2">
                <MobileNumberInput
                  register={register}
                  errors={[errors.countryCode, errors.phone]}
                  countryCodes={africanCountriesPhoneCodes}
                  label="Contact Number for Enquiries:"
                />
              </div>

              <div className="flex flex-col gap-2">
                <CustomInput
                  {...register('email', { required: 'Email is required' })}
                  label={'Email'}
                  placeholder="Email"
                  error={errors.email}
                  type="email"
                />
              </div>

              <div className="flex flex-col gap-2">
                <CustomInput
                  {...register('website')}
                  label={'Website (if applicable)'}
                  placeholder="Website URL"
                  error={errors.website}
                  type="url"
                  required={false}
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Social Media Links (Optional):</h3>
                <CustomInput
                  {...register('instagram')}
                  placeholder="Instagram Profile"
                  error={errors.instagram}
                  required={false}
                  type="url"
                />
                <CustomInput
                  {...register('twitter')}
                  placeholder="Twitter Profile"
                  error={errors.twitter}
                  required={false}
                  type="url"
                />
                <CustomInput
                  {...register('facebook')}
                  placeholder="Facebook Profile"
                  error={errors.facebook}
                  required={false}
                  type="url"
                />
                <CustomInput
                  {...register('otherSocialMedia')}
                  placeholder="Other"
                  error={errors.otherSocialMedia}
                  required={false}
                  type="url"
                />
              </div>

              <div className="flex flex-col gap-2">
                <CustomInput
                  {...register('title', { required: 'Title is required' })}
                  placeholder="Event Title"
                  label="Event Title"
                  error={errors.title}
                />
              </div>

              <div className="flex flex-col gap-2">
                <RichTextEditor
                  label="Brief Summary of the Event"
                  placeholder="In 30 words, Provide the highlights of the event, including its purpose, key attractions, or speakers."
                  {...register('description', {
                    required: 'Event description is required',
                    minLength: {
                      value: 40,
                      message: 'Description must be at least 40 characters',
                    },
                    maxLength: {
                      value: 300,
                      message: 'Description must not exceed 300 characters',
                    },
                  })}
                  height={80}
                  onContentChange={(content) => setValue('description', content)}
                  error={errors.description?.message}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <RichTextEditor
                  label="About this Event"
                  placeholder="Provide an engaging description of your event in 500-1000 characters"
                  {...register('aboutEvent', {
                    required: 'About Event is required',
                    minLength: {
                      value: 500,
                      message: 'About Event must be at least 500 characters',
                    },
                    maxLength: {
                      value: 1000,
                      message: 'About Event must not exceed 1000 characters',
                    },
                  })}
                  onContentChange={(content) => setValue('aboutEvent', content)}
                  error={errors.aboutEvent?.message}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-xl">Event Date(s)</label>
                <div className="flex gap-5">
                  <CustomInput
                    {...register('eventStartDate', { required: 'Event Start Date required' })}
                    placeholder="Start Date"
                    label="Start Date:"
                    error={errors.eventStartDate}
                    type="date"
                    customInputClassNames="w-[150px]"
                  />
                  <CustomInput
                    {...register('eventEndDate')}
                    placeholder="End Date"
                    label="End Date (if applicable):"
                    error={errors.eventEndDate}
                    type="date"
                    required={false}
                    customInputClassNames="w-[150px]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-xl">Event Timings</label>
                <div className="flex gap-5">
                  <CustomInput
                    {...register('eventStartTime', { required: 'Event Start Time required' })}
                    placeholder="Start Time"
                    label="Start Time:"
                    error={errors.eventStartTime}
                    type="time"
                    customInputClassNames="w-[100px]"
                  />
                  <CustomInput
                    {...register('eventEndTime', { required: 'Event End Time required' })}
                    placeholder="End Time"
                    label="End Time:"
                    error={errors.eventEndTime}
                    type="time"
                    customInputClassNames="w-[100px]"
                  />
                </div>
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
                {/* <RichTextEditor
                  placeholder="Enter Ticket Price details"
                  onContentChange={(content) => setValue('ticketPrices', content)}
                /> */}
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
