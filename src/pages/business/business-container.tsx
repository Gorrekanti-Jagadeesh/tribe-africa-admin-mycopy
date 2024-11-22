import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BusinessScreen from './business-screen';
import { useParams } from 'react-router';
import { fetchWeatherData } from '../../api';

const BusinessContainer = () => {
  const { country } = useParams();
  const [currentTime, setCurrentTime] = useState<string>('');

  const updateTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString());
  };

  const { data: rawWeatherData, isLoading } = useQuery({
    queryKey: ['weatherData'],
    queryFn: fetchWeatherData,
    refetchInterval: 1800000, // Refetch every 30 minutes
  });

  const weatherData = rawWeatherData
    ? {
        temperature: rawWeatherData.temperature,
        condition: rawWeatherData.description, // Map description to condition
      }
    : undefined;

  useEffect(() => {
    updateTime(); // Set the initial time

    const timeIntervalId = setInterval(updateTime, 1000); // Update time every second

    return () => {
      clearInterval(timeIntervalId);
    };
  }, []);

  return (
    <div>
      <BusinessScreen country={country} weatherData={weatherData} currentTime={currentTime} isLoading={isLoading} />
    </div>
  );
};

export default BusinessContainer;
