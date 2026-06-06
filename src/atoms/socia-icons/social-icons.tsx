import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faXTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
  faTiktok,
  faSpotify,
} from '@fortawesome/free-brands-svg-icons';

/* Figma: fixed white pill on right side, 86×414, radius=10, 7 icons 40×40 with 16px gap */
const SocialLinks: React.FC = () => {
  const socialLinks = [
    { href: 'https://facebook.com', icon: faFacebookF, label: 'Facebook' },
    { href: 'https://instagram.com', icon: faInstagram, label: 'Instagram' },
    { href: 'https://twitter.com', icon: faXTwitter, label: 'X' },
    { href: 'https://linkedin.com', icon: faLinkedinIn, label: 'LinkedIn' },
    { href: 'https://youtube.com', icon: faYoutube, label: 'YouTube' },
    { href: 'https://tiktok.com', icon: faTiktok, label: 'TikTok' },
    { href: 'https://spotify.com', icon: faSpotify, label: 'Spotify' },
  ];

  return (
    /* Figma: 86×414, bg=white, radius=10.04 (left-only), pad=36,23,36,23, gap=16, VERTICAL */
    <div
      className="fixed top-1/2 -translate-y-1/2 right-0 z-30 bg-white rounded-l-[10px] shadow-lg flex flex-col"
      style={{
        width: '86px',
        paddingTop: '36px',
        paddingBottom: '36px',
        paddingLeft: '23px',
        paddingRight: '23px',
        gap: '16px',
      }}
    >
      {socialLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-brand-orange transition-colors duration-300"
        >
          <FontAwesomeIcon icon={link.icon} className="text-base" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
