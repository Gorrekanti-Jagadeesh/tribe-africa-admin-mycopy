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
import React from 'react';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, [name]: file });
  };

  const handleArrayChange = (name: string, value: string) => {
    const splitingArray = value.split(',').map((skill) => skill.trim()); // Split by comma, trim spaces, and filter empty strings
    setFormData((prevState) => ({
      ...prevState,
      [name]: splitingArray,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data Submitted: ', formData);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a Business</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Professional Title</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Profession</label>
          <select
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="Artist">Artist</option>
            <option value="Designer">Designer</option>
            <option value="Engineer">Engineer</option>
            <option value="Lawyer">Lawyer</option>
            <option value="Construction">Construction</option>
            <option value="IT">IT</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Professional Statement</label>
          <textarea
            name="statement"
            value={formData.statement}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Address</label>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Street"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              className="flex-1 border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="flex-1 border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              name="region"
              placeholder="Region/State"
              value={formData.region}
              onChange={handleChange}
              className="flex-1 border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              className="flex-1 border border-gray-300 p-2 rounded-md"
            />
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="flex-1 border border-gray-300 p-2 rounded-md"
            >
              <option value="Algeria">Algeria</option>
              <option value="Botswana">Botswana</option>
              <option value="Rwanda">Rwanda</option>
              <option value="Sierra-Leone">Sierra Leone</option>
              <option value="Ghana">Ghana</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Zambia">Zambia</option>
              <option value="Mauritius">Mauritius</option>
              <option value="The-Gambia">The Gambia</option>
              <option value="Zimbabwe">Zimbabwe</option>
              <option value="Angola">Angola</option>
              <option value="Benin">Benin</option>
              <option value="South-Africa">South Africa</option>
              <option value="Mozambique">Mozambique</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Contact Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Website URL</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Social Media Profiles</label>
          <input
            type="url"
            name="facebookUrl"
            placeholder="Facebook Profile Link"
            value={formData.facebookUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200 mb-2"
          />
          <input
            type="url"
            name="instagramUrl"
            placeholder="Instagram Profile Link"
            value={formData.instagramUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200 mb-2"
          />
          <input
            type="url"
            name="twitterUrl"
            placeholder="Twitter/X Profile Link"
            value={formData.twitterUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200 mb-2"
          />
          <input
            type="url"
            name="linkedinUrl"
            placeholder="LinkedIn Profile Link"
            value={formData.linkedinUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Profile Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Skills & Expertise</label>
          <textarea
            name="skills"
            value={formData.skills.join(', ')}
            onChange={(e) => handleArrayChange('skills', e.target.value)}
            placeholder="Enter skills separated by commas"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Years of Experience</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Professional Certificates</label>
          <textarea
            name="certificates"
            value={formData.certificates.join(', ')}
            onChange={(e) => handleArrayChange('certificates', e.target.value)}
            placeholder="Enter certificates separated by commas"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Languages</label>
          <textarea
            name="languages"
            value={formData.languages.join(', ')}
            onChange={(e) => handleArrayChange('languages', e.target.value)}
            placeholder="Enter languages separated by commas"
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Upload Professional Photo</label>
          <input
            type="file"
            name="proffessionalImage"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Upload Passport/ID</label>
          <input
            type="file"
            name="idImage"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProfessionalDataForm;
