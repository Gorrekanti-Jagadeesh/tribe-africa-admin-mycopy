import { useState } from 'react';
import { useNavigate } from 'react-router';
import HeroScreen from './hero-screen';
import { Countries, Purpose } from '../../../data';

// Hero Container Component
const HeroSection: React.FC = () => {
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

export default HeroSection;
