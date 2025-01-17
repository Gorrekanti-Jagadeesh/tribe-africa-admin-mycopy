import React, { useState } from 'react';
import Input from '@/atoms/input-elements/input';

const CandidateForm: React.FC = () => {
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    description: '',
    experience: '',
    department: '',
    role: '',
    country: '',
    phone_no: '',
    email: '',
    website: '',
    address: '',
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const departments = ['Ministry', 'Police', 'Artist', 'Software'];
  const roles = ['Finance', 'Traffic', 'Actor', 'Web Developer'];
  const countries = ['USA', 'Canada', 'UK', 'India'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl mb-4">Candidate Form</h2>

      <Input
        type="text"
        name="name"
        placeholder="Name"
        defaultValue={formData.name}
        action={(value) => handleInputChange('name', value)}
        required={true}
      />

      <Input
        type="text-area"
        name="description"
        placeholder="Description"
        defaultValue={formData.description}
        action={(value) => handleInputChange('description', value)}
        required={true}
      />

      <Input
        type="text"
        name="experience"
        placeholder="Experience"
        defaultValue={formData.experience}
        action={(value) => handleInputChange('experience', value)}
        required={true}
      />

      <Input
        type="dropdown"
        name="department"
        placeholder="Department"
        options={departments.map((dept) => ({ label: dept, value: dept }))}
        defaultValue={formData.department}
        action={(value) => handleInputChange('department', value)}
        required={true}
      />

      <Input
        type="dropdown"
        name="role"
        placeholder="Role"
        options={roles.map((role) => ({ label: role, value: role }))}
        defaultValue={formData.role}
        action={(value) => handleInputChange('role', value)}
        required={true}
      />

      <Input
        type="dropdown"
        name="country"
        placeholder="Country"
        options={countries.map((country) => ({ label: country, value: country }))}
        defaultValue={formData.country}
        action={(value) => handleInputChange('country', value)}
        required={true}
      />

      <Input
        type="text"
        name="phone_no"
        placeholder="Phone Number"
        defaultValue={formData.phone_no}
        action={(value) => handleInputChange('phone_no', value)}
      />

      <Input
        type="email"
        name="email"
        placeholder="Email"
        defaultValue={formData.email}
        action={(value) => handleInputChange('email', value)}
      />

      <Input
        type="text"
        name="website"
        placeholder="Website"
        defaultValue={formData.website}
        action={(value) => handleInputChange('website', value)}
      />

      <Input
        type="text-area"
        name="address"
        placeholder="Address"
        defaultValue={formData.address}
        action={(value) => handleInputChange('address', value)}
      />

      <div className="mt-4">
        <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded-md">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CandidateForm;
