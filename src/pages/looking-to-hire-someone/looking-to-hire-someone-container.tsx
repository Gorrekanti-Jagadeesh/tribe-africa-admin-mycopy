import LookingToHireSomeoneScreen from './looking-to-hire-someone-screen';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@atoms/common/loading';
import ASVGComponent from '../../assets/svgs/1';
import BSVGComponent from '../../assets/svgs/2';
import CSVGComponent from '../../assets/svgs/3';
import DSVGComponent from '../../assets/svgs/d';
import ESVGComponent from '../../assets/svgs/e';
import FSVGComponent from '../../assets/svgs/f';
import GSVGComponent from '../../assets/svgs/g';
import { sanity } from '@utils/sanity';
import { useParams } from 'react-router';
import { fromKebabCase } from '@utils/common';

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
  const { country } = useParams();
  const {
    data: proffesionalData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['proffessional-data'],
    queryFn: () => sanity.GET(`*[_type == "proffessional-data" && country == "${fromKebabCase(country)}"]`),
  });

  if (isLoading) return <Loading />;
  if (error) return 'Error Occured';

  return (
    <LookingToHireSomeoneScreen
      // proffesionalData={fetchProffesionalData()}
      proffesionalData={proffesionalData}
      proffesionalOptions={proffesionalOptions}
      professions={data}
    />
  );
};

export default LookingToHireSomeoneContainer;
