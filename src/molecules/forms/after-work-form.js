import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Checkbox from '@/atoms/input-elements/checkbox';
import Button from '@/atoms/custom-button/button';
import CustomInput from '@/atoms/input-elements/custom-input';
import { afterWorkBusinessType, afterWorkRestaurantsType } from '@/data';
import { CustomSelect } from '@/atoms/input-elements/cutom-select';
import { sanity } from '@/utils/sanity';
import { useQuery } from '@tanstack/react-query';
import { uploadImage } from '@api/index';
import sanityClient from '@/sanityClient';
import { generateId } from '@utils/common';
import { deepMerge } from '@/utils/common';
const AfterWorkFrom = () => {
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
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  // useEffect(() => {
  //   reset();
  //   setFormData({});
  // }, [formType]);
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
  const typeOfBusiness = watch('businessType');
  const { data, error, isLoading } = useQuery({
    queryKey: ['after-work-form'],
    queryFn: () => sanity.GET(`*[_type == "afterWorkListing"]`),
  });
  const onAfterFormSubmit = async (data) => {
    try {
      // Display loader
      var newData = deepMerge(data, formData);
      var newData1 = {
        _type: 'afterWorkListing',
        _id: `drafts.${generateId()}`,
        ...newData,
      };
      await sanityClient.create(newData1);
      console.log('-------Final Data', newData);
      document.querySelector('.scrollable-container')?.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setShowModal(true);
      }, 300); // Delay to allow scrolling to complete
      setFormData({});
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
  return _jsxs('div', {
    className: 'max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md',
    children: [
      _jsx('h2', { className: 'text-2xl font-bold mb-4 text-center', children: 'After Work Registration Form' }),
      _jsxs('form', {
        onSubmit: handleSubmit(onAfterFormSubmit),
        children: [
          _jsx('div', {
            children: _jsx(CustomInput, {
              ...register('businessDetails.businessName'),
              label: 'Business Name',
              placeholder: 'Business Name',
            }),
          }),
          _jsxs('div', {
            className: 'flex flex-col gap-2',
            children: [
              _jsx('label', { className: 'font-semibold mt-6', children: 'Business Address' }),
              _jsx(CustomInput, {
                ...register(`businessDetails.address.street`),
                // label={'Street Address'}
                placeholder: 'street',
              }),
              _jsx(CustomInput, {
                ...register(`businessDetails.address.city`),
                // label={'Town/City'}
                placeholder: 'Town/City',
              }),
              _jsx(CustomInput, {
                ...register(`businessDetails.address.region`),
                //   label={'Business Address'}
                placeholder: 'State/Region',
              }),
              _jsx(CustomInput, {
                ...register(`businessDetails.address.postalCode`),
                //   label={'Business Address'}
                placeholder: 'Postal Code (Optional)',
                // error={errors.businessAddress?.postalCode}
                required: false,
              }),
              _jsx(CustomInput, {
                ...register(`businessDetails.address.country`),
                //   label={'Business Address'}
                placeholder: 'Country',
                // error={errors.businessAddress?.postalCode}
                required: false,
              }),
            ],
          }),
          _jsxs('div', {
            className: 'flex flex-col gap-2',
            children: [
              _jsx('label', { className: 'font-semibold mt-6', children: 'Contact Information' }),
              _jsx(CustomInput, {
                ...register('businessContact.phoneNumber', { required: 'Phone number is required' }),
                placeholder: 'Phone Number (Primary contact number)',
                error: errors.businessContact?.phoneNumber,
                type: 'number',
              }),
              _jsx(CustomInput, {
                ...register('businessContact.email', { required: 'Email is required' }),
                placeholder: 'Email Address (For inquires and official correspondence)',
                error: errors.businessContact?.email,
                type: 'email',
              }),
              _jsx(CustomInput, {
                ...register('businessContact.website'),
                //   label={'Website (if applicable)'}
                placeholder: 'Website URL (Provide a link of your official website) Optional',
                error: errors.businessContact?.website,
                type: 'url',
                required: false,
              }),
            ],
          }),
          _jsxs('div', {
            className: 'flex flex-col gap-2',
            children: [
              _jsx('label', {
                className: 'font-semibold',
                children: 'Social Media Links(Add links to your social media profiles)',
              }),
              _jsx(CustomInput, {
                ...register('businessContact.socialMedia.facebook'),
                placeholder: 'Facebook Profile',
                // error={errors?.socialMedia?.facebook}
                required: false,
                type: 'url',
              }),
              _jsx(CustomInput, {
                ...register('businessContact.socialMedia.instagram'),
                placeholder: 'Instagram Profile',
                // error={errors?.socialMedia?.instagram}
                required: false,
                type: 'url',
              }),
              _jsx(CustomInput, {
                ...register('businessContact.socialMedia.linkedin'),
                placeholder: 'Linkedin Profile',
                // error={errors?.socialMedia?.linkedin}
                required: false,
                type: 'url',
              }),
              _jsx(CustomInput, {
                ...register('businessContact.socialMedia.twitter'),
                placeholder: 'Twitter Profile',
                // error={errors?.socialMedia?.twitter}
                required: false,
                type: 'url',
              }),
              _jsx(CustomInput, {
                ...register('businessContact.socialMedia.twitter'),
                placeholder: 'Tiktok Profile',
                // error={errors?.socialMedia?.twitter}
                required: false,
                type: 'url',
              }),
            ],
          }),
          _jsx('div', {
            className: 'flex flex-col gap-2 mt-6 mb-6',
            children: _jsx(CustomSelect, {
              ...register('businessType', { required: 'Business Type is required' }),
              placeholder: 'Business Type',
              options: afterWorkBusinessType,
              label: 'Business Type',
              error: errors.businessType,
            }),
          }),
          typeOfBusiness === 'restaurantseateries' &&
            _jsx('div', {
              className: 'flex flex-col gap-2 mb-6',
              children: _jsx(CustomSelect, {
                ...register('restaurantSubCategory', { required: 'Restaurants Sub Category is required' }),
                placeholder: 'Restaurants Sub Category',
                options: afterWorkRestaurantsType,
                label: 'Restaurants Sub Category',
                error: errors.restaurantSubCategory,
              }),
            }),
          _jsxs('div', {
            className: 'flex flex-col gap-2',
            children: [
              _jsx('label', { className: 'font-semibold', children: 'Cuisine Type (For venues that serve food)' }),
              [
                { key: 'african', label: 'African (Specify type/Region)' },
                { key: 'italian', label: 'Italian' },
                { key: 'chinese', label: 'Chinese' },
                { key: 'indian', label: 'Indian' },
                { key: 'mexican', label: 'Mexican' },
                { key: 'vegan_vegetarian', label: 'Vegan/Vegetarian' },
                { key: 'seafood', label: 'Seafood' },
                { key: 'other', label: 'Other' },
              ].map(({ key, label }) =>
                _jsx(
                  Checkbox,
                  {
                    ...register(`cuisineType.${key}`),
                    label: label,
                    onChange: (e) => handleInputChange(`cuisineType.${key}`, e),
                  },
                  key
                )
              ),
            ],
          }),
          _jsxs('div', {
            className: 'flex flex-col gap-2 mt-6',
            children: [
              _jsx('label', { className: 'font-semibold', children: 'Key Features (Select all that apply)' }),
              [
                { key: 'halal', label: 'Halal' },
                { key: 'kosher', label: 'Kosher' },
                { key: 'noAlcoholServed', label: 'No Alcohol Served' },
                { key: 'petFriendly', label: 'Pet Friendly' },
                { key: 'danceFloors', label: 'Dance Floors' },
                { key: 'liveMusic', label: 'Live Music' },
                { key: 'karaoke', label: 'Karaoke' },
                { key: 'triviaNights', label: 'Trivia Nights' },
                { key: 'comedyShows', label: 'Comedy Shows' },
                { key: 'djNightlife', label: 'DJ Nightlife' },
                { key: 'outdoorSeating', label: 'Outdoor Seating' },
                { key: 'happyHourSpecials', label: 'Happy Hour Specials' },
                { key: 'privateEvents', label: 'Available For Private Events' },
                { key: 'corporateEvents', label: 'Available For Corporate Events' },
                { key: 'familyFriendly', label: 'Family Friendly' },
                { key: 'themedNights', label: 'Themed Nights' },
                { key: 'seasonalHolidaySpecials', label: 'Seasonal or Holiday Specials' },
                { key: 'weeklySpecials', label: 'Weekly Specials' },
                { key: 'birthdayEventPackages', label: 'Birthday/Event Packages' },
                { key: 'liveStreamingOnline', label: 'Live Streaming/Online Events' },
                { key: 'sportsViewing', label: 'Sports Viewing' },
                { key: 'salahRoomArea', label: 'Salah Room/area (Muslim prayer area)' },
                { key: 'other', label: 'Other' },
              ].map(({ key, label }) =>
                _jsx(
                  Checkbox,
                  {
                    ...register(`keyFeatures.${key}`),
                    label: label,
                    onChange: (e) => handleInputChange(`keyFeatures.${key}`, e),
                  },
                  key
                )
              ),
            ],
          }),
          _jsx('div', {
            className: 'flex flex-col gap-2 mt-6',
            children: _jsx(CustomInput, {
              ...register('indoorSeatingCapacity'),
              label: 'Indoor Seating Capacity: (Fill in Details)',
              placeholder: 'Indoor Seating Capacity',
              error: errors.indoorSeatingCapacity,
            }),
          }),
          _jsx('div', {
            className: 'flex flex-col gap-2',
            children: _jsx(CustomInput, {
              ...register('outdoorSeatingCapacity'),
              label: 'Outdoor Seating Capacity: (Fill in Details)',
              placeholder: 'Outdoor Seating Capacity',
              error: errors.outdoorSeatingCapacity,
            }),
          }),
          _jsxs('div', {
            className: 'flex flex-col gap-2',
            children: [
              _jsx('label', { className: 'font-semibold mt-6', children: 'Menu/Services/Atmosphere Highlights:' }),
              _jsx('textarea', {
                placeholder: '30 words max. Highlight your signature dishes, cocktails, views, or services',
                ...register('menuServicesAtmosphereHighlights', {
                  minLength: {
                    value: 10,
                    message: 'Description must be at least 10 characters',
                  },
                  maxLength: {
                    value: 100,
                    message: 'Description must not exceed 100 characters',
                  },
                }),
                className: 'p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                rows: 4,
                onChange: (e) => setValue('menuServicesAtmosphereHighlights', e.target.value),
              }),
              errors.menuServicesAtmosphereHighlights &&
                _jsx('p', {
                  className: 'text-red-500 text-sm',
                  children: errors.menuServicesAtmosphereHighlights.message,
                }),
            ],
          }),
          _jsxs('div', {
            className: 'flex flex-col gap-2',
            children: [
              _jsx('label', { className: 'font-semibold mt-6', children: 'Full Description:' }),
              _jsx('textarea', {
                placeholder:
                  '100 - 500 words \u2013 detailed description including ambiance, offerings, and specialties',
                ...register('fullDescription', {
                  required: 'Full Description is required',
                  minLength: {
                    value: 500,
                    message: 'Full Description must be at least 500 characters',
                  },
                  maxLength: {
                    value: 1000,
                    message: 'Full Description must not exceed 1000 characters',
                  },
                }),
                className: 'p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                rows: 10,
                onChange: (e) => setValue('fullDescription', e.target.value),
              }),
              errors.fullDescription &&
                _jsx('p', { className: 'text-red-500 text-sm', children: errors.fullDescription.message }),
            ],
          }),
          _jsx(SingleImageUpload, {
            fieldName: 'uploadMenu',
            title: 'Upload Menu',
            handleInputChange: handleInputChange,
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
                      _jsx('label', { className: 'font-medium', children: day.charAt(0).toUpperCase() + day.slice(1) }),
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
                        _jsx('span', { className: 'text-red-500 text-xs', children: 'Please provide valid times' }),
                    ],
                  },
                  day
                )
              ),
            ],
          }),
          _jsx('div', {
            className: 'flex flex-col gap-2 mt-6',
            children: _jsx(CustomInput, {
              ...register('ageRestriction'),
              label: 'Age Restrictions(if any):',
              placeholder: 'Age Restrictions',
              error: errors.ageRestriction,
            }),
          }),
          _jsx(SingleImageUpload, {
            fieldName: 'businessLogo',
            title: 'Upload Business Logo:',
            handleInputChange: handleInputChange,
          }),
          _jsx(MultipleImageUpload, {
            fieldName: 'businessPhotos',
            title: 'Upload Photos of Business and Offerings:',
            handleInputChange: handleInputChange,
          }),
          _jsxs('div', {
            className: 'flex flex-col gap-2',
            children: [
              _jsx(CustomInput, {
                ...register('ownerContactDetails.name'),
                label: 'Owner/Manager Details (Fill in Details)',
                placeholder: 'Full Name',
                error: errors.ownerContactDetails?.name,
              }),
              _jsx(CustomInput, {
                ...register(`ownerContactDetails.role`),
                //   label={'Business Address'}
                placeholder: 'Role (Owner/ Manager)',
                error: errors.ownerContactDetails?.role,
              }),
              _jsx(CustomInput, {
                ...register(`ownerContactDetails.phoneNumber`),
                //   label={'Business Address'}
                placeholder: 'Phone Number',
                error: errors.ownerContactDetails?.phoneNumber,
              }),
              _jsx(CustomInput, {
                ...register(`ownerContactDetails.email`),
                //   label={'Business Address'}
                placeholder: 'Email Address',
                error: errors.ownerContactDetails?.email,
                required: false,
              }),
              _jsx(CustomInput, {
                ...register(`ownerContactDetails.emergencyContact`),
                //   label={'Business Address'}
                placeholder: 'Emergency Contact (Optional):',
                error: errors.ownerContactDetails?.emergencyContact,
              }),
              _jsx(SingleImageUpload, {
                fieldName: 'ownerContactDetails.ownerIdPhoto',
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
                  'I consent to my business information being listed in the Tribe Africa Pages Directory.',
                ],
              }),
              errors.consent && _jsx('span', { className: 'text-red-500 text-xs', children: errors.consent?.message }),
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
          _jsx(Button, { className: 'my-14 px-4', type: 'submit', children: 'Submit' }),
        ],
      }),
      showModal && _jsx(SubmissionModal, { onClose: () => setShowModal(false) }),
      ' ',
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
        _jsx('h2', {
          className: 'text-xl font-semibold mb-3',
          children: 'Thank You for Joining the Tribe Africa Community!',
        }),
        _jsx('hr', { className: 'border-orange-500 mb-3' }),
        _jsxs('p', {
          className: 'text-gray-700',
          children: [
            'Your business listing has been successfully submitted. We\u2019re thrilled to have you as part of our growing network of incredible venues and experiences across Africa.',
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
            'Thank you for choosing Tribe Africa to showcase your business. Together, let\u2019s make Africa a go-to destination for memorable experiences!',
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
const MultipleImageUpload = ({ handleInputChange, fieldName, title }) => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    // Reset images when formType changes
    setImages([]);
    handleInputChange(fieldName, []);
  }, []);
  const handleFileChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    try {
      const uploadedImages = await Promise.all(files.map((file) => uploadImage(file))); // Upload all images
      const validImages = uploadedImages
        .filter((img) => img?._id)
        .map((img, index) => ({
          preview: previews[index],
          _id: img._id, // Sanity Image _id
          _key: generateId(), // Unique key for Sanity
        }));
      setImages((prev) => [...prev, ...validImages]);
      handleInputChange(
        fieldName,
        validImages.map((img) => ({
          _key: img._key, // Unique key for Sanity
          _type: 'image',
          asset: { _ref: img._id },
        }))
      );
    } catch (error) {
      console.error('Image upload error:', error);
    }
  };
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    handleInputChange(
      fieldName,
      updatedImages.map((img) => ({
        _key: img._key, // Retain the unique key
        _type: 'image',
        asset: { _ref: img._id },
      }))
    );
  };
  return _jsxs('div', {
    className: 'mt-6 mb-6',
    children: [
      _jsx('label', { className: 'font-semibold mr-4', children: title }),
      _jsx('input', { type: 'file', accept: 'image/*', multiple: true, onChange: handleFileChange }),
      _jsx('div', {
        className: 'mt-2 flex gap-2 flex-wrap',
        children: images.map((image, index) =>
          _jsxs(
            'div',
            {
              className: 'relative',
              children: [
                _jsx('img', { src: image.preview, alt: 'Preview', className: 'w-20 h-20 object-cover rounded' }),
                _jsx('button', {
                  type: 'button',
                  className: 'absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1',
                  onClick: () => removeImage(index),
                  children: '\u2715',
                }),
              ],
            },
            image._key
          )
        ),
      }),
    ],
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
export default AfterWorkFrom;
