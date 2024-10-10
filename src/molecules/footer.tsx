import React, { useState } from 'react';
import spiralBackground from '../assets/spiral-background-dark.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-black text-white py-8 text-center md:text-left"
    style={{ backgroundImage: `url(${spiralBackground})`}}
    >
      <div className="container mx-auto p-2 md:p-8 lg:p-12 text-slate-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <h3 className="text-xl text-orange-500 font-bold mb-4">About Tribe Africa</h3>
            <ul className="space-y-2">
              <li><a href="#">About us</a></li>
              <li><a href="#">Resources & Policies</a></li>
              <li><a href="#">Trust & Safety</a></li>
            </ul>
          </div>
          <div className="col-span-2">
            <div className='grid md:flex gap-3 w-full'>
                <div>
                    <h3 className="text-xl text-orange-500 font-bold mb-4">Join Tribe Africa</h3>
                    <ul className="space-y-2">
                        <li><a href="#">Add your business</a></li>
                        <li><a href="#">Add your service</a></li>
                        <li><a href="#">Add a place</a></li>
                        <li><a href="#">Add your event</a></li>
                        <li><a href="#">Work with the Tribe</a></li>
                        <li><a href="#">Contribute to our blog</a></li>
                    </ul>
                </div>
                <div className="col-span-1 md:ms-auto md:w-48">
                    <h3 className="text-xl text-orange-500 font-bold mb-4 text-center md:text-left">Get the App</h3>
                    <div className="grid gap-2">
                        <a href="#" className="hover:text-gray-300">iPhone App</a>
                        <a href="#" className="hover:text-gray-300">Android App</a>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-xl text-white font-bold mb-4 mt-4">Subscribe to our newsletter</h3>
                <form>
                <input
                    type="email"
                    className="border border-gray-700 rounded-full px-4 py-2 text-black"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-orange-500 text-white px-4 py-2 rounded-full ml-2"
                >
                    Subscribe
                </button>
                </form>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-700" />
        <div className="flex justify-between items-center">
          <p className="text-sm">&copy; 2023 Tribe Africa. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-300">Investment with us</a>
            <a href="#" className="text-white hover:text-gray-300">Advertise with us</a>
          </div>
        </div>
        
        {/* Social media links */}
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 border-t-2 border-s-2 border-b-2 border-orange-500 ps-4 py-12 rounded-s-xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white bg-slate-700 p-2 rounded-full shadow-lg hover:bg-blue-500 transition duration-300">
            <FontAwesomeIcon icon={faFacebookF} size="lg" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white bg-slate-700 p-2 rounded-full shadow-lg hover:bg-blue-300 transition duration-300">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white bg-slate-700 p-2 rounded-full shadow-lg hover:bg-pink-400 transition duration-300">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white bg-slate-700 p-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
            <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;