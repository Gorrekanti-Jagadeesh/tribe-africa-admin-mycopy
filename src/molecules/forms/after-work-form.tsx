import React, { useEffect, useState } from 'react';
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
import { deepMerge } from '@/utils/common';

export interface weekTimes {
  start: string;
  end: string;
}

export interface AfterWorkFormInputs {
  businessDetails: {
    businessName: string;
    address: {
      street: string;
      city: string;
      region: string;
      postalCode: string;
      country: string;
    };
  };
  businessContact: {
    phoneNumber: string;
    email: string;
    website?: string;
    socialMedia?: {
      linkedin?: string;
      facebook?: string;
      instagram?: string;
      twitter?: string;
      tiktok: string;
    };
  };
  businessType: string;
  restaurantSubCategory: string;
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
  indoorSeatingCapacity: string;
  outdoorSeatingCapacity: string;
  menuServicesAtmosphereHighlights: string;
  fullDescription: string;
  uploadMenu: string[];
  operatingHours: {
    monday?: { start: string; end: string };
    tuesday?: { start: string; end: string };
    wednesday?: { start: string; end: string };
    thursday?: { start: string; end: string };
    friday?: { start: string; end: string };
    saturday?: { start: string; end: string };
    sunday?: { start: string; end: string };
  };
  ageRestriction: string;
  businessLogo: File;
  businessPhotos: string[];
  ownerContactDetails: {
    name: string;
    role?: string;
    phoneNumber: string;
    email: string;
    emergencyContact?: string;
    emergencyContactCountryCode?: string;
    ownerIdPhoto?: File;
  };

  confirmation: boolean;
  consent: boolean;
  signature: string;
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

  const onAfterFormSubmit: SubmitHandler<AfterWorkFormInputs> = async (data) => {
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
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">After Work Registration Form</h2>
      <form onSubmit={handleSubmit(onAfterFormSubmit)}>
        {/* Business Name */}
        <div>
          <CustomInput
            {...register('businessDetails.businessName')}
            label={'Business Name'}
            placeholder="Business Name"
            // error={errors.businessDetails.businessName}
          />
        </div>
        {/* Business Address */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold mt-6">{'Business Address'}</label>

          <CustomInput
            {...register(`businessDetails.address.street`)}
            // label={'Street Address'}
            placeholder="street"
            // error={errors.businessAddress?.street}
          />
          <CustomInput
            {...register(`businessDetails.address.city`)}
            // label={'Town/City'}
            placeholder="Town/City"
            // error={errors.businessAddress?.city}
          />
          <CustomInput
            {...register(`businessDetails.address.region`)}
            //   label={'Business Address'}
            placeholder="State/Region"
            // error={errors.businessAddress?.region}
          />
          <CustomInput
            {...register(`businessDetails.address.postalCode`)}
            //   label={'Business Address'}
            placeholder="Postal Code (Optional)"
            // error={errors.businessAddress?.postalCode}
            required={false}
          />
          <CustomInput
            {...register(`businessDetails.address.country`)}
            //   label={'Business Address'}
            placeholder="Country"
            // error={errors.businessAddress?.postalCode}
            required={false}
          />
        </div>
        {/* Business Contact Details */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold mt-6">{'Contact Information'}</label>

          <CustomInput
            {...register('businessContact.phoneNumber', { required: 'Phone number is required' })}
            placeholder="Phone Number (Primary contact number)"
            error={errors.businessContact?.phoneNumber}
            type="number"
          />
          <CustomInput
            {...register('businessContact.email', { required: 'Email is required' })}
            placeholder="Email Address (For inquires and official correspondence)"
            error={errors.businessContact?.email}
            type="email"
          />

          <CustomInput
            {...register('businessContact.website')}
            //   label={'Website (if applicable)'}
            placeholder="Website URL (Provide a link of your official website) Optional"
            error={errors.businessContact?.website}
            type="url"
            required={false}
          />
        </div>
        {/* Business Social Media Links */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Social Media Links(Add links to your social media profiles)</label>
          <CustomInput
            {...register('businessContact.socialMedia.facebook')}
            placeholder="Facebook Profile"
            // error={errors?.socialMedia?.facebook}
            required={false}
            type="url"
          />
          <CustomInput
            {...register('businessContact.socialMedia.instagram')}
            placeholder="Instagram Profile"
            // error={errors?.socialMedia?.instagram}
            required={false}
            type="url"
          />
          <CustomInput
            {...register('businessContact.socialMedia.linkedin')}
            placeholder="Linkedin Profile"
            // error={errors?.socialMedia?.linkedin}
            required={false}
            type="url"
          />
          <CustomInput
            {...register('businessContact.socialMedia.twitter')}
            placeholder="Twitter Profile"
            // error={errors?.socialMedia?.twitter}
            required={false}
            type="url"
          />
          <CustomInput
            {...register('businessContact.socialMedia.twitter')}
            placeholder="Tiktok Profile"
            // error={errors?.socialMedia?.twitter}
            required={false}
            type="url"
          />
        </div>
        {/* Business Type */}
        <div className="flex flex-col gap-2 mt-6 mb-6">
          <CustomSelect
            {...register('businessType', { required: 'Business Type is required' })}
            placeholder="Business Type"
            options={afterWorkBusinessType}
            label="Business Type"
            error={errors.businessType}
            // onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
          />
        </div>
        {typeOfBusiness === 'restaurantseateries' && (
          <div className="flex flex-col gap-2 mb-6">
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
          <label className="font-semibold">Cuisine Type (For venues that serve food)</label>
          {[
            { key: 'african', label: 'African (Specify type/Region)' },
            { key: 'italian', label: 'Italian' },
            { key: 'chinese', label: 'Chinese' },
            { key: 'indian', label: 'Indian' },
            { key: 'mexican', label: 'Mexican' },
            { key: 'vegan_vegetarian', label: 'Vegan/Vegetarian' },
            { key: 'seafood', label: 'Seafood' },
            { key: 'other', label: 'Other' },
          ].map(({ key, label }) => (
            <Checkbox
              key={key}
              {...register(`cuisineType.${key}`)}
              label={label}
              onChange={(e) => handleInputChange(`cuisineType.${key}`, e)}
            />
          ))}
        </div>
        {/* Business Key Features */}
        <div className="flex flex-col gap-2 mt-6">
          <label className="font-semibold">Key Features (Select all that apply)</label>
          {[
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
          ].map(({ key, label }) => (
            <Checkbox
              key={key}
              {...register(`keyFeatures.${key}`)}
              label={label}
              onChange={(e) => handleInputChange(`keyFeatures.${key}`, e)}
            />
          ))}
        </div>
        {/* Business Indoor Seatting Capacity */}
        <div className="flex flex-col gap-2 mt-6">
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
          <label className="font-semibold mt-6">Menu/Services/Atmosphere Highlights:</label>
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
          <label className="font-semibold mt-6">Full Description:</label>
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
        <SingleImageUpload fieldName="uploadMenu" title="Upload Menu" handleInputChange={handleInputChange} />

        {/* Business Operating Hours */}
        <div className="flex flex-col gap-2 mt-6">
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
        <div className="flex flex-col gap-2 mt-6">
          <CustomInput
            {...register('ageRestriction')}
            label={'Age Restrictions(if any):'}
            placeholder="Age Restrictions"
            error={errors.ageRestriction}
          />
        </div>
        {/* Business Logo */}
        <SingleImageUpload
          fieldName="businessLogo"
          title="Upload Business Logo:"
          handleInputChange={handleInputChange}
        />

        {/* Business Photos */}
        <MultipleImageUpload
          fieldName="businessPhotos"
          title="Upload Photos of Business and Offerings:"
          handleInputChange={handleInputChange}
        />

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
            placeholder="Role (Owner/ Manager)"
            error={errors.ownerContactDetails?.role}
          />
          <CustomInput
            {...register(`ownerContactDetails.phoneNumber`)}
            //   label={'Business Address'}
            placeholder="Phone Number"
            error={errors.ownerContactDetails?.phoneNumber}
          />
          <CustomInput
            {...register(`ownerContactDetails.email`)}
            //   label={'Business Address'}
            placeholder="Email Address"
            error={errors.ownerContactDetails?.email}
            required={false}
          />
          <CustomInput
            {...register(`ownerContactDetails.emergencyContact`)}
            //   label={'Business Address'}
            placeholder="Emergency Contact (Optional):"
            error={errors.ownerContactDetails?.emergencyContact}
          />
          <SingleImageUpload
            fieldName="ownerContactDetails.ownerIdPhoto"
            title="Upload Passport/ID:"
            handleInputChange={handleInputChange}
          />
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
        <Button className="my-14 px-4" type="submit">
          Submit
        </Button>
      </form>
      {showModal && <SubmissionModal onClose={() => setShowModal(false)} />}{' '}
    </div>
  );
};

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-4/5 max-w-lg relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-3">Thank You for Joining the Tribe Africa Community!</h2>
        <hr className="border-orange-500 mb-3" />

        <p className="text-gray-700">
          Your business listing has been successfully submitted. We’re thrilled to have you as part of our growing
          network of incredible venues and experiences across Africa.
          <br />
          <br />
          Our team will review your business’s details within <b>3–5 business days</b>. Once approved, your Business
          will be listed on the <b>Tribe Africa Pages directory</b>. You will receive a confirmation email with a link
          to your live listing.
          <br />
          <br />
          If you have any questions or need assistance, feel free to reach out to us at <b>support@tribeafrica.org</b>.
          <br />
          <br />
          Thank you for choosing Tribe Africa to showcase your business. Together, let’s make Africa a go-to destination
          for memorable experiences!
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

const MultipleImageUpload: React.FC<SingleImageUploadProps> = ({ handleInputChange, fieldName, title }) => {
  const [images, setImages] = useState<{ preview: string; _id: string; _key: string }[]>([]);

  useEffect(() => {
    // Reset images when formType changes
    setImages([]);
    handleInputChange(fieldName, []);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const removeImage = (index: number) => {
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

  return (
    <div className="mt-6 mb-6">
      <label className="font-semibold mr-4">{title}</label>
      <input type="file" accept="image/*" multiple onChange={handleFileChange} />

      <div className="mt-2 flex gap-2 flex-wrap">
        {images.map((image, index) => (
          <div key={image._key} className="relative">
            <img src={image.preview} alt="Preview" className="w-20 h-20 object-cover rounded" />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1"
              onClick={() => removeImage(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

interface SingleImageUploadProps {
  handleInputChange: (field: string, value: any) => void;
  fieldName: string;
  title: string;
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({ handleInputChange, fieldName, title }) => {
  const [image, setImage] = useState<{ preview: string; _id: string } | null>(null);

  useEffect(() => {
    // Reset image state when formType changes
    setImage(null);
    handleInputChange(fieldName, null);
  }, []);

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

  return (
    <div className="mt-6 mb-6">
      <label className="font-semibold mr-4">{title}</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && <img src={image.preview} alt="Preview" className="w-20 h-20 object-cover mt-2" />}
    </div>
  );
};

export default AfterWorkFrom;
