import { strict } from 'assert';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import FileUploadWithPreview from '@atoms/input-elements/file-upload-with-preview';
import DynamicFields from '@atoms/input-elements/dynamic-fields';
import Checkbox from '@/atoms/input-elements/checkbox';
import Button from '@/atoms/custom-button/button';
import { RichTextEditor } from '@/atoms/input-elements/rich-text-editor';
import CustomInput from '@/atoms/input-elements/custom-input';

import MobileNumberInput from '@/atoms/input-elements/contact-custom-input';
import { CustomSelect } from '@/atoms/input-elements/cutom-select';
import { sanity, processContent, splitRichText } from '@/utils/sanity';
import { useQuery } from '@tanstack/react-query';
import { uploadImage } from '@api/index';
import sanityClient from '@/sanityClient';
import { generateId } from '@utils/common';
import { deepMerge } from '@/utils/common';

type BusinessForm = {
  businessName: string;
  businessMotive: string;
  businessLogo: File;
  businessAddress: {
    street?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
  };

  businessContactInformation: {
    phoneNumber?: string;
    email?: string;
    website?: string;
    socialMedia: {
      facebook: string;
      instagram: string;
      twitter: string;
      linkedin: string;
    };
  };
  businessCategory: string;
  businessmoreDetails: string;
  businessDescription: string;

  operatingHours: {
    monday?: { start: string; end: string };
    tuesday?: { start: string; end: string };
    wednesday?: { start: string; end: string };
    thursday?: { start: string; end: string };
    friday?: { start: string; end: string };
    saturday?: { start: string; end: string };
    sunday?: { start: string; end: string };
  };
  paymentMethods: string[];

  ownerContactInformation: {
    fullName?: string;
    role?: string;
    phoneNumber?: string;
    email?: string;
    idPhoto: File;
  };
  consent: boolean;
  accuracy: boolean;
  signature: string;
  date: string;
};

// type openingHours = {
//   { day: string, openingTime: , closingTime: '' }
// }
const BusinessFormComponent = () => {
  const [formData, setFormData] = useState<BusinessForm>({
    businessName: '',
    businessMotive: '',
    businessLogo: null,
    businessAddress: {},
    businessContactInformation: {
      phoneNumber: '',
      email: '',
      website: '',
      socialMedia: { facebook: '', instagram: '', twitter: '', linkedin: '' },
    },
    businessCategory: '',
    businessmoreDetails: '',
    businessDescription: '',
    operatingHours: {},
    paymentMethods: [],
    ownerContactInformation: { fullName: '', role: '', phoneNumber: '', email: '', idPhoto: null },
    consent: false,
    accuracy: false,
    signature: '',
    date: '',
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    control,
  } = useForm<BusinessForm>({
    defaultValues: {},
  });

  const handleChange = (field: string, value: string | number | boolean | File) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onBusinessFormSubmit: SubmitHandler<BusinessForm> = async (data) => {
    // try {
    //   // Display loader
    //   var newData = deepMerge(data, formData);
    //   var newData1 = {
    //     _type: 'afterWorkListing',
    //     _id: `drafts.${generateId()}`,
    //     ...newData,
    //   };
    //   await sanityClient.create(newData1);
    //   console.log('-------Final Data', newData);
    //   document.querySelector('.scrollable-container')?.scrollTo({ top: 0, behavior: 'smooth' });
    //   setTimeout(() => {
    //     setShowModal(true);
    //   }, 300); // Delay to allow scrolling to complete
    //   setFormData({});
    //   // Notify success
    // } catch (error) {
    //   // Handle errors
    //   console.error('Error submitting event:', error);
    //   alert('Failed to submit event. Please try again.');
    // } finally {
    //   // Hide loader
    //   // setLoader(false);
    // }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create a Business</h2>

      <form onSubmit={handleSubmit(onBusinessFormSubmit)}>
        {/* Business Name */}
        <div>
          <CustomInput
            {...register('businessName')}
            label={'Business Name'}
            placeholder="Business Name"
            error={errors.businessName}
          />
        </div>

        {/* Business Motive */}
        <div>
          <CustomInput
            {...register('businessName')}
            label={'Business Motive'}
            placeholder="Business Motive"
            error={errors.businessMotive}
          />
        </div>

        {/* Business Address */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold mt-6">{'Business Address'}</label>

          <CustomInput
            {...register(`businessAddress.street`)}
            // label={'Street Address'}
            placeholder="street"
            error={errors.businessAddress?.street}
          />
          <CustomInput
            {...register(`businessAddress.city`)}
            // label={'Town/City'}
            placeholder="Town/City"
            error={errors.businessAddress?.city}
          />
          <CustomInput
            {...register(`businessAddress.region`)}
            //   label={'Business Address'}
            placeholder="State/Region"
            error={errors.businessAddress?.region}
          />
          <CustomInput
            {...register(`businessAddress.postalCode`)}
            //   label={'Business Address'}
            placeholder="Postal Code (Optional)"
            error={errors.businessAddress?.postalCode}
            required={false}
          />
          <CustomInput
            {...register(`businessAddress.country`)}
            //   label={'Business Address'}
            placeholder="Country"
            error={errors.businessAddress?.country}
            required={false}
          />
        </div>

        {/* Business Contact Details */}

        <div className="flex flex-col gap-2">
          <label className="font-semibold mt-6">{'Contact Information'}</label>

          <CustomInput
            {...register('businessContactInformation.phoneNumber', { required: 'Phone number is required' })}
            placeholder="Phone Number (Primary contact number)"
            error={errors.businessContactInformation?.phoneNumber}
            type="number"
          />
          <CustomInput
            {...register('businessContactInformation.email', { required: 'Email is required' })}
            placeholder="Email Address (For inquires and official correspondence)"
            error={errors.businessContactInformation?.email}
            type="email"
          />

          <CustomInput
            {...register('businessContactInformation.website')}
            //   label={'Website (if applicable)'}
            placeholder="Website URL (Provide a link of your official website) Optional"
            error={errors.businessContactInformation?.website}
            type="url"
            required={false}
          />
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Social Media Links(Add links to your social media profiles)</label>
            <CustomInput
              {...register('businessContactInformation.socialMedia.facebook')}
              placeholder="Facebook Profile"
              error={errors?.businessContactInformation?.socialMedia?.facebook}
              required={false}
              type="url"
            />
            <CustomInput
              {...register('businessContactInformation.socialMedia.instagram')}
              placeholder="Instagram Profile"
              error={errors?.businessContactInformation?.socialMedia?.instagram}
              required={false}
              type="url"
            />
            <CustomInput
              {...register('businessContactInformation.socialMedia.linkedin')}
              placeholder="Linkedin Profile"
              // error={errors?.socialMedia?.linkedin}
              required={false}
              type="url"
            />
            <CustomInput
              {...register('businessContactInformation.socialMedia.twitter')}
              placeholder="Twitter Profile"
              error={errors?.businessContactInformation?.socialMedia?.twitter}
              required={false}
              type="url"
            />
            <CustomInput
              {...register('businessContactInformation.socialMedia.twitter')}
              placeholder="Tiktok Profile"
              error={errors?.businessContactInformation?.socialMedia?.twitter}
              required={false}
              type="url"
            />
            {/* Business Type */}
            <div className="flex flex-col gap-2 mt-6 mb-6">
              <CustomSelect
                {...register('businessCategory', { required: 'Business Type is required' })}
                placeholder="Business Type"
                options={businessCategories}
                label="Business Type"
                error={errors.businessCategory}
                // onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold mt-6">Full Description:</label>
              <textarea
                placeholder="100 - 500 words – detailed description including ambiance, offerings, and specialties"
                {...register('businessDescription', {
                  required: 'Full Description is required',
                  minLength: {
                    value: 500,
                    message: 'Full Description must be at least 500 characters',
                  },
                  maxLength: {
                    value: 1000,
                    message: 'Full Description must not exceed 1000 characters',
                  },
                })}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={10} // Bigger area
                onChange={(e) => setValue('businessDescription', e.target.value)}
              />
              {errors.businessDescription && (
                <p className="text-red-500 text-sm">{errors.businessDescription.message}</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BusinessFormComponent;

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
