import { jsx as _jsx } from 'react/jsx-runtime';
import { useEffect, useState } from 'react';
import HolidayScreen from './holiday-screen';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from '@api/index';
import { sanity } from '@utils/sanity';
const HolidayContainer = () => {
  const { country } = useParams();
  const [currentTime, setCurrentTime] = useState(''); // To track current formatted time
  const {
    data: landingData,
    error: landingError,
    isLoading: landingLoading,
  } = useQuery({
    queryKey: ['business-holiday-landing-data', country],
    queryFn: () => sanity.GET(`*[_type == "business-holiday-landing-page" && lower(country) == "${country}"][0]`), // Handle undefined 'country'
  });
  const {
    data: rawWeatherData,
    error: weatherError,
    isLoading: weatherLoading,
  } = useQuery({
    queryKey: ['weatherData', country],
    queryFn: () => fetchWeatherData(country),
    refetchInterval: 1800000, // Refetch every 30 minutes
  });
  const {
    data: lookOutForData,
    error: lookOutForError,
    isLoading: lookOutForLoading,
  } = useQuery({
    queryKey: ['look-out-for-data', country],
    queryFn: () => sanity.GET(`*[_type == "holiday-things-to-look-out-for" && lower(country) == "${country}"]`), // Handle undefined 'country'
  });
  const {
    data: mapsData,
    error: mapsError,
    isLoading: mapsLoading,
  } = useQuery({
    queryKey: ['maps-data', country],
    queryFn: () => sanity.GET(`*[_type == "mapsData" && lower(country) == "${country}"][0]`), // Handle undefined 'country'
  });
  const {
    data: adventuresData,
    error: adventuresError,
    isLoading: adventuresLoading,
  } = useQuery({
    queryKey: ['adventures-data', country],
    queryFn: () => sanity.GET(`*[_type == "holiday-adventures" && lower(country) == "${country}"]`), // Handle undefined 'country'
  });
  const {
    data: tribeGoesOutData,
    error: tribeGoesOutError,
    isLoading: tribeGoesOutLoading,
  } = useQuery({
    queryKey: ['tribe-goes-out-data', country],
    queryFn: () => sanity.GET(`*[_type == "holiday-tribe-goes-out" && lower(country) == "${country}"]`), // Handle undefined 'country'
  });
  const formatTime = (date) => {
    const options = {
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
  return _jsx(HolidayScreen, {
    props: {
      country,
      weatherData,
      weatherLoading,
      weatherError,
      landingData,
      landingError,
      landingLoading,
      lookOutForData,
      lookOutForLoading,
      lookOutForError,
      mapsData,
      mapsError,
      mapsLoading,
      adventuresData,
      adventuresLoading,
      adventuresError,
      tribeGoesOutData,
      tribeGoesOutLoading,
      tribeGoesOutError,
    },
  });
};
export default HolidayContainer;
