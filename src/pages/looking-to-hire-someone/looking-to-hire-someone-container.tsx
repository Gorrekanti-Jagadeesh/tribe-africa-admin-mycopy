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
      id: '1',
      personName: 'John Doe',
      profession: 'Software Engineer',
      experience: '7+ Years Experience',
      phoneNumber: '081234567890',
      email: 'john.doe@example.com',
      imageUrl: ministerImage,
      description:
        'John Doe is a software engineer with 7+ years of experience. He is skilled in JavaScript, React, and Node.js. He is currently looking for a new opportunity.',
      location: 'Abuja, Nigeria',
      area: 'Freetown, Sierra Leone',
    },
    {
      id: '2',
      personName: 'John Doe',
      profession: 'Software Engineer',
      experience: '7+ Years Experience',
      phoneNumber: '081234567890',
      email: 'john.doe@example.com',
      imageUrl: ministerImage,
      description:
        'John Doe is a software engineer with 7+ years of experience. He is skilled in JavaScript, React, and Node.js. He is currently looking for a new opportunity.',
      location: 'Abuja, Nigeria',
      area: 'Freetown, Sierra Leone',
    },
    {
      id: '3',
      personName: 'John Doe',
      profession: 'Software Engineer',
      experience: '7+ Years Experience',
      phoneNumber: '081234567890',
      email: 'john.doe@example.com',
      imageUrl: ministerImage,
      description:
        'John Doe is a software engineer with 7+ years of experience. He is skilled in JavaScript, React, and Node.js. He is currently looking for a new opportunity.',
      location: 'Abuja, Nigeria',
      area: 'Freetown, Sierra Leone',
    },
    {
      id: '4',
      personName: 'John Doe',
      profession: 'Software Engineer',
      experience: '7+ Years Experience',
      phoneNumber: '081234567890',
      email: 'john.doe@example.com',
      imageUrl: ministerImage,
      description:
        'John Doe is a software engineer with 7+ years of experience. He is skilled in JavaScript, React, and Node.js. He is currently looking for a new opportunity.',
      location: 'Abuja, Nigeria',
      area: 'Freetown, Sierra Leone',
    },
    {
      id: '5',
      personName: 'John Doe',
      profession: 'Software Engineer',
      experience: '7+ Years Experience',
      phoneNumber: '081234567890',
      email: 'john.doe@example.com',
      imageUrl: ministerImage,
      description:
        'John Doe is a software engineer with 7+ years of experience. He is skilled in JavaScript, React, and Node.js. He is currently looking for a new opportunity.',
      location: 'Abuja, Nigeria',
      area: 'Freetown, Sierra Leone',
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

const professionFilterData = [
  { label: 'Agribusiness', icon: 'all' },
  { label: 'Artists', icon: 'all' },
  { label: 'Construction', icon: 'all' },
  { label: 'Domestic', icon: 'all' },
  { label: 'Education', icon: 'all' },
  { label: 'Engineering', icon: 'all' },
  { label: 'Hospitality', icon: 'all' },
  { label: 'Law', icon: 'all' },
  { label: 'Medical', icon: 'all' },
  { label: 'It', icon: 'all' },
];

const proffesionalIcons = [
  { label: 'Actor', icon: <ASVGComponent size={32} /> },
  { label: 'Designer', icon: <BSVGComponent size={32} /> },
  { label: 'Engineer', icon: <CSVGComponent size={32} /> },
  { label: 'Lawyer', icon: <DSVGComponent size={32} /> },
  { label: 'Teacher', icon: <ESVGComponent size={32} /> },
  { label: 'Writer', icon: <FSVGComponent size={32} /> },
  { label: 'Other', icon: <GSVGComponent size={32} /> },
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
      proffesionalIcons={proffesionalIcons}
    />
  );
};

export default LookingToHireSomeoneContainer;
