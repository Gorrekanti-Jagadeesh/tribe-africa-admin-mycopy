// experience-container.tsx
import React, { useState, useRef } from 'react';
import ExperienceScreen from './experience-screen';

const Experience: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleVideoEnd = () => {
    setPlaying(false);
  };

  return (
    <ExperienceScreen playing={playing} handlePlay={handlePlay} videoRef={videoRef} handleVideoEnd={handleVideoEnd} />
  );
};

export default Experience;
