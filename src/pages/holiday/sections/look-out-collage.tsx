import OverLayCard from '@atoms/card/overlay-card';
import DualHeading from '@atoms/heading/dual-heading';

import { demoImage } from '@data/index';
import ColsGrid from '@molecules/layout/cols-grid';

const LookOutCollage = () => {
  return (
    <div className="max-w-8xl m-auto p-4 animate-on-scroll">
      <DualHeading>Things to *Look Out* For!</DualHeading>
      <div className="mt-4">
        <ColsGrid cols={2} gap={3}>
          <OverLayCard data={{ image: demoImage }} />
          <OverLayCard data={{ image: demoImage }} />
          <OverLayCard data={{ image: demoImage }} />
          <OverLayCard data={{ image: demoImage }} />
        </ColsGrid>
      </div>
    </div>
  );
};

export default LookOutCollage;
