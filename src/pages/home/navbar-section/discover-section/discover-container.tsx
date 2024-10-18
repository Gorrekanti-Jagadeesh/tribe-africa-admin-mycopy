// discover-container.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import DiscoverScreen from './discover-screen';
import innovationsView from '../../../../assets/home/discover/innovations.jpg';
import didYouKnowView from '../../../../assets/home/discover/did-you-know.jpg';
import bucketListView from '../../../../assets/home/discover/bucket-list.jpg';
import greatOutdoorsView from '../../../../assets/home/discover/great-outdoors.jpg';
import pilgrimageView from '../../../../assets/home/discover/pilgrimage.jpg';
import weddingDestinationView from '../../../../assets/home/discover/destination-weddings.jpg';

const DiscoverContainer: React.FC = () => {
  const [content, setContent] = useState<React.ReactNode>();
  const [parentContent, setParentContent] = useState(true);

  const navigate = useNavigate();

  // Dummy Images for the grid cards
  const images = {
    innovationsView: innovationsView,
    didYouKnowView: didYouKnowView,
    bucketListView: bucketListView,
    greatOutdoorsView: greatOutdoorsView,
    pilgrimageView: pilgrimageView,
    weddingDestinationView: weddingDestinationView,
  };

  const handleClick = (jsx: React.ReactNode) => {
    setContent(jsx);
    setParentContent(false);
  };

  const handleBackToDiscover = () => {
    setParentContent(true);
  };

  return (
    <DiscoverScreen
      parentContent={parentContent}
      content={content}
      handleClick={handleClick}
      handleBackToDiscover={handleBackToDiscover}
      images={images}
      navigate={navigate}
    />
  );
};

export default DiscoverContainer;
