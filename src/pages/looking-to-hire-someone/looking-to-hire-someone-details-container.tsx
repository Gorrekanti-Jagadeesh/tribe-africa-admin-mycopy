import LookingToHireSomeoneDetailsScreen from './looking-to-hire-someone-details-screen';
import ministerImage from '../../assets/minister-image.png';
const LookingToHireSomeoneDetailsContainer: React.FC = () => {
  const data = [
    {
      _id: '1',
      name: 'John Doe',
      department: 'IT',
      role: 'Software Engineer',
      experience: '7+ Years Experience',
      phone_no: '081234567890',
      email: 'john.doe@example.com',
      website: 'john.com',
      image: ministerImage,
      description:
        'John Doe is a software engineer with 7+ years of experience. He is skilled in JavaScript, React, and Node.js. He is currently looking for a new opportunity.',
      country: 'Abuja, Nigeria',
      address: 'Freetown, Sierra Leone',
    },
    {
      _id: '2',
      name: 'John Doe',
      department: 'Artist',
      role: 'Actor',
      experience: '7+ Years Experience',
      phone_no: '081234567890',
      email: 'john.doe@example.com',
      website: 'john.com',
      image: ministerImage,
      description:
        'John Doe is a software engineer with 7+ years of experience. He is skilled in JavaScript, React, and Node.js. He is currently looking for a new opportunity.',
      country: 'Abuja, Nigeria',
      address: 'Freetown, Sierra Leone',
    },
    {
      _id: '3',
      name: 'John Doe',
      department: 'IT',
      role: 'Web Developer',
      experience: '7+ Years Experience',
      phone_no: '081234567890',
      email: 'john.doe@example.com',
      website: 'john.com',
      image: ministerImage,
      description:
        'John Doe is a software engineer with 7+ years of experience. He is skilled in JavaScript, React, and Node.js. He is currently looking for a new opportunity.',
      country: 'Abuja, Nigeria',
      address: 'Freetown, Sierra Leone',
    },
  ];

  return <LookingToHireSomeoneDetailsScreen proffesionalPersonData={data[0]} />;
};

export default LookingToHireSomeoneDetailsContainer;
