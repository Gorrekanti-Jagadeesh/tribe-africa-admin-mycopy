import Button from '@/atoms/custom-button/button';
import Checkbox from '@/atoms/input-elements/checkbox';
import CustomInput from '@/atoms/input-elements/custom-input';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { CustomSelect } from '@/atoms/input-elements/cutom-select';
import DateInput from '@/atoms/input-elements/date-input';
import Input from '@/atoms/input-elements/input';
import sanityClient from '@/sanityClient';
import { deepMerge } from '@/utils/common';
import { uploadImage } from '@api/index';
import { generateId } from '@utils/common';
import { initializeApp } from 'firebase/app';

type InsitutionForm = {
  institutionName: string;
  missionStatement: string;
  businessCategory: string;
  businessSubCategory: string;

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

  ownerContactInformation: {
    name?: string;
    role?: string;
    phoneNumber?: string;
    email?: string;
    idPhoto: File;
  };
  businessLogo: File;

  consent: boolean;
  confirmation: boolean;
  signature: string;
  dateOfSubmit: string;
};
var initialState = {
  institutionName: '',
  missionStatement: '',
  businessCategory: '',
  businessSubCategory: '',
  businessAddress: {},
  businessContactInformation: { socialMedia: { facebook: '', instagram: '', twitter: '', linkedin: '' } },
  businessLogo: null as unknown as File,
  businessDescription: '',
  operatingHours: {},
  ownerContactInformation: { idPhoto: null as unknown as File },
  consent: false,
  confirmation: false,
  signature: '',
  dateOfSubmit: '',
};

const ReligiousFormComponent = () => {
  const [formData, setFormData] = useState<InsitutionForm>(initialState);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm<InsitutionForm>({
    defaultValues: {},
    mode: 'onBlur',
  });

  // Helper function to fix TypeScript errors with dynamic field names
  const registerDynamicField = (fieldName: string, options?: any) => {
    return register(fieldName as any, options);
  };

  const onBusinessFormSubmit: SubmitHandler<InsitutionForm> = async (data) => {
    try {
      // Display loader
      var newData = deepMerge(formData, data);
      var newData1 = {
        _type: 'institutionType',
        _id: `drafts.${generateId()}`,
        ...newData,
        businessCategory: selectedCategory,
        businessSubCategory: selectedSubCategory,
      };
      console.log('---------Business newData1 ', newData1);
      await sanityClient.create(newData1);
      setTimeout(() => {
        setShowModal(true);
      }, 300); // Delay to allow scrolling to complete
      setFormData(initialState);
      reset();
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
    console.log('------- handleInputChange', field, value);

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
      console.log('----mewData', newData);
      return newData; // Return a new object to trigger React re-render
    });
  };

  const handleCategoryChange = (e) => {
    console.log('-----', e.target.value);
    setSelectedCategory(e.target.value);
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const selectedCategoryData = institutionTypes.find((cat) => cat.value === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create an Institution</h2>
      <form onSubmit={handleSubmit(onBusinessFormSubmit)}>
        {/* Business Name */}
        <div>
          <CustomInput
            {...registerDynamicField('institutionName')}
            label={'Institution/ Organization Name'}
            placeholder="Institution Name"
            error={errors.institutionName}
          />
        </div>

        {/* Business Motive */}
        <div>
          <CustomInput
            {...registerDynamicField('missionStatement')}
            label={'Mission Statement(30 characters max)'}
            placeholder="Mission Statement"
            error={errors.missionStatement}
          />
        </div>

        {/* Business Type */}
        <div className="flex flex-col gap-2 mt-6 mb-6">
          {/* Category Dropdown */}
          <label className="font-semibold">{'Select type of Institution/Organisation'}</label>

          <select value={selectedCategory} onChange={handleCategoryChange} className="border p-2 w-full rounded">
            <option value="">Select type of Institution/Organisation</option>
            {institutionTypes.map((cat) => (
              <option key={cat.category} value={cat.value}>
                {cat.category}
              </option>
            ))}
          </select>

          {selectedCategory && selectedCategoryData?.subCategories && (
            <div className="mt-4">
              <label className="font-semibold">{'Business Sub Categories:'}</label>
              <select
                value={selectedSubCategory}
                onChange={handleSubCategoryChange}
                className="border p-2 w-full rounded"
              >
                <option value="">Select a Subcategory</option>
                {selectedCategoryData.subCategories.map((sub) => (
                  <option key={sub.value} value={sub.value}>
                    {sub.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Business Address */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold mt-6">{'Address'}</label>

          <CustomInput
            {...registerDynamicField(`businessAddress.street`)}
            // label={'Street Address'}
            placeholder="street"
            error={errors.businessAddress?.street}
          />
          <CustomInput
            {...registerDynamicField(`businessAddress.city`)}
            // label={'Town/City'}
            placeholder="Town/City"
            error={errors.businessAddress?.city}
          />
          <CustomInput
            {...registerDynamicField(`businessAddress.region`)}
            //   label={'Business Address'}
            placeholder="State/Region"
            error={errors.businessAddress?.region}
          />
          <CustomInput
            {...registerDynamicField(`businessAddress.postalCode`)}
            //   label={'Business Address'}
            placeholder="Postal Code (Optional)"
            error={errors.businessAddress?.postalCode}
            required={false}
          />
          <CustomInput
            {...registerDynamicField(`businessAddress.country`)}
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
            {...registerDynamicField('businessContactInformation.phoneNumber', {
              required: 'Phone number is required',
            })}
            placeholder="Phone Number (Primary contact number)"
            error={errors.businessContactInformation?.phoneNumber}
            type="number"
          />
          <CustomInput
            {...registerDynamicField('businessContactInformation.email', { required: 'Email is required' })}
            placeholder="Email Address (For inquires and official correspondence)"
            error={errors.businessContactInformation?.email}
            type="email"
          />

          <CustomInput
            {...registerDynamicField('businessContactInformation.website')}
            //   label={'Website (if applicable)'}
            placeholder="Website URL (Provide a link of your official website) Optional"
            error={errors.businessContactInformation?.website}
            type="url"
            required={false}
          />
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Social Media Links(Add links to your social media profiles)</label>
            <CustomInput
              {...registerDynamicField('businessContactInformation.socialMedia.facebook')}
              placeholder="Facebook Profile"
              error={errors?.businessContactInformation?.socialMedia?.facebook}
              required={false}
              type="url"
            />
            <CustomInput
              {...registerDynamicField('businessContactInformation.socialMedia.instagram')}
              placeholder="Instagram Profile"
              error={errors?.businessContactInformation?.socialMedia?.instagram}
              required={false}
              type="url"
            />
            <CustomInput
              {...registerDynamicField('businessContactInformation.socialMedia.linkedin')}
              placeholder="Linkedin Profile"
              // error={errors?.socialMedia?.linkedin}
              required={false}
              type="url"
            />
            <CustomInput
              {...registerDynamicField('businessContactInformation.socialMedia.twitter')}
              placeholder="Twitter Profile"
              error={errors?.businessContactInformation?.socialMedia?.twitter}
              required={false}
              type="url"
            />
            <CustomInput
              {...registerDynamicField('businessContactInformation.socialMedia.twitter')}
              placeholder="Tiktok Profile"
              error={errors?.businessContactInformation?.socialMedia?.twitter}
              required={false}
              type="url"
            />

            <div className="flex flex-col gap-2">
              <label className="font-semibold mt-6">Description of Insitutiions</label>
              <textarea
                placeholder="50 – 500 words detailed description, including key services, programs, or features"
                {...registerDynamicField('businessDescription', {
                  required: 'Full Description is required',
                  minLength: {
                    value: 50,
                    message: 'Full Description must be at least 50 characters',
                  },
                  maxLength: {
                    value: 500,
                    message: 'Full Description must not exceed 500 characters',
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

            <div className="flex flex-col gap-2 mt-6">
              <label className="font-semibold">
                Operating Hours(Specify the days and hours your institution is open)
              </label>
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                <div key={day} className="flex flex-col gap-2">
                  <label className="font-medium">{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                  <div className="flex space-x-4">
                    <Controller
                      name={`operatingHours.${day}.start` as any}
                      control={control}
                      render={({ field }) => (
                        <input type="time" {...field} className="w-1/2 p-2 border rounded-md" required />
                      )}
                    />
                    <span className="text-xl">to</span>
                    <Controller
                      name={`operatingHours.${day}.end` as any}
                      control={control}
                      render={({ field }) => (
                        <input type="time" {...field} className="w-1/2 p-2 border rounded-md" required />
                      )}
                    />
                  </div>
                  {errors.operatingHours?.[day] && (
                    <span className="text-red-500 text-xs">Please provide valid times</span>
                  )}
                </div>
              ))}
            </div>

            {/* Business Owner Contact Details */}
            <div className="flex flex-col gap-2">
              <CustomInput
                {...registerDynamicField('ownerContactInformation.name')}
                label={'Owner/Manager Details (Fill in Details)'}
                placeholder="Full Name"
                error={errors.ownerContactInformation?.name}
              />
              <CustomInput
                {...registerDynamicField(`ownerContactInformation.role`)}
                //   label={'Business Address'}
                placeholder="Role (Owner/ Manager)"
                error={errors.ownerContactInformation?.role}
              />
              <CustomInput
                {...registerDynamicField(`ownerContactInformation.phoneNumber`)}
                //   label={'Business Address'}
                placeholder="Phone Number"
                error={errors.ownerContactInformation?.phoneNumber}
              />
              <CustomInput
                {...registerDynamicField(`ownerContactInformation.email`)}
                //   label={'Business Address'}
                placeholder="Email Address"
                error={errors.ownerContactInformation?.email}
                required={false}
              />

              <SingleImageUpload
                fieldName="ownerContactInformation.idPhoto"
                title="Upload Passport/ID:"
                handleInputChange={handleInputChange}
              />
            </div>

            <SingleImageUpload
              fieldName="businessLogo"
              title="Upload Institution Logo (JPEG, PNG, or SVG files only)"
              handleInputChange={handleInputChange}
            />

            {/* Business Details Confirmation checkboxes */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Consent to Listing:</label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...registerDynamicField('consent', {
                    required: 'You must consent that all business details are accurate.',
                  })}
                  className="h-4 w-4 rounded border-gray-400"
                />
                I consent to my business information being listed in the Yellow Pages Directory.
              </label>
              {errors.consent && <span className="text-red-500 text-xs">{errors.consent?.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Accuracy Verification:</label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...registerDynamicField('confirmation', {
                    required: 'You must confirmation that all business details are accurate.',
                  })}
                  className="h-4 w-4 rounded border-gray-400"
                />
                I confirm that the information provided is accurate to the best of my knowledge.
              </label>
              {errors.confirmation && <span className="text-red-500 text-xs">{errors.confirmation?.message}</span>}
            </div>
            <label className="font-semibold mt-4">Signature</label>
            <div className="mb-4">
              <Input
                type="text"
                name="signature"
                {...registerDynamicField('signature')}
                placeholder="Type your full name for electronic signature"
              />
            </div>

            <label className="font-semibold">Date (DD/MM/YYYY)</label>
            <div className="mt-4">
              <DateInput
                {...registerDynamicField('dateOfSubmit')}
                onChange={(e) => handleInputChange('dateOfSubmit', e)}
              />
            </div>
            <Button className="my-14 px-4" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
      {showModal && <SubmissionModal onClose={() => setShowModal(false)} />}{' '}
    </div>
  );
};

export default ReligiousFormComponent;

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

        <h2 className="text-xl font-semibold mb-3">Thank You for Your Submission!</h2>
        <hr className="border-orange-500 mb-3" />

        <p className="text-gray-700">
          Your information has been successfully submitted.
          <br />
          <br />
          Our team will review your business's details within <b>3–5 business days</b>. Once approved, your Business
          will be listed on the <b>Tribe Africa Pages directory</b>. You will receive a confirmation email with a link
          to your live listing.
          <br />
          <br />
          If you have any questions or need assistance, feel free to reach out to us at <b>support@tribeafrica.org</b>.
          <br />
          <br />
          Thank you for choosing the Tribe Africa Pages to promote your business!
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

const institutionTypes = [
  { category: 'Charitable & Non-Profit Institutions', value: 'charitable-non-profit' },
  { category: 'Cultural Institutions', value: 'cultural' },
  { category: 'Educational Institutions', value: 'educational' },
  { category: 'Government Institutions', value: 'government' },
  { category: 'Healthcare & Medical Institutions', value: 'healthcare-medical' },
  { category: 'Legal & Judicial Institutions', value: 'legal-judicial' },
  {
    category: 'Religious Institutions',
    value: 'religiousinstitutions',
    subCategories: [
      { label: 'Churches', value: 'churches' },
      { label: 'Mosques', value: 'mosques' },
      { label: 'Synagogues', value: 'synagogues' },
      { label: 'Bahai Temples', value: 'bahaitemple' },
      { label: 'Hindu Temples', value: 'hindutemple' },
    ],
  },
  { category: 'Security & Law Enforcement', value: 'security-law-enforcement' },
  {
    category: 'Club / Special Groups',
    value: 'clubsspecialgroups',
    subCategories: [
      { label: 'Rotary Club', value: 'rotaryclubs' },
      { label: 'Lion’s Club', value: 'lionsclub' },
      { label: 'Toastmasters', value: 'toastmasters' },
      { label: 'Masonic Lodges', value: 'masoniclodges' },
    ],
  },
];
