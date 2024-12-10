import { Loading } from '@atoms/common/loading';
import HomeScreen from './home-screen';
import { useQuery } from '@tanstack/react-query';
import { sanity, query } from '@utils/sanity';

interface BusinessArticleProps {
  image: string;
  title: string;
  description: string;
  _id: string;
  homeBusinessBlogs: string;
  blogType: string;
}

const HomeContainer = () => {
  // Explore
  const {
    data: exploreData,
    error: exploreError,
    isLoading: exploreLoading,
  } = useQuery({
    queryKey: ['explore'],
    queryFn: () => sanity.GET(query.HOME.EXPLORE),
  });

  // Charming Hotels
  const {
    data: hotelsData,
    error: hotelsError,
    isLoading: hotelsLoading,
  } = useQuery({
    queryKey: ['charming_hotels'],
    queryFn: () => sanity.GET(query.HOME.CHARMING_HOTELS),
  });

  // Holiday destinations
  const {
    data: destinationsData,
    error: destinationsError,
    isLoading: destinationsLoading,
  } = useQuery({
    queryKey: ['holiday_destinations'],
    queryFn: () => sanity.GET(query.HOME.HOLIDAY_DESTINATIONS),
  });

  const groupedDestinations =
    destinationsData?.reduce((acc, { image, country, destinationName }) => {
      if (!acc[country]) {
        acc[country] = [];
      }
      acc[country].push({ image, destinationName });
      return acc;
    }, {}) || {};

  // Working remotely
  const {
    data: workingRemotelyData,
    error: workingRemotelyError,
    isLoading: workingRemotelyLoading,
  } = useQuery({
    queryKey: ['working_remotely'],
    queryFn: () =>
      sanity.GET(query.HOME.WORKING_REMOTELY).then((data) => {
        return data.filter(
          (each: BusinessArticleProps) => each.homeBusinessBlogs === 'Working Remotely' && each.blogType === 'Business'
        );
      }),
  });

  // Business friendly
  const {
    data: BusinessFriendlyData,
    error: BusinessFriendlyError,
    isLoading: BusinessFriendlyLoading,
  } = useQuery({
    queryKey: ['business_friendly'],
    queryFn: () =>
      sanity.GET(query.HOME.BUSINESS_FRIENDLY).then((data) => {
        return data.filter(
          (each: BusinessArticleProps) => each.homeBusinessBlogs === 'Business friendly' && each.blogType === 'Business'
        );
      }),
  });

  // Primier Services
  const {
    data: servicesData,
    error: servicesError,
    isLoading: servicesLoading,
  } = useQuery({
    queryKey: ['premier_services'],
    queryFn: () => sanity.GET(query.HOME.PREMIER_SERVICES),
  });

  if (
    servicesLoading &&
    workingRemotelyLoading &&
    BusinessFriendlyLoading &&
    destinationsLoading &&
    hotelsLoading &&
    exploreLoading
  ) {
    return <Loading />;
  }

  return (
    <HomeScreen
      props={{
        exploreData,
        exploreError,
        exploreLoading,
        hotelsData,
        hotelsError,
        hotelsLoading,
        destinationsData: groupedDestinations,
        destinationsError,
        destinationsLoading,
        workingRemotelyData,
        workingRemotelyError,
        workingRemotelyLoading,
        BusinessFriendlyData,
        BusinessFriendlyError,
        BusinessFriendlyLoading,
        servicesData,
        servicesError,
        servicesLoading,
      }}
    />
  );
};

export default HomeContainer;
