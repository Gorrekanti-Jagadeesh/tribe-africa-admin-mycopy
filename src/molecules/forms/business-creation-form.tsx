import Button from '@/atoms/custom-button/button';
import { useState } from 'react';

type BusinessForm = {
  businessName: string;
  businessMotive: string;
  image: File | null;
  country: string;
  businessContactInformation: {
    phoneNumber?: string;
    email?: string;
    website?: string;
  };
  ownerContactInformation: {
    fullName?: string;
    role?: string;
    phoneNumber?: string;
    email?: string;
  };
  description: string;
  address: {
    street?: string;
    town?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  openingHours: {
    day: string;
    openingTime: string;
    closingTime: string;
  }[];
  socialMediaLinks: string[];
  paymentMethods: string[];
  mainCategory: string;
  subCategory: string;
};

// type openingHours = {
//   { day: string, openingTime: , closingTime: '' }
// }
const BusinessFormComponent = () => {
  const [formData, setFormData] = useState<BusinessForm>({
    businessName: '',
    businessMotive: '',
    image: null,
    country: 'Algeria',
    businessContactInformation: {},
    ownerContactInformation: {},
    description: '',
    address: {},
    openingHours: [],
    socialMediaLinks: [],
    paymentMethods: [],
    mainCategory: '',
    subCategory: '',
  });

  const handleChange = (field: string, value: string | number | boolean | File) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (field: string, subField: string, value: string | number | boolean | File) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value,
      },
    }));
  };

  const handleArrayChange = (
    field: string,
    index: number,
    subField: string,
    value: string | number | boolean | File
  ) => {
    setFormData((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = {
        ...updatedArray[index],
        [subField]: value,
      };
      return {
        ...prev,
        [field]: updatedArray,
      };
    });
  };

  const addArrayItem = (
    field: string,
    newItem: string | number | boolean | { day: string; openingTime: string; closingTime: string }
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], newItem],
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray.splice(index, 1);
      return {
        ...prev,
        [field]: updatedArray,
      };
    });
  };

  const handleCheckboxChange = (method: string) => {
    setFormData((prev) => {
      const paymentMethods = prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter((m) => m !== method)
        : [...prev.paymentMethods, method];
      return { ...prev, paymentMethods };
    });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a Business</h1>
      <form>
        {/* Business Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="businessName">
            Business Name
          </label>
          <input
            type="text"
            id="businessName"
            value={formData.businessName}
            onChange={(e) => handleChange('businessName', e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        {/* Business Motive */}
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="businessMotive">
            Business Motive
          </label>
          <input
            type="text"
            id="businessMotive"
            value={formData.businessMotive}
            onChange={(e) => handleChange('businessMotive', e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        {/* Business Image */}
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="image">
            Business Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => handleChange('image', e.target.files ? e.target.files[0] : null)}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        {/* Business Country */}
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="country">
            Country
          </label>
          <select
            id="country"
            value={formData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="Algeria">Algeria</option>
            {/* Add other countries here */}
          </select>
        </div>
        {/* Business Contact Information */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Business Contact Information</label>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Phone Number"
              value={formData.businessContactInformation.phoneNumber || ''}
              onChange={(e) => handleNestedChange('businessContactInformation', 'phoneNumber', e.target.value)}
              className="flex-1 border border-gray-300 p-2 rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.businessContactInformation.email || ''}
              onChange={(e) => handleNestedChange('businessContactInformation', 'email', e.target.value)}
              className="flex-1 border border-gray-300 p-2 rounded-md"
            />
            <input
              type="url"
              placeholder="Website"
              value={formData.businessContactInformation.website || ''}
              onChange={(e) => handleNestedChange('businessContactInformation', 'website', e.target.value)}
              className="flex-1 border border-gray-300 p-2 rounded-md"
            />
          </div>
        </div>
        {/* Owner Contact Information */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Owner Contact Information</label>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.ownerContactInformation.fullName || ''}
              onChange={(e) => handleNestedChange('ownerContactInformation', 'fullName', e.target.value)}
              className="flex-1 border border-gray-300 p-2 rounded-md mb-2"
            />
            <input
              type="text"
              placeholder="Role"
              value={formData.ownerContactInformation.role || ''}
              onChange={(e) => handleNestedChange('ownerContactInformation', 'role', e.target.value)}
              className="flex-1 border border-gray-300 p-2 rounded-md mb-2"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={formData.ownerContactInformation.phoneNumber || ''}
              onChange={(e) => handleNestedChange('ownerContactInformation', 'phoneNumber', e.target.value)}
              className="flex-1 border border-gray-300 p-2 rounded-md mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.ownerContactInformation.email || ''}
              onChange={(e) => handleNestedChange('ownerContactInformation', 'email', e.target.value)}
              className="flex-1 border border-gray-300 p-2 rounded-md"
            />
          </div>
        </div>
        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          ></textarea>
        </div>
        {/* Address */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Address</label>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Street"
              value={formData.address.street || ''}
              onChange={(e) => handleNestedChange('address', 'street', e.target.value)}
              className="flex-1 border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Town"
              value={formData.address.town || ''}
              onChange={(e) => handleNestedChange('address', 'town', e.target.value)}
              className="flex-1 border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <input
              type="text"
              placeholder="State"
              value={formData.address.state || ''}
              onChange={(e) => handleNestedChange('address', 'state', e.target.value)}
              className="flex-1 border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={formData.address.postalCode || ''}
              onChange={(e) => handleNestedChange('address', 'postalCode', e.target.value)}
              className="flex-1 border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Country"
              value={formData.address.country || ''}
              onChange={(e) => handleNestedChange('address', 'country', e.target.value)}
              className="flex-1 border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="mt-2"></div>
        </div>
        {/* Opening Hours */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Opening Hours</label>
          {formData.openingHours.map((item, index) => (
            <div key={index} className="mb-2 flex space-x-2">
              <select
                value={item.day}
                onChange={(e) => handleArrayChange('openingHours', index, 'day', e.target.value)}
                className="flex-1 border border-gray-300 p-2 rounded-md"
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
              <input
                type="time"
                placeholder="Opening Time"
                value={item.openingTime}
                onChange={(e) => handleArrayChange('openingHours', index, 'openingTime', e.target.value)}
                className="flex-1 border border-gray-300 p-2 rounded-md"
              />
              <input
                type="time"
                placeholder="Closing Time"
                value={item.closingTime}
                onChange={(e) => handleArrayChange('openingHours', index, 'closingTime', e.target.value)}
                className="flex-1 border border-gray-300 p-2 rounded-md"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('openingHours', index)}
                className="bg-red-500 text-white px-2 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => addArrayItem('openingHours', { day: '', openingTime: '', closingTime: '' })}
          >
            Add Opening Hours
          </Button>
        </div>
        {/* Social Media Links */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Social Media Links</label>
          {formData.socialMediaLinks.map((link, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="url"
                value={link}
                onChange={(e) => handleArrayChange('socialMediaLinks', index, '', e.target.value)}
                className="flex-1 border border-gray-300 p-2 rounded-md"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('socialMediaLinks', index)}
                className="bg-red-500 text-white px-2 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <Button type="button" onClick={() => addArrayItem('socialMediaLinks', '')}>
            Add Social Media Link
          </Button>
        </div>
        {/* Payment Methods */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Payment Methods</label>
          <div className="flex flex-wrap gap-4">
            {['Credit Card', 'Cash', 'PayPal', 'Bank Transfer'].map((method) => (
              <label key={method} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.paymentMethods.includes(method)}
                  onChange={() => handleCheckboxChange(method)}
                  className="rounded border-gray-300 focus:ring focus:ring-blue-200"
                />
                {method}
              </label>
            ))}
          </div>
        </div>
        {/* Main Category */}
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="mainCategory">
            Main Category
          </label>
          <input
            type="text"
            id="mainCategory"
            value={formData.mainCategory}
            onChange={(e) => handleChange('mainCategory', e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        {/* Sub Category */}
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="subCategory">
            Sub Category
          </label>
          <input
            type="text"
            id="subCategory"
            value={formData.subCategory}
            onChange={(e) => handleChange('subCategory', e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <Button type="submit">Submit</Button>
        {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button> */}
      </form>
    </div>
  );
};

export default BusinessFormComponent;
