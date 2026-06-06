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

type VolForm = {
  companyDetails: {
    companyName?: string;
    contactPersonName?: string;
    email?: string;
    phone?: string;
    website?: string;
    socialMedia?: string;
  };
  excursionDetsila: {
    name?: string;
    description?: string;
    durartion?: string;
    startLocation?: string;
    endLocation?: string;
    frequency?: {
      daily: boolean;
      weekly: boolean;
      monthly: boolean;
      seasonal: boolean;
    };
  };
  excusionType: {
    adventure: boolean;
    cultural: boolean;
    wildlife_nature: boolean;
    water_based: boolean;
    food_drink: boolean;
    other: boolean;
  };
  groupSizeLimit: string;
  ageLimit: string;
  pricePerPerson: string;
  whatsIncluded: {
    transportation: boolean;
    meals_snacks: boolean;
    tour_guide: boolean;
    equipment_rental: boolean;
    entrance_fees: boolean;
    other: boolean;
  };
  whatsExcluded: string;
  paymentMethods: {
    cash: boolean;
    online: boolean;
    credit_debit_cards: boolean;
    bank_transfers: boolean;
    other?: boolean;
  };

  businessLogo: File;
  consentMedia: boolean;
  ownerContactInformation: {
    name?: string;
    role?: string;
    phoneNumber?: string;
    email?: string;
    idPhoto: File;
  };

  consent: boolean;
  confirmation: boolean;
  signature: string;
  dateOfSubmit: string;
};
const initialState = {
  companyDetails: {
    companyName: '',
    contactPersonName: '',
    email: '',
    phone: '',
    website: '',
    socialMedia: '',
  },

  excursionDetsila: {
    name: '',
    description: '',
    durartion: '',
    startLocation: '',
    endLocation: '',
    frequency: {
      daily: false,
      weekly: false,
      monthly: false,
      seasonal: false,
    },
  },

  excusionType: {
    adventure: false,
    cultural: false,
    wildlife_nature: false,
    water_based: false,
    food_drink: false,
    other: false,
  },
  groupSizeLimit: '',
  ageLimit: '',
  pricePerPerson: '',
  whatsIncluded: {
    transportation: false,
    meals_snacks: false,
    tour_guide: false,
    equipment_rental: false,
    entrance_fees: false,
    other: false,
  },
  whatsExcluded: '',

  paymentMethods: {
    cash: false,
    online: false,
    credit_debit_cards: false,
    bank_transfers: false,
    other: false,
  },
  consentMedia: false,
  businessLogo: null as unknown as File,

  ownerContactInformation: {
    name: '',
    role: '',
    phoneNumber: '',
    email: '',
    idPhoto: null as unknown as File,
  },

  consent: false,
  confirmation: false,
  signature: '',
  dateOfSubmit: '',
};

const VolFormComponent = () => {
  const [formData, setFormData] = useState<VolForm>(initialState);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm<VolForm>({
    defaultValues: {},
    mode: 'onBlur',
  });

  // Helper function to fix TypeScript errors with dynamic field names
  const registerDynamicField = (fieldName: string, options?: any) => {
    return register(fieldName as any, options);
  };

  const onVolFormSubmit: SubmitHandler<VolForm> = async (data) => {
    try {
      var newData = deepMerge(formData, data);
      var newData1 = {
        _type: 'volType',
        _id: `drafts.${generateId()}`,
        ...newData,
        paymentMethods: formData.paymentMethods,
        whatsIncluded: formData.whatsIncluded,
        excurtionType: formData.excusionType,
      };
      await sanityClient.create(newData1);
      setTimeout(() => {
        setShowModal(true);
      }, 300);
      setFormData(initialState);
      reset();
    } catch (error) {
      console.error('Error submitting event:', error);
      alert('Failed to submit event. Please try again.');
    } finally {
      // Add any cleanup logic here if needed
    }
  };

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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Voluntourism Submission Form</h2>
      <form onSubmit={handleSubmit(onVolFormSubmit)}>
        {/* Business Name */}
        <div>
          <CustomInput
            {...registerDynamicField('companyDetails.companyName')}
            label={'Company Name'}
            placeholder="Company Name"
            error={errors.companyDetails?.companyName}
          />
        </div>

        {/* Business Motive */}
        <div>
          <CustomInput
            {...registerDynamicField('companyDetails.contactPersonName')}
            label={'Contact Person Name'}
            placeholder="Contact Person Name"
            error={errors.companyDetails?.contactPersonName}
          />
        </div>

        <div>
          <CustomInput
            {...registerDynamicField('companyDetails.email')}
            label={'Email Address'}
            placeholder="Email Address"
            error={errors.companyDetails?.email}
          />
        </div>
        <div>
          <CustomInput
            {...registerDynamicField('companyDetails.phone')}
            label={'Phone Number'}
            placeholder="Phone Number"
            error={errors.companyDetails?.phone}
          />
        </div>
        <div>
          <CustomInput
            {...registerDynamicField('companyDetails.website')}
            label={'Website'}
            placeholder="Website URL (Provide a link of your official website)"
            error={errors.companyDetails?.website}
          />
        </div>
        <div>
          <CustomInput
            {...registerDynamicField('companyDetails.socialMedia')}
            label={'Social Media'}
            placeholder="Social Media Links (Add links to your social media profiles)"
            error={errors.companyDetails?.socialMedia}
          />
        </div>

        {/* Business Type */}
        <div className="flex flex-col gap-2 mt-6 mb-6">
          <CustomInput
            {...registerDynamicField('excursionDetsila.name')}
            label={'Excursion Name'}
            placeholder="Excursion Name"
            error={errors.excursionDetsila?.name}
          />
          <div className="flex flex-col gap-2">
            <label className="font-semibold mt-6">Brief Description</label>
            <textarea
              placeholder="50 – 300 words detailed description, including key services, programs, or features"
              {...registerDynamicField('businessDescription', {
                required: 'Full Description is required',
                minLength: {
                  value: 50,
                  message: 'Full Description must be at least 50 characters',
                },
                maxLength: {
                  value: 300,
                  message: 'Full Description must not exceed 300 characters',
                },
              })}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={10} // Bigger area
              onChange={(e) => setValue('excursionDetsila.description', e.target.value)}
            />
            {errors.excursionDetsila?.description && (
              <p className="text-red-500 text-sm">{errors.excursionDetsila?.description?.message}</p>
            )}
          </div>
          <CustomInput
            {...registerDynamicField('excursionDetsila.durartion')}
            label={'Excursion Duration'}
            placeholder="Excursion Duration (e.g. 2 hours, 1 day)"
            error={errors.excursionDetsila?.durartion}
          />
          <CustomInput
            {...registerDynamicField('excursionDetsila.startLocation')}
            label={'Start Location'}
            placeholder="Start Location"
            error={errors.excursionDetsila?.startLocation}
          />

          <CustomInput
            {...registerDynamicField('excursionDetsila.endLocation')}
            label={'End Location'}
            placeholder="End Location"
            error={errors.excursionDetsila?.endLocation}
          />

          <div className="flex flex-col gap-2 mt-6">
            <label className="font-semibold">Frequecy</label>
            {[
              { key: 'daily', label: 'Daily' },
              { key: 'weekly', label: 'Weekly' },
              { key: 'monthly', label: 'Monthly' },
              { key: 'seasonal', label: 'Seasonal' },
            ].map(({ key, label }) => (
              <Checkbox
                key={key}
                {...registerDynamicField(`excursionDetsila.frequency.${key}` as any)}
                label={label}
                onChange={(e) => handleInputChange(`excursionDetsila.frequency.${key}`, e)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <label className="font-semibold">Type of Excursion</label>
          {[
            { key: 'adventure', label: 'Adventure (e.g., hiking, zip-lining)' },
            { key: 'cultural', label: 'Cultural (e.g., heritage tours, local experiences)' },
            { key: 'wildlife_nature', label: 'Wildlife/Nature (e.g., safaris, eco-tours)' },
            { key: 'water_based', label: 'Water-based (e.g., cruises, snorkeling)' },
            { key: 'food_drink', label: 'Food/Drink (e.g., tastings, culinary tours)' },
            { key: 'other', label: 'Other' },
          ].map(({ key, label }) => (
            <Checkbox
              key={key}
              {...registerDynamicField(`excusionType.${key}` as any)}
              label={label}
              onChange={(e) => handleInputChange(`excusionType.frequency.${key}`, e)}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <label className="font-semibold">Group Size Limit</label>
          <CustomInput
            {...registerDynamicField('groupSizeLimit')}
            placeholder="Maximum number of participants"
            error={errors.groupSizeLimit}
          />
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <label className="font-semibold">Age Restrictions</label>
          <CustomInput
            {...registerDynamicField('ageLimit')}
            placeholder="Age range (e.g., 18-60)"
            error={errors.ageLimit}
          />
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <label className="font-semibold">Price Per Person</label>
          <CustomInput
            {...registerDynamicField('pricePerPerson')}
            placeholder="Price in USD"
            error={errors.pricePerPerson}
          />
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <label className="font-semibold">What's Included</label>
          {[
            { key: 'transportation', label: 'Transportation' },
            { key: 'meals_snacks', label: 'Meals/Snacks' },
            { key: 'tour_guide', label: 'Tour Guide' },
            { key: 'equipment_rental', label: 'Equipment Rental' },
            { key: 'entrance_fees', label: 'Entrance Fees' },
            { key: 'other', label: 'Other' },
          ].map(({ key, label }) => (
            <Checkbox
              key={key}
              {...registerDynamicField(`whatsIncluded.${key}` as any)}
              label={label}
              onChange={(e) => handleInputChange(`whatsIncluded.${key}`, e)}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <label className="font-semibold">What's Excluded</label>
          <CustomInput
            {...registerDynamicField('whatsExcluded')}
            placeholder="List of exclusions"
            error={errors.whatsExcluded}
          />
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <label className="font-semibold">Payment Options</label>
          {[
            { key: 'cash', label: 'Cash' },
            { key: 'online', label: 'Online' },
            { key: 'credit_debit_cards', label: 'Credit/Debit Cards' },
            { key: 'bank_transfers', label: 'Bank Transfers' },
            { key: 'other', label: 'Other' },
          ].map(({ key, label }) => (
            <Checkbox
              key={key}
              {...registerDynamicField(`paymentMethods.${key}` as any)}
              label={label}
              onChange={(e) => handleInputChange(`paymentMethods.${key}`, e)}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <label className="font-semibold">{'Media Rights Confirmation'}</label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...registerDynamicField('consentMedia', {
                required: 'You must consent that all business details are accurate.',
              })}
              className="h-4 w-4 rounded border-gray-400"
            />
            I confirm that I own the rights to all uploaded media and grant permission for promotional use.
          </label>
          {errors.consentMedia && <span className="text-red-500 text-xs">{errors.consentMedia?.message}</span>}
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <label className="font-semibold">Images</label>
          <SingleImageUpload
            fieldName="businessLogo"
            title="Upload Business Logo:"
            handleInputChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col gap-2">
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
      </form>
      {showModal && <SubmissionModal onClose={() => setShowModal(false)} />}{' '}
    </div>
  );
};

export default VolFormComponent;

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
        <hr className="border-brand-orange mb-3" />

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
            className="bg-brand-orange text-white px-4 py-2 rounded-lg shadow hover:bg-[#E05A00]"
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
