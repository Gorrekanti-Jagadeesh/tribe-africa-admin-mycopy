import React from 'react';
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

type BusinessType = 'night_club' | 'bar_pub' | 'clubs_special_groups' | 'restaurants';
type RestaurantSubCategoryTypes = 'traditional' | 'casual_dining' | 'beach_bar' | 'fine_dining' | 'street_food';
type ClubsAndSpecialGroupsTypes = 'rotary_club' | 'lions_club' | 'toastmasters' | 'masonic_lodges';

export interface weekTimes {
  start: string;
  end: string;
}

export interface AfterWorkFormInputs {
  businessName: string;
  businessAddress: {
    street: string;
    city: string;
    region: string;
    postalCode?: string;
    country: string;
  };
  businessContact: {
    phoneNumber: string;
    email: string;
    website: string;
  };
  socialmediaLinks: string[];
  businessType: BusinessType;
  restaurantSubCategory?: RestaurantSubCategoryTypes;
  clubsAndSpecialGroups?: ClubsAndSpecialGroupsTypes;
  cuisineType: {
    african: boolean;
    Italian: boolean;
    Chinese: boolean;
    Indian: boolean;
    Mexican: boolean;
    Vegan_vegetarian: boolean;
    Seafood: boolean;
    other: string;
  };
  keyFeatures: {
    Halal: boolean;
    Kosher: boolean;
    NoAlcoholServed: boolean;
    PetFriendly: boolean;
    DanceFloors: boolean;
    LiveMusic: boolean;
    Karaoke: boolean;
    TriviaNights: boolean;
    ComedyShows: boolean;
    DJNightlife: boolean;
    OutdoorSeating: boolean;
    HappyHourSpecials: boolean;
    AvailableForPrivateEvents: boolean;
    AvailableForCorporateEvents: boolean;
    FamilyFriendly: boolean;
    ThemedNights: boolean;
    SeasonalOrHolidaySpecials: boolean;
    WeeklySpecials: boolean;
    BirthdayEventPackages: boolean;
    LiveStreamingOnlineEvents: boolean;
    SportsViewing: boolean;
    SalahRoomArea: boolean;
    Other: string;
  };
  indoorSeatingCapacity: string;
  outdoorSeatingCapacity: string;
  menuServicesAtmosphereHighlights: string;
  fullDescription: string;
  uploadMenu: FileList;
  operatingHours: {
    monday: weekTimes;
    tuesday: weekTimes;
    wednesday: weekTimes;
    thursday: weekTimes;
    friday: weekTimes;
    saturday: weekTimes;
    sunday: weekTimes;
  };
  ageRestriction: string;
  businessLogo: FileList;
  businessPhotos: FileList;
  ownerContactDetails: {
    name: string;
    role: string;
    phoneNumber: string;
    email: string;
    emergencyContact?: string;
    idPhoto?: File;
  };
  signature: string;
  consent: boolean;
  confirmation: boolean;
  date: string;
}

const AfterWorkFrom: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AfterWorkFormInputs>({
    defaultValues: {
      operatingHours: {
        monday: { start: '', end: '' },
        tuesday: { start: '', end: '' },
        wednesday: { start: '', end: '' },
        thursday: { start: '', end: '' },
        friday: { start: '', end: '' },
        saturday: { start: '', end: '' },
        sunday: { start: '', end: '' },
      },
    },
  });

  // const [formType, setFormType] = useState(null);
  const { control } = useForm();

  const typeOfBusiness = watch('businessType');

  const onAfterFormSubmit: SubmitHandler<AfterWorkFormInputs> = async (data) => {
    console.log(data);
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
          <DynamicFields
            fields={[
              {
                type: 'text',
                name: 'Social Media Links',
                placeholder: 'Social Media Links',
              },
            ]}
            setValue={() => {}}
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
        {typeOfBusiness === 'clubs_special_groups' && (
          <div className="flex flex-col gap-2">
            <CustomSelect
              {...register('clubsAndSpecialGroups', { required: 'Clubs and Special Groups Sub Category is required' })}
              placeholder="Clubs and Special Groups"
              options={afterWorkClubsAndSpecialGroupType}
              label="Clubs and Special Groups"
              error={errors.clubsAndSpecialGroups}
            />
          </div>
        )}
        {/* Business Cuisine Type */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Cuisine Type</label>
          <Checkbox {...register(`cuisineType.african`)} label={'African (Specify type/Region'} onChange={() => {}} />
          <Checkbox {...register(`cuisineType.Italian`)} label={'Italian'} onChange={() => {}} />
          <Checkbox {...register(`cuisineType.Chinese`)} label={'Chinese'} onChange={() => {}} />
          <Checkbox {...register(`cuisineType.Indian`)} label={'Indian'} onChange={() => {}} />
          <Checkbox {...register(`cuisineType.Mexican`)} label={'Mexican'} onChange={() => {}} />
          <Checkbox {...register(`cuisineType.Vegan_vegetarian`)} label={'Vegan/Vegetarian'} onChange={() => {}} />
          <Checkbox {...register(`cuisineType.Seafood`)} label={'Seafood'} onChange={() => {}} />
          <Checkbox {...register(`cuisineType.other`)} label={'Other'} onChange={() => {}} />
        </div>
        {/* Business Key Features */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Key Features</label>
          <Checkbox {...register(`keyFeatures.Halal`)} label={'Halal'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.Kosher`)} label={'Kosher'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.NoAlcoholServed`)} label={'No Alcohol Served'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.PetFriendly`)} label={'Pet Friendly'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.DanceFloors`)} label={'Dance Floors'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.LiveMusic`)} label={'Live Music'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.Karaoke`)} label={'Karaoke'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.TriviaNights`)} label={'Trivia Nights'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.ComedyShows`)} label={'Comedy Shows'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.DJNightlife`)} label={'DJ Nightlife'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.OutdoorSeating`)} label={'Outdoor Seating'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.HappyHourSpecials`)} label={'Happy Hour Specials'} onChange={() => {}} />
          <Checkbox
            {...register(`keyFeatures.AvailableForPrivateEvents`)}
            label={'Available For Private Events'}
            onChange={() => {}}
          />
          <Checkbox
            {...register(`keyFeatures.AvailableForCorporateEvents`)}
            label={'Available For Corporate Events'}
            onChange={() => {}}
          />
          <Checkbox {...register(`keyFeatures.FamilyFriendly`)} label={'Family Friendly'} onChange={() => {}} />
          <Checkbox {...register(`keyFeatures.ThemedNights`)} label={'Themed Nights'} onChange={() => {}} />
          <Checkbox
            {...register(`keyFeatures.SeasonalOrHolidaySpecials`)}
            label={'Seasonal or Holiday Specials'}
            onChange={() => {}}
          />
          <Checkbox {...register(`keyFeatures.WeeklySpecials`)} label={'Weekly Specials'} onChange={() => {}} />
          <Checkbox
            {...register(`keyFeatures.BirthdayEventPackages`)}
            label={'Birthday/Event Packages'}
            onChange={() => {}}
          />
          <Checkbox
            {...register(`keyFeatures.LiveStreamingOnlineEvents`)}
            label={'Live Streaming/Online Events'}
            onChange={() => {}}
          />
          <Checkbox {...register(`keyFeatures.SportsViewing`)} label={'Sports Viewing'} onChange={() => {}} />
          <Checkbox
            {...register(`keyFeatures.SalahRoomArea`)}
            label={'Salah Room/area ( Muslim prayer area'}
            onChange={() => {}}
          />
          <Checkbox {...register(`keyFeatures.Other`)} label={'Other'} onChange={() => {}} />
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
        <div className="flex flex-col gap-2">
          <RichTextEditor
            label="Menu/Services/Atmosphere Highlights:"
            placeholder="30 words max. Highlight your signature dishes, cocktails, Views, or services"
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
            height={80}
            onContentChange={(content) => setValue('menuServicesAtmosphereHighlights', content)}
            error={errors?.menuServicesAtmosphereHighlights?.message}
            required={false}
          />
        </div>
        {/* Business Full Description */}
        <div className="flex flex-col gap-2">
          <RichTextEditor
            label="Full Description"
            placeholder="100 - 500 words – detailed description including ambiance, offerings, and specialties"
            {...register('fullDescription', {
              required: 'About Event is required',
              minLength: {
                value: 500,
                message: 'Full Description must be at least 500 characters',
              },
              maxLength: {
                value: 1000,
                message: 'Full Description must not exceed 1000 characters',
              },
            })}
            onContentChange={(content) => setValue('fullDescription', content)}
            error={errors.fullDescription?.message}
            required
          />
        </div>
        {/* Business Menu Photo */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Upload Menu</label>
          <Controller
            name="uploadMenu"
            control={control}
            render={({ field }) => <FileUploadWithPreview {...field} control={control} maxFilesLength={1} />}
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
          <label className="font-semibold">Upload Business Logo:</label>
          <FileUploadWithPreview control={control} maxFilesLength={1} />
        </div>
        {/* Business Photos */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Upload Photos of Business and Offerings:</label>
          <FileUploadWithPreview control={control} maxFilesLength={5} />
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
            label=""
          />
          <FileUploadWithPreview control={control} maxFilesLength={1} />
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
