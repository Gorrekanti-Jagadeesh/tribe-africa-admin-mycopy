import { default as SubscribeEmail } from '../../atoms/common/input-action';
import { LinkList } from '@molecules/layout/link-list';
import { TribeAfrica } from '../../atoms/common/internal-logo';

import spiralBackground from '@assets/branding-bg-dark.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const footerLinks = {
  about: [
    {
      label: 'About us',
      url: '',
    },
    {
      label: 'Resources & Policies',
      url: '',
    },
    {
      label: 'Trust & Safety',
      url: '',
    },
  ],
  business: [
    {
      label: 'Invest with us',
      url: '',
    },
    {
      label: 'Advertise with us',
      url: '',
    },
  ],
  join: [
    {
      label: 'Add your business',
      url: '',
    },
    {
      label: 'Add your service',
      url: '',
    },
    {
      label: 'Add a place',
      url: '',
    },
    {
      label: 'Add your event',
      url: '',
    },
    {
      label: 'Work with the Tribe',
      url: '',
    },
    {
      label: 'Contribute to our blog',
      url: '',
    },
  ],
  apps: [
    {
      label: 'Android App',
      url: '',
    },
    {
      label: 'iPhone App',
      url: '',
    },
  ],
};

const Footer = () => {
  return (
    <footer
      className="bg-black text-white px-4 py-8 md:text-left"
      style={{ backgroundImage: `url(${spiralBackground})` }}
    >
      <div className="container mx-auto p-2 md:p-4 text-slate-300 m-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
          <div className="col-span-1 grid gap-2">
            <LinkList
              heading={
                <div className="text-xl text-orange-500 font-semibold">
                  About <TribeAfrica />
                </div>
              }
              links={footerLinks.about}
            />
            <LinkList
              heading={
                <div className="text-xl text-orange-500 font-semibold">
                  Biz with <TribeAfrica />
                </div>
              }
              links={footerLinks.business}
            />
          </div>
          <div className="col-span-2 mt-4 md:mt-0">
            <div className="grid md:flex gap-3 w-full">
              <LinkList
                heading={
                  <div className="text-xl text-orange-500 font-semibold">
                    Join <TribeAfrica />
                  </div>
                }
                links={footerLinks.join}
              />
              <div className="col-span-1 md:ms-auto md:w-48">
                <LinkList
                  heading={<div className="text-xl text-orange-500 font-semibold">Get the App</div>}
                  links={footerLinks.apps}
                />
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
        {/* <div className="fixed right-0 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 border-t border-s border-b border-orange-500 ps-4 py-12 rounded-s-xl">
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
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
