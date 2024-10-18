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
          <div
            className="inline-block p-2 my-2 cursor-pointer w-fit"
            onClick={() =>
              handleClick(<InnovationsScreen navigate={navigate} setParentContent={handleBackToDiscover} />)
            }
          >
            <div
              className="aspect-square bg-cover bg-center rounded-md border border-orange-500"
              style={{
                width: '200px',
                backgroundImage: `url(${images.innovationsView})`,
              }}
            ></div>
            <p className="text-left">Innovations</p>
          </div>
          {/* Did you know? card */}
          <div
            className="inline-block p-2 my-2 cursor-pointer w-fit"
            onClick={() => handleClick(<DidYouKnowScreen setParentContent={handleBackToDiscover} />)}
          >
            <div
              className="aspect-square bg-cover bg-center rounded-md border border-orange-500"
              style={{
                width: '200px',
                backgroundImage: `url(${images.didYouKnowView})`,
              }}
            ></div>
            <p className="text-left">Did you know?</p>
          </div>
          {/* Bucket list card */}
          <div
            className="inline-block p-2 my-2 cursor-pointer w-fit"
            onClick={() => handleClick(<BucketListScreen setParentContent={handleBackToDiscover} />)}
          >
            <div
              className="aspect-square bg-cover bg-center rounded-md border border-orange-500"
              style={{
                width: '200px',
                backgroundImage: `url(${images.bucketListView})`,
              }}
            ></div>
            <p className="text-left">For the bucket list</p>
          </div>
          {/* The Great Outdoors */}
          <div
            className="inline-block p-2 my-2 cursor-pointer w-fit"
            onClick={() => handleClick(<GreatOutdoorsScreen setParentContent={handleBackToDiscover} />)}
          >
            <div
              className="aspect-square bg-cover bg-center rounded-md border border-orange-500"
              style={{
                width: '200px',
                backgroundImage: `url(${images.greatOutdoorsView})`,
              }}
            ></div>
            <p className="text-left">The Great Outdoors</p>
          </div>
          {/* Pilgrimage card */}
          <div
            className="inline-block p-2 my-2 cursor-pointer w-fit"
            onClick={() => handleClick(<PilgrimageScreen setParentContent={handleBackToDiscover} />)}
          >
            <div
              className="aspect-square bg-cover bg-center rounded-md border border-orange-500"
              style={{
                width: '200px',
                backgroundImage: `url(${images.pilgrimageView})`,
              }}
            ></div>
            <p className="text-left">Pilgrimage</p>
          </div>
          {/* Wedding destinations */}
          <div
            className="inline-block p-2 my-2 cursor-pointer w-fit"
            onClick={() => handleClick(<DestinationWeddingScreen setParentContent={handleBackToDiscover} />)}
          >
            <div
              className="aspect-square bg-cover bg-center rounded-md border border-orange-500"
              style={{
                width: '200px',
                backgroundImage: `url(${images.weddingDestinationView})`,
              }}
            ></div>
            <p className="text-left">Destination Weddings</p>
          </div>
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

const InnovationsScreen: React.FC<{ setParentContent: () => void; navigate: NavigateFunction }> = ({
  setParentContent,
  navigate,
}) => (
  <div>
    <h4 className="text-orange-500 text-lg hover:underline cursor-pointer w-fit" onClick={setParentContent}>
      &larr; Innovations
    </h4>
    <div id="innovations-cards" className="grid grid-cols-3">
      <div className="inline-block p-2 my-2 cursor-pointer w-fit" onClick={() => navigate('/africa/smart-innovations')}>
        <div
          className="aspect-square bg-cover rounded-md"
          style={{
            width: '200px',
            backgroundImage: `url(demo image)`,
          }}
        ></div>
        <p className="text-left">Amazing Smart Innovations</p>
      </div>
      <div className="inline-block p-2 my-2 cursor-pointer w-fit">
        <div
          className="aspect-square bg-cover rounded-md"
          style={{
            width: '200px',
            backgroundImage: `url(demo image)`,
          }}
        ></div>
        <p className="text-left">Upcoming Smart Cities</p>
      </div>
    </div>
  </div>
);

const DidYouKnowScreen: React.FC<{ setParentContent: (value: boolean) => void }> = ({ setParentContent }) => {
  return (
    <div>
      <h4
        className="text-orange-500 text-lg hover:underline cursor-pointer w-fit"
        onClick={() => setParentContent(true)}
      >
        &larr; Did You know?
      </h4>
      <div id="innovations-cards" className=" grid grid-cols-3">
        {/* Content in the form of card layout */}
      </div>
    </div>
  );
};

const BucketListScreen: React.FC<{ setParentContent: (value: boolean) => void }> = ({ setParentContent }) => {
  return (
    <div>
      <h4
        className="text-orange-500 text-lg hover:underline cursor-pointer w-fit"
        onClick={() => setParentContent(true)}
      >
        &larr; Bucket List
      </h4>
      <div id="innovations-cards" className=" grid grid-cols-3">
        {/* Content in the form of card layout */}
      </div>
    </div>
  );
};

const GreatOutdoorsScreen: React.FC<{ setParentContent: (value: boolean) => void }> = ({ setParentContent }) => {
  return (
    <div>
      <h4
        className="text-orange-500 text-lg hover:underline cursor-pointer w-fit"
        onClick={() => setParentContent(true)}
      >
        &larr; The Great Outdoors
      </h4>
      <div id="innovations-cards" className=" grid grid-cols-3">
        {/* Content in the form of card layout */}
      </div>
    </div>
  );
};

const PilgrimageScreen: React.FC<{ setParentContent: (value: boolean) => void }> = ({ setParentContent }) => {
  return (
    <div>
      <h4
        className="text-orange-500 text-lg hover:underline cursor-pointer w-fit"
        onClick={() => setParentContent(true)}
      >
        &larr; Pilgrimages
      </h4>
      <div id="innovations-cards" className=" grid grid-cols-3">
        {/* Content in the form of card layout */}
      </div>
    </div>
  );
};

const DestinationWeddingScreen: React.FC<{ setParentContent: (value: boolean) => void }> = ({ setParentContent }) => {
  return (
    <div>
      <h4
        className="text-orange-500 text-lg hover:underline cursor-pointer w-fit"
        onClick={() => setParentContent(true)}
      >
        &larr; Wedding destinations
      </h4>
      <div id="innovations-cards" className=" grid grid-cols-3">
        {/* Content in the form of card layout */}
      </div>
    </div>
  );
};
