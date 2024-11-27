import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BusinessScreen from './business-screen';
import { useParams } from 'react-router';
import { fetchWeatherData } from '../../api';

const BusinessContainer = () => {
  const { country } = useParams();
  const [currentTime, setCurrentTime] = useState<string>(''); // To track current formatted time

  const { data: rawWeatherData, isLoading } = useQuery({
    queryKey: ['weatherData', country],
    queryFn: () => fetchWeatherData(country),
    refetchInterval: 1800000, // Refetch every 30 minutes
  });

  // Function to format and update time every second
  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    // Get the formatted date
    const formattedDate = date.toLocaleString('en-GB', options);

    // Add the 'th', 'st', 'nd', 'rd' suffix to the day
    const day = date.getDate();
    const suffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };

    const formattedDay = `${day}${suffix(day)}`;
    return formattedDate.replace(`${day}`, formattedDay);
  };

  useEffect(() => {
    if (rawWeatherData?.time) {
      const initialDate = new Date(rawWeatherData.time);
      setCurrentTime(formatTime(initialDate)); // Set initial time when data is fetched

      const timeIntervalId = setInterval(() => {
        // Increment the time by 1 second
        const updatedTime = new Date(initialDate.getTime() + 1000);
        setCurrentTime(formatTime(updatedTime)); // Update formatted time
        initialDate.setTime(updatedTime.getTime()); // Update initialDate to keep track
      }, 1000);

      return () => clearInterval(timeIntervalId); // Cleanup interval on component unmount
    }
  }, [rawWeatherData]); // Dependency array ensures this runs when rawWeatherData changes

  const weatherData = rawWeatherData
    ? {
        temperature: rawWeatherData?.temperature || 0,
        condition: rawWeatherData?.condition || 'NA',
        time: currentTime, // Pass live updated time
      }
    : undefined;

  return (
    <div>
      <BusinessScreen country={country} weatherData={weatherData} isLoading={isLoading} />
    </div>
  );
};

export default BusinessContainer;
