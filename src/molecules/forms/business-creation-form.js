import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import Button from '@/atoms/custom-button/button';
import Checkbox from '@/atoms/input-elements/checkbox';
import CustomInput from '@/atoms/input-elements/custom-input';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CustomSelect } from '@/atoms/input-elements/cutom-select';
import DateInput from '@/atoms/input-elements/date-input';
import Input from '@/atoms/input-elements/input';
import sanityClient from '@/sanityClient';
import { deepMerge } from '@/utils/common';
import { uploadImage } from '@api/index';
import { generateId } from '@utils/common';
const BusinessFormComponent = () => {
  const [formData, setFormData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {},
  });
  const onBusinessFormSubmit = async (data) => {
    try {
      // Display loader
      var newData = deepMerge(formData, data);
      var newData1 = {
        _type: 'businessType',
        _id: `drafts.${generateId()}`,
        ...newData,
      };
      await sanityClient.create(newData1);
      // document.querySelector('.scrollable-container')?.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setShowModal(true);
      }, 300); // Delay to allow scrolling to complete
      setFormData(null);
      // Notify success
    } catch (error) {
      // Handle errors
      console.error('Error submitting event:', error);
      alert('Failed to submit event. Please try again.');
    } finally {
      // Hide loader
      // setLoader(false);
    }
  };
  const handleInputChange = (field, value) => {
    // console.log('------- handleInputChange', field, value);
    setFormData((prev) => {
      const newData = JSON.parse(JSON.stringify(prev)); // Deep clone
      const keys = field.split('.'); // e.g. "priceRange.budget" -> ["priceRange", "budget"]
      let current = newData;
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          current[key] = value; // Set value at the final key
        } else {
          if (!current[key] || typeof current[key] !== 'object') {
            current[key] = {}; // Ensure nested object exists
          }
          current = current[key]; // Move deeper
        }
      });
      return newData; // Return a new object to trigger React re-render
    });
  };
  return _jsxs('div', {
    className: 'max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md',
    children: [
      _jsx('h2', { className: 'text-2xl font-bold mb-4 text-center', children: 'Create a Business' }),
      _jsxs('form', {
        onSubmit: handleSubmit(onBusinessFormSubmit),
        children: [
          _jsx('div', {
            children: _jsx(CustomInput, {
              ...register('businessName'),
              label: 'Business Name',
              placeholder: 'Business Name',
              error: errors.businessName,
            }),
          }),
          _jsx('div', {
            children: _jsx(CustomInput, {
              ...register('businessMotive'),
              label: 'Business Motive',
              placeholder: 'Business Motive',
              error: errors.businessMotive,
            }),
          }),
          _jsxs('div', {
            className: 'flex flex-col gap-2',
            children: [
              _jsx('label', { className: 'font-semibold mt-6', children: 'Business Address' }),
              _jsx(CustomInput, {
                ...register(`businessAddress.street`),
                // label={'Street Address'}
                placeholder: 'street',
                error: errors.businessAddress?.street,
              }),
              _jsx(CustomInput, {
                ...register(`businessAddress.city`),
                // label={'Town/City'}
                placeholder: 'Town/City',
                error: errors.businessAddress?.city,
              }),
              _jsx(CustomInput, {
                ...register(`businessAddress.region`),
                //   label={'Business Address'}
                placeholder: 'State/Region',
                error: errors.businessAddress?.region,
              }),
              _jsx(CustomInput, {
                ...register(`businessAddress.postalCode`),
                //   label={'Business Address'}
                placeholder: 'Postal Code (Optional)',
                error: errors.businessAddress?.postalCode,
                required: false,
              }),
              _jsx(CustomInput, {
                ...register(`businessAddress.country`),
                //   label={'Business Address'}
                placeholder: 'Country',
                error: errors.businessAddress?.country,
                required: false,
              }),
            ],
          }),
          _jsxs('div', {
            className: 'flex flex-col gap-2',
            children: [
              _jsx('label', { className: 'font-semibold mt-6', children: 'Contact Information' }),
              _jsx(CustomInput, {
                ...register('businessContactInformation.phoneNumber', { required: 'Phone number is required' }),
                placeholder: 'Phone Number (Primary contact number)',
                error: errors.businessContactInformation?.phoneNumber,
                type: 'number',
              }),
              _jsx(CustomInput, {
                ...register('businessContactInformation.email', { required: 'Email is required' }),
                placeholder: 'Email Address (For inquires and official correspondence)',
                error: errors.businessContactInformation?.email,
                type: 'email',
              }),
              _jsx(CustomInput, {
                ...register('businessContactInformation.website'),
                //   label={'Website (if applicable)'}
                placeholder: 'Website URL (Provide a link of your official website) Optional',
                error: errors.businessContactInformation?.website,
                type: 'url',
                required: false,
              }),
              _jsxs('div', {
                className: 'flex flex-col gap-2',
                children: [
                  _jsx('label', {
                    className: 'font-semibold',
                    children: 'Social Media Links(Add links to your social media profiles)',
                  }),
                  _jsx(CustomInput, {
                    ...register('businessContactInformation.socialMedia.facebook'),
                    placeholder: 'Facebook Profile',
                    error: errors?.businessContactInformation?.socialMedia?.facebook,
                    required: false,
                    type: 'url',
                  }),
                  _jsx(CustomInput, {
                    ...register('businessContactInformation.socialMedia.instagram'),
                    placeholder: 'Instagram Profile',
                    error: errors?.businessContactInformation?.socialMedia?.instagram,
                    required: false,
                    type: 'url',
                  }),
                  _jsx(CustomInput, {
                    ...register('businessContactInformation.socialMedia.linkedin'),
                    placeholder: 'Linkedin Profile',
                    // error={errors?.socialMedia?.linkedin}
                    required: false,
                    type: 'url',
                  }),
                  _jsx(CustomInput, {
                    ...register('businessContactInformation.socialMedia.twitter'),
                    placeholder: 'Twitter Profile',
                    error: errors?.businessContactInformation?.socialMedia?.twitter,
                    required: false,
                    type: 'url',
                  }),
                  _jsx(CustomInput, {
                    ...register('businessContactInformation.socialMedia.twitter'),
                    placeholder: 'Tiktok Profile',
                    error: errors?.businessContactInformation?.socialMedia?.twitter,
                    required: false,
                    type: 'url',
                  }),
                  _jsx('div', {
                    className: 'flex flex-col gap-2 mt-6 mb-6',
                    children: _jsx(CustomSelect, {
                      ...register('businessCategory', { required: 'Business Type is required' }),
                      placeholder: 'Business Type',
                      options: businessCategories,
                      label: 'Business Type',
                      error: errors.businessCategory,
                    }),
                  }),
                  _jsxs('div', {
                    className: 'flex flex-col gap-2',
                    children: [
                      _jsx('label', {
                        className: 'font-semibold mt-6',
                        children: 'Some More Details About The Type of Business:',
                      }),
                      _jsx('textarea', {
                        placeholder: '(E.g. Cosmetic Store, Juice Factory, Adventure Tour Company)',
                        ...register('businessmoreDetails', {
                          required: 'Full Description is required',
                          minLength: {
                            value: 30,
                            message: 'Details must be at least 100 characters',
                          },
                          maxLength: {
                            value: 100,
                            message: 'Full Description must not exceed 1000 characters',
                          },
                        }),
                        className:
                          'p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                        rows: 5,
                        onChange: (e) => setValue('businessmoreDetails', e.target.value),
                      }),
                      errors.businessmoreDetails &&
                        _jsx('p', { className: 'text-red-500 text-sm', children: errors.businessmoreDetails.message }),
                    ],
                  }),
                  _jsxs('div', {
                    className: 'flex flex-col gap-2',
                    children: [
                      _jsx('label', { className: 'font-semibold mt-6', children: 'Describe your Business:' }),
                      _jsx('textarea', {
                        placeholder:
                          '50 \u2013 500 words detailed description, including services, products, or specialties',
                        ...register('businessDescription', {
                          required: 'Full Description is required',
                          minLength: {
                            value: 50,
                            message: 'Full Description must be at least 500 characters',
                          },
                          maxLength: {
                            value: 500,
                            message: 'Full Description must not exceed 1000 characters',
                          },
                        }),
                        className:
                          'p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                        rows: 10,
                        onChange: (e) => setValue('businessDescription', e.target.value),
                      }),
                      errors.businessDescription &&
                        _jsx('p', { className: 'text-red-500 text-sm', children: errors.businessDescription.message }),
                    ],
                  }),
                  _jsxs('div', {
                    className: 'flex flex-col gap-2 mt-6',
                    children: [
                      _jsx('label', { className: 'font-semibold', children: 'Operating Hours' }),
                      ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) =>
                        _jsxs(
                          'div',
                          {
                            className: 'flex flex-col gap-2',
                            children: [
                              _jsx('label', {
                                className: 'font-medium',
                                children: day.charAt(0).toUpperCase() + day.slice(1),
                              }),
                              _jsxs('div', {
                                className: 'flex space-x-4',
                                children: [
                                  _jsx(Controller, {
                                    name: `operatingHours.${day}.start`,
                                    control: control,
                                    render: ({ field }) =>
                                      _jsx('input', {
                                        type: 'time',
                                        ...field,
                                        className: 'w-1/2 p-2 border rounded-md',
                                        required: true,
                                      }),
                                  }),
                                  _jsx('span', { className: 'text-xl', children: 'to' }),
                                  _jsx(Controller, {
                                    name: `operatingHours.${day}.end`,
                                    control: control,
                                    render: ({ field }) =>
                                      _jsx('input', {
                                        type: 'time',
                                        ...field,
                                        className: 'w-1/2 p-2 border rounded-md',
                                        required: true,
                                      }),
                                  }),
                                ],
                              }),
                              errors.operatingHours?.[day] &&
                                _jsx('span', {
                                  className: 'text-red-500 text-xs',
                                  children: 'Please provide valid times',
                                }),
                            ],
                          },
                          day
                        )
                      ),
                    ],
                  }),
                  _jsxs('div', {
                    className: 'flex flex-col gap-2 mt-6',
                    children: [
                      _jsx('label', {
                        className: 'font-semibold',
                        children: 'Payment Methods (Select all that apply)',
                      }),
                      [
                        { key: 'cash', label: 'Cash' },
                        { key: 'credit_debit_cards', label: 'Credit/Debit Cards' },
                        { key: 'digital_wallets', label: 'Digital Wallets (e.g., PayPal, Apple Pay)' },
                        { key: 'bank_transfers', label: 'Bank Transfers' },
                        { key: 'other', label: 'Other' },
                      ].map(({ key, label }) =>
                        _jsx(
                          Checkbox,
                          {
                            ...register(`paymentMethods.${key}`),
                            label: label,
                            onChange: (e) => handleInputChange(`paymentMethods.${key}`, e),
                          },
                          key
                        )
                      ),
                    ],
                  }),
                  _jsx(SingleImageUpload, {
                    fieldName: 'businessLogo',
                    title: 'Upload Your Business Logo (JPEG, PNG, or SVG files only)',
                    handleInputChange: handleInputChange,
                  }),
                  _jsxs('div', {
                    className: 'flex flex-col gap-2',
                    children: [
                      _jsx(CustomInput, {
                        ...register('ownerContactInformation.name'),
                        label: 'Owner/Manager Details (Fill in Details)',
                        placeholder: 'Full Name',
                        error: errors.ownerContactInformation?.name,
                      }),
                      _jsx(CustomInput, {
                        ...register(`ownerContactInformation.role`),
                        //   label={'Business Address'}
                        placeholder: 'Role (Owner/ Manager)',
                        error: errors.ownerContactInformation?.role,
                      }),
                      _jsx(CustomInput, {
                        ...register(`ownerContactInformation.phoneNumber`),
                        //   label={'Business Address'}
                        placeholder: 'Phone Number',
                        error: errors.ownerContactInformation?.phoneNumber,
                      }),
                      _jsx(CustomInput, {
                        ...register(`ownerContactInformation.email`),
                        //   label={'Business Address'}
                        placeholder: 'Email Address',
                        error: errors.ownerContactInformation?.email,
                        required: false,
                      }),
                      _jsx(SingleImageUpload, {
                        fieldName: 'ownerContactInformation.idPhoto',
                        title: 'Upload Passport/ID:',
                        handleInputChange: handleInputChange,
                      }),
                    ],
                  }),
                  _jsxs('div', {
                    className: 'flex flex-col gap-2',
                    children: [
                      _jsx('label', { className: 'font-semibold', children: 'Consent to Listing:' }),
                      _jsxs('label', {
                        className: 'flex items-center gap-2',
                        children: [
                          _jsx('input', {
                            type: 'checkbox',
                            ...register('consent', {
                              required: 'You must consent that all business details are accurate.',
                            }),
                            className: 'h-4 w-4 rounded border-gray-400',
                          }),
                          'I consent to my business information being listed in the Yellow Pages Directory.',
                        ],
                      }),
                      errors.consent &&
                        _jsx('span', { className: 'text-red-500 text-xs', children: errors.consent?.message }),
                    ],
                  }),
                  _jsxs('div', {
                    className: 'flex flex-col gap-2',
                    children: [
                      _jsx('label', { className: 'font-semibold', children: 'Accuracy Verification:' }),
                      _jsxs('label', {
                        className: 'flex items-center gap-2',
                        children: [
                          _jsx('input', {
                            type: 'checkbox',
                            ...register('confirmation', {
                              required: 'You must confirmation that all business details are accurate.',
                            }),
                            className: 'h-4 w-4 rounded border-gray-400',
                          }),
                          'I confirm that the information provided is accurate to the best of my knowledge.',
                        ],
                      }),
                      errors.confirmation &&
                        _jsx('span', { className: 'text-red-500 text-xs', children: errors.confirmation?.message }),
                    ],
                  }),
                  _jsx('label', { className: 'font-semibold mt-4', children: 'Signature' }),
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
                  _jsx(Button, { className: 'my-14 px-4', type: 'submit', children: 'Submit' }),
                ],
              }),
            ],
          }),
        ],
      }),
      showModal && _jsx(SubmissionModal, { onClose: () => setShowModal(false) }),
      ' ',
    ],
  });
};
export default BusinessFormComponent;
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
        _jsx('h2', { className: 'text-xl font-semibold mb-3', children: 'Thank You for Your Submission!' }),
        _jsx('hr', { className: 'border-orange-500 mb-3' }),
        _jsxs('p', {
          className: 'text-gray-700',
          children: [
            'Your information has been successfully submitted.',
            _jsx('br', {}),
            _jsx('br', {}),
            'Our team will review your business\u2019s details within ',
            _jsx('b', { children: '3\u20135 business days' }),
            '. Once approved, your Business will be listed on the ',
            _jsx('b', { children: 'Tribe Africa Pages directory' }),
            '. You will receive a confirmation email with a link to your live listing.',
            _jsx('br', {}),
            _jsx('br', {}),
            'If you have any questions or need assistance, feel free to reach out to us at ',
            _jsx('b', { children: 'support@tribeafrica.org' }),
            '.',
            _jsx('br', {}),
            _jsx('br', {}),
            'Thank you for choosing the Tribe Africa Pages to promote your business!',
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
const SingleImageUpload = ({ handleInputChange, fieldName, title }) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    // Reset image state when formType changes
    setImage(null);
    handleInputChange(fieldName, null);
  }, []);
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
      handleInputChange(fieldName, {
        _type: 'image',
        asset: { _ref: uploadedImage._id },
      });
    } catch (error) {
      console.error('Image upload error:', error);
      setImage(null);
      handleInputChange(fieldName, null);
    }
  };
  return _jsxs('div', {
    className: 'mt-6 mb-6',
    children: [
      _jsx('label', { className: 'font-semibold mr-4', children: title }),
      _jsx('input', { type: 'file', accept: 'image/*', onChange: handleFileChange }),
      image && _jsx('img', { src: image.preview, alt: 'Preview', className: 'w-20 h-20 object-cover mt-2' }),
    ],
  });
};
const businessCategories = [
  { value: 'accommodations', label: 'Accommodations' },
  { value: 'agriculture_industry', label: 'Agriculture & Industry' },
  { value: 'business_centers', label: 'Business Centers' },
  { value: 'food_drink_entertainment', label: 'Food, Drink & Entertainment' },
  { value: 'media_performing_arts', label: 'Media & Performing Arts' },
  { value: 'retail_wholesale_trade', label: 'Retail & Wholesale Trade' },
  { value: 'services', label: 'Services' },
  { value: 'talent_agency_services', label: 'Talent & Agency Services' },
  { value: 'wellness_beauty', label: 'Wellness & Beauty' },
];
