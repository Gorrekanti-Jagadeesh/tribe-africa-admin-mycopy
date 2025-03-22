import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import sanityClient from '../../sanityClient';
import Input from '@atoms/input-elements/input';
import DynamicFields from '@atoms/input-elements/dynamic-fields';
import Checkbox from '@/atoms/input-elements/checkbox';
import DateInput from '@/atoms/input-elements/date-input';
import Button from '@/atoms/custom-button/button';
import { Option } from '@/types';
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
  AccommodationFormInputs,
  accommodationTypes,
} from '@/data/amanitieConfig';

const FormContext = createContext(null);

const AccommodationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccommodationFormInputs>({
    defaultValues: {},
  });

  const [formType, setFormType] = useState(null);
  const [formData, setFormData] = useState<Partial<AccommodationFormInputs>>({});
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

  const onSubmit: SubmitHandler<AccommodationFormInputs> = async (data) => {
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Accommodation Registration Form</h2>
      <FormContext.Provider value={register}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Accommodation type */}
          <div>
            <label className="font-semibold mb-4">
              {formType === 'vacation-rental' ? 'Accommodation Type' : 'Property Type'}
            </label>{' '}
            <Select
              required={true}
              className="mt-2 mb-4"
              name="accommodation_type"
              placeholder="Accommodation type"
              options={accommodationTypes}
              value={formType || ''}
              onChange={(value) => {
                reset(); // Reset form fields

                setFormData({});

                setFormType(value);
                handleInputChange('accommodation_type', value || '');
              }}
            />
          </div>

          {/* Name */}
          <div>
            <label className="font-semibold">{nameLabels[formType] || 'Property Name'}</label>
            <Input required={true} type="text" {...register('name')} placeholder="Enter Name" />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>
          {/* Brand */}
          {(formType == 'hotel' || formType == 'resort' || formType == 'bed-and-breakfast') && (
            <div>
              <label className="font-semibold">{'Brand (Optional)'}</label>
              <Input required={false} type="text" {...register('brand')} name="brand" placeholder="Brand name" />
            </div>
          )}

          {/* Star Rating */}
          {formType && ['hotel', 'resort', 'bed-and-breakfast'].includes(formType) && (
            <div>
              <label className="font-semibold mb-2">Star Rating (Optional)</label>
              <Select
                required={false}
                formType={formType}
                name="star_rating"
                placeholder="Select Star Rating"
                options={[
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
                ]}
                onChange={(value) => {
                  handleInputChange('star_rating', value);
                }}
              />
            </div>
          )}

          {/* Price Range / Amount */}
          {formType && <PriceRange formType={formType} handleInputChange={handleInputChange} />}

          {/* Property type/category */}
          {formType && propertyTypes[formType] && (
            <div>
              <label className="font-semibold">{categoryLabels[formType] || categoryLabels.default}</label>
              <div className="mt-2">
                <Select
                  required={true}
                  formType={formType}
                  name="category"
                  placeholder="Select Category"
                  options={propertyTypes[formType].options.map((type) => ({
                    label: type.label,
                    value: type.value,
                  }))}
                  onChange={(value) => {
                    handleInputChange(formType.replace(/-/g, '_') + '_property_type', value);
                  }}
                />
              </div>
            </div>
          )}
          {formType && locationTypes[formType] && (
            <div>
              <label className="font-semibold">Location Type</label>
              <Select
                required={true}
                formType={formType}
                name="location"
                placeholder="Select Location type"
                options={locationTypes[formType].options.map((type) => ({
                  label: type.label,
                  value: type.value,
                }))}
                onChange={(value) => {
                  handleInputChange('locationType', value);
                }}
              />
            </div>
          )}

          {/* Address */}
          <div>
            <label className="font-semibold">Address</label>

            {/* Street address */}
            <Input
              required={true}
              type="text"
              {...register('address.street')} // Bind to form data
              placeholder="Street address"
            />

            {/* Town / City */}
            <Input
              required={true}
              type="text"
              {...register('address.city')} // Bind to form data
              placeholder="Town / City"
            />

            {/* State / Region */}
            <Input
              required={true}
              type="text"
              {...register('address.region')} // Bind to form data
              placeholder="State / Region"
            />

            {/* Postal Code */}
            <Input
              type="text"
              {...register('address.postalCode')} // Bind to form data
              placeholder="Postal Code (Optional)"
            />

            {/* Country */}
            <Input
              required={true}
              type="text"
              {...register('address.country')} // Bind to form data
              placeholder="Country"
            />
          </div>

          {/* Contact Information */}
          <div>
            <label className="font-semibold">Contact Information</label>

            {/* Phone Number */}
            <Input
              required={true}
              type="number"
              {...register('contact.phoneNumber')} // Binds phone number to form data
              placeholder="Phone Number"
            />

            {/* Email */}
            <Input
              required={true}
              type="email"
              {...register('contact.email')} // Binds email to form data
              placeholder="Enter email"
            />

            {/* Website */}
            <Input
              type="text"
              {...register('contact.website')} // This binds the input to the form data
              placeholder="Website (Optional)"
            />
            {/* Social Media */}
            <Input
              required={true}
              type="text"
              {...register('contact.socialMedia')} // This binds the input to the form data
              placeholder="Social media link"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold">Description</label>
            <Input
              required={true}
              type="text"
              {...register('description.tagline')}
              name="description.tagline"
              maxLength={50}
              placeholder="Tagline: Short, catchy tagline (Max 50 characters): e.g., Pure Luxury, Paradise
Found."
            />
            <label className="font-semibold">Describe about the accommodation</label>

            <RichTextEditor
              formType={formType}
              {...register('description.description')}
              placeholder="Describe your accomodation in 100-500 words."
              onContentChange={(value) => handleInputChange('description.description', value)}
            />
            <label className="font-semibold">
              Highlights (Add up to 6 key highlights: e.g., High-speed Wi-Fi, Weekly Community Events.)
            </label>
            <DynamicFields
              formType={formType}
              {...register('description.highlights')}
              setValue={(value) => handleInputChange('description.highlights', value)}
              max={6}
            />
          </div>

          {/* Languages spoken */}
          <div className="mt-4">
            <label className="font-semibold mb-4">Languages Spoken by Staff</label>

            {['arabic', 'english', 'french', 'spanish', 'portuguese', 'german', 'bahasa', 'mandarin'].map((lang) => (
              <Checkbox
                key={lang}
                require={formData?.languages ? (Object.keys(formData?.languages)?.length ? false : true) : true}
                {...register(`languages.${lang}` as keyof AccommodationFormInputs)}
                label={lang.charAt(0).toUpperCase() + lang.slice(1)}
                onChange={(e) => handleInputChange(`languages.${lang}`, e)}
              />
            ))}

            <Input type="text" {...register('languages.other')} placeholder="Others (specify)" required={false} />
          </div>

          {/* Business establishment */}
          <label className="font-semibold">Which year Business was established (Optional)</label>

          <DateInput onChange={(value) => handleInputChange('establishedIn', value)} />

          {/* Accommodation Policies */}
          <div>
            <CancellationPolicy handleInputChange={handleInputChange} formType={formType} formData={formData} />
            {/* <Input type="text" {...register('policy.cancellation.description')} placeholder="Policy description" /> */}

            <label className="font-semibold">House Rules</label>
            <RichTextEditor formType={formType} onContentChange={(value) => handleInputChange('policy.rules', value)} />
            {formType === 'vacation-rental' && <SecurityDeposit handleInputChange={handleInputChange} />}
            <label className="font-semibold mb-4 mr-4">Check-In Time</label>
            <input type="time" className="mr-4" {...register('policy.checkInTime')} />

            <label className="font-semibold mb-4 mr-4">Check-Out Time</label>
            <input type="time" {...register('policy.checkOutTime')} />
          </div>

          <div>
            <label className="font-semibold">Payment Methods Accepted</label>
            <Checkbox
              {...register('paymentMethods.card')}
              label="Credit/Debit Card"
              onChange={(e) => handleInputChange('paymentMethods.card', e)}
            />

            <Checkbox
              {...register('paymentMethods.online')}
              label="PayPal"
              onChange={(e) => handleInputChange('paymentMethods.online', e)}
            />

            <Checkbox
              {...register('paymentMethods.cash')}
              label="Cash on Arrival"
              onChange={(e) => handleInputChange('paymentMethods.cash', e)}
            />

            <label className="font-semibold mt-2">Cards Accepted</label>
            <div className="flex gap-2">
              <Checkbox
                {...register('acceptedCards.visaCard')}
                label="Visa"
                onChange={(e) => handleInputChange('acceptedCards.visaCard', e)}
              />
              <Checkbox
                {...register('acceptedCards.masterCard')}
                label="Mastercard"
                onChange={(e) => handleInputChange('acceptedCards.masterCard', e)}
              />
              <Checkbox
                {...register('acceptedCards.americanExpress')}
                label="American Express"
                onChange={(e) => handleInputChange('acceptedCards.americanExpress', e)}
              />
              <Checkbox
                {...register('acceptedCards.discover')}
                label="Discover"
                onChange={(e) => handleInputChange('acceptedCards.discover', e)}
              />
              <Checkbox
                {...register('acceptedCards.jcb')}
                label="Jcb"
                onChange={(e) => handleInputChange('acceptedCards.jcb', e)}
              />
            </div>
            <div className="mt-2">
              <Input
                type="text"
                {...register('acceptedCards.other')}
                placeholder="Other (Specify)"
                onChange={(e) => handleInputChange('acceptedCards.other', e.target.value)}
              />
            </div>
          </div>

          {/* Dynamic Key-Value Pair Creation Operation seasons */}
          <div className="border p-4 rounded-lg">
            <label className="font-semibold">Operating Season</label>

            <div className="mt-2">
              <p className="font-medium">Open Year-Round</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="operatingSeason.isYearRound"
                    value="yes"
                    onChange={(e) => handleInputChange('operatingSeason.isYearRound', e.target.value === 'yes')}
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="operatingSeason.isYearRound"
                    value="no"
                    onChange={(e) => handleInputChange('operatingSeason.isYearRound', e.target.value === 'no')}
                  />
                  No
                </label>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <input
                type="text"
                name="operatingSeason.seasonalMonths"
                placeholder="Seasonal (Specify months of operation)"
                className="border p-2 w-full rounded"
                onChange={(e) => handleInputChange('operatingSeason.seasonalMonths', e.target.value)}
              />

              <input
                type="text"
                name="operatingSeason.lowSeason"
                placeholder="Low Season Months (Specify months)"
                className="border p-2 w-full rounded"
                onChange={(e) => handleInputChange('operatingSeason.lowSeason', e.target.value)}
              />

              <input
                type="text"
                name="operatingSeason.highSeason"
                placeholder="High Season Months (Specify months)"
                className="border p-2 w-full rounded"
                onChange={(e) => handleInputChange('operatingSeason.highSeason', e.target.value)}
              />
            </div>
          </div>

          {/* General Amenities */}
          <div>
            <label className="font-semibold">Amenities</label>
            {formType && amenitiesMapping[formType].generalAmenities && (
              <AccordionSection
                formType={formType}
                handleInputChange={handleInputChange}
                zero={getAmenitiesConfig(formType, 'generalAmenities').zero}
                pre={'generalAmenities'}
                title={getAmenitiesConfig(formType, 'generalAmenities').title}
                options={getAmenitiesConfig(formType, 'generalAmenities').options}
              />
            )}
            {formType && amenitiesMapping[formType].utilities && (
              <AccordionSection
                formType={formType}
                handleInputChange={handleInputChange}
                zero={getAmenitiesConfig(formType, 'utilities').zero}
                pre={'utilities'}
                title={getAmenitiesConfig(formType, 'utilities').title}
                options={getAmenitiesConfig(formType, 'utilities').options}
              />
            )}
            {formType && amenitiesMapping[formType].livingArea && (
              <AccordionSection
                formType={formType}
                handleInputChange={handleInputChange}
                zero={getAmenitiesConfig(formType, 'livingArea').zero}
                pre={'livingArea'}
                title={getAmenitiesConfig(formType, 'livingArea').title}
                options={getAmenitiesConfig(formType, 'livingArea').options}
              />
            )}
            {formType && amenitiesMapping[formType].kitchen && (
              <AccordionSection
                formType={formType}
                handleInputChange={handleInputChange}
                zero={getAmenitiesConfig(formType, 'kitchen').zero}
                pre={'kitchen'}
                title={getAmenitiesConfig(formType, 'kitchen').title}
                options={getAmenitiesConfig(formType, 'kitchen').options}
              />
            )}
            {formType && amenitiesMapping[formType].outdoorFacilities && (
              <AccordionSection
                formType={formType}
                handleInputChange={handleInputChange}
                zero={getAmenitiesConfig(formType, 'outdoorFacilities').zero}
                pre={'outdoorFacilities'}
                title={getAmenitiesConfig(formType, 'outdoorFacilities').title}
                options={getAmenitiesConfig(formType, 'outdoorFacilities').options}
              />
            )}
            {formType && amenitiesMapping[formType].barDining && (
              <AccordionSection
                formType={formType}
                handleInputChange={handleInputChange}
                zero={getAmenitiesConfig(formType, 'barDining').zero}
                pre={'barDining'}
                title={getAmenitiesConfig(formType, 'barDining').title}
                options={getAmenitiesConfig(formType, 'barDining').options}
              />
            )}
            {formType && amenitiesMapping[formType].specialMenus && (
              <AccordionSection
                formType={formType}
                handleInputChange={handleInputChange}
                zero={getAmenitiesConfig(formType, 'specialMenus').zero}
                pre={'specialMenus'}
                title={getAmenitiesConfig(formType, 'specialMenus').title}
                options={getAmenitiesConfig(formType, 'specialMenus').options}
              />
            )}

            {formType && amenitiesMapping[formType].recreational && (
              <AccordionSection
                formType={formType}
                handleInputChange={handleInputChange}
                zero={getAmenitiesConfig(formType, 'recreational').zero}
                pre={'recreational'}
                title={getAmenitiesConfig(formType, 'recreational').title}
                options={getAmenitiesConfig(formType, 'recreational').options}
              />
            )}

            {formType && amenitiesMapping[formType].wellness && (
              <AccordionSection
                formType={formType}
                handleInputChange={handleInputChange}
                zero={getAmenitiesConfig(formType, 'wellness').zero}
                pre={'wellness'}
                title={getAmenitiesConfig(formType, 'wellness').title}
                options={getAmenitiesConfig(formType, 'wellness').options}
              />
            )}

            {formType && amenitiesMapping[formType].travelAdventureSupport && (
              <AccordionSection
                formType={formType}
                handleInputChange={handleInputChange}
                zero={getAmenitiesConfig(formType, 'travelAdventureSupport').zero}
                pre={'travelAdventureSupport'}
                title={getAmenitiesConfig(formType, 'travelAdventureSupport').title}
                options={getAmenitiesConfig(formType, 'travelAdventureSupport').options}
              />
            )}
            {formType && amenitiesMapping[formType].workConnectivity && (
              <AccordionSection
                formType={formType}
                handleInputChange={handleInputChange}
                zero={getAmenitiesConfig(formType, 'workConnectivity').zero}
                pre={'workConnectivity'}
                title={getAmenitiesConfig(formType, 'workConnectivity').title}
                options={getAmenitiesConfig(formType, 'workConnectivity').options}
              />
            )}

            {formType && amenitiesMapping[formType].meetingRooms && (
              <AccordionSection
                formType={formType}
                handleInputChange={handleInputChange}
                zero={getAmenitiesConfig(formType, 'meetingRooms').zero}
                pre={'meetingRooms'}
                title={getAmenitiesConfig(formType, 'meetingRooms').title}
                options={getAmenitiesConfig(formType, 'meetingRooms').options}
              />
            )}

            {formType && amenitiesMapping[formType].eventServices && (
              <AccordionSection
                formType={formType}
                handleInputChange={handleInputChange}
                zero={getAmenitiesConfig(formType, 'eventServices').zero}
                pre={'eventServices'}
                title={getAmenitiesConfig(formType, 'eventServices').title}
                options={getAmenitiesConfig(formType, 'eventServices').options}
              />
            )}

            {formType && amenitiesMapping[formType].ecoFriendlyPractices && (
              <AccordionSection
                formType={formType}
                handleInputChange={handleInputChange}
                zero={getAmenitiesConfig(formType, 'ecoFriendlyPractices').zero}
                pre={'ecoFriendlyPractices'}
                title={getAmenitiesConfig(formType, 'ecoFriendlyPractices').title}
                options={getAmenitiesConfig(formType, 'ecoFriendlyPractices').options}
              />
            )}

            <NearbyAttractionsForm formType={formType} handleInputChange={handleInputChange} />
            <div className="p-4 border rounded-lg bg-white shadow-md">
              <h2 className="font-semibold mb-4">Map Location (Optional)</h2>
              <GetCoordinateOnMap setCoordinates={(coordinates) => handleInputChange('location', coordinates)} />
            </div>

            <DistanceToKeyLocations formType={formType} handleInputChange={handleInputChange} />
            <HotelResortRoomBathroomDetails formType={formType} handleInputChange={handleInputChange} />
            <BedBreakfastRoomBathroomDetails formType={formType} handleInputChange={handleInputChange} />
            <HostelRoomBathroomDetails formType={formType} handleInputChange={handleInputChange} />
            <CoLivingRoomBathroomDetails formType={formType} handleInputChange={handleInputChange} />
            <VacationRentalRoomBathroomDetails formType={formType} handleInputChange={handleInputChange} />
            <UploadPhotos formType={formType} handleInputChange={handleInputChange} />
          </div>

          {/* owner / manager Details */}
          <div>
            <label className="font-semibold">Owner/Manager Details</label>

            <label className="block text-sm font-medium capitalize mt-4">{'Full Name'}</label>
            <Input type="text" {...register('manager.name')} name="manager.name" placeholder="Enter full name" />

            <label className="block text-sm font-medium capitalize mt-4">{'Role (Owner/Manager)'}</label>
            <Input
              type="text"
              {...register('manager.role')}
              name="manager.role"
              placeholder="Enter role (Owner/Manager)"
            />

            <label className="block text-sm font-medium capitalize mt-4">{'Phone Number'}</label>
            <Input
              type="number"
              {...register('manager.phoneNumber')}
              name="manager.phoneNumber"
              placeholder="Enter phone number"
            />

            <label className="block text-sm font-medium capitalize mt-4">{'Email Address'}</label>
            <Input type="email" {...register('manager.email')} name="manager.email" placeholder="Enter email address" />

            <label className="block text-sm font-medium capitalize mt-4">{'Emergency Contact (Optional)'}</label>
            <Input
              type="text"
              name="manager.emergencyContact"
              {...register('manager.emergencyContact')}
              placeholder="Enter emergency contact"
              required={false}
            />

            <SingleImageUpload formType={formType} handleInputChange={handleInputChange} />
          </div>

          {/* Consent and verification section */}
          <div>
            <label className="font-semibold">Consent to Listing</label>
            <div className="mb-4">
              <Checkbox
                label="I consent to my business information being listed in the Tribe Africa Pages Directory."
                {...register('consent')}
                onChange={(e) => handleInputChange('consent', e)}
              />
            </div>

            <label className="font-semibold">Accuracy Verification</label>
            <div className="mb-4">
              <Checkbox
                label="I confirm that the information provided is accurate to the best of my knowledge."
                {...register('confirmation')}
                onChange={(e) => handleInputChange('confirmation', e)}
              />
            </div>

            <label className="font-semibold">Signature</label>
            <div className="mb-4">
              <Input
                type="text"
                name="signature"
                {...register('signature')}
                placeholder="Type your full name for electronic signature"
              />
            </div>

            <label className="font-semibold">Date (DD/MM/YYYY)</label>
            <div className="mt-4">
              <DateInput {...register('dateOfSubmit')} onChange={(e) => handleInputChange('dateOfSubmit', e)} />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </FormContext.Provider>
      {showModal && <SubmissionModal onClose={() => setShowModal(false)} />}{' '}
    </div>
  );
};

const CancellationPolicy = ({ handleInputChange, formType, formData }) => {
  const [isCustomPolicy, setIsCustomPolicy] = useState(false);
  const [customPolicyText, setCustomPolicyText] = useState('');

  useEffect(() => {
    setCustomPolicyText('');
  }, [formType]);

  const handleCheckboxChange = (field: string, value: boolean) => {
    if (field === 'policy.cancellation.customPolicyEnabled') {
      setIsCustomPolicy(value);
      if (!value) {
        setCustomPolicyText(''); // Clear text when unchecked
        handleInputChange('policy.cancellation.customPolicyText', ''); // Clear from parent state
      }
    }
    handleInputChange(field, value);
  };

  return (
    <div className="mb-4">
      <label className="font-semibold block">{policyLabels[formType] || 'Policies'}</label>

      <label className="font-semibold block mt-2">Cancellation Policy</label>

      <Checkbox
        require={formData?.policy ? (Object.keys(formData?.policy)?.length ? false : true) : true}
        label="Free cancellation"
        onChange={(e) => handleCheckboxChange('policy.cancellation.freeCancellation', e)}
      />

      <Checkbox label="Non-refundable" onChange={(e) => handleCheckboxChange('policy.cancellation.nonRefundable', e)} />

      {/* Custom Policy Checkbox */}
      <Checkbox
        label="Custom Policy (Specify)"
        onChange={(e) => handleCheckboxChange('policy.cancellation.customPolicyEnabled', e)}
      />

      {/* Show Textbox if Custom Policy is Checked */}
      {isCustomPolicy && (
        <div>
          <label className="font-semibold block mt-2">Specify Custom Policy</label>

          <input
            type="text"
            placeholder="Enter custom cancellation policy"
            className="w-full mt-2 p-2 border rounded"
            value={customPolicyText}
            onChange={(e) => {
              setCustomPolicyText(e.target.value);
              handleInputChange('policy.cancellation.customPolicyText', e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
};

interface SingleImageUploadProps {
  formType: string;
  handleInputChange: (field: string, value: any) => void;
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({ formType, handleInputChange }) => {
  const [image, setImage] = useState<{ preview: string; _id: string } | null>(null);

  useEffect(() => {
    // Reset image state when formType changes
    setImage(null);
    handleInputChange('manager.idPhoto', null);
  }, [formType]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div>
      <label className="text-sm font-medium capitalize mr-4">Upload Passport/ID</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && <img src={image.preview} alt="Preview" className="w-20 h-20 object-cover mt-2" />}
    </div>
  );
};

interface PriceRangeProps {
  formType: string;
  handleInputChange: (field: string, value: any) => void;
}

const PriceRange: React.FC<PriceRangeProps> = ({ formType, handleInputChange }) => {
  const options = priceRangeOptions[formType] || [];
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setSelectedPriceRanges({});
  }, [formType]);

  const handleCheckboxChange = (key: string, checked: boolean) => {
    const updatedSelections = { ...selectedPriceRanges, [key]: checked };
    setSelectedPriceRanges(updatedSelections);
    handleInputChange('priceRange', updatedSelections); // Update parent state
  };
  return (
    <div className="mb-4">
      <label className="font-semibold block mb-2">Price Range</label>
      {options.map(({ key, label }) => (
        <label key={key} className="flex items-center mb-1">
          <input
            required={Object.keys(selectedPriceRanges).length ? false : true}
            type="checkbox"
            name={`priceRange.${key}`}
            checked={selectedPriceRanges[key] || false}
            onChange={(e) => handleCheckboxChange(key, e.target.checked)}
            className="mr-2"
          />
          {label}
        </label>
      ))}
    </div>
  );
};

interface SecurityDepositProps {
  handleInputChange: (field: string, value: any) => void;
}
interface UploadPhotosProps {
  formType: string;
  handleInputChange: (field: string, value: any) => void;
}
interface DistanceToKeyLocationsDetailsProps {
  formType: string;
  handleInputChange: (field: string, value: any) => void;
}
interface HotelResortRoomBathroomDetailsProps {
  formType: string;
  handleInputChange: (field: string, value: any) => void;
}
interface BedBreakfastRoomBathroomDetailsProps {
  formType: string;
  handleInputChange: (field: string, value: any) => void;
}

interface HostelRoomBathroomDetailsProps {
  formType: string;
  handleInputChange: (field: string, value: any) => void;
}

interface CoLivingRoomBathroomDetailsProps {
  formType: string;
  handleInputChange: (field: string, value: any) => void;
}

interface VacationRentalGeneralInfoProps {
  formType: string;
  handleInputChange: (field: string, value: any) => void;
}

interface ModalProps {
  onClose: () => void;
}

const SubmissionModal: React.FC<ModalProps> = ({ onClose }) => {
  // useEffect(() => {
  //   document.body.style.overflow = 'hidden'; // Disable scrolling

  //   return () => {
  //     document.body.style.overflow = 'auto'; // Restore scrolling on unmount
  //   };
  // }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]"
      onClick={onClose} // Close when clicking outside
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-4/5 max-w-lg relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-3">Successfully uploded!</h2>
        <hr className="border-orange-500 mb-3" />

        <p className="text-gray-700">
          Thank you for submitting your accommodation details to the <b>Tribe Africa Pages Directory!</b>
          <br />
          <br />
          Our team will review your listing within <b>3–5 business days</b> to ensure all information meets our quality
          standards. Once approved, your accommodation will be featured on our directory, making it visible to potential
          guests and travelers.
          <br />
          <br />
          You will receive a confirmation email with a link to your live listing. If you have any questions or need
          assistance, please feel free to reach out to us at
          <b> support@tribeafrica.org</b>.
          <br />
          <br />
          We're excited to help promote your accommodation to our growing audience!
        </p>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
const SecurityDeposit: React.FC<SecurityDepositProps> = ({ handleInputChange }) => {
  const [securityDeposit, setSecurityDeposit] = useState({
    hasDeposit: false,
    amount: '',
    conditions: '',
  });

  const handleChange = (field: keyof typeof securityDeposit, value: any) => {
    const updatedDeposit = { ...securityDeposit, [field]: value };

    if (field === 'hasDeposit' && !value) {
      updatedDeposit.amount = '';
      updatedDeposit.conditions = '';
    }

    setSecurityDeposit(updatedDeposit);
    handleInputChange('policy.securityDeposit', updatedDeposit);
  };

  return (
    <div className="mb-4">
      <label className="font-semibold block mb-2">Security Deposit (Specify)</label>

      <div className="flex gap-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="hasDeposit"
            value="no"
            checked={!securityDeposit.hasDeposit}
            onChange={() => handleChange('hasDeposit', false)}
            className="mr-2"
          />
          No
        </label>

        <label className="flex items-center">
          <input
            type="radio"
            name="hasDeposit"
            value="yes"
            checked={securityDeposit.hasDeposit}
            onChange={() => handleChange('hasDeposit', true)}
            className="mr-2"
          />
          Yes
        </label>
      </div>

      {/* Show input fields only if "Yes" is selected */}
      {securityDeposit.hasDeposit && (
        <div className="mt-4 space-y-2">
          <input
            type="number"
            name="depositAmount"
            placeholder="Enter deposit amount"
            value={securityDeposit.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            className="border p-2 w-full rounded"
          />

          <textarea
            name="depositConditions"
            placeholder="Enter deposit conditions"
            value={securityDeposit.conditions}
            onChange={(e) => handleChange('conditions', e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>
      )}
    </div>
  );
};

const UploadPhotos: React.FC<UploadPhotosProps> = ({ formType, handleInputChange }) => {
  if (!formType || !formCategories[formType]) return null; // Return null if formType is missing

  const getInitialState = () =>
    formCategories[formType]?.reduce(
      (acc, category) => {
        acc[category.value] = [];
        return acc;
      },
      {} as { [key: string]: { _key: string; _type: 'image'; asset: { _ref: string }; preview?: string }[] }
    ) || {};

  const [photos, setPhotos] = useState(getInitialState);

  // Reset state when formType changes
  useEffect(() => {
    setPhotos(getInitialState());
  }, [formType]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    if (!e.target.files) return;

    const uploadedFiles = Array.from(e.target.files);
    const uploadedPhotoRefs = await Promise.all(
      uploadedFiles.map(async (file) => {
        const previewURL = URL.createObjectURL(file); // Local preview

        const coverPhotoUrl = await uploadImage(file); // Upload to server

        return {
          _key: generateId(), // Generate unique key
          _type: 'image' as const, // Ensure this is typed as literal "image"
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

  return (
    <div className="my-4 p-4 border rounded-lg bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-3">Upload Photos</h2>

      {formCategories[formType]?.map(({ label, value }) => (
        <div key={value} className="mb-6">
          <label className="block text-sm font-medium capitalize">{label}</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handlePhotoUpload(e, value)}
            className="w-full p-2 border rounded mt-2"
          />

          <div className="flex flex-wrap gap-2 mt-2">
            {photos[value]?.map((photo) => (
              <img
                key={photo._key}
                src={photo.preview || `https://cdn.sanity.io/images/projectId/dataset/${photo.asset._ref}`}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-md border"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const DistanceToKeyLocations: React.FC<DistanceToKeyLocationsDetailsProps> = ({ formType, handleInputChange }) => {
  const locationOptions = {
    nearestAirport: 'Nearest Airport',
    trainBusStation: 'Train/Bus Station',
    taxiStands: 'Taxi Stands',
    cityCenter: 'City/Town Center',
    localMarkets: 'Local Markets/Shopping Areas',
    popularRestaurants: 'Popular Restaurants/Bars',
  };

  const getDefaultState = () =>
    Object.keys(locationOptions).reduce(
      (acc, key) => {
        acc[key as keyof typeof locationOptions] = '';
        return acc;
      },
      {} as Record<keyof typeof locationOptions, string>
    );

  const [locations, setLocations] = useState(getDefaultState);

  // Reset state when formType changes
  useEffect(() => {
    setLocations(getDefaultState());
  }, [formType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLocations((prev) => {
      const updatedLocations = { ...prev, [name]: value };

      // Call the parent function to update the state
      handleInputChange('distanceToKeyLocations', updatedLocations);

      return updatedLocations;
    });
  };

  return (
    <div className="my-4 p-4 border rounded-lg bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-3">Distance to Key Locations (Optional)</h2>

      {Object.entries(locationOptions).map(([key, label]) => (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium">{label}</label>
          <input
            type="text"
            name={key}
            value={locations[key as keyof typeof locations]}
            onChange={handleChange}
            placeholder="Enter name & distance"
            className="w-full p-2 border rounded"
          />
        </div>
      ))}
    </div>
  );
};

const AccordionSection: React.FC<{
  formType: string;
  title: string;
  options: Option[];
  pre: string;
  zero: string;
  handleInputChange: (field: string, value: any) => void;
}> = ({ formType, title, options, pre, zero, handleInputChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<boolean[]>(new Array(options.length).fill(false));
  const [otherSpecify, setOtherSpecify] = useState('');
  const [otherSpecifyValues, setOtherSpecifyValues] = useState<{ [key: string]: string }>({}); // Stores "Other (Specify)" values

  const register = useContext(FormContext);

  useEffect(() => {
    setOtherSpecify('');
  }, [formType]);

  const handleChange = useCallback(
    (e, value: string, index: number, input: boolean) => {
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

  return (
    <div className="border-b">
      {/* Prevent dropdown from closing when clicking the header */}
      <div
        className="cursor-pointer p-4 bg-gray-200"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <h2>{title}</h2>
      </div>

      {isOpen && (
        <div className="p-4 bg-gray-100" onClick={(e) => e.stopPropagation()}>
          {options.map((option, index) =>
            option.value === 'otherSpecify' || option?.input ? (
              <Input
                key={option.value}
                {...register(`${zero}.${pre}.${option.value}`)}
                placeholder={option.label}
                value={otherSpecify}
                onChange={(e) => handleChange(e, option.value, index, option?.input || false)}
              />
            ) : (
              <Checkbox
                key={option.value}
                {...register(`${zero}.${pre}.${option.value}`)}
                label={option.label}
                onChange={(e) => handleChange(e, option.value, index, option?.input || false)}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

const VacationRentalRoomBathroomDetails: React.FC<VacationRentalGeneralInfoProps> = ({
  formType,
  handleInputChange,
}) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prevState) => {
      const updatedForm = { ...prevState };
      const keys = name.split('.');

      if (keys.length === 2) {
        const [category, key] = keys;
        updatedForm[category] = {
          ...(prevState[category as keyof typeof prevState] as Record<string, any>),
          [key]: type === 'checkbox' ? checked : value,
        };
      } else {
        updatedForm[name] = value;
      }
      handleInputChange('vacationRentalRoomBathroomDetails', formData);

      return updatedForm;
    });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg my-4">
      <h2 className="text-lg font-semibold mb-3">Vacation Rental - General Information</h2>

      {/* Max Occupancy */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Max Occupancy</label>
        <input
          type="text"
          name="maxOccupancy"
          value={formData.maxOccupancy}
          onChange={handleChange}
          placeholder="Enter max occupancy"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Number of Bedrooms */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Number of Bedrooms</label>
        <input
          type="text"
          name="bedrooms.count"
          value={formData.bedrooms.count}
          onChange={handleChange}
          placeholder="Enter number of bedrooms"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="bedrooms.bedTypes"
          value={formData.bedrooms.bedTypes}
          onChange={handleChange}
          placeholder="Enter bed types (King, Queen, etc.)"
          className="w-full p-2 border rounded mt-2"
        />
      </div>

      {/* Number of En-suite Bedrooms */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Number of En-Suite Bedrooms</label>
        <input
          type="text"
          name="enSuiteBedrooms.count"
          value={formData.enSuiteBedrooms.count}
          onChange={handleChange}
          placeholder="Enter number of en-suite bedrooms"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="enSuiteBedrooms.bedTypes"
          value={formData.enSuiteBedrooms.bedTypes}
          onChange={handleChange}
          placeholder="Enter bed types (King, Queen, etc.)"
          className="w-full p-2 border rounded mt-2"
        />
      </div>

      {/* Number of Separate Bathrooms */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Number of Separate Bathrooms</label>
        <input
          type="text"
          name="separateBathrooms"
          value={formData.separateBathrooms}
          onChange={handleChange}
          placeholder="Enter number of separate bathrooms"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Property Sizes */}
      {[
        { label: 'Property Size', name: 'propertySize' },
        { label: 'Outdoor Terrace Size', name: 'outdoorTerraceSize' },
        { label: 'Garden Size', name: 'gardenSize' },
      ].map(({ label, name }) => (
        <div key={name} className="mb-4">
          <label className="block text-sm font-medium">{label} (sq meters/feet)</label>
          <input
            type="text"
            name={name}
            value={formData[name as keyof typeof formData] as string}
            onChange={handleChange}
            placeholder={`Enter ${label.toLowerCase()}`}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}

      {/* Bedroom Features */}
      <div className="mb-4">
        <h3 className="text-md font-semibold">Bedroom Features</h3>
        {Object.keys(formData.bedroomFeatures).map((key) => (
          <label key={key} className="flex items-center">
            <input
              type="checkbox"
              name={`bedroomFeatures.${key}`}
              checked={formData.bedroomFeatures[key as keyof typeof formData.bedroomFeatures]}
              onChange={handleChange}
              className="mr-2"
            />
            {key.replace(/([A-Z])/g, ' $1')}
          </label>
        ))}
      </div>

      {/* Bathroom Features */}
      <div className="mb-4">
        <h3 className="text-md font-semibold">Bathroom Features</h3>
        {Object.keys(formData.bathroomFeatures).map((key) => (
          <label key={key} className="flex items-center">
            <input
              type="checkbox"
              name={`bathroomFeatures.${key}`}
              checked={formData.bathroomFeatures[key as keyof typeof formData.bathroomFeatures]}
              onChange={handleChange}
              className="mr-2"
            />
            {key.replace(/([A-Z])/g, ' $1')}
          </label>
        ))}
      </div>
    </div>
  );
};

const CoLivingRoomBathroomDetails: React.FC<CoLivingRoomBathroomDetailsProps> = ({ formType, handleInputChange }) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prevState) => {
      const updatedForm = { ...prevState };
      const keys = name.split('.');

      if (keys.length === 2) {
        const [category, key] = keys;
        updatedForm[category] = {
          ...(prevState[category as keyof typeof prevState] as Record<string, any>),
          [key]: type === 'checkbox' ? checked : value,
        };
      } else {
        updatedForm[name] = value;
      }
      handleInputChange('coLivingRoomBathroomDetails', formData);

      return updatedForm;
    });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg my-4">
      <h2 className="text-lg font-semibold mb-3">Co-Living Room & Bathroom Details</h2>

      {/* Shared Bedrooms */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Number of Bedrooms Available with Shared Bathrooms</label>
        <input
          type="text"
          name="sharedBedrooms"
          value={formData.sharedBedrooms}
          onChange={handleChange}
          placeholder="Enter number of shared bedrooms"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Shared Bedroom Features */}
      <div className="mb-4">
        <h3 className="text-md font-semibold">Shared Bedroom Features</h3>
        {Object.keys(formData.sharedBedroomFeatures).map((key) =>
          key !== 'other' ? (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                name={`sharedBedroomFeatures.${key}`}
                checked={formData.sharedBedroomFeatures[key as keyof typeof formData.sharedBedroomFeatures] as boolean}
                onChange={handleChange}
                className="mr-2"
              />
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
          ) : null
        )}
        <input
          type="text"
          name="sharedBedroomFeatures.other"
          value={formData.sharedBedroomFeatures.other}
          onChange={handleChange}
          placeholder="Other (Specify)"
          className="w-full p-2 border rounded mt-2"
        />
      </div>

      {/* Shared Bathrooms */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Number of Shared Bathrooms</label>
        <input
          type="text"
          name="sharedBathrooms"
          value={formData.sharedBathrooms}
          onChange={handleChange}
          placeholder="Enter number of shared bathrooms"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* En-Suite Bedrooms */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Number of En-Suite Bedrooms</label>
        <input
          type="text"
          name="enSuiteBedrooms"
          value={formData.enSuiteBedrooms}
          onChange={handleChange}
          placeholder="Enter number of en-suite bedrooms"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* En-Suite Bedroom Features */}
      <div className="mb-4">
        <h3 className="text-md font-semibold">En-Suite Bedroom Features</h3>
        {Object.keys(formData.enSuiteBedroomFeatures).map((key) =>
          key !== 'other' ? (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                name={`enSuiteBedroomFeatures.${key}`}
                checked={
                  formData.enSuiteBedroomFeatures[key as keyof typeof formData.enSuiteBedroomFeatures] as boolean
                }
                onChange={handleChange}
                className="mr-2"
              />
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
          ) : null
        )}
        <input
          type="text"
          name="enSuiteBedroomFeatures.other"
          value={formData.enSuiteBedroomFeatures.other}
          onChange={handleChange}
          placeholder="Other (Specify)"
          className="w-full p-2 border rounded mt-2"
        />
      </div>

      {/* Common Areas */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Common Areas</label>
        <textarea
          name="commonAreas"
          value={formData.commonAreas}
          onChange={handleChange}
          placeholder="Describe the shared spaces (e.g., kitchen, lounge, gym)"
          className="w-full p-2 border rounded h-24"
        />
      </div>
    </div>
  );
};

const HostelRoomBathroomDetails: React.FC<HostelRoomBathroomDetailsProps> = ({ formType, handleInputChange }) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prevState) => {
      const updatedForm = { ...prevState };
      const keys = name.split('.'); // Handle nested fields

      if (keys.length === 2) {
        const [category, key] = keys;
        updatedForm[category] = {
          ...(prevState[category as keyof typeof prevState] as Record<string, any>),
          [key]: type === 'checkbox' ? checked : value,
        };
      } else {
        updatedForm[name] = value;
      }
      handleInputChange('hostelRoomBathroomDetails', updatedForm);
      return updatedForm;
    });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg my-4">
      <h2 className="text-lg font-semibold mb-3">Hostel Room & Bathroom Details</h2>

      {/* Room Details */}
      {[
        { label: 'Total Number of Beds', name: 'totalBeds' },
        { label: 'Number of Dormitory Rooms', name: 'dormitoryRooms' },
        { label: 'Number of Shared Bathrooms', name: 'sharedBathrooms' },
        { label: 'Number of Private Rooms', name: 'privateRooms' },
        { label: 'Number of en-Suite Private Rooms', name: 'enSuitePrivateRooms' },
      ].map(({ label, name }) => (
        <div key={name} className="mb-4">
          <label className="block text-sm font-medium">{label}</label>
          <input
            type="text"
            name={name}
            value={formData[name as keyof typeof formData] as string}
            onChange={handleChange}
            placeholder={`Enter ${label.toLowerCase()}`}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}

      {/* Dorm Room Type */}
      <div className="mb-4">
        <h3 className="text-md font-semibold">Dorm Room Type</h3>
        {Object.keys(formData.dormRoomType).map((key) =>
          key !== 'other' ? (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                name={`dormRoomType.${key}`}
                checked={formData.dormRoomType[key as keyof typeof formData.dormRoomType] as boolean}
                onChange={handleChange}
                className="mr-2"
              />
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
          ) : null
        )}
        <input
          type="text"
          name="dormRoomType.other"
          value={formData.dormRoomType.other}
          onChange={handleChange}
          placeholder="Other (Specify)"
          className="w-full p-2 border rounded mt-2"
        />
      </div>

      {/* Dorm Room Features */}
      <div className="mb-4">
        <h3 className="text-md font-semibold">Dorm Room Features</h3>
        {Object.keys(formData.dormRoomFeatures).map((key) =>
          key !== 'other' ? (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                name={`dormRoomFeatures.${key}`}
                checked={formData.dormRoomFeatures[key as keyof typeof formData.dormRoomFeatures] as boolean}
                onChange={handleChange}
                className="mr-2"
              />
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
          ) : null
        )}
        <input
          type="text"
          name="dormRoomFeatures.other"
          value={formData.dormRoomFeatures.other}
          onChange={handleChange}
          placeholder="Other (Specify)"
          className="w-full p-2 border rounded mt-2"
        />
      </div>

      {/* Private Room Features */}
      <div className="mb-4">
        <h3 className="text-md font-semibold">Private Room Features</h3>
        {Object.keys(formData.privateRoomFeatures).map((key) =>
          key !== 'other' ? (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                name={`privateRoomFeatures.${key}`}
                checked={formData.privateRoomFeatures[key as keyof typeof formData.privateRoomFeatures] as boolean}
                onChange={handleChange}
                className="mr-2"
              />
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
          ) : null
        )}
        <input
          type="text"
          name="privateRoomFeatures.other"
          value={formData.privateRoomFeatures.other}
          onChange={handleChange}
          placeholder="Other (Specify)"
          className="w-full p-2 border rounded mt-2"
        />
      </div>
    </div>
  );
};

const BedBreakfastRoomBathroomDetails: React.FC<BedBreakfastRoomBathroomDetailsProps> = ({
  formType,
  handleInputChange,
}) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => {
      const updatedForm = { ...prev };
      const keys = name.split('.');

      if (keys.length === 2) {
        const [category, key] = keys;
        updatedForm[category] = {
          ...(prev[category as keyof typeof prev] as Record<string, any>),
          [key]: type === 'checkbox' ? checked : value,
        };
      } else {
        updatedForm[name] = value;
      }

      handleInputChange('bedBreakfastRoomBathroomDetails', updatedForm);
      return updatedForm;
    });
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-3">Room & Bathroom Details</h2>

      {/* Room Details */}
      {['numberOfBeds', 'numberOfRooms', 'numberOfEnSuiteRooms', 'numberOfSharedBathrooms'].map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-sm font-medium">{field.replace(/([A-Z])/g, ' $1')}</label>
          <input
            type="text"
            name={field}
            value={formData[field as keyof typeof formData] as string}
            onChange={handleChange}
            placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}

      {/* Room Amenities */}
      <div className="mb-4">
        <h3 className="text-md font-semibold">Room Amenities</h3>
        {Object.keys(formData.roomAmenities).map((key) =>
          key !== 'other' ? (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                name={`roomAmenities.${key}`}
                checked={formData.roomAmenities[key as keyof typeof formData.roomAmenities] as boolean}
                onChange={handleChange}
                className="mr-2"
              />
              {key.replace(/([A-Z])/g, ' $1')}
            </label>
          ) : null
        )}
        <input
          type="text"
          name="roomAmenities.other"
          value={formData.roomAmenities.other}
          onChange={handleChange}
          placeholder="Other (Specify)"
          className="w-full p-2 border rounded mt-2"
        />
      </div>

      {/* Bathroom Amenities */}
      <div className="mb-4">
        <h3 className="text-md font-semibold">Bathroom Amenities</h3>
        {Object.keys(formData.bathroomAmenities).map((key) =>
          key !== 'other' ? (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                name={`bathroomAmenities.${key}`}
                checked={formData.bathroomAmenities[key as keyof typeof formData.bathroomAmenities] as boolean}
                onChange={handleChange}
                className="mr-2"
              />
              {key.replace(/([A-Z])/g, ' $1')}
            </label>
          ) : null
        )}
        <input
          type="text"
          name="bathroomAmenities.other"
          value={formData.bathroomAmenities.other}
          onChange={handleChange}
          placeholder="Other (Specify)"
          className="w-full p-2 border rounded mt-2"
        />
      </div>
    </div>
  );
};

const HotelResortRoomBathroomDetails: React.FC<HotelResortRoomBathroomDetailsProps> = ({
  formType,
  handleInputChange,
}) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const updatedForm = { ...prev };
      const keys = name.split('.'); // Handle nested fields

      if (keys.length === 2) {
        const [category, key] = keys;
        updatedForm[category] = {
          ...(prev[category as keyof typeof prev] as Record<string, any>),
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

  return (
    <div className="p-4 bg-gray-100 rounded-lg my-4">
      <h2 className="text-lg font-semibold mb-3">Room & Bathroom Details</h2>

      {/* Room Details */}
      {[
        { label: 'Total Number of Beds', name: 'numberOfBeds' },
        { label: 'Number of Rooms', name: 'numberOfRooms' },
        { label: 'Number of Suites', name: 'numberOfSuites' },
      ].map(({ label, name }) => (
        <div key={name} className="mb-4">
          <label className="block text-sm font-medium">{label}</label>
          <input
            type="text"
            name={name}
            value={formData[name as keyof typeof formData] as string}
            onChange={handleChange}
            placeholder={`Enter ${label.toLowerCase()}`}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}

      {/* Room Amenities */}
      <div className="mb-4">
        <h3 className="text-md font-semibold">Room Amenities</h3>
        {Object.keys(formData.roomAmenities).map((key) =>
          key !== 'other' ? (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                name={`roomAmenities.${key}`}
                checked={formData.roomAmenities[key as keyof typeof formData.roomAmenities] as boolean}
                onChange={handleChange}
                className="mr-2"
              />
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
            </label>
          ) : null
        )}
        {/* Other Specify */}
        <input
          type="text"
          name="roomAmenities.other"
          value={formData.roomAmenities.other}
          onChange={handleChange}
          placeholder="Other (Specify)"
          className="w-full p-2 border rounded mt-2"
        />
      </div>

      {/* Bathroom Amenities */}
      <div className="mb-4">
        <h3 className="text-md font-semibold">Bathroom Amenities</h3>
        {Object.keys(formData.bathroomAmenities).map((key) =>
          key !== 'other' ? (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                name={`bathroomAmenities.${key}`}
                checked={formData.bathroomAmenities[key as keyof typeof formData.bathroomAmenities] as boolean}
                onChange={handleChange}
                className="mr-2"
              />
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
            </label>
          ) : null
        )}
        {/* Other Specify */}
        <input
          type="text"
          name="bathroomAmenities.other"
          value={formData.bathroomAmenities.other}
          onChange={handleChange}
          placeholder="Other (Specify)"
          className="w-full p-2 border rounded mt-2"
        />
      </div>
    </div>
  );
};

const NearbyAttractionsForm = ({ formType, handleInputChange }) => {
  const [attractions, setAttractions] = useState<
    {
      _key: string;
      name: string;
      distance: string;
      beach: boolean;
      desert: boolean;
      parkReserve: boolean;
      lake: boolean;
      river: boolean;
      kayakingCanoeing: boolean;
      hikingTrails: boolean;
      bikingTrails: boolean;
    }[]
  >([]);

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

  const removeAttraction = (index: number) => {
    const updatedAttractions = attractions.filter((_, i) => i !== index);
    setAttractions(updatedAttractions);
    handleInputChange('nearbyAttraction', updatedAttractions);
  };

  const handleChange = useCallback(
    (index: number, field: string, value: any) => {
      setAttractions((prevAttractions) => {
        const updatedAttractions = [...prevAttractions];
        updatedAttractions[index] = { ...updatedAttractions[index], [field]: value };
        handleInputChange('nearbyAttraction', updatedAttractions);
        return updatedAttractions;
      });
    },
    [handleInputChange]
  );

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md my-4">
      <h2 className="font-semibold mb-4">Nearby Attractions (Optional)</h2>

      {attractions.map((attraction, index) => (
        <div key={attraction._key} className="border p-4 mb-4 rounded-lg bg-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Attraction {index + 1}</h3>
            <button type="button" onClick={() => removeAttraction(index)} className="text-red-500 hover:text-red-700">
              Remove
            </button>
          </div>

          <input
            type="text"
            placeholder="Enter name of the tourist attraction"
            value={attraction.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
            className="w-full mt-2 p-2 border rounded"
          />

          <input
            type="text"
            placeholder="Distance (e.g., 5 km)"
            value={attraction.distance}
            onChange={(e) => handleChange(index, 'distance', e.target.value)}
            className="w-full mt-2 p-2 border rounded"
          />

          {/* Checkbox Options */}
          <div className="mt-2 grid grid-cols-2 gap-2">
            {Object.keys(defaultAttraction)
              .filter((key) => key !== '_key' && key !== 'name' && key !== 'distance')
              .map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={attraction[option as keyof typeof defaultAttraction] as boolean}
                    onChange={(e) => handleChange(index, option, e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>
                    {option
                      .replace(/([A-Z])/g, ' $1') // Add spaces before capital letters
                      .replace(/^./, (str) => str.toUpperCase())}{' '}
                    {/* Capitalize first letter */}
                  </span>
                </label>
              ))}
          </div>
        </div>
      ))}

      {/* Add More Button */}
      {attractions.length < 10 && (
        <button
          type="button"
          onClick={addAttraction}
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Attraction
        </button>
      )}
    </div>
  );
};

export default AccommodationForm;
