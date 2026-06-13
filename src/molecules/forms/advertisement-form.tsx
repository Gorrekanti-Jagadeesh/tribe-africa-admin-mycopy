import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { generateId } from '@utils/common';
import sanityClient from '../../sanityClient';
import { Loading } from '@/atoms/common/loading';
import Button from '@/atoms/custom-button/button';
import UnderlineHeading from '@/atoms/heading/underline-heading';
import Cookies from 'js-cookie';
import { sanity } from '@/utils/sanity';
import { africanCountriesPhoneCodes, Countries } from '@/data';
import Select from 'react-select';
import { Option } from '@/types';
import { CustomSelect } from '@/atoms/input-elements/cutom-select';
import CustomInput from '@/atoms/input-elements/custom-input';
import MobileNumberInput from '@/atoms/input-elements/contact-custom-input';

type FormData = {
  adType: string;
  item: string;
  page: string;
  position: string;
  days: number;
  email: string;
  countryCode: string;
  phone: string;
  countries: { label: string; value: string }[];
  userId: string;
};

const AdvertisementForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const userCookie = Cookies.get('emailUser') || Cookies.get('googleUser');
  const userId = userCookie ? JSON.parse(userCookie).uid : '';

  const [allData, setAllData] = useState([[], [], []]);
  const [loader, setLoader] = useState<boolean>(false);

  const PRICE = 10;

  const POSITION_MULTIPLIER = {
    'Position 1': 5,
    'Position 2': 4,
    'Position 3': 3,
    'Position 4': 2,
    'Position 5': 1,
  };

  const adTypes = [
    { label: 'Hotel', value: 'Hotel', items: allData[0] },
    { label: 'Event', value: 'Event', items: allData[1] },
    { label: 'Business', value: 'Business', items: allData[2] },
  ];

  const pages = [
    { label: 'Home Page ($20 per day)', value: 'Home Page' },
    { label: 'Business Page ($10 per day)', value: 'Business Page' },
    { label: 'Holiday Page ($10 per day)', value: 'Holiday Page' },
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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (selectedAdTypeOption.items.length === 0) {
        alert(`Please Complete your enrolment in ${selectedAdType} for Advertising!`);
        return;
      }
      setLoader(true);
      await sanityClient.create({
        _type: 'advertisement',
        _id: `drafts.${generateId()}`,
        ...data,
        userId: userId,
        countries: data.countries.map((country) => country.value),
        item: {
          _type: 'reference',
          _ref: data.item,
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
    const positionPay = POSITION_MULTIPLIER[position] || 1;
    if (!position || !positionPay || !countries) return 0;
    return page === 'Home Page'
      ? 2 * PRICE * days * countries.length + positionPay
      : PRICE * days * countries.length + positionPay;
  };

  const getUserListings = async () => {
    if (!userId) {
      console.warn('No userId found in cookie');
      return;
    }

    try {
      const [hotels, events, businesses] = await Promise.all([
        sanity.GET(`*[_type == "accomodationList" && userId == "${userId}"]`),
        sanity.GET(`*[_type == "event" && userId == "${userId}"]`),
        sanity.GET(`*[_type == "findABusiness" && userId == "${userId}"]`),
      ]);

      console.log('hotels:', hotels, 'events:', events, 'businesses:', businesses);

      const allHotelData = hotels.map((each) => ({ title: each.name, value: each._id }));
      const allEventsData = events.map((each) => ({ title: each.title, value: each._id }));
      const allBusinessesData = businesses.map((each) => ({ title: each.businessName, value: each._id }));

      setAllData([allHotelData, allEventsData, allBusinessesData]);
    } catch (error) {
      console.error('Error fetching user listings:', error);
    }
  };

  useEffect(() => {
    getUserListings();
  }, []);

  return (
    // <div className="bg-white p-8 rounded-lg text-center">
    //   <h2 className="text-3xl font-bold text-gray-800 mb-4">
    //     Advertisement Submissions Temporarily Unavailable
    //   </h2>

    //   <p className="text-gray-600">
    //     We are currently updating our advertising platform.
    //     Please check back later.
    //   </p>
    // </div>

    <div className="flex flex-col gap-2 bg-white overflow-auto p-4 rounded-lg">
      <UnderlineHeading borderWidth="w-1/2" className="text-2xl">
        Advertisement Submission Form
      </UnderlineHeading>
      <form onSubmit={handleSubmit(onSubmit)} className="min-h-[80vh] cursor-pointer">
        {loader ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <CustomSelect
                  {...register('adType', { required: 'Advertisement type is required' })}
                  placeholder="Select Advertisement Type"
                  options={adTypes}
                  label="Advertisement Type"
                  error={errors.adType}
                />

                {/* {selectedAdTypeOption && selectedAdTypeOption.items.length === 0 && (
                  <span className="text-red-500">
                    You don't have any {selectedAdType} enlistments. Please enroll{' '}
                    <span className="underline">here</span>
                  </span>
                )} */}
              </div>

              {selectedAdTypeOption && selectedAdTypeOption.items.length !== 0 && (
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">
                    All {selectedAdType}s<span className="text-red-500 text-sm">*</span>
                  </label>
                  <select
                    {...register('item', { required: 'Item is required' })}
                    className={`p-2 text-sm block w-full h-10 bg-transparent border outline-none rounded-md focus:border-brand-orange cursor-pointer
                      ${errors.item ? 'border-red-500' : 'border-gray-400'}`}
                  >
                    <option value="">Select Your {selectedAdType}</option>
                    {selectedAdTypeOption.items.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.title}
                      </option>
                    ))}
                  </select>
                  {errors.item && <span className="text-red-500">{errors.item.message}</span>}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <CustomSelect
                  {...register('page', { required: 'Page of advertisement is required' })}
                  placeholder="Select Advertisement Page which suits you"
                  options={pages}
                  label="Page of Advertisement"
                  error={errors.page}
                />
              </div>

              <div className="flex flex-col gap-2">
                <CustomSelect
                  {...register('position', { required: 'Position of advertisement is required' })}
                  placeholder="Select Advertisement Placement which suits you"
                  options={positions}
                  label="Placement of Advertisement"
                  error={errors.position}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold">
                  Countries <span className="text-red-500 text-sm">*</span>
                </label>
                <Controller
                  name="countries"
                  control={control}
                  rules={{ required: 'Please select at least one country' }}
                  render={({ field }) => (
                    <Select<Option, true>
                      options={Countries}
                      isMulti
                      className="w-full"
                      onChange={(selectedOptions) => field.onChange(selectedOptions)}
                    />
                  )}
                />
                {errors.countries && <span className="text-red-500">{errors.countries.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <CustomInput
                  {...register('days', { required: 'Advertisement Active Days is required' })}
                  placeholder="Enter Active Days"
                  label="Specify how many days the Advertisement should be active"
                  error={errors.days}
                />
                {days && (
                  <span className="text-gray-500 text-sm">
                    Your Advertisement will Expire after {days == 1 ? '1 day' : `${days} days`}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold">Total Amount {'($)'}</label>
                <input
                  type="text"
                  value={`$${getPrice()}`}
                  className="w-full p-2 border border-gray-300 rounded text-gray-500 cursor-not-allowed"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2">
                <CustomInput
                  {...register('email', { required: 'Email is required' })}
                  label="Email"
                  placeholder="Enter Email Address"
                  error={errors.email}
                />
              </div>

              <div className="flex flex-col gap-2">
                <MobileNumberInput
                  register={register}
                  errors={[errors.countryCode, errors.phone]}
                  countryCodes={africanCountriesPhoneCodes}
                  label="Contact Number for Enquiry"
                />
                {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
              </div>
            </div>
            <Button className="float-right my-4 px-4 cursor-pointer" type="submit">
              Submit
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default AdvertisementForm;
