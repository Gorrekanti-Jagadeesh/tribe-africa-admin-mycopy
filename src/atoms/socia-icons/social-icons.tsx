import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const SocialLinks: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
  };

  const socialLinks = [
    { href: 'https://facebook.com', icon: faFacebookF },
    { href: 'https://twitter.com', icon: faTwitter },
    { href: 'https://instagram.com', icon: faInstagram },
    { href: 'https://linkedin.com', icon: faLinkedinIn },
  ];

  return (
    <div className="fixed top-1/2 right-0 flex">
      {/* Sticky button to reveal social links */}
      <button
        onClick={handleButtonClick}
        id="show-links"
        className="h-fit p-2 px-1 rounded-l-sm bg-orange-500 text-white transition-colors duration-700 ease-in-out hover:bg-orange-400 flex items-center"
      >
        {isVisible ? (
          <>
            <FontAwesomeIcon icon={faChevronRight} />
          </>
        ) : (
          <FontAwesomeIcon icon={faChevronLeft} />
        )}
      </button>
      {/* Display social icons when visible */}
      <div className="flex flex-col bg-white py-2 border border-orange-400">
        {isVisible &&
          socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className=" border rounded-full bg-black text-white px-1 text-center transition-colors duration-300 ease-in-out"
            >
              <FontAwesomeIcon icon={link.icon} />
            </a>
          ))}
      </div>
    </div>
  );
};

export default SocialLinks;
