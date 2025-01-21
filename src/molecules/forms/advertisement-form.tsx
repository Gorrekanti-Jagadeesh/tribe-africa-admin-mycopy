import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { generateId } from '@utils/common';
import sanityClient from '../../sanityClient';
import { Loading } from '@/atoms/common/loading';
import Button from '@/atoms/custom-button/button';
import UnderlineHeading from '@/atoms/heading/underline-heading';

type FormData = {
  adType: string;
  item: string;
  position: string;
  days: number;
  email: string;
  phone: string;
};

const adTypes = [
  {
    title: 'Hotel',
    value: 'Hotel',
    items: [
      { title: 'Hotel 1', value: 'Hotel 1', id: 1 },
      { title: 'Hotel 2', value: 'Hotel 2', id: 2 },
      { title: 'Hotel 3', value: 'Hotel 3', id: 3 },
    ],
  },
  {
    title: 'Event',
    value: 'Event',
    items: [
      { title: 'Event 1', value: 'Event 1', id: 4 },
      { title: 'Event 2', value: 'Event 2', id: 5 },
      { title: 'Event 3', value: 'Event 3', id: 6 },
    ],
  },
  {
    title: 'Shop',
    value: 'Shop',
    items: [
      { title: 'Shop 1', value: 'Shop 1', id: 7 },
      { title: 'Shop 2', value: 'Shop 2', id: 8 },
      { title: 'Shop 3', value: 'Shop 3', id: 9 },
    ],
  },
];

const pages = [
  {
    title: 'Home Page ($20 per day)',
    value: 'Home Page',
  },
  {
    title: 'Business Page ($10 per day)',
    value: 'Busienss Page',
  },

  {
    title: 'Holiday Page ($10 per day)',
    value: 'Holiday Page',
  },
];

const AdvertisementForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const selectedAdType = watch('adType');
  const days = watch('days');
  const position = watch('position');
  const item = watch('item');
  const selectedAdTypeOption = adTypes.find((cat) => cat.value === selectedAdType);

  const [loader, setLoader] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // Handle image uploads
      setLoader(true);

      // Submit to Sanity
      await sanityClient.create({
        _type: 'advertisement', // Sanity schema type
        _id: `drafts.${generateId()}`, // Unique ID
        ...data,
        item: {
          _type: 'reference',
          _ref: 'bc54a813-1a22-4e2e-ba3e-c1754b22cb02', // Reference the document ID
        },
        amount: `$${getPrice()}`,
      });

      alert('Submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data. Please try again.');
    } finally {
      setLoader(false);
    }
  };

  const PRICE = 10;

  const getPrice = () => {
    return position === 'Home Page' ? 2 * PRICE * days : PRICE * days;
  };

  return (
    <div className="flex flex-col gap-2 bg-white overflow-auto p-4 rounded-lg">
      <UnderlineHeading borderWidth="w-1/2" className="text-2xl">
        Advertisement Enrollment Form
      </UnderlineHeading>
      <form onSubmit={handleSubmit(onSubmit)} className="min-h-[80vh]">
        {loader ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label>Advertisement Type</label>
                <select
                  {...register('adType', { required: 'Event Category is required' })}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Advertisement Type</option>
                  {adTypes.map((category) => (
                    <option key={category.title} value={category.value}>
                      {category.title}
                    </option>
                  ))}
                </select>
                {errors.adType && <span className="text-red-500">{errors.adType.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                {selectedAdTypeOption && (
                  <>
                    <label>All {selectedAdType}s</label>
                    <select
                      {...register('item', { required: 'Event Type is required' })}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="">Select Event Sub Cartegory</option>
                      {selectedAdTypeOption.items.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.title}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                {errors.item && selectedAdTypeOption && <span className="text-red-500">{errors.item.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label>Placement of Advertisement</label>
                <select
                  {...register('position', { required: 'Event Category is required' })}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Advertisement Placement which suits you</option>
                  {pages.map((category) => (
                    <option key={category.title} value={category.value}>
                      {category.title}
                    </option>
                  ))}
                </select>
                {errors.adType && <span className="text-red-500">{errors.adType.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label>Specify how many days the Advertisement should be active</label>
                <input
                  {...register('days', { required: 'Event Category is required' })}
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter Active Days"
                />
                {days && (
                  <span className="text-gray-500 text-sm">
                    Your Advertisement will Expire after {days == 1 ? '1 day' : `${days} days`}
                  </span>
                )}
                {errors.adType && <span className="text-red-500">{errors.adType.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label>Total Amount {'($)'}</label>
                <input
                  type="text"
                  value={`$${getPrice()}`}
                  className="w-full p-2 border border-gray-300 rounded text-gray-500 cursor-not-allowed"
                  disabled
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
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label>Contact Number</label>
                <input
                  {...register('phone', { required: 'Contact Number is required' })}
                  type="tel"
                  placeholder="Contact Number"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
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

export default AdvertisementForm;
