import { useState } from 'react';
import { default as SubscribeEmail } from '../../atoms/common/input-action';
import { LinkList } from '@molecules/layout/link-list';
import { TribeAfrica } from '../../atoms/common/internal-logo';
import spiralBackground from '@assets/branding-bg-dark.png';
import Modal from '@molecules/modal';
import AdvertisementForm from '@molecules/forms/advertisement-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faXTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
  faSpotify,
} from '@fortawesome/free-brands-svg-icons';

const footerLinks = {
  about: [
    { label: 'About us', url: '' },
    { label: 'Resources & Policies', url: '' },
    { label: 'Trust & Safety', url: '' },
  ],
  join: [
    { label: 'Add your business', url: '' },
    { label: 'Add your service', url: '' },
    { label: 'Add a place', url: '' },
    { label: 'Add your event', url: '' },
    { label: 'Work with the Tribe', url: '' },
    { label: 'Contribute to our blog', url: '' },
  ],
  apps: [
    { label: 'Android App', url: '' },
    { label: 'iPhone App', url: '' },
  ],
};

const Footer = () => {
  const [isAdOpen, setIsAdOpen] = useState(false);

  const businessLinks = [
    { label: 'Invest with us', url: '' },
    { label: 'Advertise with us', onClick: () => setIsAdOpen(true) },
  ];

  return (
    <footer className="bg-black text-white px-4 py-10" style={{ backgroundImage: `url(${spiralBackground})` }}>
      <Modal isOpen={isAdOpen} setIsOpen={setIsAdOpen} containerClasses="ms-auto">
        <AdvertisementForm />
      </Modal>
      <div className="max-w-8xl mx-auto text-slate-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Left column */}
          <div className="grid gap-6">
            <LinkList
              heading={
                <div className="font-poppins text-xl font-semibold text-brand-orange flex items-center gap-1">
                  About <TribeAfrica className="mx-1" />
                </div>
              }
              links={footerLinks.about}
            />
            <LinkList
              heading={
                <div className="font-poppins text-xl font-semibold text-brand-orange flex items-center gap-1">
                  Biz with <TribeAfrica className="mx-1" />
                </div>
              }
              links={businessLinks}
            />
          </div>

          {/* Right 2 columns */}
          <div className="col-span-2">
            <div className="grid md:flex gap-6">
              <LinkList
                heading={
                  <div className="font-poppins text-xl font-semibold text-brand-orange flex items-center gap-1">
                    Join <TribeAfrica className="mx-1" />
                  </div>
                }
                links={footerLinks.join}
              />
              <div className="md:ms-auto md:w-48">
                <LinkList
                  heading={<div className="font-poppins text-xl font-semibold text-brand-orange">Get the App</div>}
                  links={footerLinks.apps}
                />
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h3 className="font-poppins font-bold text-xl text-brand-orange mb-4">Subscribe to our newsletter</h3>
              <SubscribeEmail
                handleSubmit={() => console.log('submitted')}
                inputType="email"
                inputPlaceholder="Enter your email"
                buttonPlaceholder="Subscribe"
              />
            </div>
          </div>
        </div>

        {/* Social icons row */}
        <div className="mt-10 pt-8 border-t border-white/20 flex flex-wrap gap-4 justify-center md:justify-start">
          {[
            { href: 'https://facebook.com', icon: faFacebookF, label: 'Facebook' },
            { href: 'https://twitter.com', icon: faXTwitter, label: 'X' },
            { href: 'https://instagram.com', icon: faInstagram, label: 'Instagram' },
            { href: 'https://linkedin.com', icon: faLinkedinIn, label: 'LinkedIn' },
            { href: 'https://youtube.com', icon: faYoutube, label: 'YouTube' },
            { href: 'https://spotify.com', icon: faSpotify, label: 'Spotify' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="w-10 h-10 rounded-full bg-black border border-white/40 flex items-center justify-center text-white hover:bg-brand-orange hover:border-brand-orange transition-colors duration-300"
            >
              <FontAwesomeIcon icon={link.icon} className="text-base" />
            </a>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-white/40 font-poppins">
          © {new Date().getFullYear()} Tribe Africa. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
