import OverLayCard from '@atoms/card/overlay-card';
import DualHeading from '@atoms/heading/dual-heading';

import useScreenWidth from '@hooks/useScreenWidth';

import { demoImage } from '@data/index';
import Modal from '@molecules/modal';
import { useState } from 'react';
import ColsGrid from '@molecules/layout/cols-grid';

const LookOutCollage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState();
  const screenWidth = useScreenWidth();

  const handleClick = (id: string) => {
    if (screenWidth < 768) return;
  };
  return (
    <div className="max-w-6xl m-auto">
      <DualHeading>Things to *Look Out* For!</DualHeading>
      <div>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <div>{content}</div>
        </Modal>
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
