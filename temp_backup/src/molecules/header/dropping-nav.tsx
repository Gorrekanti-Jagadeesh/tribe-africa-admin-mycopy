import Close from '@atoms/custom-button/close-button';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

interface HoverNavLinkProps {
  id: string;
  title?: string;
  content: React.ReactNode;
}

const DroppingNav: React.FC<HoverNavLinkProps> = ({ id, title, content }) => {
  const [open, setOpen] = useState(false);

  const ref = useDetectClickOutside({
    onTriggered: () => setOpen(false),
  });

  return (
    <div ref={ref} id={id} className="md:m-auto h-full w-full flex-1" onClick={() => setOpen(true)}>
      <span className="flex gap-1.5 h-full w-full md:justify-center md:items-center cursor-pointer text-white md:text-black">
        {title}
        <FontAwesomeIcon icon={faChevronDown} className="w-3" />
      </span>
      <div
        className={`fixed md:absolute h-screen md:h-auto left-0 top-0 md:top-auto w-full overflow-auto bg-black text-white md:rounded z-20 transition-all duration-200 ease-in
          ${open ? 'max-h-screen p-2 border-2 border-orange-500' : 'max-h-0'}`}
      >
        <Close
          className="ms-auto block md:hidden"
          theme="light"
          size="6"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
        />
        {content}
      </div>
    </div>
  );
};

export default DroppingNav;
