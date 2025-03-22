import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useRef } from 'react';
import videoPlay from '@assets/play-button.png';
const Experience = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const handlePlay = () => {
    setPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };
  const handleVideoEnd = () => {
    setPlaying(false);
  };
  return _jsx('div', {
    className: 'p-2 md:p-4 grid gap-6 my-8 m-auto max-w-6xl animate-on-scroll',
    children: _jsxs('div', {
      className: 'bg-slate-800 rounded-lg relative',
      children: [
        !playing &&
          _jsx('button', {
            className: 'text-white absolute top-0 bottom-0 right-0 left-0 cursor-pointer',
            onClick: handlePlay,
            style: { zIndex: 1 },
            children: _jsx('img', { src: videoPlay, className: 'm-auto', style: { maxWidth: '60px' } }),
          }),
        _jsxs('video', {
          ref: videoRef,
          loop: false,
          muted: true,
          className: 'rounded-lg',
          style: { zIndex: 0 },
          onEnded: handleVideoEnd,
          children: [
            _jsx('source', {
              src: 'https://s3-figma-videos-production-sig.figma.com/video/1140530022219550208/TEAM/35df/ad4f/-0df9-42cc-8dbf-31a770951344?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=puNVfQdm3~hGUculdZ-XbsJyi4-OcR6DHCzDz3Th~XMfJjvqW9AqEP9HGRK3IWruDNz6Y6KkStL1AalESbTYe8-sYYodjddl8qf1VS5nPDR7vyoaSrKa0G7lHBAxbMYWwHNVMZBDf-PIzaxqWZHdUWMFTXrYQ0wsk31WdrlGS-ivOBtENsRC0MFkm7xKxJIqOmE09ev~fTjcL8jALXoKpraIw1y3MkmkXtjoFkZd~ntix40o9pyifWaZ~BDvviz9e4U7KrrYq4UYXsZ3TJHjNI1YVYDp6R5M0OjN3borMndRJn4tGHzUPiocnS83ZbRabIlSuhEtgaxZPUu7MBD8CA__',
              type: 'video/mp4',
            }),
            'Your browser does not support the video tag.',
          ],
        }),
      ],
    }),
  });
};
export default Experience;
