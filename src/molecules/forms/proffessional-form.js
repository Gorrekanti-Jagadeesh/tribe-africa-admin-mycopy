import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
// import React from 'react';
// import { useState } from 'react';
// const ProfessionalDataForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     role: '',
//     profession: 'Artist',
//     statement: '',
//     streetAddress: '',
//     city: '',
//     region: '',
//     postalCode: '',
//     country: 'Algeria',
//     phoneNumber: '',
//     email: '',
//     website: '',
//     facebookUrl: '',
//     instagramUrl: '',
//     twitterUrl: '',
//     linkedinUrl: '',
//     description: '',
//     skills: [],
//     experience: '',
//     certificates: [],
//     languages: [],
//     proffessionalImage: null,
//     idImage: null,
//     reviews: [],
//   });
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name } = e.target;
//     const file = e.target.files?.[0] || null;
//     setFormData({ ...formData, [name]: file });
//   };
//   const handleArrayChange = (name: string, value: string) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: [...prevState[name], value],
//     }));
//   };
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Form Data Submitted: ', formData);
//   };
//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Create a Business</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Professional Title</label>
//           <input
//             type="text"
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Profession</label>
//           <select
//             name="profession"
//             value={formData.profession}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
//           >
//             <option value="Artist">Artist</option>
//             <option value="Designer">Designer</option>
//             <option value="Engineer">Engineer</option>
//             <option value="Lawyer">Lawyer</option>
//             <option value="Construction">Construction</option>
//             <option value="IT">IT</option>
//             <option value="other">Other</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Professional Statement</label>
//           <textarea
//             name="statement"
//             value={formData.statement}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Address</label>
//           <div className="flex flex-wrap gap-4">
//             <input
//               type="text"
//               placeholder="Street"
//               name="streetAddress"
//               value={formData.streetAddress}
//               onChange={handleChange}
//               className="flex-1 border border-gray-300 p-2 rounded-md"
//             />
//             <input
//               type="text"
//               name="city"
//               placeholder="City"
//               value={formData.city}
//               onChange={handleChange}
//               className="flex-1 border border-gray-300 p-2 rounded-md"
//             />
//             <input
//               type="text"
//               name="region"
//               placeholder="Region/State"
//               value={formData.region}
//               onChange={handleChange}
//               className="flex-1 border border-gray-300 p-2 rounded-md"
//             />
//             <input
//               type="text"
//               name="postalCode"
//               placeholder="Postal Code"
//               value={formData.postalCode}
//               onChange={handleChange}
//               className="flex-1 border border-gray-300 p-2 rounded-md"
//             />
//             <select
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               className="flex-1 border border-gray-300 p-2 rounded-md"
//             >
//               <option value="Algeria">Algeria</option>
//               <option value="Botswana">Botswana</option>
//               <option value="Rwanda">Rwanda</option>
//               <option value="Sierra-Leone">Sierra Leone</option>
//               <option value="Ghana">Ghana</option>
//               <option value="Tanzania">Tanzania</option>
//               <option value="Zambia">Zambia</option>
//               <option value="Mauritius">Mauritius</option>
//               <option value="The-Gambia">The Gambia</option>
//               <option value="Zimbabwe">Zimbabwe</option>
//               <option value="Angola">Angola</option>
//               <option value="Benin">Benin</option>
//               <option value="South-Africa">South Africa</option>
//               <option value="Mozambique">Mozambique</option>
//             </select>
//           </div>
//         </div>
//         {/* Additional Fields */}
//         {/* <div className="mb-4">
//           <label className="block mb-1 font-medium">Street Address</label>
//           <input
//             type="text"
//             name="streetAddress"
//             value={formData.streetAddress}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">City</label>
//           <input
//             type="text"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">State/Region</label>
//           <input
//             type="text"
//             name="region"
//             value={formData.region}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Postal Code</label>
//           <input
//             type="text"
//             name="postalCode"
//             value={formData.postalCode}
//             onChange={handleChange}
//             className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
//           />
//         </div> */}
//         <div className="mb-4">
//           <label className="block mb-1 font-medium">Country</label>
//         </div>
//         <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };
// export default ProfessionalDataForm;
import Button from '@/atoms/custom-button/button';
import { useState } from 'react';
const ProfessionalDataForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    profession: 'Artist',
    statement: '',
    streetAddress: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'Algeria',
    phoneNumber: '',
    email: '',
    website: '',
    facebookUrl: '',
    instagramUrl: '',
    twitterUrl: '',
    linkedinUrl: '',
    description: '',
    skills: [],
    experience: '',
    certificates: [],
    languages: [],
    proffessionalImage: null,
    idImage: null,
    reviews: [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, [name]: file });
  };
  const handleArrayChange = (name, value) => {
    const splitingArray = value.split(',').map((skill) => skill.trim()); // Split by comma, trim spaces, and filter empty strings
    setFormData((prevState) => ({
      ...prevState,
      [name]: splitingArray,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted: ', formData);
  };
  return _jsxs('div', {
    className: 'p-4 max-w-4xl mx-auto',
    children: [
      _jsx('h1', { className: 'text-2xl font-bold mb-4', children: 'Create a Business' }),
      _jsxs('form', {
        onSubmit: handleSubmit,
        children: [
          _jsxs('div', {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block mb-1 font-medium', children: 'Full Name' }),
              _jsx('input', {
                type: 'text',
                name: 'name',
                value: formData.name,
                onChange: handleChange,
                className: 'w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200',
              }),
            ],
          }),
          _jsxs('div', {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block mb-1 font-medium', children: 'Professional Title' }),
              _jsx('input', {
                type: 'text',
                name: 'role',
                value: formData.role,
                onChange: handleChange,
                className: 'w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200',
              }),
            ],
          }),
          _jsxs('div', {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block mb-1 font-medium', children: 'Profession' }),
              _jsxs('select', {
                name: 'profession',
                value: formData.profession,
                onChange: handleChange,
                className: 'w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200',
                children: [
                  _jsx('option', { value: 'Artist', children: 'Artist' }),
                  _jsx('option', { value: 'Designer', children: 'Designer' }),
                  _jsx('option', { value: 'Engineer', children: 'Engineer' }),
                  _jsx('option', { value: 'Lawyer', children: 'Lawyer' }),
                  _jsx('option', { value: 'Construction', children: 'Construction' }),
                  _jsx('option', { value: 'IT', children: 'IT' }),
                  _jsx('option', { value: 'other', children: 'Other' }),
                ],
              }),
            ],
          }),
          _jsxs('div', {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block mb-1 font-medium', children: 'Professional Statement' }),
              _jsx('textarea', {
                name: 'statement',
                value: formData.statement,
                onChange: handleChange,
                className: 'w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200',
              }),
            ],
          }),
          _jsxs('div', {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block mb-1 font-medium', children: 'Address' }),
              _jsxs('div', {
                className: 'flex flex-wrap gap-4',
                children: [
                  _jsx('input', {
                    type: 'text',
                    placeholder: 'Street',
                    name: 'streetAddress',
                    value: formData.streetAddress,
                    onChange: handleChange,
                    className: 'flex-1 border border-gray-300 p-2 rounded-md',
                  }),
                  _jsx('input', {
                    type: 'text',
                    name: 'city',
                    placeholder: 'City',
                    value: formData.city,
                    onChange: handleChange,
                    className: 'flex-1 border border-gray-300 p-2 rounded-md',
                  }),
                  _jsx('input', {
                    type: 'text',
                    name: 'region',
                    placeholder: 'Region/State',
                    value: formData.region,
                    onChange: handleChange,
                    className: 'flex-1 border border-gray-300 p-2 rounded-md',
                  }),
                  _jsx('input', {
                    type: 'text',
                    name: 'postalCode',
                    placeholder: 'Postal Code',
                    value: formData.postalCode,
                    onChange: handleChange,
                    className: 'flex-1 border border-gray-300 p-2 rounded-md',
                  }),
                  _jsxs('select', {
                    name: 'country',
                    value: formData.country,
                    onChange: handleChange,
                    className: 'flex-1 border border-gray-300 p-2 rounded-md',
                    children: [
                      _jsx('option', { value: 'Algeria', children: 'Algeria' }),
                      _jsx('option', { value: 'Botswana', children: 'Botswana' }),
                      _jsx('option', { value: 'Rwanda', children: 'Rwanda' }),
                      _jsx('option', { value: 'Sierra-Leone', children: 'Sierra Leone' }),
                      _jsx('option', { value: 'Ghana', children: 'Ghana' }),
                      _jsx('option', { value: 'Tanzania', children: 'Tanzania' }),
                      _jsx('option', { value: 'Zambia', children: 'Zambia' }),
                      _jsx('option', { value: 'Mauritius', children: 'Mauritius' }),
                      _jsx('option', { value: 'The-Gambia', children: 'The Gambia' }),
                      _jsx('option', { value: 'Zimbabwe', children: 'Zimbabwe' }),
                      _jsx('option', { value: 'Angola', children: 'Angola' }),
                      _jsx('option', { value: 'Benin', children: 'Benin' }),
                      _jsx('option', { value: 'South-Africa', children: 'South Africa' }),
                      _jsx('option', { value: 'Mozambique', children: 'Mozambique' }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          _jsxs('div', {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block mb-1 font-medium', children: 'Contact Number' }),
              _jsx('input', {
                type: 'text',
                name: 'phoneNumber',
                value: formData.phoneNumber,
                onChange: handleChange,
                className: 'w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200',
              }),
            ],
          }),
          _jsxs('div', {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block mb-1 font-medium', children: 'Email Address' }),
              _jsx('input', {
                type: 'email',
                name: 'email',
                value: formData.email,
                onChange: handleChange,
                className: 'w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200',
              }),
            ],
          }),
          _jsxs('div', {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block mb-1 font-medium', children: 'Website URL' }),
              _jsx('input', {
                type: 'url',
                name: 'website',
                value: formData.website,
                onChange: handleChange,
                className: 'w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200',
              }),
            ],
          }),
          _jsxs('div', {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block mb-1 font-medium', children: 'Social Media Profiles' }),
              _jsx('input', {
                type: 'url',
                name: 'facebookUrl',
                placeholder: 'Facebook Profile Link',
                value: formData.facebookUrl,
                onChange: handleChange,
                className: 'w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200 mb-2',
              }),
              _jsx('input', {
                type: 'url',
                name: 'instagramUrl',
                placeholder: 'Instagram Profile Link',
                value: formData.instagramUrl,
                onChange: handleChange,
                className: 'w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200 mb-2',
              }),
              _jsx('input', {
                type: 'url',
                name: 'twitterUrl',
                placeholder: 'Twitter/X Profile Link',
                value: formData.twitterUrl,
                onChange: handleChange,
                className: 'w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200 mb-2',
              }),
              _jsx('input', {
                type: 'url',
                name: 'linkedinUrl',
                placeholder: 'LinkedIn Profile Link',
                value: formData.linkedinUrl,
                onChange: handleChange,
                className: 'w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200',
              }),
            ],
          }),
          _jsxs('div', {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block mb-1 font-medium', children: 'Profile Description' }),
              _jsx('textarea', {
                name: 'description',
                value: formData.description,
                onChange: handleChange,
                className: 'w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200',
              }),
            ],
          }),
          _jsxs('div', {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block mb-1 font-medium', children: 'Skills & Expertise' }),
              _jsx('textarea', {
                name: 'skills',
                value: formData.skills.join(', '),
                onChange: (e) => handleArrayChange('skills', e.target.value),
                placeholder: 'Enter skills separated by commas',
                className: 'w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200',
              }),
            ],
          }),
          _jsxs('div', {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block mb-1 font-medium', children: 'Years of Experience' }),
              _jsx('input', {
                type: 'text',
                name: 'experience',
                value: formData.experience,
                onChange: handleChange,
                className: 'w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200',
              }),
            ],
          }),
          _jsxs('div', {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block mb-1 font-medium', children: 'Professional Certificates' }),
              _jsx('textarea', {
                name: 'certificates',
                value: formData.certificates.join(', '),
                onChange: (e) => handleArrayChange('certificates', e.target.value),
                placeholder: 'Enter certificates separated by commas',
                className: 'w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200',
              }),
            ],
          }),
          _jsxs('div', {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block mb-1 font-medium', children: 'Languages' }),
              _jsx('textarea', {
                name: 'languages',
                value: formData.languages.join(', '),
                onChange: (e) => handleArrayChange('languages', e.target.value),
                placeholder: 'Enter languages separated by commas',
                className: 'w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200',
              }),
            ],
          }),
          _jsxs('div', {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block mb-1 font-medium', children: 'Upload Professional Photo' }),
              _jsx('input', {
                type: 'file',
                name: 'proffessionalImage',
                onChange: handleFileChange,
                className: 'w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200',
              }),
            ],
          }),
          _jsxs('div', {
            className: 'mb-4',
            children: [
              _jsx('label', { className: 'block mb-1 font-medium', children: 'Upload Passport/ID' }),
              _jsx('input', {
                type: 'file',
                name: 'idImage',
                onChange: handleFileChange,
                className: 'w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200',
              }),
            ],
          }),
          _jsx(Button, { type: 'button', children: 'Submit' }),
        ],
      }),
    ],
  });
};
export default ProfessionalDataForm;
