import { default as SubscribeEmail } from '../../atoms/common/input-action';
import { LinkList } from './link-list';
import { TribeAfrica } from '../../atoms/common/internal-logo';

import spiralBackground from '../../assets/branding-bg-dark.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const footerLinks = {
  about: [
    {
      label: 'About us',
      link: '',
    },
    {
      label: 'Resources & Policies',
      link: '',
    },
    {
      label: 'Trust & Safety',
      link: '',
    },
  ],
  business: [
    {
      label: 'Invest with us',
      link: '',
    },
    {
      label: 'Advertise with us',
      link: '',
    },
  ],
  join: [
    {
      label: 'Add your business',
      link: '',
    },
    {
      label: 'Add your service',
      link: '',
    },
    {
      label: 'Add a place',
      link: '',
    },
    {
      label: 'Add your event',
      link: '',
    },
    {
      label: 'Work with the Tribe',
      link: '',
    },
    {
      label: 'Contribute to our blog',
      link: '',
    },
  ],
  apps: [
    {
      label: 'Android App',
      link: '',
    },
    {
      label: 'iPhone App',
      link: '',
    },
  ],
};

const socialMediaLinks = [
  {
    icon: faFacebookF,
    link: 'https://facebook.com',
  },
  {
    icon: faTwitter,
    link: 'https://twitter.com',
  },
  {
    icon: faInstagram,
    link: 'https://instagram.com',
  },
  {
    icon: faLinkedinIn,
    link: 'https://linkedin.com',
  },
];

const Footer = () => {
  return (
    <footer
      className="bg-black text-white py-8 text-center md:text-left"
      style={{ backgroundImage: `url(${spiralBackground})` }}
    >
      <div className="container mx-auto p-2 md:p-4 text-slate-300 m-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
          <div className="col-span-1 grid gap-2">
            <LinkList
              heading={
                <>
                  About <TribeAfrica />
                </>
              }
              links={footerLinks.about}
            />
            <LinkList
              heading={
                <>
                  Biz with <TribeAfrica />
                </>
              }
              links={footerLinks.business}
            />
          </div>
          <div className="col-span-2 mt-4 md:mt-0">
            <div className="grid md:flex gap-3 w-full">
              <LinkList
                heading={
                  <>
                    Join <TribeAfrica />
                  </>
                }
                links={footerLinks.apps}
              />
              <div className="col-span-1 md:ms-auto md:w-48">
                <LinkList heading={<>Get the App</>} links={footerLinks.join} />
              </div>
            </div>
            <div>
              <h3 className="text-xl text-orange-500 font-bold mb-4 mt-4">Subscribe to our newsletter</h3>
              <SubscribeEmail
                handleSubmit={() => console.log('submitted')}
                inputType={'email'}
                inputPlaceholder={'Enter your email'}
                buttonPlaceholder={'Subscribe'}
              />
            </div>
          </div>
        </div>

        {/* Social media links */}
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 border-t border-s border-b border-orange-500 ps-4 py-12 rounded-s-xl">
          {socialMediaLinks.map((link, index) => (
            <a
              key={index}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-slate-700 p-2 rounded-full shadow-lg border hover:bg-white hover:border-orange-400 hover:text-black transition duration-300"
            >
              <FontAwesomeIcon icon={link.icon} size="lg" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
