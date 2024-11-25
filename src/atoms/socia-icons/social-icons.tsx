import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
    <div>
      {/* Sticky button to reveal social links */}
      <button
        onClick={handleButtonClick}
        id="showLinksBtn"
        className="fixed top-1/2 right-5 bg-orange-500 text-white rounded-full p-4 text-2xl transition-colors duration-700 ease-in-out hover:bg-orange-400 flex items-center"
      >
        {isVisible ? (
          <>
            <FontAwesomeIcon icon={faArrowLeft} />
            {/* Display social icons when visible */}
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-white-500 text-2xl transition-colors duration-300 ease-in-out hover:text-orange-900"
              >
                <FontAwesomeIcon icon={link.icon} />
              </a>
            ))}
          </>
        ) : (
          <FontAwesomeIcon icon={faArrowRight} />
        )}
      </button>
    </div>
  );
};

export default SocialLinks;
