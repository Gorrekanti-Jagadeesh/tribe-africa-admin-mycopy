import { useState, useRef } from 'react';
import videoPlay from '../../../assets/Frame.png';

// Experience/Video section
const Experience: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    if (videoRef.current) {
      videoRef.current.play(); // Play the video programmatically
    }
  };

  return (
    <div className="p-2 md:p-4 grid gap-6 my-8 m-auto max-w-6xl">
      <h3 className="text-4xl text-center">
        Get Ready for a <span className="font-serif text-orange-500">Life Changing Experience</span>
      </h3>
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
          onEnded={() => setPlaying(false)}
        >
          <source
            src="https://s3-figma-videos-production-sig.figma.com/video/1140530022219550208/TEAM/35df/ad4f/-0df9-42cc-8dbf-31a770951344?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c0N438-gTU9-AH0PTknkSn3aF-BkBSGpuY2XYaiZUmYK-FxIMnrUlZu5DZvCcguU5qAjTGoB5Ld8dZ3oR4n~qt9ggbOpnl~yfBAzFV~gXIEiTQOJvm4BrQHpAON-oHril5Kk8LCgQb1dQzWV48AmTT~5MSS7QkuZ0vUH4Tue4VotNxTcn9pLP~OvS0CdfKwltfHcal5YrJ2LksgLhUluqA-t5XyTa3dfjG-Uf~sYuOF~rsP56wxPe7JvQLdRYRC1hBG7yFyYkIVyuQ4VM6Xqboo3T5jnfT5myfuUe4jCBdI1fTpLivoWhacau~jCRFs2K8u74ZmXuXcC4nPJnnJ2oQ__"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Experience;
