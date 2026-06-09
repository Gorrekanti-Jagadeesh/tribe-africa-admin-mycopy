import React from 'react';
import spiralBackground from '@assets/branding-bg-dark.png';
import { TribeAfrica } from '@atoms/common/internal-logo';
import { Loading } from '@atoms/common/loading';
import HeroSection from './hero-section';
import { sanityImageUrlBuilder } from '@api/index';

interface dataFields {
  video: string;
  image: [];
  exploreSectionImages: string;
  exploreSectionContent: string[];
}

const Explore: React.FC<{ data: dataFields; loading; error }> = ({ data, loading, error }) => {
  if (loading) {
    return <Loading />;
  }

  if (error || !data) {
    return null;
  }

  return (
    <>
      <HeroSection video={data?.video} image={data?.image ? sanityImageUrlBuilder(data.image).url() : ''} />

      {/* Explore section — Figma: 1520×815, spiral bg, text left + images right */}
      <div
        className="relative bg-cover bg-center text-white py-12 px-4"
        style={{ backgroundImage: `url(${spiralBackground})` }}
      >
        <div className="m-auto max-w-8xl">
          <div className="grid md:flex gap-8 lg:gap-16 items-start animate-on-scroll">
            {/* Left: text block */}
            <div id="welcome-content" className="grid gap-6 md:flex-1">
              {/* "Explore Africa For" — Figma: 36px Poppins 400 */}
              <h4 className="font-poppins font-normal text-3xl md:text-4xl leading-tight">Explore Africa For</h4>
              {/* "Business & Tourism" — Figma: 64px Rufina 400, #FF6600 */}
              <h2 className="font-rufina font-normal text-5xl md:text-6xl lg:text-[64px] lg:leading-[79px] text-brand-orange -mt-4">
                Business &amp; Tourism
              </h2>

              <div id="about-africa" className="grid gap-3 text-sm leading-6 max-w-xl">
                {(data.exploreSectionContent || []).map((each, index) => (
                  <p key={index}>{each}</p>
                ))}
              </div>

              <div id="welcome-footer" className="text-sm flex gap-1 flex-wrap items-center">
                <span className="font-poppins font-bold">join</span>
                <TribeAfrica className="mx-1" />
                <span>and be a part of the future. welcome to the Tribe</span>
              </div>
            </div>

            {/* Right: image collage — Figma: top-left 208×312, top-right 221×312, bottom 442×298 */}
            <div className="flex flex-col gap-3 w-full md:w-[480px] lg:w-[560px] md:shrink-0 animate-on-scroll">
              <div className="flex gap-3">
                {/* Top-left */}
                <div className="flex-1">
                  <img
                    src={
                      data?.exploreSectionImages?.[0] ? sanityImageUrlBuilder(data.exploreSectionImages[0]).url() : ''
                    }
                    alt="Explore Africa"
                    className="w-full object-cover rounded-[10px] shadow-lg"
                    style={{ aspectRatio: '208/312' }}
                  />
                </div>
                {/* Top-right */}
                <div className="flex-1">
                  <img
                    src={
                      data?.exploreSectionImages?.[1] ? sanityImageUrlBuilder(data.exploreSectionImages[1]).url() : ''
                    }
                    alt="Explore Africa"
                    className="w-full object-cover rounded-[10px] shadow-lg"
                    style={{ aspectRatio: '221/312' }}
                  />
                </div>
              </div>
              {/* Bottom full-width */}
              <div className="w-full">
                <img
                  src={data?.exploreSectionImages?.[2] ? sanityImageUrlBuilder(data.exploreSectionImages[2]).url() : ''}
                  alt="Explore Africa"
                  className="w-full object-cover rounded-[10px] shadow-lg"
                  style={{ aspectRatio: '442/298' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
