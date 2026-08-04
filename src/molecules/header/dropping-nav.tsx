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
      <span className="flex gap-1.5 h-full w-full md:justify-center md:items-center cursor-pointer text-white md:text-black font-poppins font-medium text-xl hover:text-brand-orange transition-colors duration-200">
        {title}
        <FontAwesomeIcon icon={faChevronDown} className="w-3 mt-0.5" />
      </span>
      <div
        className={`fixed md:absolute left-0 top-0 md:top-full w-full overflow-auto bg-black text-white md:rounded-[10px] z-20 transition-all duration-200 ease-in
          ${open ? 'max-h-screen p-3 border-2 border-brand-orange' : 'max-h-0 overflow-hidden'}`}
      >
        <Close
          className="ms-auto block md:hidden"
          theme="light"
          size="10"
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
