import React, { useState } from 'react';
import Input from '@/atoms/input-elements/input';
import Checkbox from '@/atoms/input-elements/checkbox';
import DateInput from '@/atoms/input-elements/date-input';

const CandidateForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    professionalTitle: '',
    personalStatement: '',
    streetAddress: '',
    townCity: '',
    stateRegion: '',
    postalCode: '',
    country: '',
    phoneNo: '',
    email: '',
    website: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    profession: '',
    profileDescription: '',
    skillsAndExpertise: '',
    yearsOfExperience: '',
    professionalCertifications: '',
    languagesSpoken: '',
    profilePhoto: null,
    passportId: null,
    consent: false,
    accuracyVerification: false,
    signature: '',
    date: '',
  });

  const handleInputChange = (field: string, value: string | number | boolean | File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const professions = [
    'Agriculture & Industry',
    'Arts & Creative Professionals',
    'Construction & Skilled Trades',
    'Consulting & Business Services',
    'Design & Creative Services',
    'Domestic & Personal Staff',
    'Education & Training',
    'Engineering Services',
    'Environmental & Sustainability',
    'Finance & Accounting',
    'Hospitality & Events',
    'Information Technology',
    'Legal & Paralegal Services',
    'Logistics & Transportation',
    'Media & Communications',
    'Medical, Wellness & Holistic Practitioners',
    'Office & Administrative Support',
    'Public Relations & Marketing',
    'Real Estate & Property Management',
    'Science & Research',
    'Security Services',
    'Tourism & Travel',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl mb-4">List your Profession & Get Hired!</h2>
      <p className="mb-6">
        Welcome to our Tribe Africa Pages Directory Service! Please complete this form to create your professional
        profile.
      </p>

      <h3>Your Personal Details:</h3>
      <Input
        type="text"
        name="fullName"
        placeholder="Full Name (As you want it to appear in the directory)"
        defaultValue={formData.fullName}
        action={(value) => handleInputChange('fullName', value)}
        required={true}
      />

      <Input
        type="text"
        name="professionalTitle"
        placeholder="Professional Title (e.g., Graphic Designer, Electrician)"
        defaultValue={formData.professionalTitle}
        action={(value) => handleInputChange('professionalTitle', value)}
        required={true}
      />

      <Input
        type="text-area"
        name="personalStatement"
        placeholder="Personal Statement (Optional)"
        defaultValue={formData.personalStatement}
        action={(value) => handleInputChange('personalStatement', value)}
        maxLength={30}
      />

      <h3>Address (Fill in Details):</h3>
      <Input
        type="text"
        name="streetAddress"
        placeholder="Street Address"
        defaultValue={formData.streetAddress}
        action={(value) => handleInputChange('streetAddress', value)}
      />

      <Input
        type="text"
        name="townCity"
        placeholder="Town/City"
        defaultValue={formData.townCity}
        action={(value) => handleInputChange('townCity', value)}
      />

      <Input
        type="text"
        name="stateRegion"
        placeholder="State/Region"
        defaultValue={formData.stateRegion}
        action={(value) => handleInputChange('stateRegion', value)}
      />

      <Input
        type="text"
        name="postalCode"
        placeholder="Postal Code (Optional)"
        defaultValue={formData.postalCode}
        action={(value) => handleInputChange('postalCode', value)}
      />

      <Input
        type="dropdown"
        name="country"
        placeholder="Country"
        options={['USA', 'Canada', 'UK', 'India'].map((country) => ({ label: country, value: country }))}
        defaultValue={formData.country}
        action={(value) => handleInputChange('country', value)}
        required={true}
      />

      <h3>Contact Information (Fill in Details):</h3>
      <Input
        type="text"
        name="phoneNo"
        placeholder="Phone Number (Primary contact number)"
        defaultValue={formData.phoneNo}
        action={(value) => handleInputChange('phoneNo', value)}
        required={true}
      />

      <Input
        type="email"
        name="email"
        placeholder="Email Address (For inquiries and official correspondence)"
        defaultValue={formData.email}
        action={(value) => handleInputChange('email', value)}
        required={true}
      />

      <Input
        type="text"
        name="website"
        placeholder="Website URL (Optional)"
        defaultValue={formData.website}
        action={(value) => handleInputChange('website', value)}
      />

      <h3>Social Media Links (Optional):</h3>
      <Input
        type="text"
        name="facebook"
        placeholder="Facebook"
        defaultValue={formData.facebook}
        action={(value) => handleInputChange('facebook', value)}
      />

      <Input
        type="text"
        name="instagram"
        placeholder="Instagram"
        defaultValue={formData.instagram}
        action={(value) => handleInputChange('instagram', value)}
      />

      <Input
        type="text"
        name="twitter"
        placeholder="Twitter/X"
        defaultValue={formData.twitter}
        action={(value) => handleInputChange('twitter', value)}
      />

      <Input
        type="text"
        name="linkedin"
        placeholder="LinkedIn"
        defaultValue={formData.linkedin}
        action={(value) => handleInputChange('linkedin', value)}
      />

      <h3>Profession:</h3>
      <Input
        type="dropdown"
        name="profession"
        placeholder="Select Profession"
        options={professions.map((profession) => ({ label: profession, value: profession }))}
        defaultValue={formData.profession}
        action={(value) => handleInputChange('profession', value)}
        required={true}
      />

      <h3>Profile Description:</h3>
      <Input
        type="text-area"
        name="profileDescription"
        placeholder="Profile Description (100 - 500 words)"
        defaultValue={formData.profileDescription}
        action={(value) => handleInputChange('profileDescription', value)}
        required={true}
        minLength={100}
        maxLength={500}
      />

      <h3>Skills & Expertise:</h3>
      <Input
        type="text"
        name="skillsAndExpertise"
        placeholder="Key Skills/Services"
        defaultValue={formData.skillsAndExpertise}
        action={(value) => handleInputChange('skillsAndExpertise', value)}
        required={true}
      />

      <h3>Years of Experience:</h3>
      <Input
        type="number"
        name="yearsOfExperience"
        placeholder="Years of Experience"
        defaultValue={formData.yearsOfExperience}
        action={(value) => handleInputChange('yearsOfExperience', value)}
        required={true}
      />

      <h3>Professional Certifications (if any):</h3>
      <Input
        type="text"
        name="professionalCertifications"
        placeholder="Certifications (e.g., CPA, PMP)"
        defaultValue={formData.professionalCertifications}
        action={(value) => handleInputChange('professionalCertifications', value)}
      />

      <h3>Languages Spoken (Optional):</h3>
      <Input
        type="text"
        name="languagesSpoken"
        placeholder="Languages Spoken"
        defaultValue={formData.languagesSpoken}
        action={(value) => handleInputChange('languagesSpoken', value)}
      />

      {/* <h3>Upload Your Profile Photo (JPEG/PNG - Max 5MB):</h3>
      <Input
        type="file"
        name="profilePhoto"
        action={(value) => handleInputChange('profilePhoto', value)}
      />

      <h3>Upload Passport/ID:</h3>
      <Input
        type="file"
        name="passportId"
        action={(value) => handleInputChange('passportId', value)}
      /> */}

      <h3>Consent and Verification:</h3>
      <Checkbox
        label="I consent to my professional information being listed in the Tribe Africa Pages Directory."
        onChange={(checked) => handleInputChange('consent', checked)}
      />

      <Checkbox
        label="I confirm that the information provided is accurate to the best of my knowledge."
        onChange={(checked) => handleInputChange('accuracyVerification', checked)}
      />

      <h3>Signature:</h3>
      <Input
        type="text"
        name="signature"
        placeholder="Type your full name to sign electronically"
        defaultValue={formData.signature}
        action={(value) => handleInputChange('signature', value)}
        required={true}
      />

      <h3>Date:</h3>
      <DateInput value={formData.date} onChange={(value) => handleInputChange('date', value)} />

      <div className="mt-4">
        <button type="submit" className="bg-brand-orange text-white py-2 px-4 rounded-md">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CandidateForm;
