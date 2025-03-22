import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
const categories = eventTypes;
const EventForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const selectedCategory = watch('category');
  const isEventFree = watch('isEventFree');
  const selectedCategoryOptions = categories.find((cat) => cat.value === selectedCategory);
  const [loader, setLoader] = useState(false);
  const onFileSelect = (file, type) => {
    if (type === 'business') {
      setValue('businessPhoto', file); // Sync with form state
    } else if (type === 'cover') {
      setValue('coverPhoto', file); // Sync with form state
    }
  };
  const onSubmit = async (data) => {
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
        isEventFree: Boolean(data.isEventFree),
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
        phone: data.phone,
        website: data.website,
        category: data.category,
        type: data.type,
        confirmDetails: data.confirmDetails,
        agreeToFeature: data.agreeToFeature,
        email: data.email,
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
  return _jsxs('div', {
    className: 'flex flex-col gap-2 bg-white overflow-auto p-6 rounded-lg',
    children: [
      _jsx(UnderlineHeading, { borderWidth: 'w-1/2', className: 'text-2xl', children: 'Event Submission Form' }),
      _jsx('form', {
        onSubmit: handleSubmit(onSubmit),
        className: 'min-h-[80vh]',
        children: loader
          ? _jsx(Loading, {})
          : _jsxs(_Fragment, {
              children: [
                _jsxs('div', {
                  className: 'flex flex-col gap-4',
                  children: [
                    _jsx('div', {
                      className: 'flex flex-col gap-2',
                      children: _jsx(CustomSelect, {
                        ...register('category', { required: 'Event Type is required' }),
                        placeholder: 'Select Event Type',
                        options: categories,
                        label: 'Event Type',
                        error: errors.category,
                      }),
                    }),
                    selectedCategoryOptions &&
                      _jsx('div', {
                        className: 'flex flex-col gap-2',
                        children: _jsx(CustomSelect, {
                          ...register('type', { required: 'Event Category is required' }),
                          placeholder: 'Select Event Category',
                          options: selectedCategoryOptions.items,
                          label: 'Event Category',
                          error: errors.type,
                        }),
                      }),
                    _jsx('div', {
                      className: 'flex flex-col gap-2',
                      children: _jsx(CustomInput, {
                        ...register('eventBy'),
                        label: 'Organisation/Company Name',
                        placeholder: 'Event Conducted by',
                        error: errors.eventBy,
                      }),
                    }),
                    _jsx('div', {
                      className: 'flex flex-col gap-2',
                      children: _jsx(MobileNumberInput, {
                        register: register,
                        errors: [errors.countryCode, errors.phone],
                        countryCodes: africanCountriesPhoneCodes,
                        label: 'Contact Number for Enquiries:',
                      }),
                    }),
                    _jsx('div', {
                      className: 'flex flex-col gap-2',
                      children: _jsx(CustomInput, {
                        ...register('email', { required: 'Email is required' }),
                        label: 'Email',
                        placeholder: 'Email',
                        error: errors.email,
                        type: 'email',
                      }),
                    }),
                    _jsx('div', {
                      className: 'flex flex-col gap-2',
                      children: _jsx(CustomInput, {
                        ...register('website'),
                        label: 'Website (if applicable)',
                        placeholder: 'Website URL',
                        error: errors.website,
                        type: 'url',
                        required: false,
                      }),
                    }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-3',
                      children: [
                        _jsx('h3', { className: 'font-semibold', children: 'Social Media Links (At least one):' }),
                        _jsx(CustomInput, {
                          ...register('instagram'),
                          placeholder: 'Instagram Profile',
                          error: errors.instagram,
                          required: false,
                          type: 'url',
                        }),
                        _jsx(CustomInput, {
                          ...register('twitter'),
                          placeholder: 'Twitter Profile',
                          error: errors.twitter,
                          required: false,
                          type: 'url',
                        }),
                        _jsx(CustomInput, {
                          ...register('facebook'),
                          placeholder: 'Facebook Profile',
                          error: errors.facebook,
                          required: false,
                          type: 'url',
                        }),
                        _jsx(CustomInput, {
                          ...register('otherSocialMedia'),
                          placeholder: 'Other Social Media link',
                          error: errors.otherSocialMedia,
                          required: false,
                          type: 'url',
                        }),
                      ],
                    }),
                    _jsx('div', {
                      className: 'flex flex-col gap-2',
                      children: _jsx(CustomInput, {
                        ...register('title', { required: 'Title is required' }),
                        placeholder: 'Event Title',
                        label: 'Event Title',
                        error: errors.title,
                      }),
                    }),
                    _jsx('div', {
                      className: 'flex flex-col gap-2',
                      children: _jsx(RichTextEditor, {
                        label: 'Brief Summary of the Event',
                        placeholder:
                          'In 150 characters, Provide the highlights of the event, including its purpose, key attractions, or speakers.',
                        ...register('description', {
                          required: 'Event description is required',
                          minLength: {
                            value: 40,
                            message: 'Description must be at least 40 characters',
                          },
                          maxLength: {
                            value: 300,
                            message: 'Description must not exceed 300 characters',
                          },
                        }),
                        height: 80,
                        onContentChange: (content) => setValue('description', content),
                        error: errors.description?.message,
                        required: true,
                      }),
                    }),
                    _jsx('div', {
                      className: 'flex flex-col gap-2',
                      children: _jsx(RichTextEditor, {
                        label: 'About this Event',
                        placeholder: 'Provide an engaging description of your event in 500-1000 characters',
                        ...register('aboutEvent', {
                          required: 'About Event is required',
                          minLength: {
                            value: 500,
                            message: 'About Event must be at least 500 characters',
                          },
                          maxLength: {
                            value: 1000,
                            message: 'About Event must not exceed 1000 characters',
                          },
                        }),
                        onContentChange: (content) => setValue('aboutEvent', content),
                        error: errors.aboutEvent?.message,
                        required: true,
                      }),
                    }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsx('label', { className: 'font-semibold text-xl', children: 'Event Date(s)' }),
                        _jsxs('div', {
                          className: 'flex gap-5',
                          children: [
                            _jsx(CustomInput, {
                              ...register('eventStartDate', { required: 'Event Start Date required' }),
                              placeholder: 'Start Date',
                              label: 'Start Date:',
                              error: errors.eventStartDate,
                              type: 'date',
                              customInputClassNames: 'w-[150px]',
                            }),
                            _jsx(CustomInput, {
                              ...register('eventEndDate'),
                              placeholder: 'End Date',
                              label: 'End Date',
                              error: errors.eventEndDate,
                              type: 'date',
                              customInputClassNames: 'w-[150px]',
                            }),
                          ],
                        }),
                      ],
                    }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsx('label', { className: 'font-semibold text-xl', children: 'Event Timings' }),
                        _jsx('div', {
                          className: 'flex gap-5',
                          children: _jsxs(_Fragment, {
                            children: [
                              _jsx(CustomInput, {
                                ...register('eventStartTime', { required: 'Event Start Time required' }),
                                placeholder: 'Start Time',
                                label: 'Start Time:',
                                error: errors.eventStartTime,
                                type: 'time',
                                customInputClassNames: 'w-[100px]',
                              }),
                              _jsx(CustomInput, {
                                ...register('eventEndTime', { required: 'Event End Time required' }),
                                placeholder: 'End Time',
                                label: 'End Time:',
                                error: errors.eventEndTime,
                                type: 'time',
                                customInputClassNames: 'w-[100px]',
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsxs('h3', {
                          className: 'font-semibold',
                          children: [
                            'Is the Event Free?',
                            _jsx('span', { className: 'text-red-500 text-sm', children: '*' }),
                          ],
                        }),
                        _jsxs('div', {
                          className: 'flex gap-4',
                          children: [
                            _jsxs('label', {
                              className: 'flex items-center gap-2',
                              children: [
                                _jsx(CustomInput, {
                                  type: 'radio',
                                  ...register('isEventFree', { required: 'Please select Yes or No' }),
                                  customInputClassNames: 'w-4',
                                  value: 'Yes',
                                  placeholder: '',
                                }),
                                'Yes',
                              ],
                            }),
                            _jsxs('label', {
                              className: 'flex items-center gap-2',
                              children: [
                                _jsx(CustomInput, {
                                  type: 'radio',
                                  ...register('isEventFree', { required: 'Please select Yes or No' }),
                                  customInputClassNames: 'w-4',
                                  placeholder: '',
                                }),
                                'No',
                              ],
                            }),
                          ],
                        }),
                        errors.isEventFree &&
                          _jsx('span', { className: 'text-red-500 text-xs', children: errors.isEventFree.message }),
                      ],
                    }),
                    !isEventFree &&
                      _jsxs('div', {
                        className: 'flex flex-col gap-3',
                        children: [
                          _jsxs('h3', {
                            className: 'font-semibold',
                            children: [
                              'Ticket Prices:',
                              _jsx('span', { className: 'text-red-500 text-sm', children: '*' }),
                            ],
                          }),
                          _jsx(CustomInput, {
                            ...register('general', { required: 'Please Provide General Ticket Prices' }),
                            placeholder: 'General Admission TicketPrice (Mention Currency)',
                            error: errors.general,
                          }),
                          _jsx(CustomInput, {
                            ...register('vip'),
                            placeholder: 'VIP/Other Ticket Price (Mention Currency)',
                            error: errors.vip,
                          }),
                          _jsx(CustomInput, {
                            ...register('earlyBird'),
                            placeholder: 'Early Bird Ticket Price (if applicable) (Mention Currency)',
                            error: errors.earlyBird,
                          }),
                        ],
                      }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-3',
                      children: [
                        _jsxs('h3', {
                          className: 'font-semibold',
                          children: [
                            'Event Location (Enter Full Address)',
                            _jsx('span', { className: 'text-red-500 text-sm', children: '*' }),
                          ],
                        }),
                        _jsx(CustomInput, {
                          ...register('venue', { required: 'Please Provide Venue name' }),
                          placeholder: 'Venue Name',
                          error: errors.venue,
                        }),
                        _jsx(CustomInput, {
                          ...register('city', { required: 'Please provide City/Region' }),
                          placeholder: 'City/Region:',
                          error: errors.city,
                        }),
                        _jsxs('select', {
                          ...register('country', { required: 'Please provide Country' }),
                          className: `p-2 text-sm block w-1/2 h-10 bg-transparent border outline-none rounded-md focus:border-orange-500
          ${errors.country ? 'border-red-500' : 'border-gray-400'}`,
                          children: [
                            _jsx('option', { value: '', children: 'Select Country' }),
                            Countries.map((country) =>
                              _jsx('option', { value: country.value, children: country.label }, country.label)
                            ),
                          ],
                        }),
                        errors.country &&
                          _jsx('span', { className: 'text-red-500 text-xs', children: errors.country.message }),
                      ],
                    }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsxs('h3', {
                          className: 'font-semibold',
                          children: [
                            'Upload Event Poster or Banner',
                            _jsx('span', { className: 'text-red-500 text-sm', children: '*' }),
                          ],
                        }),
                        _jsx(ImageDragAndDrop, {
                          ...register('coverPhoto', { required: 'Please Provide Event Poster/ Banner' }),
                          onFileSelect: (file) => onFileSelect(file, 'cover'),
                          placeholder: 'Upload your Event Poster/Banner',
                        }),
                        errors.coverPhoto &&
                          _jsx('span', { className: 'text-red-500 text-xs', children: errors.coverPhoto.message }),
                      ],
                    }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-3',
                      children: [
                        _jsxs('h3', {
                          className: 'font-semibold',
                          children: [
                            'About You (Organizer\u2019s Information)',
                            _jsx('span', { className: 'text-red-500 text-sm', children: '*' }),
                          ],
                        }),
                        _jsx(CustomInput, {
                          ...register('organizerName', { required: 'Please Provide Organizer name' }),
                          placeholder: 'Enter Organizer Name',
                          error: errors.organizerName,
                        }),
                        _jsx(CustomInput, {
                          ...register('organizerRole', { required: 'Please Provide Organizer Role' }),
                          placeholder: 'Enter Organizer Role',
                          error: errors.organizerRole,
                        }),
                        _jsx(CustomInput, {
                          ...register('organizerEmail', { required: 'Please Provide Organizer Email' }),
                          placeholder: 'Enter Organizer Email',
                          error: errors.organizerEmail,
                          type: 'email',
                        }),
                        _jsx(MobileNumberInput, {
                          register: register,
                          errors: [errors.organizerCountryCode, errors.organizerPhone],
                          phoneName: 'organizerPhone',
                          countryCodeName: 'organizerCountryCode',
                          countryCodes: africanCountriesPhoneCodes,
                          phonePlaceholder: 'Contact Number',
                          label: '',
                        }),
                        _jsx(MobileNumberInput, {
                          register: register,
                          errors: [errors.organizerEmergencyCountryCode, errors.organizerEmergencyPhone],
                          phoneName: 'organizerEmergencyPhone',
                          countryCodeName: 'organizerEmergencyCountryCode',
                          countryCodes: africanCountriesPhoneCodes,
                          phonePlaceholder: 'Emergency Contact Number',
                          label: '',
                        }),
                        _jsxs('div', {
                          className: 'gap-4',
                          children: [
                            _jsxs('h3', {
                              className: 'font-semibold text-sm',
                              children: [
                                'Do you want your name to appear as the event organizer or the organization/company name?',
                                _jsx('span', { className: 'text-red-500 text-sm', children: '*' }),
                              ],
                            }),
                            _jsxs('div', {
                              className: 'gap-0 text-sm',
                              children: [
                                _jsxs('label', {
                                  className: 'flex items-center gap-2 text-sm',
                                  children: [
                                    _jsx(CustomInput, {
                                      type: 'radio',
                                      ...register('organizerDisplayName', {
                                        required: 'Please select One of the Option',
                                      }),
                                      customInputClassNames: 'w-4',
                                      value: 'Yes',
                                      placeholder: '',
                                    }),
                                    'My Name',
                                  ],
                                }),
                                _jsxs('label', {
                                  className: 'flex items-center gap-2 text-sm',
                                  children: [
                                    _jsx(CustomInput, {
                                      type: 'radio',
                                      ...register('organizerDisplayName', {
                                        required: 'Please select One of the Option',
                                      }),
                                      customInputClassNames: 'w-4',
                                      placeholder: '',
                                    }),
                                    'Organizer/Company name',
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        errors.isEventFree &&
                          _jsx('span', { className: 'text-red-500 text-xs', children: errors.isEventFree.message }),
                      ],
                    }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsxs('h3', {
                          className: 'font-semibold',
                          children: [
                            'Upload Passport (Main page with Clear Photo and Passport Number) or ID (Front and Back)',
                            _jsx('span', { className: 'text-red-500 text-sm', children: '*' }),
                          ],
                        }),
                        _jsx(ImageDragAndDrop, {
                          ...register('businessPhoto', { required: 'Please Provide Valid ID/Passport' }),
                          onFileSelect: (file) => onFileSelect(file, 'business'),
                          placeholder:
                            'Upload Passport (Main page with Clear Photo and Passport Number) or ID (Front and Back)',
                        }),
                        errors.businessPhoto &&
                          _jsx('span', { className: 'text-red-500 text-xs', children: errors.businessPhoto.message }),
                      ],
                    }),
                    _jsx('h3', { className: 'font-semibold text-lg', children: 'Agreement & Confirmation' }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsxs('label', {
                          className: 'flex items-center gap-2',
                          children: [
                            _jsx('input', {
                              type: 'checkbox',
                              ...register('confirmDetails', {
                                required: 'You must confirm that all event details are accurate.',
                              }),
                              className: 'h-4 w-4 rounded border-gray-400',
                            }),
                            'I confirm that all the event details provided are accurate.',
                          ],
                        }),
                        errors.confirmDetails &&
                          _jsx('span', { className: 'text-red-500 text-xs', children: errors.confirmDetails.message }),
                        _jsxs('label', {
                          className: 'flex items-center gap-2',
                          children: [
                            _jsx('input', {
                              type: 'checkbox',
                              ...register('agreeToFeature', {
                                required: 'You must agree that your event may be featured.',
                              }),
                              className: 'h-4 w-4 rounded border-gray-400',
                            }),
                            'I agree that my event may be featured on this platform.',
                          ],
                        }),
                        errors.agreeToFeature &&
                          _jsx('span', { className: 'text-red-500 text-xs', children: errors.agreeToFeature.message }),
                        _jsxs('label', {
                          className: 'flex items-center gap-2',
                          children: [
                            _jsx('input', {
                              type: 'checkbox',
                              ...register('rightsToContent', {
                                required: 'You must confirm you have the rights to share all content.',
                              }),
                              className: 'h-4 w-4 rounded border-gray-400',
                            }),
                            'I have the rights to share all content, including images submitted.',
                          ],
                        }),
                        errors.rightsToContent &&
                          _jsx('span', { className: 'text-red-500 text-xs', children: errors.rightsToContent.message }),
                      ],
                    }),
                  ],
                }),
                _jsx(Button, { className: 'float-right my-4 px-4', type: 'submit', children: 'Submit' }),
              ],
            }),
      }),
    ],
  });
};
export default EventForm;
