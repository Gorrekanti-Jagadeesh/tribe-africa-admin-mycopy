import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import sanityClient from '../../sanityClient';
import Input from '@atoms/input-elements/input';
import DynamicFields from '@atoms/input-elements/dynamic-fields';
import Checkbox from '@/atoms/input-elements/checkbox';
import DateInput from '@/atoms/input-elements/date-input';
import Button from '@/atoms/custom-button/button';
import { RichTextEditor } from '@/atoms/input-elements/rich-text-editor';
import { Select } from '@/atoms/input-elements/select';
import { deepMerge } from '@/utils/common';
import { generateId } from '@utils/common';
import { GetCoordinateOnMap } from '../maps/leaflet-map';
import { uploadImage } from '@api/index';
import {
  amenitiesMapping,
  getAmenitiesConfig,
  nameLabels,
  categoryLabels,
  policyLabels,
  priceRangeOptions,
  formCategories,
  locationTypes,
  propertyTypes,
  accommodationTypes,
} from '@/data/amanitieConfig';
const FormContext = createContext(null);
const AccommodationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const [formType, setFormType] = useState(null);
  const [formData, setFormData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = field.split('.');
      let current = newData;
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          current[key] = value;
        } else {
          if (!current[key] || typeof current[key] !== 'object') {
            current[key] = {};
          }
          current = current[key];
        }
      });
      return newData;
    });
  };
  const onSubmit = async (data) => {
    try {
      var newData = deepMerge(data, formData);
      var newData1 = {
        _type: 'accomodationList',
        _id: `drafts.${generateId()}`,
        ...newData,
      };
      await sanityClient.create(newData1);
      document.querySelector('.scrollable-container')?.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setShowModal(true);
      }, 300); // Delay to allow scrolling to complete
      reset();
      setFormData(null);
      setFormType('');
    } catch (error) {
      console.error('Submission failed:', error);
      alert('An error occurred while submitting. Please try again.');
    }
  };
  return _jsxs('div', {
    className: 'max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md',
    children: [
      _jsx('h2', { className: 'text-2xl font-bold mb-4 text-center', children: 'Accommodation Registration Form' }),
      _jsx(FormContext.Provider, {
        value: register,
        children: _jsxs('form', {
          onSubmit: handleSubmit(onSubmit),
          className: 'space-y-4',
          children: [
            _jsxs('div', {
              children: [
                _jsx('label', {
                  className: 'font-semibold mb-4',
                  children: formType === 'vacation-rental' ? 'Accommodation Type' : 'Property Type',
                }),
                ' ',
                _jsx(Select, {
                  required: true,
                  className: 'mt-2 mb-4',
                  name: 'accommodation_type',
                  placeholder: 'Accommodation type',
                  options: accommodationTypes,
                  value: formType || '',
                  onChange: (value) => {
                    reset(); // Reset form fields
                    setFormData({});
                    setFormType(value);
                    handleInputChange('accommodation_type', value || '');
                  },
                }),
              ],
            }),
            _jsxs('div', {
              children: [
                _jsx('label', { className: 'font-semibold', children: nameLabels[formType] || 'Property Name' }),
                _jsx(Input, { required: true, type: 'text', ...register('name'), placeholder: 'Enter Name' }),
                errors.name && _jsx('span', { className: 'text-red-500', children: errors.name.message }),
              ],
            }),
            (formType == 'hotel' || formType == 'resort' || formType == 'bed-and-breakfast') &&
              _jsxs('div', {
                children: [
                  _jsx('label', { className: 'font-semibold', children: 'Brand (Optional)' }),
                  _jsx(Input, {
                    required: false,
                    type: 'text',
                    ...register('brand'),
                    name: 'brand',
                    placeholder: 'Brand name',
                  }),
                ],
              }),
            formType &&
              ['hotel', 'resort', 'bed-and-breakfast'].includes(formType) &&
              _jsxs('div', {
                children: [
                  _jsx('label', { className: 'font-semibold mb-2', children: 'Star Rating (Optional)' }),
                  _jsx(Select, {
                    required: false,
                    formType: formType,
                    name: 'star_rating',
                    placeholder: 'Select Star Rating',
                    options: [
                      { label: '1 Star', value: '1' },
                      { label: '1.5 Star', value: '1.5' },
                      { label: '2 Star', value: '2' },
                      { label: '2.5 Star', value: '2.5' },
                      { label: '3 Star', value: '3' },
                      { label: '3.5 Star', value: '3.5' },
                      { label: '4 Star', value: '4' },
                      { label: '4.5 Star', value: '4.5' },
                      { label: '5 Star', value: '5' },
                      { label: '5.5 Star', value: '5.5' },
                      { label: '6 Star', value: '6' },
                      { label: '6.5 Star', value: '6.5' },
                      { label: '7 Star', value: '7' },
                    ],
                    onChange: (value) => {
                      handleInputChange('star_rating', value);
                    },
                  }),
                ],
              }),
            formType && _jsx(PriceRange, { formType: formType, handleInputChange: handleInputChange }),
            formType &&
              propertyTypes[formType] &&
              _jsxs('div', {
                children: [
                  _jsx('label', {
                    className: 'font-semibold',
                    children: categoryLabels[formType] || categoryLabels.default,
                  }),
                  _jsx('div', {
                    className: 'mt-2',
                    children: _jsx(Select, {
                      required: true,
                      formType: formType,
                      name: 'category',
                      placeholder: 'Select Category',
                      options: propertyTypes[formType].options.map((type) => ({
                        label: type.label,
                        value: type.value,
                      })),
                      onChange: (value) => {
                        handleInputChange(formType.replace(/-/g, '_') + '_property_type', value);
                      },
                    }),
                  }),
                ],
              }),
            formType &&
              locationTypes[formType] &&
              _jsxs('div', {
                children: [
                  _jsx('label', { className: 'font-semibold', children: 'Location Type' }),
                  _jsx(Select, {
                    required: true,
                    formType: formType,
                    name: 'location',
                    placeholder: 'Select Location type',
                    options: locationTypes[formType].options.map((type) => ({
                      label: type.label,
                      value: type.value,
                    })),
                    onChange: (value) => {
                      handleInputChange('locationType', value);
                    },
                  }),
                ],
              }),
            _jsxs('div', {
              children: [
                _jsx('label', { className: 'font-semibold', children: 'Address' }),
                _jsx(Input, {
                  required: true,
                  type: 'text',
                  ...register('address.street'),
                  placeholder: 'Street address',
                }),
                _jsx(Input, { required: true, type: 'text', ...register('address.city'), placeholder: 'Town / City' }),
                _jsx(Input, {
                  required: true,
                  type: 'text',
                  ...register('address.region'),
                  placeholder: 'State / Region',
                }),
                _jsx(Input, { type: 'text', ...register('address.postalCode'), placeholder: 'Postal Code (Optional)' }),
                _jsx(Input, { required: true, type: 'text', ...register('address.country'), placeholder: 'Country' }),
              ],
            }),
            _jsxs('div', {
              children: [
                _jsx('label', { className: 'font-semibold', children: 'Contact Information' }),
                _jsx(Input, {
                  required: true,
                  type: 'number',
                  ...register('contact.phoneNumber'),
                  placeholder: 'Phone Number',
                }),
                _jsx(Input, {
                  required: true,
                  type: 'email',
                  ...register('contact.email'),
                  placeholder: 'Enter email',
                }),
                _jsx(Input, { type: 'text', ...register('contact.website'), placeholder: 'Website (Optional)' }),
                _jsx(Input, {
                  required: true,
                  type: 'text',
                  ...register('contact.socialMedia'),
                  placeholder: 'Social media link',
                }),
              ],
            }),
            _jsxs('div', {
              children: [
                _jsx('label', { className: 'font-semibold', children: 'Description' }),
                _jsx(Input, {
                  required: true,
                  type: 'text',
                  ...register('description.tagline'),
                  name: 'description.tagline',
                  maxLength: 50,
                  placeholder:
                    'Tagline: Short, catchy tagline (Max 50 characters): e.g., Pure Luxury, Paradise\nFound.',
                }),
                _jsx('label', { className: 'font-semibold', children: 'Describe about the accommodation' }),
                _jsx(RichTextEditor, {
                  formType: formType,
                  ...register('description.description'),
                  placeholder: 'Describe your accomodation in 100-500 words.',
                  onContentChange: (value) => handleInputChange('description.description', value),
                }),
                _jsx('label', {
                  className: 'font-semibold',
                  children: 'Highlights (Add up to 6 key highlights: e.g., High-speed Wi-Fi, Weekly Community Events.)',
                }),
                _jsx(DynamicFields, {
                  formType: formType,
                  ...register('description.highlights'),
                  setValue: (value) => handleInputChange('description.highlights', value),
                  max: 6,
                }),
              ],
            }),
            _jsxs('div', {
              className: 'mt-4',
              children: [
                _jsx('label', { className: 'font-semibold mb-4', children: 'Languages Spoken by Staff' }),
                ['arabic', 'english', 'french', 'spanish', 'portuguese', 'german', 'bahasa', 'mandarin'].map((lang) =>
                  _jsx(
                    Checkbox,
                    {
                      require: formData?.languages ? (Object.keys(formData?.languages)?.length ? false : true) : true,
                      ...register(`languages.${lang}`),
                      label: lang.charAt(0).toUpperCase() + lang.slice(1),
                      onChange: (e) => handleInputChange(`languages.${lang}`, e),
                    },
                    lang
                  )
                ),
                _jsx(Input, {
                  type: 'text',
                  ...register('languages.other'),
                  placeholder: 'Others (specify)',
                  required: false,
                }),
              ],
            }),
            _jsx('label', { className: 'font-semibold', children: 'Which year Business was established (Optional)' }),
            _jsx(DateInput, { onChange: (value) => handleInputChange('establishedIn', value) }),
            _jsxs('div', {
              children: [
                _jsx(CancellationPolicy, {
                  handleInputChange: handleInputChange,
                  formType: formType,
                  formData: formData,
                }),
                _jsx('label', { className: 'font-semibold', children: 'House Rules' }),
                _jsx(RichTextEditor, {
                  formType: formType,
                  onContentChange: (value) => handleInputChange('policy.rules', value),
                }),
                formType === 'vacation-rental' && _jsx(SecurityDeposit, { handleInputChange: handleInputChange }),
                _jsx('label', { className: 'font-semibold mb-4 mr-4', children: 'Check-In Time' }),
                _jsx('input', { type: 'time', className: 'mr-4', ...register('policy.checkInTime') }),
                _jsx('label', { className: 'font-semibold mb-4 mr-4', children: 'Check-Out Time' }),
                _jsx('input', { type: 'time', ...register('policy.checkOutTime') }),
              ],
            }),
            _jsxs('div', {
              children: [
                _jsx('label', { className: 'font-semibold', children: 'Payment Methods Accepted' }),
                _jsx(Checkbox, {
                  ...register('paymentMethods.card'),
                  label: 'Credit/Debit Card',
                  onChange: (e) => handleInputChange('paymentMethods.card', e),
                }),
                _jsx(Checkbox, {
                  ...register('paymentMethods.online'),
                  label: 'PayPal',
                  onChange: (e) => handleInputChange('paymentMethods.online', e),
                }),
                _jsx(Checkbox, {
                  ...register('paymentMethods.cash'),
                  label: 'Cash on Arrival',
                  onChange: (e) => handleInputChange('paymentMethods.cash', e),
                }),
                _jsx('label', { className: 'font-semibold mt-2', children: 'Cards Accepted' }),
                _jsxs('div', {
                  className: 'flex gap-2',
                  children: [
                    _jsx(Checkbox, {
                      ...register('acceptedCards.visaCard'),
                      label: 'Visa',
                      onChange: (e) => handleInputChange('acceptedCards.visaCard', e),
                    }),
                    _jsx(Checkbox, {
                      ...register('acceptedCards.masterCard'),
                      label: 'Mastercard',
                      onChange: (e) => handleInputChange('acceptedCards.masterCard', e),
                    }),
                    _jsx(Checkbox, {
                      ...register('acceptedCards.americanExpress'),
                      label: 'American Express',
                      onChange: (e) => handleInputChange('acceptedCards.americanExpress', e),
                    }),
                    _jsx(Checkbox, {
                      ...register('acceptedCards.discover'),
                      label: 'Discover',
                      onChange: (e) => handleInputChange('acceptedCards.discover', e),
                    }),
                    _jsx(Checkbox, {
                      ...register('acceptedCards.jcb'),
                      label: 'Jcb',
                      onChange: (e) => handleInputChange('acceptedCards.jcb', e),
                    }),
                  ],
                }),
                _jsx('div', {
                  className: 'mt-2',
                  children: _jsx(Input, {
                    type: 'text',
                    ...register('acceptedCards.other'),
                    placeholder: 'Other (Specify)',
                    onChange: (e) => handleInputChange('acceptedCards.other', e.target.value),
                  }),
                }),
              ],
            }),
            _jsxs('div', {
              className: 'border p-4 rounded-lg',
              children: [
                _jsx('label', { className: 'font-semibold', children: 'Operating Season' }),
                _jsxs('div', {
                  className: 'mt-2',
                  children: [
                    _jsx('p', { className: 'font-medium', children: 'Open Year-Round' }),
                    _jsxs('div', {
                      className: 'flex gap-4',
                      children: [
                        _jsxs('label', {
                          className: 'flex items-center gap-2',
                          children: [
                            _jsx('input', {
                              type: 'radio',
                              name: 'operatingSeason.isYearRound',
                              value: 'yes',
                              onChange: (e) =>
                                handleInputChange('operatingSeason.isYearRound', e.target.value === 'yes'),
                            }),
                            'Yes',
                          ],
                        }),
                        _jsxs('label', {
                          className: 'flex items-center gap-2',
                          children: [
                            _jsx('input', {
                              type: 'radio',
                              name: 'operatingSeason.isYearRound',
                              value: 'no',
                              onChange: (e) =>
                                handleInputChange('operatingSeason.isYearRound', e.target.value === 'no'),
                            }),
                            'No',
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                _jsxs('div', {
                  className: 'mt-4 space-y-3',
                  children: [
                    _jsx('input', {
                      type: 'text',
                      name: 'operatingSeason.seasonalMonths',
                      placeholder: 'Seasonal (Specify months of operation)',
                      className: 'border p-2 w-full rounded',
                      onChange: (e) => handleInputChange('operatingSeason.seasonalMonths', e.target.value),
                    }),
                    _jsx('input', {
                      type: 'text',
                      name: 'operatingSeason.lowSeason',
                      placeholder: 'Low Season Months (Specify months)',
                      className: 'border p-2 w-full rounded',
                      onChange: (e) => handleInputChange('operatingSeason.lowSeason', e.target.value),
                    }),
                    _jsx('input', {
                      type: 'text',
                      name: 'operatingSeason.highSeason',
                      placeholder: 'High Season Months (Specify months)',
                      className: 'border p-2 w-full rounded',
                      onChange: (e) => handleInputChange('operatingSeason.highSeason', e.target.value),
                    }),
                  ],
                }),
              ],
            }),
            _jsxs('div', {
              children: [
                _jsx('label', { className: 'font-semibold', children: 'Amenities' }),
                formType &&
                  amenitiesMapping[formType].generalAmenities &&
                  _jsx(AccordionSection, {
                    formType: formType,
                    handleInputChange: handleInputChange,
                    zero: getAmenitiesConfig(formType, 'generalAmenities').zero,
                    pre: 'generalAmenities',
                    title: getAmenitiesConfig(formType, 'generalAmenities').title,
                    options: getAmenitiesConfig(formType, 'generalAmenities').options,
                  }),
                formType &&
                  amenitiesMapping[formType].utilities &&
                  _jsx(AccordionSection, {
                    formType: formType,
                    handleInputChange: handleInputChange,
                    zero: getAmenitiesConfig(formType, 'utilities').zero,
                    pre: 'utilities',
                    title: getAmenitiesConfig(formType, 'utilities').title,
                    options: getAmenitiesConfig(formType, 'utilities').options,
                  }),
                formType &&
                  amenitiesMapping[formType].livingArea &&
                  _jsx(AccordionSection, {
                    formType: formType,
                    handleInputChange: handleInputChange,
                    zero: getAmenitiesConfig(formType, 'livingArea').zero,
                    pre: 'livingArea',
                    title: getAmenitiesConfig(formType, 'livingArea').title,
                    options: getAmenitiesConfig(formType, 'livingArea').options,
                  }),
                formType &&
                  amenitiesMapping[formType].kitchen &&
                  _jsx(AccordionSection, {
                    formType: formType,
                    handleInputChange: handleInputChange,
                    zero: getAmenitiesConfig(formType, 'kitchen').zero,
                    pre: 'kitchen',
                    title: getAmenitiesConfig(formType, 'kitchen').title,
                    options: getAmenitiesConfig(formType, 'kitchen').options,
                  }),
                formType &&
                  amenitiesMapping[formType].outdoorFacilities &&
                  _jsx(AccordionSection, {
                    formType: formType,
                    handleInputChange: handleInputChange,
                    zero: getAmenitiesConfig(formType, 'outdoorFacilities').zero,
                    pre: 'outdoorFacilities',
                    title: getAmenitiesConfig(formType, 'outdoorFacilities').title,
                    options: getAmenitiesConfig(formType, 'outdoorFacilities').options,
                  }),
                formType &&
                  amenitiesMapping[formType].barDining &&
                  _jsx(AccordionSection, {
                    formType: formType,
                    handleInputChange: handleInputChange,
                    zero: getAmenitiesConfig(formType, 'barDining').zero,
                    pre: 'barDining',
                    title: getAmenitiesConfig(formType, 'barDining').title,
                    options: getAmenitiesConfig(formType, 'barDining').options,
                  }),
                formType &&
                  amenitiesMapping[formType].specialMenus &&
                  _jsx(AccordionSection, {
                    formType: formType,
                    handleInputChange: handleInputChange,
                    zero: getAmenitiesConfig(formType, 'specialMenus').zero,
                    pre: 'specialMenus',
                    title: getAmenitiesConfig(formType, 'specialMenus').title,
                    options: getAmenitiesConfig(formType, 'specialMenus').options,
                  }),
                formType &&
                  amenitiesMapping[formType].recreational &&
                  _jsx(AccordionSection, {
                    formType: formType,
                    handleInputChange: handleInputChange,
                    zero: getAmenitiesConfig(formType, 'recreational').zero,
                    pre: 'recreational',
                    title: getAmenitiesConfig(formType, 'recreational').title,
                    options: getAmenitiesConfig(formType, 'recreational').options,
                  }),
                formType &&
                  amenitiesMapping[formType].wellness &&
                  _jsx(AccordionSection, {
                    formType: formType,
                    handleInputChange: handleInputChange,
                    zero: getAmenitiesConfig(formType, 'wellness').zero,
                    pre: 'wellness',
                    title: getAmenitiesConfig(formType, 'wellness').title,
                    options: getAmenitiesConfig(formType, 'wellness').options,
                  }),
                formType &&
                  amenitiesMapping[formType].travelAdventureSupport &&
                  _jsx(AccordionSection, {
                    formType: formType,
                    handleInputChange: handleInputChange,
                    zero: getAmenitiesConfig(formType, 'travelAdventureSupport').zero,
                    pre: 'travelAdventureSupport',
                    title: getAmenitiesConfig(formType, 'travelAdventureSupport').title,
                    options: getAmenitiesConfig(formType, 'travelAdventureSupport').options,
                  }),
                formType &&
                  amenitiesMapping[formType].workConnectivity &&
                  _jsx(AccordionSection, {
                    formType: formType,
                    handleInputChange: handleInputChange,
                    zero: getAmenitiesConfig(formType, 'workConnectivity').zero,
                    pre: 'workConnectivity',
                    title: getAmenitiesConfig(formType, 'workConnectivity').title,
                    options: getAmenitiesConfig(formType, 'workConnectivity').options,
                  }),
                formType &&
                  amenitiesMapping[formType].meetingRooms &&
                  _jsx(AccordionSection, {
                    formType: formType,
                    handleInputChange: handleInputChange,
                    zero: getAmenitiesConfig(formType, 'meetingRooms').zero,
                    pre: 'meetingRooms',
                    title: getAmenitiesConfig(formType, 'meetingRooms').title,
                    options: getAmenitiesConfig(formType, 'meetingRooms').options,
                  }),
                formType &&
                  amenitiesMapping[formType].eventServices &&
                  _jsx(AccordionSection, {
                    formType: formType,
                    handleInputChange: handleInputChange,
                    zero: getAmenitiesConfig(formType, 'eventServices').zero,
                    pre: 'eventServices',
                    title: getAmenitiesConfig(formType, 'eventServices').title,
                    options: getAmenitiesConfig(formType, 'eventServices').options,
                  }),
                formType &&
                  amenitiesMapping[formType].ecoFriendlyPractices &&
                  _jsx(AccordionSection, {
                    formType: formType,
                    handleInputChange: handleInputChange,
                    zero: getAmenitiesConfig(formType, 'ecoFriendlyPractices').zero,
                    pre: 'ecoFriendlyPractices',
                    title: getAmenitiesConfig(formType, 'ecoFriendlyPractices').title,
                    options: getAmenitiesConfig(formType, 'ecoFriendlyPractices').options,
                  }),
                _jsx(NearbyAttractionsForm, { formType: formType, handleInputChange: handleInputChange }),
                _jsxs('div', {
                  className: 'p-4 border rounded-lg bg-white shadow-md',
                  children: [
                    _jsx('h2', { className: 'font-semibold mb-4', children: 'Map Location (Optional)' }),
                    _jsx(GetCoordinateOnMap, {
                      setCoordinates: (coordinates) => handleInputChange('location', coordinates),
                    }),
                  ],
                }),
                _jsx(DistanceToKeyLocations, { formType: formType, handleInputChange: handleInputChange }),
                _jsx(HotelResortRoomBathroomDetails, { formType: formType, handleInputChange: handleInputChange }),
                _jsx(BedBreakfastRoomBathroomDetails, { formType: formType, handleInputChange: handleInputChange }),
                _jsx(HostelRoomBathroomDetails, { formType: formType, handleInputChange: handleInputChange }),
                _jsx(CoLivingRoomBathroomDetails, { formType: formType, handleInputChange: handleInputChange }),
                _jsx(VacationRentalRoomBathroomDetails, { formType: formType, handleInputChange: handleInputChange }),
                _jsx(UploadPhotos, { formType: formType, handleInputChange: handleInputChange }),
              ],
            }),
            _jsxs('div', {
              children: [
                _jsx('label', { className: 'font-semibold', children: 'Owner/Manager Details' }),
                _jsx('label', { className: 'block text-sm font-medium capitalize mt-4', children: 'Full Name' }),
                _jsx(Input, {
                  type: 'text',
                  ...register('manager.name'),
                  name: 'manager.name',
                  placeholder: 'Enter full name',
                }),
                _jsx('label', {
                  className: 'block text-sm font-medium capitalize mt-4',
                  children: 'Role (Owner/Manager)',
                }),
                _jsx(Input, {
                  type: 'text',
                  ...register('manager.role'),
                  name: 'manager.role',
                  placeholder: 'Enter role (Owner/Manager)',
                }),
                _jsx('label', { className: 'block text-sm font-medium capitalize mt-4', children: 'Phone Number' }),
                _jsx(Input, {
                  type: 'number',
                  ...register('manager.phoneNumber'),
                  name: 'manager.phoneNumber',
                  placeholder: 'Enter phone number',
                }),
                _jsx('label', { className: 'block text-sm font-medium capitalize mt-4', children: 'Email Address' }),
                _jsx(Input, {
                  type: 'email',
                  ...register('manager.email'),
                  name: 'manager.email',
                  placeholder: 'Enter email address',
                }),
                _jsx('label', {
                  className: 'block text-sm font-medium capitalize mt-4',
                  children: 'Emergency Contact (Optional)',
                }),
                _jsx(Input, {
                  type: 'text',
                  name: 'manager.emergencyContact',
                  ...register('manager.emergencyContact'),
                  placeholder: 'Enter emergency contact',
                  required: false,
                }),
                _jsx(SingleImageUpload, { formType: formType, handleInputChange: handleInputChange }),
              ],
            }),
            _jsxs('div', {
              children: [
                _jsx('label', { className: 'font-semibold', children: 'Consent to Listing' }),
                _jsx('div', {
                  className: 'mb-4',
                  children: _jsx(Checkbox, {
                    label: 'I consent to my business information being listed in the Tribe Africa Pages Directory.',
                    ...register('consent'),
                    onChange: (e) => handleInputChange('consent', e),
                  }),
                }),
                _jsx('label', { className: 'font-semibold', children: 'Accuracy Verification' }),
                _jsx('div', {
                  className: 'mb-4',
                  children: _jsx(Checkbox, {
                    label: 'I confirm that the information provided is accurate to the best of my knowledge.',
                    ...register('confirmation'),
                    onChange: (e) => handleInputChange('confirmation', e),
                  }),
                }),
                _jsx('label', { className: 'font-semibold', children: 'Signature' }),
                _jsx('div', {
                  className: 'mb-4',
                  children: _jsx(Input, {
                    type: 'text',
                    name: 'signature',
                    ...register('signature'),
                    placeholder: 'Type your full name for electronic signature',
                  }),
                }),
                _jsx('label', { className: 'font-semibold', children: 'Date (DD/MM/YYYY)' }),
                _jsx('div', {
                  className: 'mt-4',
                  children: _jsx(DateInput, {
                    ...register('dateOfSubmit'),
                    onChange: (e) => handleInputChange('dateOfSubmit', e),
                  }),
                }),
              ],
            }),
            _jsx('div', { children: _jsx(Button, { type: 'submit', children: 'Submit' }) }),
          ],
        }),
      }),
      showModal && _jsx(SubmissionModal, { onClose: () => setShowModal(false) }),
      ' ',
    ],
  });
};
const CancellationPolicy = ({ handleInputChange, formType, formData }) => {
  const [isCustomPolicy, setIsCustomPolicy] = useState(false);
  const [customPolicyText, setCustomPolicyText] = useState('');
  useEffect(() => {
    setCustomPolicyText('');
  }, [formType]);
  const handleCheckboxChange = (field, value) => {
    if (field === 'policy.cancellation.customPolicyEnabled') {
      setIsCustomPolicy(value);
      if (!value) {
        setCustomPolicyText(''); // Clear text when unchecked
        handleInputChange('policy.cancellation.customPolicyText', ''); // Clear from parent state
      }
    }
    handleInputChange(field, value);
  };
  return _jsxs('div', {
    className: 'mb-4',
    children: [
      _jsx('label', { className: 'font-semibold block', children: policyLabels[formType] || 'Policies' }),
      _jsx('label', { className: 'font-semibold block mt-2', children: 'Cancellation Policy' }),
      _jsx(Checkbox, {
        require: formData?.policy ? (Object.keys(formData?.policy)?.length ? false : true) : true,
        label: 'Free cancellation',
        onChange: (e) => handleCheckboxChange('policy.cancellation.freeCancellation', e),
      }),
      _jsx(Checkbox, {
        label: 'Non-refundable',
        onChange: (e) => handleCheckboxChange('policy.cancellation.nonRefundable', e),
      }),
      _jsx(Checkbox, {
        label: 'Custom Policy (Specify)',
        onChange: (e) => handleCheckboxChange('policy.cancellation.customPolicyEnabled', e),
      }),
      isCustomPolicy &&
        _jsxs('div', {
          children: [
            _jsx('label', { className: 'font-semibold block mt-2', children: 'Specify Custom Policy' }),
            _jsx('input', {
              type: 'text',
              placeholder: 'Enter custom cancellation policy',
              className: 'w-full mt-2 p-2 border rounded',
              value: customPolicyText,
              onChange: (e) => {
                setCustomPolicyText(e.target.value);
                handleInputChange('policy.cancellation.customPolicyText', e.target.value);
              },
            }),
          ],
        }),
    ],
  });
};
const SingleImageUpload = ({ formType, handleInputChange }) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    // Reset image state when formType changes
    setImage(null);
    handleInputChange('manager.idPhoto', null);
  }, [formType]);
  const handleFileChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const previewURL = URL.createObjectURL(file); // Temporary preview
    try {
      const uploadedImage = await uploadImage(file); // Upload function
      if (!uploadedImage?._id) throw new Error('Upload failed');
      const imageData = {
        preview: previewURL,
        _id: uploadedImage._id, // Sanity Image _id
      };
      setImage(imageData);
      handleInputChange('manager.idPhoto', {
        _type: 'image',
        asset: { _ref: uploadedImage._id },
      });
    } catch (error) {
      console.error('Image upload error:', error);
      setImage(null);
      handleInputChange('manager.idPhoto', null);
    }
  };
  if (!formType) return null; // Return null if formType is empty
  return _jsxs('div', {
    children: [
      _jsx('label', { className: 'text-sm font-medium capitalize mr-4', children: 'Upload Passport/ID' }),
      _jsx('input', { type: 'file', accept: 'image/*', onChange: handleFileChange }),
      image && _jsx('img', { src: image.preview, alt: 'Preview', className: 'w-20 h-20 object-cover mt-2' }),
    ],
  });
};
const PriceRange = ({ formType, handleInputChange }) => {
  const options = priceRangeOptions[formType] || [];
  const [selectedPriceRanges, setSelectedPriceRanges] = useState({});
  useEffect(() => {
    setSelectedPriceRanges({});
  }, [formType]);
  const handleCheckboxChange = (key, checked) => {
    const updatedSelections = { ...selectedPriceRanges, [key]: checked };
    setSelectedPriceRanges(updatedSelections);
    handleInputChange('priceRange', updatedSelections); // Update parent state
  };
  return _jsxs('div', {
    className: 'mb-4',
    children: [
      _jsx('label', { className: 'font-semibold block mb-2', children: 'Price Range' }),
      options.map(({ key, label }) =>
        _jsxs(
          'label',
          {
            className: 'flex items-center mb-1',
            children: [
              _jsx('input', {
                required: Object.keys(selectedPriceRanges).length ? false : true,
                type: 'checkbox',
                name: `priceRange.${key}`,
                checked: selectedPriceRanges[key] || false,
                onChange: (e) => handleCheckboxChange(key, e.target.checked),
                className: 'mr-2',
              }),
              label,
            ],
          },
          key
        )
      ),
    ],
  });
};
const SubmissionModal = ({ onClose }) => {
  // useEffect(() => {
  //   document.body.style.overflow = 'hidden'; // Disable scrolling
  //   return () => {
  //     document.body.style.overflow = 'auto'; // Restore scrolling on unmount
  //   };
  // }, []);
  return _jsx('div', {
    className: 'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]',
    onClick: onClose,
    children: _jsxs('div', {
      className: 'bg-white rounded-lg shadow-lg p-6 w-4/5 max-w-lg relative',
      onClick: (e) => e.stopPropagation(),
      children: [
        _jsx('button', {
          onClick: onClose,
          className: 'absolute top-4 right-4 text-gray-500 hover:text-gray-700',
          children: '\u2716',
        }),
        _jsx('h2', { className: 'text-xl font-semibold mb-3', children: 'Successfully uploded!' }),
        _jsx('hr', { className: 'border-orange-500 mb-3' }),
        _jsxs('p', {
          className: 'text-gray-700',
          children: [
            'Thank you for submitting your accommodation details to the ',
            _jsx('b', { children: 'Tribe Africa Pages Directory!' }),
            _jsx('br', {}),
            _jsx('br', {}),
            'Our team will review your listing within ',
            _jsx('b', { children: '3\u20135 business days' }),
            ' to ensure all information meets our quality standards. Once approved, your accommodation will be featured on our directory, making it visible to potential guests and travelers.',
            _jsx('br', {}),
            _jsx('br', {}),
            'You will receive a confirmation email with a link to your live listing. If you have any questions or need assistance, please feel free to reach out to us at',
            _jsx('b', { children: ' support@tribeafrica.org' }),
            '.',
            _jsx('br', {}),
            _jsx('br', {}),
            'We\u2019re excited to help promote your accommodation to our growing audience!',
          ],
        }),
        _jsx('div', {
          className: 'mt-4 flex justify-end',
          children: _jsx('button', {
            onClick: onClose,
            className: 'bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600',
            children: 'Close',
          }),
        }),
      ],
    }),
  });
};
const SecurityDeposit = ({ handleInputChange }) => {
  const [securityDeposit, setSecurityDeposit] = useState({
    hasDeposit: false,
    amount: '',
    conditions: '',
  });
  const handleChange = (field, value) => {
    const updatedDeposit = { ...securityDeposit, [field]: value };
    if (field === 'hasDeposit' && !value) {
      updatedDeposit.amount = '';
      updatedDeposit.conditions = '';
    }
    setSecurityDeposit(updatedDeposit);
    handleInputChange('policy.securityDeposit', updatedDeposit);
  };
  return _jsxs('div', {
    className: 'mb-4',
    children: [
      _jsx('label', { className: 'font-semibold block mb-2', children: 'Security Deposit (Specify)' }),
      _jsxs('div', {
        className: 'flex gap-4',
        children: [
          _jsxs('label', {
            className: 'flex items-center',
            children: [
              _jsx('input', {
                type: 'radio',
                name: 'hasDeposit',
                value: 'no',
                checked: !securityDeposit.hasDeposit,
                onChange: () => handleChange('hasDeposit', false),
                className: 'mr-2',
              }),
              'No',
            ],
          }),
          _jsxs('label', {
            className: 'flex items-center',
            children: [
              _jsx('input', {
                type: 'radio',
                name: 'hasDeposit',
                value: 'yes',
                checked: securityDeposit.hasDeposit,
                onChange: () => handleChange('hasDeposit', true),
                className: 'mr-2',
              }),
              'Yes',
            ],
          }),
        ],
      }),
      securityDeposit.hasDeposit &&
        _jsxs('div', {
          className: 'mt-4 space-y-2',
          children: [
            _jsx('input', {
              type: 'number',
              name: 'depositAmount',
              placeholder: 'Enter deposit amount',
              value: securityDeposit.amount,
              onChange: (e) => handleChange('amount', e.target.value),
              className: 'border p-2 w-full rounded',
            }),
            _jsx('textarea', {
              name: 'depositConditions',
              placeholder: 'Enter deposit conditions',
              value: securityDeposit.conditions,
              onChange: (e) => handleChange('conditions', e.target.value),
              className: 'border p-2 w-full rounded',
            }),
          ],
        }),
    ],
  });
};
const UploadPhotos = ({ formType, handleInputChange }) => {
  if (!formType || !formCategories[formType]) return null; // Return null if formType is missing
  const getInitialState = () =>
    formCategories[formType]?.reduce((acc, category) => {
      acc[category.value] = [];
      return acc;
    }, {}) || {};
  const [photos, setPhotos] = useState(getInitialState);
  // Reset state when formType changes
  useEffect(() => {
    setPhotos(getInitialState());
  }, [formType]);
  const handlePhotoUpload = async (e, category) => {
    if (!e.target.files) return;
    const uploadedFiles = Array.from(e.target.files);
    const uploadedPhotoRefs = await Promise.all(
      uploadedFiles.map(async (file) => {
        const previewURL = URL.createObjectURL(file); // Local preview
        const coverPhotoUrl = await uploadImage(file); // Upload to server
        return {
          _key: generateId(), // Generate unique key
          _type: 'image',
          asset: { _ref: coverPhotoUrl._id }, // Use Sanity reference
          preview: previewURL, // Temporary local preview
        };
      })
    );
    setPhotos((prev) => {
      const updatedPhotos = {
        ...prev,
        [category]: [...(prev[category] || []), ...uploadedPhotoRefs],
      };
      handleInputChange(
        'uploadedPhotos' + formType.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()),
        updatedPhotos
      );
      return updatedPhotos;
    });
  };
  return _jsxs('div', {
    className: 'my-4 p-4 border rounded-lg bg-white shadow-md',
    children: [
      _jsx('h2', { className: 'text-lg font-semibold mb-3', children: 'Upload Photos' }),
      formCategories[formType]?.map(({ label, value }) =>
        _jsxs(
          'div',
          {
            className: 'mb-6',
            children: [
              _jsx('label', { className: 'block text-sm font-medium capitalize', children: label }),
              _jsx('input', {
                type: 'file',
                multiple: true,
                accept: 'image/*',
                onChange: (e) => handlePhotoUpload(e, value),
                className: 'w-full p-2 border rounded mt-2',
              }),
              _jsx('div', {
                className: 'flex flex-wrap gap-2 mt-2',
                children: photos[value]?.map((photo) =>
                  _jsx(
                    'img',
                    {
                      src: photo.preview || `https://cdn.sanity.io/images/projectId/dataset/${photo.asset._ref}`,
                      alt: 'Preview',
                      className: 'w-20 h-20 object-cover rounded-md border',
                    },
                    photo._key
                  )
                ),
              }),
            ],
          },
          value
        )
      ),
    ],
  });
};
const DistanceToKeyLocations = ({ formType, handleInputChange }) => {
  const locationOptions = {
    nearestAirport: 'Nearest Airport',
    trainBusStation: 'Train/Bus Station',
    taxiStands: 'Taxi Stands',
    cityCenter: 'City/Town Center',
    localMarkets: 'Local Markets/Shopping Areas',
    popularRestaurants: 'Popular Restaurants/Bars',
  };
  const getDefaultState = () =>
    Object.keys(locationOptions).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});
  const [locations, setLocations] = useState(getDefaultState);
  // Reset state when formType changes
  useEffect(() => {
    setLocations(getDefaultState());
  }, [formType]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocations((prev) => {
      const updatedLocations = { ...prev, [name]: value };
      // Call the parent function to update the state
      handleInputChange('distanceToKeyLocations', updatedLocations);
      return updatedLocations;
    });
  };
  return _jsxs('div', {
    className: 'my-4 p-4 border rounded-lg bg-white shadow-md',
    children: [
      _jsx('h2', { className: 'text-lg font-semibold mb-3', children: 'Distance to Key Locations (Optional)' }),
      Object.entries(locationOptions).map(([key, label]) =>
        _jsxs(
          'div',
          {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block text-sm font-medium', children: label }),
              _jsx('input', {
                type: 'text',
                name: key,
                value: locations[key],
                onChange: handleChange,
                placeholder: 'Enter name & distance',
                className: 'w-full p-2 border rounded',
              }),
            ],
          },
          key
        )
      ),
    ],
  });
};
const AccordionSection = ({ formType, title, options, pre, zero, handleInputChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(new Array(options.length).fill(false));
  const [otherSpecify, setOtherSpecify] = useState('');
  const [otherSpecifyValues, setOtherSpecifyValues] = useState({}); // Stores "Other (Specify)" values
  const register = useContext(FormContext);
  useEffect(() => {
    setOtherSpecify('');
  }, [formType]);
  const handleChange = useCallback(
    (e, value, index, input) => {
      if (input) {
        // If input field (otherSpecify), update its value
        const newValue = e.target.value;
        setOtherSpecifyValues((prev) => ({
          ...prev,
          [value]: newValue,
        }));
        handleInputChange(`${zero}.${pre}.${value}`, newValue);
      } else if (value === 'otherSpecify' || input) {
        const newValue = e.target.value;
        setOtherSpecify(newValue);
        handleInputChange(`${zero}.${pre}.${value}`, newValue);
      } else {
        const isChecked = e;
        setSelectedOptions((prevSelectedOptions) => {
          const updatedOptions = [...prevSelectedOptions];
          updatedOptions[index] = isChecked;
          return updatedOptions;
        });
        handleInputChange(`${zero}.${pre}.${value}`, isChecked);
      }
    },
    [handleInputChange, pre] // Dependencies for useCallback
  );
  return _jsxs('div', {
    className: 'border-b',
    children: [
      _jsx('div', {
        className: 'cursor-pointer p-4 bg-gray-200',
        onClick: (e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        },
        children: _jsx('h2', { children: title }),
      }),
      isOpen &&
        _jsx('div', {
          className: 'p-4 bg-gray-100',
          onClick: (e) => e.stopPropagation(),
          children: options.map((option, index) =>
            option.value === 'otherSpecify' || option?.input
              ? _jsx(
                  Input,
                  {
                    ...register(`${zero}.${pre}.${option.value}`),
                    placeholder: option.label,
                    value: otherSpecify,
                    onChange: (e) => handleChange(e, option.value, index, option?.input || false),
                  },
                  option.value
                )
              : _jsx(
                  Checkbox,
                  {
                    ...register(`${zero}.${pre}.${option.value}`),
                    label: option.label,
                    onChange: (e) => handleChange(e, option.value, index, option?.input || false),
                  },
                  option.value
                )
          ),
        }),
    ],
  });
};
const VacationRentalRoomBathroomDetails = ({ formType, handleInputChange }) => {
  if (formType !== 'vacation-rental') return null; // Only render for vacation rentals
  const [formData, setFormData] = useState({
    maxOccupancy: '',
    bedrooms: { count: '', bedTypes: '' },
    enSuiteBedrooms: { count: '', bedTypes: '' },
    separateBathrooms: '',
    propertySize: '',
    outdoorTerraceSize: '',
    gardenSize: '',
    bedroomFeatures: {
      enSuiteBathroom: false,
      balcony: false,
      closetStorageSpace: false,
      airConditioning: false,
    },
    bathroomFeatures: {
      bathtub: false,
      shower: false,
      doubleSink: false,
      towelsToiletries: false,
    },
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => {
      const updatedForm = { ...prevState };
      const keys = name.split('.');
      if (keys.length === 2) {
        const [category, key] = keys;
        updatedForm[category] = {
          ...prevState[category],
          [key]: type === 'checkbox' ? checked : value,
        };
      } else {
        updatedForm[name] = value;
      }
      handleInputChange('vacationRentalRoomBathroomDetails', formData);
      return updatedForm;
    });
  };
  return _jsxs('div', {
    className: 'p-4 bg-gray-100 rounded-lg my-4',
    children: [
      _jsx('h2', { className: 'text-lg font-semibold mb-3', children: 'Vacation Rental - General Information' }),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('label', { className: 'block text-sm font-medium', children: 'Max Occupancy' }),
          _jsx('input', {
            type: 'text',
            name: 'maxOccupancy',
            value: formData.maxOccupancy,
            onChange: handleChange,
            placeholder: 'Enter max occupancy',
            className: 'w-full p-2 border rounded',
          }),
        ],
      }),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('label', { className: 'block text-sm font-medium', children: 'Number of Bedrooms' }),
          _jsx('input', {
            type: 'text',
            name: 'bedrooms.count',
            value: formData.bedrooms.count,
            onChange: handleChange,
            placeholder: 'Enter number of bedrooms',
            className: 'w-full p-2 border rounded',
          }),
          _jsx('input', {
            type: 'text',
            name: 'bedrooms.bedTypes',
            value: formData.bedrooms.bedTypes,
            onChange: handleChange,
            placeholder: 'Enter bed types (King, Queen, etc.)',
            className: 'w-full p-2 border rounded mt-2',
          }),
        ],
      }),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('label', { className: 'block text-sm font-medium', children: 'Number of En-Suite Bedrooms' }),
          _jsx('input', {
            type: 'text',
            name: 'enSuiteBedrooms.count',
            value: formData.enSuiteBedrooms.count,
            onChange: handleChange,
            placeholder: 'Enter number of en-suite bedrooms',
            className: 'w-full p-2 border rounded',
          }),
          _jsx('input', {
            type: 'text',
            name: 'enSuiteBedrooms.bedTypes',
            value: formData.enSuiteBedrooms.bedTypes,
            onChange: handleChange,
            placeholder: 'Enter bed types (King, Queen, etc.)',
            className: 'w-full p-2 border rounded mt-2',
          }),
        ],
      }),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('label', { className: 'block text-sm font-medium', children: 'Number of Separate Bathrooms' }),
          _jsx('input', {
            type: 'text',
            name: 'separateBathrooms',
            value: formData.separateBathrooms,
            onChange: handleChange,
            placeholder: 'Enter number of separate bathrooms',
            className: 'w-full p-2 border rounded',
          }),
        ],
      }),
      [
        { label: 'Property Size', name: 'propertySize' },
        { label: 'Outdoor Terrace Size', name: 'outdoorTerraceSize' },
        { label: 'Garden Size', name: 'gardenSize' },
      ].map(({ label, name }) =>
        _jsxs(
          'div',
          {
            className: 'mb-4',
            children: [
              _jsxs('label', { className: 'block text-sm font-medium', children: [label, ' (sq meters/feet)'] }),
              _jsx('input', {
                type: 'text',
                name: name,
                value: formData[name],
                onChange: handleChange,
                placeholder: `Enter ${label.toLowerCase()}`,
                className: 'w-full p-2 border rounded',
              }),
            ],
          },
          name
        )
      ),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('h3', { className: 'text-md font-semibold', children: 'Bedroom Features' }),
          Object.keys(formData.bedroomFeatures).map((key) =>
            _jsxs(
              'label',
              {
                className: 'flex items-center',
                children: [
                  _jsx('input', {
                    type: 'checkbox',
                    name: `bedroomFeatures.${key}`,
                    checked: formData.bedroomFeatures[key],
                    onChange: handleChange,
                    className: 'mr-2',
                  }),
                  key.replace(/([A-Z])/g, ' $1'),
                ],
              },
              key
            )
          ),
        ],
      }),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('h3', { className: 'text-md font-semibold', children: 'Bathroom Features' }),
          Object.keys(formData.bathroomFeatures).map((key) =>
            _jsxs(
              'label',
              {
                className: 'flex items-center',
                children: [
                  _jsx('input', {
                    type: 'checkbox',
                    name: `bathroomFeatures.${key}`,
                    checked: formData.bathroomFeatures[key],
                    onChange: handleChange,
                    className: 'mr-2',
                  }),
                  key.replace(/([A-Z])/g, ' $1'),
                ],
              },
              key
            )
          ),
        ],
      }),
    ],
  });
};
const CoLivingRoomBathroomDetails = ({ formType, handleInputChange }) => {
  if (formType !== 'co-living') return null; // Only render for co-living
  const [formData, setFormData] = useState({
    sharedBedrooms: '',
    sharedBedroomFeatures: {
      balconyTerrace: false,
      closetStorageSpace: false,
      readingLights: false,
      chargingPorts: false,
      tv: false,
      wifi: false,
      airConditioningHeating: false,
      workspace: false,
      other: '',
    },
    sharedBathrooms: '',
    enSuiteBedrooms: '',
    enSuiteBedroomFeatures: {
      balconyTerrace: false,
      closetStorageSpace: false,
      readingLights: false,
      chargingPorts: false,
      tv: false,
      wifi: false,
      airConditioningHeating: false,
      workspace: false,
      other: '',
    },
    commonAreas: '',
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => {
      const updatedForm = { ...prevState };
      const keys = name.split('.');
      if (keys.length === 2) {
        const [category, key] = keys;
        updatedForm[category] = {
          ...prevState[category],
          [key]: type === 'checkbox' ? checked : value,
        };
      } else {
        updatedForm[name] = value;
      }
      handleInputChange('coLivingRoomBathroomDetails', formData);
      return updatedForm;
    });
  };
  return _jsxs('div', {
    className: 'p-4 bg-gray-100 rounded-lg my-4',
    children: [
      _jsx('h2', { className: 'text-lg font-semibold mb-3', children: 'Co-Living Room & Bathroom Details' }),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('label', {
            className: 'block text-sm font-medium',
            children: 'Number of Bedrooms Available with Shared Bathrooms',
          }),
          _jsx('input', {
            type: 'text',
            name: 'sharedBedrooms',
            value: formData.sharedBedrooms,
            onChange: handleChange,
            placeholder: 'Enter number of shared bedrooms',
            className: 'w-full p-2 border rounded',
          }),
        ],
      }),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('h3', { className: 'text-md font-semibold', children: 'Shared Bedroom Features' }),
          Object.keys(formData.sharedBedroomFeatures).map((key) =>
            key !== 'other'
              ? _jsxs(
                  'label',
                  {
                    className: 'flex items-center',
                    children: [
                      _jsx('input', {
                        type: 'checkbox',
                        name: `sharedBedroomFeatures.${key}`,
                        checked: formData.sharedBedroomFeatures[key],
                        onChange: handleChange,
                        className: 'mr-2',
                      }),
                      key.replace(/([A-Z])/g, ' $1').trim(),
                    ],
                  },
                  key
                )
              : null
          ),
          _jsx('input', {
            type: 'text',
            name: 'sharedBedroomFeatures.other',
            value: formData.sharedBedroomFeatures.other,
            onChange: handleChange,
            placeholder: 'Other (Specify)',
            className: 'w-full p-2 border rounded mt-2',
          }),
        ],
      }),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('label', { className: 'block text-sm font-medium', children: 'Number of Shared Bathrooms' }),
          _jsx('input', {
            type: 'text',
            name: 'sharedBathrooms',
            value: formData.sharedBathrooms,
            onChange: handleChange,
            placeholder: 'Enter number of shared bathrooms',
            className: 'w-full p-2 border rounded',
          }),
        ],
      }),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('label', { className: 'block text-sm font-medium', children: 'Number of En-Suite Bedrooms' }),
          _jsx('input', {
            type: 'text',
            name: 'enSuiteBedrooms',
            value: formData.enSuiteBedrooms,
            onChange: handleChange,
            placeholder: 'Enter number of en-suite bedrooms',
            className: 'w-full p-2 border rounded',
          }),
        ],
      }),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('h3', { className: 'text-md font-semibold', children: 'En-Suite Bedroom Features' }),
          Object.keys(formData.enSuiteBedroomFeatures).map((key) =>
            key !== 'other'
              ? _jsxs(
                  'label',
                  {
                    className: 'flex items-center',
                    children: [
                      _jsx('input', {
                        type: 'checkbox',
                        name: `enSuiteBedroomFeatures.${key}`,
                        checked: formData.enSuiteBedroomFeatures[key],
                        onChange: handleChange,
                        className: 'mr-2',
                      }),
                      key.replace(/([A-Z])/g, ' $1').trim(),
                    ],
                  },
                  key
                )
              : null
          ),
          _jsx('input', {
            type: 'text',
            name: 'enSuiteBedroomFeatures.other',
            value: formData.enSuiteBedroomFeatures.other,
            onChange: handleChange,
            placeholder: 'Other (Specify)',
            className: 'w-full p-2 border rounded mt-2',
          }),
        ],
      }),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('label', { className: 'block text-sm font-medium', children: 'Common Areas' }),
          _jsx('textarea', {
            name: 'commonAreas',
            value: formData.commonAreas,
            onChange: handleChange,
            placeholder: 'Describe the shared spaces (e.g., kitchen, lounge, gym)',
            className: 'w-full p-2 border rounded h-24',
          }),
        ],
      }),
    ],
  });
};
const HostelRoomBathroomDetails = ({ formType, handleInputChange }) => {
  if (formType !== 'hostel') return null;
  const [formData, setFormData] = useState({
    totalBeds: '',
    dormitoryRooms: '',
    dormRoomType: {
      mixedDorm: false,
      femaleDorm: false,
      maleDorm: false,
      other: '',
    },
    dormRoomFeatures: {
      lockers: false,
      readingLights: false,
      chargingPorts: false,
      curtainsForPrivacy: false,
      other: '',
    },
    sharedBathrooms: '',
    privateRooms: '',
    enSuitePrivateRooms: '',
    privateRoomFeatures: {
      enSuiteBathroom: false,
      balconyTerrace: false,
      closetStorageSpace: false,
      tv: false,
      other: '',
    },
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => {
      const updatedForm = { ...prevState };
      const keys = name.split('.'); // Handle nested fields
      if (keys.length === 2) {
        const [category, key] = keys;
        updatedForm[category] = {
          ...prevState[category],
          [key]: type === 'checkbox' ? checked : value,
        };
      } else {
        updatedForm[name] = value;
      }
      handleInputChange('hostelRoomBathroomDetails', updatedForm);
      return updatedForm;
    });
  };
  return _jsxs('div', {
    className: 'p-4 bg-gray-100 rounded-lg my-4',
    children: [
      _jsx('h2', { className: 'text-lg font-semibold mb-3', children: 'Hostel Room & Bathroom Details' }),
      [
        { label: 'Total Number of Beds', name: 'totalBeds' },
        { label: 'Number of Dormitory Rooms', name: 'dormitoryRooms' },
        { label: 'Number of Shared Bathrooms', name: 'sharedBathrooms' },
        { label: 'Number of Private Rooms', name: 'privateRooms' },
        { label: 'Number of en-Suite Private Rooms', name: 'enSuitePrivateRooms' },
      ].map(({ label, name }) =>
        _jsxs(
          'div',
          {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block text-sm font-medium', children: label }),
              _jsx('input', {
                type: 'text',
                name: name,
                value: formData[name],
                onChange: handleChange,
                placeholder: `Enter ${label.toLowerCase()}`,
                className: 'w-full p-2 border rounded',
              }),
            ],
          },
          name
        )
      ),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('h3', { className: 'text-md font-semibold', children: 'Dorm Room Type' }),
          Object.keys(formData.dormRoomType).map((key) =>
            key !== 'other'
              ? _jsxs(
                  'label',
                  {
                    className: 'flex items-center',
                    children: [
                      _jsx('input', {
                        type: 'checkbox',
                        name: `dormRoomType.${key}`,
                        checked: formData.dormRoomType[key],
                        onChange: handleChange,
                        className: 'mr-2',
                      }),
                      key.replace(/([A-Z])/g, ' $1').trim(),
                    ],
                  },
                  key
                )
              : null
          ),
          _jsx('input', {
            type: 'text',
            name: 'dormRoomType.other',
            value: formData.dormRoomType.other,
            onChange: handleChange,
            placeholder: 'Other (Specify)',
            className: 'w-full p-2 border rounded mt-2',
          }),
        ],
      }),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('h3', { className: 'text-md font-semibold', children: 'Dorm Room Features' }),
          Object.keys(formData.dormRoomFeatures).map((key) =>
            key !== 'other'
              ? _jsxs(
                  'label',
                  {
                    className: 'flex items-center',
                    children: [
                      _jsx('input', {
                        type: 'checkbox',
                        name: `dormRoomFeatures.${key}`,
                        checked: formData.dormRoomFeatures[key],
                        onChange: handleChange,
                        className: 'mr-2',
                      }),
                      key.replace(/([A-Z])/g, ' $1').trim(),
                    ],
                  },
                  key
                )
              : null
          ),
          _jsx('input', {
            type: 'text',
            name: 'dormRoomFeatures.other',
            value: formData.dormRoomFeatures.other,
            onChange: handleChange,
            placeholder: 'Other (Specify)',
            className: 'w-full p-2 border rounded mt-2',
          }),
        ],
      }),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('h3', { className: 'text-md font-semibold', children: 'Private Room Features' }),
          Object.keys(formData.privateRoomFeatures).map((key) =>
            key !== 'other'
              ? _jsxs(
                  'label',
                  {
                    className: 'flex items-center',
                    children: [
                      _jsx('input', {
                        type: 'checkbox',
                        name: `privateRoomFeatures.${key}`,
                        checked: formData.privateRoomFeatures[key],
                        onChange: handleChange,
                        className: 'mr-2',
                      }),
                      key.replace(/([A-Z])/g, ' $1').trim(),
                    ],
                  },
                  key
                )
              : null
          ),
          _jsx('input', {
            type: 'text',
            name: 'privateRoomFeatures.other',
            value: formData.privateRoomFeatures.other,
            onChange: handleChange,
            placeholder: 'Other (Specify)',
            className: 'w-full p-2 border rounded mt-2',
          }),
        ],
      }),
    ],
  });
};
const BedBreakfastRoomBathroomDetails = ({ formType, handleInputChange }) => {
  if (formType !== 'bed-and-breakfast') return null;
  const [formData, setFormData] = useState({
    numberOfBeds: '',
    numberOfRooms: '',
    numberOfEnSuiteRooms: '',
    numberOfSharedBathrooms: '',
    roomAmenities: {
      tv: false,
      kitchen: false,
      coffeeTeaMaker: false,
      coffeeMachine: false,
      electricKettle: false,
      miniBar: false,
      hairdryer: false,
      safe: false,
      balcony: false,
      familyRooms: false,
      other: '',
    },
    bathroomAmenities: {
      privateBathroom: false,
      sharedBathroom: false,
      bathtub: false,
      shower: false,
      walkInShower: false,
      showerChair: false,
      showerWithGrabRail: false,
      toiletWithGrabRail: false,
      towelsProvided: false,
      toiletriesProvided: false,
      other: '',
    },
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updatedForm = { ...prev };
      const keys = name.split('.');
      if (keys.length === 2) {
        const [category, key] = keys;
        updatedForm[category] = {
          ...prev[category],
          [key]: type === 'checkbox' ? checked : value,
        };
      } else {
        updatedForm[name] = value;
      }
      handleInputChange('bedBreakfastRoomBathroomDetails', updatedForm);
      return updatedForm;
    });
  };
  return _jsxs('div', {
    className: 'p-4 bg-gray-100 rounded-lg',
    children: [
      _jsx('h2', { className: 'text-lg font-semibold mb-3', children: 'Room & Bathroom Details' }),
      ['numberOfBeds', 'numberOfRooms', 'numberOfEnSuiteRooms', 'numberOfSharedBathrooms'].map((field) =>
        _jsxs(
          'div',
          {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block text-sm font-medium', children: field.replace(/([A-Z])/g, ' $1') }),
              _jsx('input', {
                type: 'text',
                name: field,
                value: formData[field],
                onChange: handleChange,
                placeholder: `Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
                className: 'w-full p-2 border rounded',
              }),
            ],
          },
          field
        )
      ),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('h3', { className: 'text-md font-semibold', children: 'Room Amenities' }),
          Object.keys(formData.roomAmenities).map((key) =>
            key !== 'other'
              ? _jsxs(
                  'label',
                  {
                    className: 'flex items-center',
                    children: [
                      _jsx('input', {
                        type: 'checkbox',
                        name: `roomAmenities.${key}`,
                        checked: formData.roomAmenities[key],
                        onChange: handleChange,
                        className: 'mr-2',
                      }),
                      key.replace(/([A-Z])/g, ' $1'),
                    ],
                  },
                  key
                )
              : null
          ),
          _jsx('input', {
            type: 'text',
            name: 'roomAmenities.other',
            value: formData.roomAmenities.other,
            onChange: handleChange,
            placeholder: 'Other (Specify)',
            className: 'w-full p-2 border rounded mt-2',
          }),
        ],
      }),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('h3', { className: 'text-md font-semibold', children: 'Bathroom Amenities' }),
          Object.keys(formData.bathroomAmenities).map((key) =>
            key !== 'other'
              ? _jsxs(
                  'label',
                  {
                    className: 'flex items-center',
                    children: [
                      _jsx('input', {
                        type: 'checkbox',
                        name: `bathroomAmenities.${key}`,
                        checked: formData.bathroomAmenities[key],
                        onChange: handleChange,
                        className: 'mr-2',
                      }),
                      key.replace(/([A-Z])/g, ' $1'),
                    ],
                  },
                  key
                )
              : null
          ),
          _jsx('input', {
            type: 'text',
            name: 'bathroomAmenities.other',
            value: formData.bathroomAmenities.other,
            onChange: handleChange,
            placeholder: 'Other (Specify)',
            className: 'w-full p-2 border rounded mt-2',
          }),
        ],
      }),
    ],
  });
};
const HotelResortRoomBathroomDetails = ({ formType, handleInputChange }) => {
  if (formType !== 'hotel' && formType !== 'resort') return null;
  const [formData, setFormData] = useState({
    numberOfBeds: '',
    numberOfRooms: '',
    numberOfSuites: '',
    roomAmenities: {
      tv: false,
      kitchen: false,
      coffeeTeaMaker: false,
      coffeeMachine: false,
      electricKettle: false,
      miniBar: false,
      hairdryer: false,
      safe: false,
      balcony: false,
      familyRooms: false,
      other: '',
    },
    bathroomAmenities: {
      privateBathroom: false,
      sharedBathroom: false,
      bathtub: false,
      shower: false,
      walkInShower: false,
      showerChair: false,
      showerWithGrabRail: false,
      toiletWithGrabRail: false,
      towelsProvided: false,
      toiletriesProvided: false,
      other: '',
    },
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updatedForm = { ...prev };
      const keys = name.split('.'); // Handle nested fields
      if (keys.length === 2) {
        const [category, key] = keys;
        updatedForm[category] = {
          ...prev[category],
          [key]: type === 'checkbox' ? checked : value,
        };
      } else {
        updatedForm[name] = value;
      }
      console.log(updatedForm);
      handleInputChange('hotelResortsbathroomDetails', updatedForm);
      return updatedForm;
    });
  };
  return _jsxs('div', {
    className: 'p-4 bg-gray-100 rounded-lg my-4',
    children: [
      _jsx('h2', { className: 'text-lg font-semibold mb-3', children: 'Room & Bathroom Details' }),
      [
        { label: 'Total Number of Beds', name: 'numberOfBeds' },
        { label: 'Number of Rooms', name: 'numberOfRooms' },
        { label: 'Number of Suites', name: 'numberOfSuites' },
      ].map(({ label, name }) =>
        _jsxs(
          'div',
          {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block text-sm font-medium', children: label }),
              _jsx('input', {
                type: 'text',
                name: name,
                value: formData[name],
                onChange: handleChange,
                placeholder: `Enter ${label.toLowerCase()}`,
                className: 'w-full p-2 border rounded',
              }),
            ],
          },
          name
        )
      ),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('h3', { className: 'text-md font-semibold', children: 'Room Amenities' }),
          Object.keys(formData.roomAmenities).map((key) =>
            key !== 'other'
              ? _jsxs(
                  'label',
                  {
                    className: 'flex items-center',
                    children: [
                      _jsx('input', {
                        type: 'checkbox',
                        name: `roomAmenities.${key}`,
                        checked: formData.roomAmenities[key],
                        onChange: handleChange,
                        className: 'mr-2',
                      }),
                      key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
                    ],
                  },
                  key
                )
              : null
          ),
          _jsx('input', {
            type: 'text',
            name: 'roomAmenities.other',
            value: formData.roomAmenities.other,
            onChange: handleChange,
            placeholder: 'Other (Specify)',
            className: 'w-full p-2 border rounded mt-2',
          }),
        ],
      }),
      _jsxs('div', {
        className: 'mb-4',
        children: [
          _jsx('h3', { className: 'text-md font-semibold', children: 'Bathroom Amenities' }),
          Object.keys(formData.bathroomAmenities).map((key) =>
            key !== 'other'
              ? _jsxs(
                  'label',
                  {
                    className: 'flex items-center',
                    children: [
                      _jsx('input', {
                        type: 'checkbox',
                        name: `bathroomAmenities.${key}`,
                        checked: formData.bathroomAmenities[key],
                        onChange: handleChange,
                        className: 'mr-2',
                      }),
                      key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
                    ],
                  },
                  key
                )
              : null
          ),
          _jsx('input', {
            type: 'text',
            name: 'bathroomAmenities.other',
            value: formData.bathroomAmenities.other,
            onChange: handleChange,
            placeholder: 'Other (Specify)',
            className: 'w-full p-2 border rounded mt-2',
          }),
        ],
      }),
    ],
  });
};
const NearbyAttractionsForm = ({ formType, handleInputChange }) => {
  const [attractions, setAttractions] = useState([]);
  const generateId = () => Math.random().toString(36).substr(2, 9);
  const defaultAttraction = {
    _key: generateId(), // _key is used for backend purposes only
    name: '',
    distance: '',
    beach: false,
    desert: false,
    parkReserve: false,
    lake: false,
    river: false,
    kayakingCanoeing: false,
    hikingTrails: false,
    bikingTrails: false,
  };
  useEffect(() => {
    setAttractions([{ ...defaultAttraction }]);
  }, [formType]);
  const addAttraction = () => {
    if (attractions.length < 10) {
      setAttractions([...attractions, { ...defaultAttraction, _key: generateId() }]);
    }
  };
  const removeAttraction = (index) => {
    const updatedAttractions = attractions.filter((_, i) => i !== index);
    setAttractions(updatedAttractions);
    handleInputChange('nearbyAttraction', updatedAttractions);
  };
  const handleChange = useCallback(
    (index, field, value) => {
      setAttractions((prevAttractions) => {
        const updatedAttractions = [...prevAttractions];
        updatedAttractions[index] = { ...updatedAttractions[index], [field]: value };
        handleInputChange('nearbyAttraction', updatedAttractions);
        return updatedAttractions;
      });
    },
    [handleInputChange]
  );
  return _jsxs('div', {
    className: 'p-4 border rounded-lg bg-white shadow-md my-4',
    children: [
      _jsx('h2', { className: 'font-semibold mb-4', children: 'Nearby Attractions (Optional)' }),
      attractions.map((attraction, index) =>
        _jsxs(
          'div',
          {
            className: 'border p-4 mb-4 rounded-lg bg-gray-100',
            children: [
              _jsxs('div', {
                className: 'flex items-center justify-between',
                children: [
                  _jsxs('h3', { className: 'text-lg font-medium', children: ['Attraction ', index + 1] }),
                  _jsx('button', {
                    type: 'button',
                    onClick: () => removeAttraction(index),
                    className: 'text-red-500 hover:text-red-700',
                    children: 'Remove',
                  }),
                ],
              }),
              _jsx('input', {
                type: 'text',
                placeholder: 'Enter name of the tourist attraction',
                value: attraction.name,
                onChange: (e) => handleChange(index, 'name', e.target.value),
                className: 'w-full mt-2 p-2 border rounded',
              }),
              _jsx('input', {
                type: 'text',
                placeholder: 'Distance (e.g., 5 km)',
                value: attraction.distance,
                onChange: (e) => handleChange(index, 'distance', e.target.value),
                className: 'w-full mt-2 p-2 border rounded',
              }),
              _jsx('div', {
                className: 'mt-2 grid grid-cols-2 gap-2',
                children: Object.keys(defaultAttraction)
                  .filter((key) => key !== '_key' && key !== 'name' && key !== 'distance')
                  .map((option) =>
                    _jsxs(
                      'label',
                      {
                        className: 'flex items-center space-x-2',
                        children: [
                          _jsx('input', {
                            type: 'checkbox',
                            checked: attraction[option] || false,
                            onChange: (e) => handleChange(index, option, e.target.checked),
                            className: 'w-4 h-4',
                          }),
                          _jsxs('span', {
                            children: [
                              option
                                .replace(/([A-Z])/g, ' $1') // Add spaces before capital letters
                                .replace(/^./, (str) => str.toUpperCase()),
                              ' ',
                            ],
                          }),
                        ],
                      },
                      option
                    )
                  ),
              }),
            ],
          },
          attraction._key
        )
      ),
      attractions.length < 10 &&
        _jsx('button', {
          type: 'button',
          onClick: addAttraction,
          className: 'mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600',
          children: 'Add Attraction',
        }),
    ],
  });
};
export default AccommodationForm;
