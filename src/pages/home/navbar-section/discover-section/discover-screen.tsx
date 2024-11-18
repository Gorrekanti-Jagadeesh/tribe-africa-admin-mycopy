// discover-screen.tsx
import React from 'react';
import { NavigateFunction } from 'react-router';

interface DiscoverScreenProps {
  parentContent: boolean;
  content: React.ReactNode;
  handleClick: (jsx: React.ReactNode) => void;
  handleBackToDiscover: () => void;
  images: {
    innovationsView: string;
    didYouKnowView: string;
    bucketListView: string;
    greatOutdoorsView: string;
    pilgrimageView: string;
    weddingDestinationView: string;
  };
  navigate: NavigateFunction;
}

const DiscoverScreen: React.FC<DiscoverScreenProps> = ({
  parentContent,
  content,
  handleClick,
  handleBackToDiscover,
  images,
  navigate,
}) => {
  return (
    <div className="p-4">
      <h4 className="text-left text-orange-500 text-lg">&rarr; Discover</h4>
      {parentContent ? (
        <div id="grid-layout" className="grid grid-cols-3">
          {/* Innovations card */}
          <Card
            title="Innovations"
            imageUrl={images.innovationsView}
            onClick={() =>
              handleClick(<InnovationsScreen navigate={navigate} setParentContent={handleBackToDiscover} />)
            }
          />
          {/* Did you know? card */}
          <Card
            title="Did you know?"
            imageUrl={images.didYouKnowView}
            onClick={() => handleClick(<DidYouKnowScreen setParentContent={handleBackToDiscover} />)}
          />
          {/* Bucket list card */}
          <Card
            title="For the bucket list"
            imageUrl={images.bucketListView}
            onClick={() => handleClick(<BucketListScreen setParentContent={handleBackToDiscover} />)}
          />
          {/* The Great Outdoors */}
          <Card
            title="The Great Outdoors"
            imageUrl={images.greatOutdoorsView}
            onClick={() => handleClick(<GreatOutdoorsScreen setParentContent={handleBackToDiscover} />)}
          />
          {/* Pilgrimage card */}
          <Card
            title="Pilgrimage"
            imageUrl={images.pilgrimageView}
            onClick={() => handleClick(<PilgrimageScreen setParentContent={handleBackToDiscover} />)}
          />
          {/* Wedding destinations */}
          <Card
            title="Destination Weddings"
            imageUrl={images.weddingDestinationView}
            onClick={() => handleClick(<DestinationWeddingScreen setParentContent={handleBackToDiscover} />)}
          />
        </div>
      ) : (
        <div id="sub-layout" className="p-8 m-2 text-left bg-white text-black rounded-2xl">
          {content}
        </div>
      )}
    </div>
  );
};

export default DiscoverScreen;

const ContentScreen: React.FC<{
  title: string;
  setParentContent: (value: boolean) => void;
  navigate?: NavigateFunction; // Optional for screens that don't use navigate
  link?: string; // Optional for screens that have a link
}> = ({ title, setParentContent, navigate, link }) => {
  const handleClick = () => {
    if (navigate && link) {
      navigate(link);
    } else {
      setParentContent(true);
    }
  };

  return (
    <div>
      <h4 className="text-orange-500 text-lg hover:underline cursor-pointer w-fit" onClick={handleClick}>
        &larr; {title}
      </h4>
      <p>Coming Soon..</p>
    </div>
  );
};

const InnovationsScreen: React.FC<{ setParentContent: () => void; navigate: NavigateFunction }> = ({
  setParentContent,
  navigate,
}) => (
  <div>
    <ContentScreen
      title="Innovations"
      setParentContent={setParentContent}
      navigate={navigate}
      // link="/africa/smart-innovations"
    />
    <div id="innovations-cards" className="grid grid-cols-3">
      <Card
        title="Amazing Smart Innovations"
        imageUrl={`url(demo image)`}
        onClick={() => navigate('/africa/smart-innovations')}
      />
      <Card title="Upcoming Smart Cities" imageUrl={`url(demo image)`} onClick={() => {}} />
    </div>
  </div>
);

const DidYouKnowScreen: React.FC<{ setParentContent: (value: boolean) => void }> = ({ setParentContent }) => (
  <ContentScreen title="Did You know?" setParentContent={setParentContent} />
);

const BucketListScreen: React.FC<{ setParentContent: (value: boolean) => void }> = ({ setParentContent }) => (
  <ContentScreen title="Bucket List" setParentContent={setParentContent} />
);

const GreatOutdoorsScreen: React.FC<{ setParentContent: (value: boolean) => void }> = ({ setParentContent }) => (
  <ContentScreen title="The Great Outdoors" setParentContent={setParentContent} />
);

const PilgrimageScreen: React.FC<{ setParentContent: (value: boolean) => void }> = ({ setParentContent }) => (
  <ContentScreen title="Pilgrimages" setParentContent={setParentContent} />
);

const DestinationWeddingScreen: React.FC<{ setParentContent: (value: boolean) => void }> = ({ setParentContent }) => (
  <ContentScreen title="Wedding destinations" setParentContent={setParentContent} />
);

const Card: React.FC<{
  title: string;
  imageUrl: string;
  onClick: () => void;
}> = ({ title, imageUrl, onClick }) => (
  <div className="inline-block p-2 my-2 cursor-pointer w-fit" onClick={onClick}>
    <div
      className="aspect-square bg-cover bg-center rounded-md border border-orange-500"
      style={{
        width: '200px',
        backgroundImage: `url(${imageUrl})`,
      }}
    ></div>
    <p className="text-left">{title}</p>
  </div>
);
