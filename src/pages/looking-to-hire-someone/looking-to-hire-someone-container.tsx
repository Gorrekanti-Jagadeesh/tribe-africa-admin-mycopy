import LookingToHireSomeoneScreen from './looking-to-hire-someone-screen';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@atoms/common/loading';
import ministerImage from '../../assets/minister-image.png';
import ASVGComponent from '../../assets/svgs/1';
import BSVGComponent from '../../assets/svgs/2';
import CSVGComponent from '../../assets/svgs/3';
import DSVGComponent from '../../assets/svgs/d';
import ESVGComponent from '../../assets/svgs/e';
import FSVGComponent from '../../assets/svgs/f';
import GSVGComponent from '../../assets/svgs/g';

const fetchProffesionalData = () => {
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
  return data;
};

const proffesionalOptions = [
  { label: 'Actor', value: 'actor' },
  { label: 'Designer', value: 'designer' },
  { label: 'Engineer', value: 'engineer' },
  { label: 'Lawyer', value: 'lawyer' },
  { label: 'Teacher', value: 'teacher' },
  { label: 'Writer', value: 'writer' },
  { label: 'Other', value: 'other' },
];

const data = [
  { label: 'Artist', value: 'artist', icon: <ASVGComponent size={32} /> },
  { label: 'Designer', value: 'designer', icon: <BSVGComponent size={32} /> },
  { label: 'Engineer', value: 'engineer', icon: <CSVGComponent size={32} /> },
  { label: 'Lawyer', value: 'lawyer', icon: <DSVGComponent size={32} /> },
  { label: 'Construction', value: 'construction', icon: <ESVGComponent size={32} /> },
  { label: 'IT', value: 'it', icon: <FSVGComponent size={32} /> },
  { label: 'Other', value: 'other', icon: <GSVGComponent size={32} /> },
];

const LookingToHireSomeoneContainer: React.FC = () => {
  const { data: proffesionalData, isLoading } = useQuery({
    queryKey: ['proffesionalData'],
    queryFn: fetchProffesionalData,
  });

  if (isLoading) return <Loading />;
  return (
    <LookingToHireSomeoneScreen
      proffesionalData={proffesionalData}
      proffesionalOptions={proffesionalOptions}
      professions={data}
    />
  );
};

export default LookingToHireSomeoneContainer;
