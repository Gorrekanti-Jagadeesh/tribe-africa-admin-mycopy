import React, { useRef, useEffect } from 'react';

const Experience: React.FC<{ video?: string }> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [video]);

  return (
    <div className="px-4 py-8 max-w-8xl m-auto animate-on-scroll">
      <h2 className="font-rufina font-normal text-4xl md:text-5xl lg:text-[64px] lg:leading-[79px] text-black mb-6">
        Get Ready for a Life Changing Experience
      </h2>

      {video && (
        <div className="rounded-[7px] overflow-hidden w-full bg-black">
          <video ref={videoRef} loop muted playsInline className="w-full block">
            <source src={video} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
};

export default Experience;
