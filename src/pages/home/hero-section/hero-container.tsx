import { useState } from 'react';
import { useNavigate } from 'react-router';
import HeroScreen from './hero-screen';

// Demo data: countries and purpose
interface Option {
  value: string;
  label: string;
}

// Countries and Purpose data
const Countries: Option[] = [
  { value: 'Algeria', label: 'Algeria' },
  { value: 'Angola', label: 'Angola' },
  { value: 'Benin', label: 'Benin' },
  { value: 'Botswana', label: 'Botswana' },
  { value: 'Burkina-faso', label: 'Burkina Faso' },
];

const Purpose: Option[] = [
  { value: 'Business', label: 'Business' },
  { value: 'Holiday', label: 'Holiday' },
];

// Hero Container Component
const HeroContainer: React.FC = () => {
  const [country, setCountry] = useState<string | null>(null);
  const [purpose, setPurpose] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoClick = () => {
    if (country) {
      purpose === 'Business' ? navigate(`/${country}/business`) : navigate(`/${country}/holiday`);
    }
  };

  return (
    <HeroScreen
      country={country}
      purpose={purpose}
      setCountry={setCountry}
      setPurpose={setPurpose}
      handleGoClick={handleGoClick}
      countries={Countries}
      purposes={Purpose}
    />
  );
};

export default HeroContainer;
