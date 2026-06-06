import React, { useState, useRef } from 'react';
import videoPlay from '@assets/play-button.png';

const Experience: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    if (videoRef.current) videoRef.current.play();
  };

  const handleVideoEnd = () => setPlaying(false);

  return (
    <div className="px-4 py-8 max-w-8xl m-auto animate-on-scroll">
      {/* Figma: "Get Ready for a Life Changing Experience" 64px Rufina black */}
      <h2 className="font-rufina font-normal text-4xl md:text-5xl lg:text-[64px] lg:leading-[79px] text-black mb-6">
        Get Ready for a Life Changing Experience
      </h2>

      {/* Video — Figma: 1308×502, radius~7 */}
      <div className="bg-slate-800 rounded-[7px] relative overflow-hidden">
        {!playing && (
          <button
            className="text-white absolute inset-0 flex items-center justify-center cursor-pointer z-10"
            onClick={handlePlay}
          >
            <img src={videoPlay} className="w-16 md:w-20 opacity-90 hover:opacity-100 transition-opacity" />
          </button>
        )}
        <video
          ref={videoRef}
          loop={false}
          muted={true}
          className="rounded-[7px] w-full"
          style={{ aspectRatio: '1308/502' }}
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

export default Experience;
