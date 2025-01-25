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
  eventStartDate: string;
  eventEndDate: string;
  eventStartTime: string;
  eventEndTime: string;
  email: string;
  venue: string;
  city: string;
  countryCode: string;
  isEventFree: boolean;
  general: string;
  earlyBird: string;
  vip: string;
  allDayEvent: boolean;
  country: string;
  website: string;
  phone: string;
  instagram: string;
  twitter: string;
  facebook: string;
  otherSocialMedia: string;
  category: string;
  organizerName: string;
  organizerEmergencyPhone: string;
  organizerRole: string;
  organizerEmail: string;
  organizerPhone: string;
  organizerCountryCode: string;
  organizerDisplayName: string;
  organizerEmergencyCountryCode: string;
  type: string;
  eventBy: string;
  description: string;
  aboutEvent: string;
  confirmDetails: boolean;
  agreeToFeature: boolean;
  rightsToContent: boolean;
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
  const allDayEvent = watch('allDayEvent');
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
      // Display loader
      setLoader(true);

      // Convert RichText fields to Portable Text format
      const description = await processContent(splitRichText(data.description));
      const aboutEvent = await processContent(splitRichText(data.aboutEvent));

      // Handle image uploads
      const coverPhotoUrl = await uploadImage(data.coverPhoto);
      const businessPhotoUrl = await uploadImage(data.businessPhoto);

      // Prepare ticket prices
      const ticketPrices = {
        general: data.general,
        earlyBird: data.earlyBird,
        vip: data.vip,
      };

      // Prepare social media details
      const socialMedia = {
        email: data.email,
        website: data.website,
        phone: data.phone,
        instagram: data.instagram,
        twitter: data.twitter,
        facebook: data.facebook,
        other: data.otherSocialMedia,
      };

      // Prepare organizer details
      const organizer = {
        name: data.organizerName,
        role: data.organizerRole,
        displayName: data.organizerDisplayName,
        email: data.organizerEmail,
        phone: data.organizerPhone,
        countryCode: data.organizerCountryCode,
        emergencyPhone: data.organizerEmergencyPhone,
        emergencyCountryCode: data.organizerEmergencyCountryCode,
      };

      // Submit to Sanity
      await sanityClient.create({
        _type: 'event', // Sanity schema type
        _id: `drafts.${generateId()}`, // Unique ID for draft
        title: data.title,
        eventBy: data.eventBy,
        eventStartDate: data.eventStartDate,
        eventEndDate: data.eventEndDate,
        eventStartTime: data.eventStartTime,
        eventEndTime: data.eventEndTime,
        allDayEvent: data.allDayEvent,
        isEventFree: data.isEventFree,
        ticketPrices,
        socialMedia,
        organizer,
        description,
        aboutEvent,
        coverPhoto: {
          _type: 'image',
          asset: { _ref: coverPhotoUrl._id },
        },
        businessPhoto: {
          _type: 'image',
          asset: { _ref: businessPhotoUrl._id },
        },
        venue: data.venue,
        city: data.city,
        country: data.country,
        countryCode: data.countryCode,
        category: data.category,
        type: data.type,
        confirmDetails: data.confirmDetails,
        agreeToFeature: data.agreeToFeature,
        rightsToContent: data.rightsToContent,
      });

      // Notify success
      alert('Event submitted successfully!');
    } catch (error) {
      // Handle errors
      console.error('Error submitting event:', error);
      alert('Failed to submit event. Please try again.');
    } finally {
      // Hide loader
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

              <div className="flex flex-col gap-3">
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
                  {!allDayEvent && (
                    <>
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
                    </>
                  )}

                  <label className="flex items-center gap-2">
                    <CustomInput
                      {...register('allDayEvent')}
                      placeholder=""
                      error={errors.allDayEvent}
                      type="checkbox"
                      customInputClassNames="w-4"
                      required={false}
                    />
                    All Day Event?
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  Is the Event Free?
                  <span className="text-red-500 text-sm">*</span>
                </h3>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <CustomInput
                      type="radio"
                      {...register('isEventFree', { required: 'Please select Yes or No' })}
                      customInputClassNames="w-4"
                      value="Yes"
                      placeholder=""
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <CustomInput
                      type="radio"
                      {...register('isEventFree', { required: 'Please select Yes or No' })}
                      customInputClassNames="w-4"
                      placeholder=""
                    />
                    No
                  </label>
                </div>
                {errors.isEventFree && <span className="text-red-500 text-xs">{errors.isEventFree.message}</span>}
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-semibold">
                  Ticket Prices:
                  <span className="text-red-500 text-sm">*</span>
                </h3>
                <CustomInput
                  {...register('general', { required: 'Please Provide General Ticket Prices' })}
                  placeholder="General Admission TicketPrice"
                  error={errors.general}
                />
                <CustomInput
                  {...register('vip', { required: 'Please provide VIP/other ticket Price' })}
                  placeholder="VIP/Other Ticket Price"
                  error={errors.vip}
                />
                <CustomInput
                  {...register('earlyBird')}
                  placeholder="Early Bird Ticket Price (if applicable)"
                  error={errors.earlyBird}
                />
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-semibold">
                  Event Location (Enter Full Address)
                  <span className="text-red-500 text-sm">*</span>
                </h3>
                <CustomInput
                  {...register('venue', { required: 'Please Provide Venue name' })}
                  placeholder="Venue Name"
                  error={errors.venue}
                />
                <CustomInput
                  {...register('city', { required: 'Please provide City/Region' })}
                  placeholder="City/Region:"
                  error={errors.city}
                />
                <select className="p-2 text-sm block w-1/2 h-10 bg-transparent border border-gray-400 outline-none rounded-md focus:border-orange-500">
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
                <h3 className="font-semibold">
                  Upload Event Poster or Banner
                  <span className="text-red-500 text-sm">*</span>
                </h3>
                <ImageDragAndDrop
                  onFileSelect={(file) => onFileSelect(file, 'cover')}
                  placeholder="Upload your Event Poster/Banner"
                />
                {errors.coverPhoto && <span className="text-red-500 text-xs">{errors.coverPhoto.message}</span>}
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-semibold">
                  About You (Organizer’s Information)
                  <span className="text-red-500 text-sm">*</span>
                </h3>
                <CustomInput
                  {...register('organizerName', { required: 'Please Provide Organizer name' })}
                  placeholder="Enter Organizer Name"
                  error={errors.organizerName}
                />
                <CustomInput
                  {...register('organizerRole', { required: 'Please Provide Organizer Role' })}
                  placeholder="Enter Organizer Role"
                  error={errors.organizerRole}
                />
                <CustomInput
                  {...register('organizerEmail', { required: 'Please Provide Organizer Email' })}
                  placeholder="Enter Organizer Email"
                  error={errors.organizerEmail}
                  type="email"
                />
                {/* <CustomInput
                  {...register('organizerPhone', { required: 'Please Provide Organizer Contact Number' })}
                  placeholder="Enter Organizer Contact Number"
                  error={errors.earlyBird}
                /> */}
                <MobileNumberInput
                  register={register}
                  errors={[errors.organizerCountryCode, errors.organizerPhone]}
                  phoneName={'organizerPhone'}
                  countryCodeName="organizerCountryCode"
                  countryCodes={africanCountriesPhoneCodes}
                  phonePlaceholder={'Contact Number'}
                  label=""
                />
                <MobileNumberInput
                  register={register}
                  errors={[errors.organizerEmergencyCountryCode, errors.organizerEmergencyPhone]}
                  phoneName={'organizerEmergencyPhone'}
                  countryCodeName="organizerEmergencyCountryCode"
                  countryCodes={africanCountriesPhoneCodes}
                  phonePlaceholder={'Emergency Contact Number'}
                  label=""
                />
                <div className="gap-4">
                  <h3 className="font-semibold text-sm">
                    Do you want your name to appear as the event organizer or the organization/company name?
                    <span className="text-red-500 text-sm">*</span>
                  </h3>
                  <div className="gap-0 text-sm">
                    <label className="flex items-center gap-2 text-sm">
                      <CustomInput
                        type="radio"
                        {...register('organizerDisplayName', { required: 'Please select One of the Option' })}
                        customInputClassNames="w-4"
                        value="Yes"
                        placeholder=""
                      />
                      My Name
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <CustomInput
                        type="radio"
                        {...register('organizerDisplayName', { required: 'Please select One of the Option' })}
                        customInputClassNames="w-4"
                        placeholder=""
                      />
                      Organizer/Company name
                    </label>
                  </div>
                </div>
                {errors.isEventFree && <span className="text-red-500 text-xs">{errors.isEventFree.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">
                  Upload Passport/ID<span className="text-red-500 text-sm">*</span>
                </h3>
                <ImageDragAndDrop
                  onFileSelect={(file) => onFileSelect(file, 'business')}
                  placeholder="Upload your Passport/ID"
                />
                {errors.businessPhoto && <span className="text-red-500 text-xs">{errors.businessPhoto.message}</span>}
              </div>

              {/* <div className="flex flex-col gap-2">
                <label>Whatsapp Number</label>
                <input
                  {...register('whatsapp')}
                  type="tel"
                  placeholder="WhatsApp Number"
                  className="w-full p-2 border border-gray-300 rounded"
                />

              </div> */}
              <h3 className="font-semibold text-lg">Agreement & Confirmation</h3>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('confirmDetails', {
                      required: 'You must confirm that all event details are accurate.',
                    })}
                    className="h-4 w-4 rounded border-gray-400"
                  />
                  I confirm that all the event details provided are accurate.
                </label>
                {errors.confirmDetails && <span className="text-red-500 text-xs">{errors.confirmDetails.message}</span>}

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('agreeToFeature', {
                      required: 'You must agree that your event may be featured.',
                    })}
                    className="h-4 w-4 rounded border-gray-400"
                  />
                  I agree that my event may be featured on this platform.
                </label>
                {errors.agreeToFeature && <span className="text-red-500 text-xs">{errors.agreeToFeature.message}</span>}

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('rightsToContent', {
                      required: 'You must confirm you have the rights to share all content.',
                    })}
                    className="h-4 w-4 rounded border-gray-400"
                  />
                  I have the rights to share all content, including images submitted.
                </label>
                {errors.rightsToContent && (
                  <span className="text-red-500 text-xs">{errors.rightsToContent.message}</span>
                )}
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
