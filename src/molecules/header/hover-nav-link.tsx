import Close from '@atoms/custom-button/close-button';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface HoverNavLinkProps {
  id: string;
  title?: string;
  content: React.ReactNode;
}

const HoverNavLink: React.FC<HoverNavLinkProps> = ({ id, title, content }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      id={id}
      className="md:m-auto group h-full w-full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="flex gap-1.5 h-full w-full md:justify-center md:items-center cursor-pointer text-white md:text-black">
        {title}
        <FontAwesomeIcon icon={faChevronDown} className="w-3" />
      </span>
      <div
        className={`fixed md:absolute h-screen md:h-auto left-0 top-0 md:top-auto p-2 w-full overflow-auto border-2 border-orange-500 bg-black text-white md:rounded z-20 transition-opacity duration-200 ease-out
          ${hover ? 'opacity-100' : 'opacity-0 -z-50 transition-none'}`}
      >
        <Close className="ms-auto block md:hidden" theme="light" size="6" onClick={() => setHover(false)} />
        {content}
      </div>
    </div>
  );
};

export default HoverNavLink;
