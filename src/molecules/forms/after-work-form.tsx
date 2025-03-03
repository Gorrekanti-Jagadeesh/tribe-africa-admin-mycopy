import React, { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import FileUploadWithPreview from '@atoms/input-elements/file-upload-with-preview';
import DynamicFields from '@atoms/input-elements/dynamic-fields';
import Checkbox from '@/atoms/input-elements/checkbox';
import Button from '@/atoms/custom-button/button';
import { RichTextEditor } from '@/atoms/input-elements/rich-text-editor';
import CustomInput from '@/atoms/input-elements/custom-input';
import {
  africanCountriesPhoneCodes,
  afterWorkBusinessType,
  afterWorkClubsAndSpecialGroupType,
  afterWorkRestaurantsType,
  Countries,
} from '@/data';
import MobileNumberInput from '@/atoms/input-elements/contact-custom-input';
import { CustomSelect } from '@/atoms/input-elements/cutom-select';
import { sanity, processContent, splitRichText } from '@/utils/sanity';
import { useQuery } from '@tanstack/react-query';
import { uploadImage } from '@api/index';
import sanityClient from '@/sanityClient';
import { generateId } from '@utils/common';

type BusinessType = 'night_club' | 'bar_pub' | 'clubs_special_groups' | 'restaurants';
type RestaurantSubCategoryTypes = 'traditional' | 'casual_dining' | 'beach_bar' | 'fine_dining' | 'street_food';
type ClubsAndSpecialGroupsTypes = 'rotary_club' | 'lions_club' | 'toastmasters' | 'masonic_lodges';

export interface weekTimes {
  start: string;
  end: string;
}

export interface AfterWorkFormInputs {
  restaurantSubCategory: string;
  ageRestriction: string;
  businessAddress: {
    region: string;
    country: string;
    city: string;
    street: string;
    postalCode: string;
  };
  businessContact: {
    phoneNumber: string;
    countryCode: string;
    email: string;
    website?: string;
  };
  businessLogo: File;
  businessPhotos: FileList;
  businessName: string;
  businessType: string;
  confirmation: boolean;
  consent: boolean;
  cuisineType: {
    african: boolean;
    italian: boolean;
    chinese: boolean;
    indian: boolean;
    mexican: boolean;
    vegan_vegetarian: boolean;
    seafood: boolean;
    other: string;
  };
  otherCuisineType?: string; // Optional field if "other" is selected
  fullDescription: string;
  indoorSeatingCapacity: string;
  keyFeatures: {
    halal?: boolean;
    kosher?: boolean;
    noAlcoholServed?: boolean;
    petFriendly?: boolean;
    danceFloors?: boolean;
    liveMusic?: boolean;
    karaoke?: boolean;
    triviaNights?: boolean;
    comedyShows?: boolean;
    djNightlife?: boolean;
    outdoorSeating?: boolean;
    happyHourSpecials?: boolean;
    privateEvents?: boolean;
    corporateEvents?: boolean;
    familyFriendly?: boolean;
    themedNights?: boolean;
    seasonalHolidaySpecials?: boolean;
    weeklySpecials?: boolean;
    birthdayEventPackages?: boolean;
    liveStreamingOnline?: boolean;
    sportsViewing?: boolean;
    salahRoomArea?: boolean;
    other?: boolean;
  };
  otherKeyFeature?: string; // If "other" is selected, specify
  menuServicesAtmosphereHighlights: string;
  operatingHours: {
    monday?: { start: string; end: string };
    tuesday?: { start: string; end: string };
    wednesday?: { start: string; end: string };
    thursday?: { start: string; end: string };
    friday?: { start: string; end: string };
    saturday?: { start: string; end: string };
    sunday?: { start: string; end: string };
  };
  outdoorSeatingCapacity: string;
  ownerContactDetails: {
    name: string;
    role?: string;
    phoneNumber: string;
    countryCode: string;
    email: string;
    emergencyContact?: string;
    emergencyContactCountryCode?: string;
  };
  ownerIdPhoto?: File;
  restaurantCategory: string;
  signature: string;
  socialMedia?: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  uploadMenu: File;
}

const AfterWorkFrom: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    control,
  } = useForm<AfterWorkFormInputs>({
    defaultValues: {},
  });

  // const [formType, setFormType] = useState(null);
  // const { control } = useForm();

  const typeOfBusiness = watch('businessType');

  const { data, error, isLoading } = useQuery({
    queryKey: ['after-work-form'],
    queryFn: () => sanity.GET(`*[_type == "afterWorkListing"]`),
  });

  const onAfterFormSubmit: SubmitHandler<AfterWorkFormInputs> = async (data) => {
    try {
      // Display loader

      // Convert RichText fields to Portable Text format
      const fullDescription = data.fullDescription;
      const menuServicesAtmosphereHighlights = data.menuServicesAtmosphereHighlights;

      // Handle image uploads
      const businessLogo = await uploadImage(data.businessLogo);
      const businessMenu = await uploadImage(data.uploadMenu);
      const ownerIdPhoto = await uploadImage(data.ownerIdPhoto);
      // const businessPhotos = await uploadImage(data.businessPhotos);

      const ownerDetails = {
        ...data.ownerContactDetails,
        ownerIdPhoto: {
          _type: 'image',
          asset: { _ref: ownerIdPhoto._id },
        },
      };

      console.log(data);

      // Submit to Sanity
      // await sanityClient.create({
      //   _type: 'afterWorkListing', // Sanity schema type
      //   _id: `drafts.${generateId()}`, // Unique ID for draft
      //   ageRestriction: data.ageRestriction,
      //   businessAddress: {
      //     street: data.businessAddress.street,
      //     city: data.businessAddress.city,
      //     region: data.businessAddress.region,
      //     postalCode: data.businessAddress.postalCode,
      //     country: data.businessAddress.country,
      //   },
      //   businessContact: {
      //     phoneNumber: data.businessContact.phoneNumber,
      //     countryCode: data.businessContact.countryCode,
      //     email: data.businessContact.email,
      //     website: data.businessContact.website,
      //   },
      //   businessLogo: {
      //     _type: 'image',
      //     asset: { _ref: businessLogo._id },
      //   },
      //   businessName: data.businessName,
      //   businessType: data.businessType,
      //   confirmation: data.confirmation,
      //   consent: data.consent,
      //   cuisineType: data.cuisineType,
      //   fullDescription: fullDescription,
      //   indoorSeatingCapacity: data.indoorSeatingCapacity,
      //   keyFeatures: data.keyFeatures,
      //   menuServicesAtmosphereHighlights: menuServicesAtmosphereHighlights,
      //   operatingHours: data.operatingHours,
      //   otherCuisineType: data.otherCuisineType,
      //   otherKeyFeature: data.otherKeyFeature,
      //   outdoorSeatingCapacity: data.outdoorSeatingCapacity,
      //   ownerContactDetails: ownerDetails,
      //   restaurantCategory: data.restaurantCategory,
      //   signature: data.signature,
      //   socialMedia: data.socialMedia,
      //   uploadMenu: {
      //     _type: 'image',
      //     asset: { _ref: businessMenu._id },
      //   },
      // });

      // Notify success
      alert('Event submitted successfully!');
    } catch (error) {
      // Handle errors
      console.error('Error submitting event:', error);
      alert('Failed to submit event. Please try again.');
    } finally {
      // Hide loader
      // setLoader(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">After Work Registration Form</h2>
      <form onSubmit={handleSubmit(onAfterFormSubmit)}>
        {/* Business Name */}
        <div className="flex flex-col gap-2">
          <CustomInput
            {...register('businessName')}
            label={'Business Name'}
            placeholder="Business Name"
            error={errors.businessName}
          />
        </div>
        {/* Business Address */}
        <div className="flex flex-col gap-2">
          <CustomInput
            {...register(`businessAddress.street`)}
            label={'Business Address'}
            placeholder="street"
            error={errors.businessAddress?.street}
          />
          <CustomInput
            {...register(`businessAddress.city`)}
            //   label={'Business Address'}
            placeholder="City"
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
            placeholder="Postal Code"
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
          <select
            {...register('businessAddress.country', { required: 'Please provide Country' })}
            className={`p-2 text-sm block w-1/2 h-10 bg-transparent border outline-none rounded-md focus:border-orange-500
                  ${errors.businessAddress?.country ? 'border-red-500' : 'border-gray-400'}`}
          >
            <option value="">Select Country</option>
            {Countries.map((country) => (
              <option key={country.label} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          {errors.businessAddress?.country && <span className="text-red-500 text-xs">Please Select the country</span>}
        </div>
        {/* Business Contact Details */}
        <div className="flex flex-col gap-2">
          <MobileNumberInput
            register={register}
            errors={[errors.businessContact?.phoneNumber, errors.businessContact?.phoneNumber]}
            phoneName={'businessContact.phoneNumber'}
            countryCodeName="businessContact.countryCode"
            countryCodes={africanCountriesPhoneCodes}
            label="Contact Number for Enquiries:"
          />
          <CustomInput
            {...register('businessContact.email', { required: 'Email is required' })}
            placeholder="Email"
            error={errors.businessContact?.email}
            type="email"
          />

          <CustomInput
            {...register('businessContact.website')}
            //   label={'Website (if applicable)'}
            placeholder="Website URL"
            error={errors.businessContact?.website}
            type="url"
            required={false}
          />
        </div>
        {/* Business Social Media Links */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Social Media Links</label>
          <CustomInput
            {...register('socialMedia.facebook')}
            placeholder="Facebook Profile"
            error={errors?.socialMedia?.facebook}
            required={false}
            type="url"
          />
          <CustomInput
            {...register('socialMedia.instagram')}
            placeholder="Instagram Profile"
            error={errors?.socialMedia?.instagram}
            required={false}
            type="url"
          />
          <CustomInput
            {...register('socialMedia.linkedin')}
            placeholder="Linkedin Profile"
            error={errors?.socialMedia?.linkedin}
            required={false}
            type="url"
          />
          <CustomInput
            {...register('socialMedia.twitter')}
            placeholder="Twitter Profile"
            error={errors?.socialMedia?.twitter}
            required={false}
            type="url"
          />
        </div>
        {/* Business Type */}
        <div className="flex flex-col gap-2">
          <CustomSelect
            {...register('businessType', { required: 'Business Type is required' })}
            placeholder="Business Type"
            options={afterWorkBusinessType}
            label="Business Type"
            error={errors.businessType}
            // onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
          />
        </div>
        {typeOfBusiness === 'restaurants' && (
          <div className="flex flex-col gap-2">
            <CustomSelect
              {...register('restaurantSubCategory', { required: 'Restaurants Sub Category is required' })}
              placeholder="Restaurants Sub Category"
              options={afterWorkRestaurantsType}
              label="Restaurants Sub Category"
              error={errors.restaurantSubCategory}
            />
          </div>
        )}
        {/* {typeOfBusiness === 'clubs_special_groups' && (
          <div className="flex flex-col gap-2">
            <CustomSelect
              {...register('clubsAndSpecialGroups', { required: 'Clubs and Special Groups Sub Category is required' })}
              placeholder="Clubs and Special Groups"
              options={afterWorkClubsAndSpecialGroupType}
              label="Clubs and Special Groups"
              error={errors.clubsAndSpecialGroups}
            />
          </div>
        )} */}
        {/* Business Cuisine Type */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Cuisine Type</label>
          <Checkbox {...register(`cuisineType.african`)} label={'African (Specify type/Region'} onChange={() => {}} />
          <Checkbox {...register(`cuisineType.italian`)} label={'Italian'} onChange={() => {}} />
          <Checkbox {...register(`cuisineType.chinese`)} label={'Chinese'} onChange={() => {}} />
          <Checkbox {...register(`cuisineType.indian`)} label={'Indian'} onChange={() => {}} />
          <Checkbox {...register(`cuisineType.mexican`)} label={'Mexican'} onChange={() => {}} />
          <Checkbox {...register(`cuisineType.vegan_vegetarian`)} label={'Vegan/Vegetarian'} onChange={() => {}} />
          <Checkbox {...register(`cuisineType.seafood`)} label={'Seafood'} onChange={() => {}} />
          <Checkbox {...register(`cuisineType.other`)} label={'Other'} onChange={() => {}} />
        </div>
        {/* Business Key Features */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Key Features</label>
          <Checkbox {...register(`keyFeatures.halal`)} label={'Halal'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.kosher`)} label={'Kosher'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.noAlcoholServed`)} label={'No Alcohol Served'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.petFriendly`)} label={'Pet Friendly'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.danceFloors`)} label={'Dance Floors'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.liveMusic`)} label={'Live Music'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.karaoke`)} label={'Karaoke'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.triviaNights`)} label={'Trivia Nights'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.comedyShows`)} label={'Comedy Shows'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.djNightlife`)} label={'DJ Nightlife'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.outdoorSeating`)} label={'Outdoor Seating'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.happyHourSpecials`)} label={'Happy Hour Specials'} onChange={() => {}} />
          <Checkbox
            {...register(`keyFeatures.privateEvents`)}
            label={'Available For Private Events'}
            onChange={() => {}}
          />
          <Checkbox
            {...register(`keyFeatures.corporateEvents`)}
            label={'Available For Corporate Events'}
            onChange={() => {}}
          />
          <Checkbox {...register(`keyFeatures.familyFriendly`)} label={'Family Friendly'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.themedNights`)} label={'Themed Nights'} onChange={() => {}} />
          <Checkbox
            {...register(`keyFeatures.seasonalHolidaySpecials`)}
            label={'Seasonal or Holiday Specials'}
            onChange={() => {}}
          />
          <Checkbox {...register(`keyFeatures.weeklySpecials`)} label={'Weekly Specials'} onChange={() => {}} />
          <Checkbox
            {...register(`keyFeatures.birthdayEventPackages`)}
            label={'Birthday/Event Packages'}
            onChange={() => {}}
          />
          <Checkbox
            {...register(`keyFeatures.liveStreamingOnline`)}
            label={'Live Streaming/Online Events'}
            onChange={() => {}}
          />
          <Checkbox {...register(`keyFeatures.sportsViewing`)} label={'Sports Viewing'} onChange={() => {}} />
          <Checkbox
            {...register(`keyFeatures.salahRoomArea`)}
            label={'Salah Room/area ( Muslim prayer area'}
            onChange={() => {}}
          />
          <Checkbox {...register(`keyFeatures.other`)} label={'Other'} onChange={() => {}} />
        </div>
        {/* Business Indoor Seatting Capacity */}
        <div className="flex flex-col gap-2">
          <CustomInput
            {...register('indoorSeatingCapacity')}
            label={'Indoor Seating Capacity: (Fill in Details)'}
            placeholder="Indoor Seating Capacity"
            error={errors.indoorSeatingCapacity}
          />
        </div>
        {/* Business Outdoor Seating Capacity */}
        <div className="flex flex-col gap-2">
          <CustomInput
            {...register('outdoorSeatingCapacity')}
            label={'Outdoor Seating Capacity: (Fill in Details)'}
            placeholder="Outdoor Seating Capacity"
            error={errors.outdoorSeatingCapacity}
          />
        </div>
        {/*Business Menu/Services/Atmosphere Highlights */}
        {/* Menu/Services/Atmosphere Highlights */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Menu/Services/Atmosphere Highlights:</label>
          <textarea
            placeholder="30 words max. Highlight your signature dishes, cocktails, views, or services"
            {...register('menuServicesAtmosphereHighlights', {
              minLength: {
                value: 10,
                message: 'Description must be at least 10 characters',
              },
              maxLength: {
                value: 100,
                message: 'Description must not exceed 100 characters',
              },
            })}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4} // Adjust height
            onChange={(e) => setValue('menuServicesAtmosphereHighlights', e.target.value)}
          />
          {errors.menuServicesAtmosphereHighlights && (
            <p className="text-red-500 text-sm">{errors.menuServicesAtmosphereHighlights.message}</p>
          )}
        </div>

        {/* Business Full Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Full Description:</label>
          <textarea
            placeholder="100 - 500 words – detailed description including ambiance, offerings, and specialties"
            {...register('fullDescription', {
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
            onChange={(e) => setValue('fullDescription', e.target.value)}
          />
          {errors.fullDescription && <p className="text-red-500 text-sm">{errors.fullDescription.message}</p>}
        </div>
        {/* Business Menu Photo */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Upload Menu</label>
          <Controller
            name="uploadMenu"
            control={control}
            render={({ field }) => (
              <FileUploadWithPreview
                {...field}
                control={control}
                maxFilesLength={1}
                setValue={setValue}
                fieldName="uploadMenu"
              />
            )}
          />
          {/* <FileUploadWithPreview control={control} maxFilesLength={1} /> */}
        </div>
        {/* Business Operating Hours */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Operating Hours</label>
          {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
            <div key={day} className="flex flex-col gap-2">
              <label className="font-medium">{day.charAt(0).toUpperCase() + day.slice(1)}</label>
              <div className="flex space-x-4">
                <Controller
                  name={`operatingHours.${day}.start`}
                  control={control}
                  render={({ field }) => (
                    <input type="time" {...field} className="w-1/2 p-2 border rounded-md" required />
                  )}
                />
                <span className="text-xl">to</span>
                <Controller
                  name={`operatingHours.${day}.end`}
                  control={control}
                  render={({ field }) => (
                    <input type="time" {...field} className="w-1/2 p-2 border rounded-md" required />
                  )}
                />
              </div>
              {errors.operatingHours?.[day] && <span className="text-red-500 text-xs">Please provide valid times</span>}
            </div>
          ))}
        </div>
        {/* Business Age Restrictions */}
        <div className="flex flex-col gap-2">
          <CustomInput
            {...register('ageRestriction')}
            label={'Age Restrictions(if any):'}
            placeholder="Age Restrictions"
            error={errors.ageRestriction}
          />
        </div>
        {/* Business Logo */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Upload Business Logo:</label>
            <FileUploadWithPreview control={control} maxFilesLength={1} setValue={setValue} fieldName="businessLogo" />
          </div>
        </div>
        {/* Business Photos */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Upload Photos of Business and Offerings:</label>
          <FileUploadWithPreview
            control={control}
            maxFilesLength={5}
            // setValue={setValue}
            fieldName="businessPhotos"
            onChange={(files) => {
              // Ensure the files are being handled correctly
              setValue('businessPhotos', files); // Ensure files are passed correctly as File objects
            }}
          />
        </div>
        {/* Business Owner Contact Details */}
        <div className="flex flex-col gap-2">
          <CustomInput
            {...register('ownerContactDetails.name')}
            label={'Owner/Manager Details (Fill in Details)'}
            placeholder="Full Name"
            error={errors.ownerContactDetails?.name}
          />
          <CustomInput
            {...register(`ownerContactDetails.role`)}
            //   label={'Business Address'}
            placeholder="Role"
            error={errors.ownerContactDetails?.role}
          />
          <MobileNumberInput
            register={register}
            errors={[errors.ownerContactDetails?.phoneNumber, errors.ownerContactDetails?.phoneNumber]}
            phoneName={'ownerContactDetails.phoneNumber'}
            countryCodeName="ownerContactDetails.countryCode"
            countryCodes={africanCountriesPhoneCodes}
            label=""
          />
          <CustomInput
            {...register(`ownerContactDetails.email`)}
            //   label={'Business Address'}
            placeholder="Email"
            error={errors.ownerContactDetails?.email}
            required={false}
          />
          <MobileNumberInput
            register={register}
            errors={[errors.ownerContactDetails?.emergencyContact, errors.ownerContactDetails?.emergencyContact]}
            countryCodes={africanCountriesPhoneCodes}
            phoneName={'ownerContactDetails.emergencyContact'}
            countryCodeName="ownerContactDetails.emergencyContactCountryCode"
            label=""
          />
          <FileUploadWithPreview control={control} maxFilesLength={1} setValue={setValue} fieldName="ownerIdPhoto" />
        </div>
        {/* Business Details Confirmation checkboxes */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Consent to Listing:</label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('consent', {
                required: 'You must consent that all business details are accurate.',
              })}
              className="h-4 w-4 rounded border-gray-400"
            />
            I consent to my business information being listed in the Tribe Africa Pages Directory.
          </label>
          {errors.consent && <span className="text-red-500 text-xs">{errors.consent?.message}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Accuracy Verification:</label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('confirmation', {
                required: 'You must confirmation that all business details are accurate.',
              })}
              className="h-4 w-4 rounded border-gray-400"
            />
            I confirm that the information provided is accurate to the best of my knowledge.
          </label>
          {errors.confirmation && <span className="text-red-500 text-xs">{errors.confirmation?.message}</span>}
        </div>
        <Button className="float-right my-4 px-4" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AfterWorkFrom;
