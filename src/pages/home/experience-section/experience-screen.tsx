// experience-screen.tsx
import React from 'react';
import videoPlay from '../../../assets/play-button.png';

interface ExperienceScreenProps {
  playing: boolean;
  handlePlay: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  handleVideoEnd: () => void;
}

const ExperienceScreen: React.FC<ExperienceScreenProps> = ({ playing, handlePlay, videoRef, handleVideoEnd }) => {
  return (
    <div className="p-2 md:p-4 grid gap-6 my-8 m-auto max-w-6xl animate-on-scroll">
      <div className="bg-slate-800 rounded-lg relative">
        {!playing && (
          <button
            className="text-white absolute top-0 bottom-0 right-0 left-0 cursor-pointer"
            onClick={handlePlay}
            style={{ zIndex: 1 }}
          >
            <img src={videoPlay} className="m-auto" style={{ maxWidth: '60px' }} />
          </button>
        )}
        <video
          ref={videoRef}
          loop={false}
          muted={true}
          className="rounded-lg"
          style={{ zIndex: 0 }}
          onEnded={handleVideoEnd}
        >
          <source
            src="https://s3-figma-videos-production-sig.figma.com/video/1140530022219550208/TEAM/35df/ad4f/-0df9-42cc-8dbf-31a770951344?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=puNVfQdm3~hGUculdZ-XbsJyi4-OcR6DHCzDz3Th~XMfJjvqW9AqEP9HGRK3IWruDNz6Y6KkStL1AalESbTYe8-sYYodjddl8qf1VS5nPDR7vyoaSrKa0G7lHBAxbMYWwHNVMZBDf-PIzaxqWZHdUWMFTXrYQ0wsk31WdrlGS-ivOBtENsRC0MFkm7xKxJIqOmE09ev~fTjcL8jALXoKpraIw1y3MkmkXtjoFkZd~ntix40o9pyifWaZ~BDvviz9e4U7KrrYq4UYXsZ3TJHjNI1YVYDp6R5M0OjN3borMndRJn4tGHzUPiocnS83ZbRabIlSuhEtgaxZPUu7MBD8CA__"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default ExperienceScreen;
