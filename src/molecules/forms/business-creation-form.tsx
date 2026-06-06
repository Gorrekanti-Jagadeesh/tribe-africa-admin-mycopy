import Button from '@/atoms/custom-button/button';
import Checkbox from '@/atoms/input-elements/checkbox';
import CustomInput from '@/atoms/input-elements/custom-input';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DateInput from '@/atoms/input-elements/date-input';
import Input from '@/atoms/input-elements/input';
import sanityClient from '@/sanityClient';
import { deepMerge } from '@/utils/common';
import { uploadImage } from '@api/index';
import { generateId } from '@utils/common';
import Cookies from 'js-cookie';

type BusinessForm = {
  userId: string;
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
  businessSubCategory: string;
  businessSubChildCategory: string;
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
  paymentMethods: {
    cash: boolean;
    credit_debit_cards: boolean;
    digital_wallets: boolean;
    bank_transfers: boolean;
    other?: string; // If "Other" is selected, specify the method
  };
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
var initialState = {
  userId: '',
  businessName: '',
  businessMotive: '',
  businessLogo: null as unknown as File,
  businessAddress: {},
  businessContactInformation: { socialMedia: { facebook: '', instagram: '', twitter: '', linkedin: '' } },
  businessCategory: '',
  businessSubCategory: '',
  businessSubChildCategory: '',
  businessmoreDetails: '',
  businessDescription: '',
  operatingHours: {},
  paymentMethods: { cash: false, credit_debit_cards: false, digital_wallets: false, bank_transfers: false },
  ownerContactInformation: { idPhoto: null as unknown as File },
  consent: false,
  confirmation: false,
  signature: '',
  dateOfSubmit: '',
};

const BusinessFormComponent = () => {
  const [formData, setFormData] = useState<BusinessForm>(initialState);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedChild, setSelectedChild] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    reset,
  } = useForm<BusinessForm>({
    defaultValues: {},
    mode: 'onBlur',
  });

  // Helper function to fix TypeScript errors with dynamic field names
  const registerDynamicField = (fieldName: string, options?: any) => {
    return register(fieldName as any, options);
  };

  const onBusinessFormSubmit: SubmitHandler<BusinessForm> = async (data) => {
    const userCookie = Cookies.get('emailUser') || Cookies.get('googleUser');
    const userId = userCookie ? JSON.parse(userCookie).uid : '';
    console.log('userId', userId);

    try {
      // Display loader
      var newData = deepMerge(formData, data);
      var newData1 = {
        _type: 'findABusiness',
        _id: `drafts.${generateId()}`,
        ...newData,
        userId: userId,
        paymentMethods: formData.paymentMethods,
        businessCategory: selectedCategory,
        businessSubCategory: selectedSubCategory,
        businessSubChildCategory: selectedChild,
      };
      console.log('---------Business newData1 ', newData1);
      await sanityClient.create(newData1);
      console.log('newData1', newData1);

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
    setSelectedSubCategory('');
    setSelectedChild('');
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
    setSelectedChild('');
  };

  const selectedCategoryData = categories.find((cat) => cat.value === selectedCategory);

  const selectedSubCategoryData = selectedCategoryData?.subCategories?.find((sub) => sub.value === selectedSubCategory);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create a Business</h2>
      <form onSubmit={handleSubmit(onBusinessFormSubmit)}>
        {/* Business Name */}
        <div>
          <CustomInput
            {...registerDynamicField('businessName')}
            label={'Business Name'}
            placeholder="Business Name"
            error={errors.businessName}
          />
        </div>

        {/* Business Motive */}
        <div>
          <CustomInput
            {...registerDynamicField('businessMotive')}
            label={'Business Motive'}
            placeholder="Business Motive"
            error={errors.businessMotive}
          />
        </div>

        {/* Business Address */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold mt-6">{'Business Address'}</label>

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
            {/* Business Type */}
            <div className="flex flex-col gap-2 mt-6 mb-6">
              {/* Category Dropdown */}
              <label className="font-semibold">{'Business Categories:'}</label>

              <select value={selectedCategory} onChange={handleCategoryChange} className="border p-2 w-full rounded">
                <option value="">Select a Category</option>
                {categories.map((cat) => (
                  <option key={cat.category} value={cat.value}>
                    {cat.category}
                  </option>
                ))}
              </select>

              {/* Subcategory Dropdown */}
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

              {/* Child Subcategory Dropdown */}
              {selectedSubCategory && selectedSubCategoryData?.children && (
                <div className="mt-4">
                  <label className="font-semibold">{'Business Sub Categories Elements:'}</label>
                  <select
                    value={selectedChild}
                    onChange={(e) => setSelectedChild(e.target.value)}
                    className="border p-2 w-full rounded"
                  >
                    <option value="">Select a Subcategory Elements</option>
                    {selectedSubCategoryData.children.map((child) => (
                      <option key={child.value} value={child.value}>
                        {child.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold mt-6">Some More Details About The Type of Business:</label>
              <textarea
                placeholder="(E.g. Cosmetic Store, Juice Factory, Adventure Tour Company)"
                {...registerDynamicField('businessmoreDetails', {
                  required: 'Full Description is required',
                  minLength: {
                    value: 30,
                    message: 'Details must be at least 50 characters',
                  },
                  maxLength: {
                    value: 100,
                    message: 'Full Description must not exceed 100 characters',
                  },
                })}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={5} // Bigger area
                onChange={(e) => setValue('businessmoreDetails', e.target.value)}
              />
              {errors.businessmoreDetails && (
                <p className="text-red-500 text-sm">{errors.businessmoreDetails.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold mt-6">Describe your Business:</label>
              <textarea
                placeholder="50 – 500 words detailed description, including services, products, or specialties"
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
              <label className="font-semibold">Operating Hours</label>
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

            <div className="flex flex-col gap-2 mt-6">
              <label className="font-semibold">Payment Methods (Select all that apply)</label>
              {[
                { key: 'cash', label: 'Cash' },
                { key: 'credit_debit_cards', label: 'Credit/Debit Cards' },
                { key: 'digital_wallets', label: 'Digital Wallets (e.g., PayPal, Apple Pay)' },
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

            <SingleImageUpload
              fieldName="businessLogo"
              title="Upload Your Business Logo (JPEG, PNG, or SVG files only)"
              handleInputChange={handleInputChange}
            />
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
        </div>
      </form>
      {showModal && <SubmissionModal onClose={() => setShowModal(false)} />}{' '}
    </div>
  );
};

export default BusinessFormComponent;

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

const categories = [
  {
    category: 'Agriculture & Industry',
    value: 'agriculture_industry',

    subCategories: [
      {
        label: 'Agribusiness',
        children: [
          { value: 'apiaries', label: 'Apiaries/Bee Yards' },
          { value: 'farms', label: 'Farms' },
          { value: 'fisheries', label: 'Fisheries' },
          { value: 'vineyards', label: 'Vineyards' },
          { value: 'other_agribusiness', label: 'Other' },
        ],
      },
      { value: 'factories', label: 'Factories' },
      { value: 'mines', label: 'Mines' },
      { value: 'other_agriculture', label: 'Other' },
    ],
  },
  {
    category: 'Business Centers',
    value: 'business_centers',

    subCategories: [
      { value: 'business_incubators', label: 'Business Incubators' },
      { value: 'corporate_event_spaces', label: 'Corporate Event Spaces' },
      { value: 'co_working_spaces', label: 'Co-working Spaces' },
      { value: 'it_business_support', label: 'IT & Business Support Services' },
      { value: 'mail_courier_services', label: 'Mail & Courier Services' },
      { value: 'meeting_conference_rooms', label: 'Meeting & Conference Rooms' },
      { value: 'print_copy_centers', label: 'Print & Copy Centers' },
      { value: 'secretarial_services', label: 'Secretarial & Administrative Services' },
      { value: 'serviced_offices', label: 'Serviced Offices' },
      { value: 'training_centers', label: 'Training Centers' },
      { value: 'virtual_meeting_solutions', label: 'Virtual Meeting Solutions' },
      { value: 'virtual_offices', label: 'Virtual Offices' },
      { value: 'other_business_centers', label: 'Other' },
    ],
  },
  {
    value: 'forchildren',
    category: 'For Children',
  },
  {
    value: 'shopping',
    category: 'Shopping',
  },
  {
    category: 'Food, Drink & Entertainment',
    value: 'food_drink_entertainment',

    subCategories: [{ value: 'cinemas', label: 'Cinemas' }],
  },
  {
    category: 'Media & Performing Arts',
    value: 'media_performing_arts',

    subCategories: [
      {
        value: 'media_broadcasting',
        label: 'Media Broadcasting',
        children: [
          { value: 'radio_stations', label: 'Radio Stations' },
          { value: 'tv_stations', label: 'TV Stations' },
          { value: 'other_media_broadcasting', label: 'Other' },
        ],
      },
      {
        value: 'performing_arts_studios',
        label: 'Performing Arts Studios',
        children: [
          { value: 'dance_studios', label: 'Dance Studios' },
          { value: 'film_studios', label: 'Film Studios' },
          { value: 'music_recording_studios', label: 'Music Recording Studios' },
          { value: 'other_performing_arts', label: 'Other' },
        ],
      },
      { value: 'theaters', label: 'Theaters' },
    ],
  },
  {
    category: 'Retail & Wholesale Trade',
    value: 'retail_wholesale_trade',
    subCategories: [
      { value: 'shopping_center', label: 'Mall/Shopping Center' },
      { value: 'boutique_store', label: 'Boutique Store' },
      { value: 'grocery_store', label: 'Supermarket/Grocery Store' },
      { value: 'department_store', label: 'Department Store' },
      { value: 'specialty_store', label: 'Specialty Store (e.g., Toys, Books, Electronics)' },
      { value: 'farmers_market', label: "Farmers' Market" },
      { value: 'wholesalers', label: 'Wholesalers' },
      { value: 'other_retail', label: 'Other' },
    ],
  },
  {
    category: 'Services',
    value: 'services',

    subCategories: [
      {
        value: 'construction',
        label: 'Construction',
        children: [
          { value: 'construction_companies', label: 'Construction Companies' },
          { value: 'engineering_firms', label: 'Engineering Firms' },
          { value: 'equipment_rentals', label: 'Equipment Rentals' },
          { value: 'other_construction', label: 'Other' },
        ],
      },
      { value: 'consultancy_firms', label: 'Consultancy Firms' },
      { value: 'custom_brokers', label: 'Custom Brokers' },
      {
        value: 'design',
        label: 'Design',
        children: [
          { value: 'architecture', label: 'Architecture' },
          { value: 'art_studios', label: 'Art Studios' },
          { value: 'graphic_design', label: 'Graphic Design' },
          { value: 'interior_design', label: 'Interior Design' },
          { value: 'landscape_design', label: 'Landscape Design' },
          { value: 'soft_furnishing', label: 'Soft Furnishing' },
          { value: 'other_design', label: 'Other' },
        ],
      },
      {
        value: 'environmental',
        label: 'Environmental',
        children: [
          { value: 'renewable_energy', label: 'Renewable Energy' },
          { value: 'other_environmental', label: 'Other' },
        ],
      },
      {
        value: 'events_hospitality',
        label: 'Events & Hospitality',
        children: [
          { value: 'catering', label: 'Catering' },
          { value: 'event_organisers', label: 'Event Organisers' },
          { value: 'wedding_planners', label: 'Wedding Planners' },
          { value: 'other_events_hospitality', label: 'Other' },
        ],
      },
      {
        value: 'financial_services',
        label: 'Financial Services',
        children: [
          { value: 'accountancy_firms', label: 'Accountancy Firms' },
          { value: 'banks', label: 'Banks (Mention ATM Locations)' },
          { value: 'insurance', label: 'Insurance' },
          { value: 'other_financial_services', label: 'Other' },
        ],
      },
      {
        value: 'home_services',
        label: 'Home Services',
        children: [
          { value: 'cleaning', label: 'Cleaning' },
          { value: 'electrical', label: 'Electrical' },
          { value: 'painting', label: 'Painting' },
          { value: 'plumbing', label: 'Plumbing' },
          { value: 'other_home_services', label: 'Other' },
        ],
      },
      { value: 'information_technology', label: 'Information Technology' },
      {
        value: 'legal',
        label: 'Legal',
        children: [
          { value: 'law_firms', label: 'Law Firms' },
          { value: 'notary_publics', label: 'Notary Publics' },
          { value: 'other_legal', label: 'Other' },
        ],
      },
      {
        value: 'logistics&transport',
        label: 'Logistics & Transport',
        children: [
          { value: 'air_transport', label: 'Air Transport' },
          { value: 'car_rentals', label: 'Car Rentals' },
          { value: 'chauffeur_service', label: 'Chauffeur Service' },
          { value: 'commercial_transportation', label: 'Commercial Transportation' },
          { value: 'home_business_removals', label: 'Home/Business Removals' },
          { value: 'shipping', label: 'Shipping' },
          { value: 'taxis', label: 'Taxis' },
          { value: 'trucking', label: 'Trucking' },
          { value: 'other_logistics_transport', label: 'Other' },
        ],
      },
      { value: 'public_relations_marketing', label: 'Public Relations & Marketing' },
      { value: 'real_estate', label: 'Real Estate' },
      {
        value: 'tourism_travel',
        label: 'Tourism & Travel Services',
        children: [
          { value: 'tour_companies', label: 'Tour Companies' },
          { value: 'travel_agencies', label: 'Travel Agencies' },
          { value: 'other_tourism_travel', label: 'Other' },
        ],
      },
    ],
  },
  {
    category: 'Talent & Agency Services',
    value: 'talent_agency_services',

    subCategories: [
      {
        value: 'employment_agencies',
        label: 'Employment Agencies',
        children: [
          { value: 'domestic_staff', label: 'Domestic Staff' },
          { value: 'security', label: 'Security' },
          { value: 'other_employment_agencies', label: 'Other' },
        ],
      },
      { value: 'recruitment_agencies', label: 'Recruitment Agencies' },
      {
        value: 'talent',
        label: 'Talent',
        children: [
          { value: 'acting_talent_agencies', label: 'Acting Talent Agencies' },
          { value: 'creative_arts_agencies', label: 'Creative Arts Agencies' },
          { value: 'dance_performing_arts_agencies', label: 'Dance & Performing Arts Agencies' },
          { value: 'kids_youth_talent_agencies', label: 'Kids & Youth Talent Agencies' },
          { value: 'literary_agencies', label: 'Literary Agencies' },
          { value: 'modelling_agencies', label: 'Modelling Agencies' },
          { value: 'music_talent_agencies', label: 'Music Talent Agencies' },
          { value: 'sports_talent_agencies', label: 'Sports Talent Agencies' },
          { value: 'other_talent_agencies', label: 'Other' },
        ],
      },
    ],
  },

  {
    category: 'Logistics & Transport',
    value: 'logistics_transport',
    subCategories: [
      { value: 'air_transport', label: 'Air Transport' },
      { value: 'car_rentals', label: 'Car Rentals' },
      { value: 'chauffeur_service', label: 'Chauffeur Service' },
      { value: 'commercial_transportation', label: 'Commercial Transportation' },
      { value: 'home_business_removals', label: 'Home/Business Removals' },
      { value: 'shipping', label: 'Shipping' },
      { value: 'taxis', label: 'Taxis' },
      { value: 'trucking', label: 'Trucking' },
      { value: 'other_logistics', label: 'Other' },
    ],
  },
  {
    category: 'Wellness & Beauty',
    value: 'wellnessbeauty',
    subCategories: [
      { value: 'spas', label: 'Spas' },
      { value: 'gyms', label: 'Gyms' },
      { value: 'beautysalons', label: 'Beauty Salons' },
      { value: 'hairsalons', label: 'Hair Salons' },
    ],
  },
];
