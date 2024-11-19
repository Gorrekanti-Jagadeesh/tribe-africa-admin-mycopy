import React from 'react';
import Button from '../../atoms/custom-button/button';

const PeaceProsperity: React.FC = () => {
  return (
    <div className="flex flex-col justify-center p-2 md:p-4">
      <h4 className="text-left text-orange-500 text-lg">&rarr; Peace & Prosperity Institute</h4>
      <div className="flex flex-col md:flex-row my-4">
        <div className="w-full max-w-2xl mb-4 mr-2" style={{ flex: '0 0 40%' }}>
          <div className="bg-gray-600 h-48 aspect-video w-full flex items-center justify-center rounded-lg">
            <span className="text-lg">Video</span>
          </div>
        </div>
        <div style={{ flex: '0 0 60%' }}>
          <p className="text-start mb-4">
            The Peace & Prosperity and Think and Grow Rich Institutes have partnered with Tribe Africa to bring this
            life-changing course to our members across Africa!
          </p>
          <p className="text-start mb-4">
            Based on Napoleon Hill's Think and Grow Rich, whose teachings have inspired millions of leaders worldwide,
            this course offers practical steps to achieve personal and financial success. By focusing on mental
            discipline, ambition, and perseverance, you'll transform your mindset and unlock your potential for success.
          </p>
          <p className="text-start mb-4">
            Watch the welcome video from the President of the Peace & Prosperity and Think and Grow Rich Institutes, and
            gain access to this transformative course!
          </p>
        </div>
      </div>

      <Button className="md:self-end md:w-48">Get the Course</Button>
    </div>
  );
};

export default PeaceProsperity;
