import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { generateId } from '@utils/common';
import sanityClient from '../../sanityClient';
import { Loading } from '@/atoms/common/loading';
import Button from '@/atoms/custom-button/button';
import UnderlineHeading from '@/atoms/heading/underline-heading';
import Cookies from 'js-cookie';
import { getUserEnrollments, sanity } from '@/utils/sanity';
import { africanCountriesPhoneCodes, Countries } from '@/data';
import Select from 'react-select';
import { CustomSelect } from '@/atoms/input-elements/cutom-select';
import CustomInput from '@/atoms/input-elements/custom-input';
import MobileNumberInput from '@/atoms/input-elements/contact-custom-input';
const AdvertisementForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const email = JSON.parse(Cookies.get('emailUser') || '{}').email;
  const [allData, setAllData] = useState([[], [], []]);
  const [loader, setLoader] = useState(false);
  const PRICE = 10;
  const POSITION_MULTIPLIER = {
    'Position 1': 5,
    'Position 2': 4,
    'Position 3': 3,
    'Position 4': 2,
    'Position 5': 1,
  };
  const adTypes = [
    {
      label: 'Hotel',
      value: 'Hotel',
      items: allData[0],
    },
    {
      label: 'Event',
      value: 'Event',
      items: allData[1],
    },
    {
      label: 'Business',
      value: 'Business',
      items: allData[2],
    },
  ];
  const pages = [
    {
      label: 'Home Page ($20 per day)',
      value: 'Home Page',
    },
    {
      label: 'Business Page ($10 per day)',
      value: 'Business Page',
    },
    {
      label: 'Holiday Page ($10 per day)',
      value: 'Holiday Page',
    },
  ];
  const positions = [
    { label: 'Position 1', value: 'Position 1' },
    { label: 'Position 2', value: 'Position 2' },
    { label: 'Position 3', value: 'Position 3' },
    { label: 'Position 4', value: 'Position 4' },
    { label: 'Position 5', value: 'Position 5' },
  ];
  const selectedAdType = watch('adType');
  const days = watch('days');
  const page = watch('page');
  const position = watch('position');
  const countries = watch('countries');
  const selectedAdTypeOption = adTypes.find((cat) => cat.value === selectedAdType);
  const onSubmit = async (data) => {
    try {
      // Handle image uploads
      if (selectedAdTypeOption.items.length === 0) {
        alert(`Please Complete your enrolment in ${selectedAdType} for Advertising!`);
        return;
      }
      setLoader(true);
      // Submit to Sanity
      await sanityClient.create({
        _type: 'advertisement', // Sanity schema type
        _id: `drafts.${generateId()}`, // Unique ID
        ...data,
        countries: data.countries.map((country) => country.value), // Extracting only values
        item: {
          _type: 'reference',
          _ref: data.item, // Reference the document ID
        },
        amount: `$${getPrice()}`,
        status: 'Pending',
      });
      alert('Submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data. Please try again.');
    } finally {
      setLoader(false);
    }
  };
  const getPrice = () => {
    const positionPay = POSITION_MULTIPLIER[position] || 1; // Default to 1 if not found
    if (!position || !positionPay || !countries) {
      return 0;
    }
    return page === 'Home Page'
      ? 2 * PRICE * days * countries.length + positionPay
      : PRICE * days * countries.length + positionPay;
  };
  const getUserListings = async () => {
    const hotels = await getUserEnrollments('accommodation', email);
    const events = await getUserEnrollments('event', email);
    const businesses = await sanity.GET(
      `*[_type == "findABusiness" && businessContactInformation.email == "${email}"]`
    );
    const allHotelData = hotels.map((each) => ({ title: each.name, value: each._id }));
    const allEventsData = events.map((each) => ({ title: each.title, value: each._id }));
    const allBusinessesData = businesses.map((each) => ({ title: each.businessName, value: each._id }));
    setAllData([allHotelData, allEventsData, allBusinessesData]);
  };
  console.log(allData, 'ppp', email);
  useEffect(() => {
    getUserListings();
  }, []);
  return _jsxs('div', {
    className: 'flex flex-col gap-2 bg-white overflow-auto p-4 rounded-lg',
    children: [
      _jsx(UnderlineHeading, {
        borderWidth: 'w-1/2',
        className: 'text-2xl',
        children: 'Advertisement Submission Form',
      }),
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
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsx(CustomSelect, {
                          ...register('adType', { required: 'Advertisement type is required' }),
                          placeholder: 'Select Advertisement Type',
                          options: adTypes,
                          label: 'Advertisement Type',
                          error: errors.adType,
                        }),
                        selectedAdTypeOption &&
                          selectedAdTypeOption.items.length === 0 &&
                          _jsxs('span', {
                            className: 'text-red-500',
                            children: [
                              "You don't have any ",
                              selectedAdType,
                              ' enlistments. Please enroll',
                              ' ',
                              _jsx('span', { className: 'underline', children: 'here' }),
                            ],
                          }),
                      ],
                    }),
                    selectedAdTypeOption &&
                      selectedAdTypeOption.items.length !== 0 &&
                      _jsxs('div', {
                        className: 'flex flex-col gap-2',
                        children: [
                          _jsxs(_Fragment, {
                            children: [
                              _jsxs('label', {
                                className: 'font-semibold',
                                children: [
                                  'All ',
                                  selectedAdType,
                                  's',
                                  _jsx('span', { className: 'text-red-500 text-sm', children: '*' }),
                                ],
                              }),
                              _jsxs('select', {
                                ...register('item', { required: 'Event Type is required' }),
                                className: `p-2 text-sm block w-1/2 h-10 bg-transparent border outline-none rounded-md focus:border-orange-500
          ${errors.item ? 'border-red-500' : 'border-gray-400'}`,
                                children: [
                                  _jsxs('option', { value: '', children: ['Select Your ', selectedAdType] }),
                                  selectedAdTypeOption.items.map((type) =>
                                    _jsx('option', { value: type.value, children: type.title }, type.value)
                                  ),
                                ],
                              }),
                            ],
                          }),
                          errors.item &&
                            selectedAdTypeOption &&
                            _jsx('span', { className: 'text-red-500', children: errors.item.message }),
                        ],
                      }),
                    _jsx('div', {
                      className: 'flex flex-col gap-2',
                      children: _jsx(CustomSelect, {
                        ...register('page', { required: 'Page of advertisement is required' }),
                        placeholder: 'Select Advertisement Page which suits you',
                        options: pages,
                        label: 'Page of Advertisement',
                        error: errors.page,
                      }),
                    }),
                    _jsx('div', {
                      className: 'flex flex-col gap-2',
                      children: _jsx(CustomSelect, {
                        ...register('position', { required: 'Position of advertisement is required' }),
                        placeholder: 'Select Advertisement Placement which suits you',
                        options: positions,
                        label: 'Placement of Advertisement',
                        error: errors.position,
                      }),
                    }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsxs('label', {
                          className: 'font-semibold',
                          children: ['Countries ', _jsx('span', { className: 'text-red-500 text-sm', children: '*' })],
                        }),
                        _jsx(Controller, {
                          name: 'countries',
                          control: control,
                          rules: { required: 'Please select at least one country' },
                          render: ({ field }) =>
                            _jsx(Select, {
                              options: Countries,
                              ...register('countries', { required: 'Event Category is required' }),
                              isMulti: true,
                              className: 'w-1/2',
                              onChange: (selectedOptions) => field.onChange(selectedOptions),
                            }),
                        }),
                        errors.countries &&
                          _jsx('span', { className: 'text-red-500', children: errors.countries.message }),
                      ],
                    }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsx(CustomInput, {
                          ...register('days', { required: 'Advertisement Active Days is required' }),
                          placeholder: 'Enter Active Days',
                          label: 'Specify how many days the Advertisement should be active',
                          error: errors.days,
                        }),
                        days &&
                          _jsxs('span', {
                            className: 'text-gray-500 text-sm',
                            children: ['Your Advertisement will Expire after ', days == 1 ? '1 day' : `${days} days`],
                          }),
                      ],
                    }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsxs('label', { className: 'font-semibold', children: ['Total Amount ', '($)'] }),
                        _jsx('input', {
                          type: 'text',
                          value: `$${getPrice()}`,
                          className: 'w-1/2 p-2 border border-gray-300 rounded text-gray-500 cursor-not-allowed',
                          disabled: true,
                        }),
                      ],
                    }),
                    _jsx('div', {
                      className: 'flex flex-col gap-2',
                      children: _jsx(CustomInput, {
                        ...register('email', { required: 'Email is required' }),
                        label: 'Email',
                        placeholder: 'Enter Email Address',
                        error: errors.email,
                      }),
                    }),
                    _jsxs('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        _jsx(MobileNumberInput, {
                          register: register,
                          errors: [errors.countryCode, errors.phone],
                          countryCodes: africanCountriesPhoneCodes,
                          label: 'Contact Number for Enquiry',
                        }),
                        errors.phone && _jsx('span', { className: 'text-red-500', children: errors.phone.message }),
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
export default AdvertisementForm;
