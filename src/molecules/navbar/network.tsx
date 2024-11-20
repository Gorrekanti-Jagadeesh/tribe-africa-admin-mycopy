import React from 'react';
import { networkURLs } from '../../data';
import { NetworkCategory } from '../../types';
import { useQuery } from '@tanstack/react-query';
import NavLayout from '../layout/nav-layout';

const Network: React.FC = () => {
  const fetchNetworkCategories = async () => {
    // Replace this with your actual data fetching logic
    return networkURLs;
  };

  const {
    data: networkCategories,
    isLoading,
    error,
  } = useQuery<NetworkCategory[]>({
    queryKey: ['networkCategories'],
    queryFn: fetchNetworkCategories,
  });

  if (isLoading) <>Loading...</>;
  if (error) <>Error Occurred</>;

  return (
    <NavLayout
      eventCategories={networkCategories || []}
      showButton={false}
      showModal={false}
      navLayoutHeading="Network"
    />
  );
};

export default Network;
