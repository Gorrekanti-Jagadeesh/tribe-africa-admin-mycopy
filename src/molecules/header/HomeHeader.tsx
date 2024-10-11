import React from 'react';
import africaLogo from '../../assets/logo.png';
import homeLogo from '../../assets/home.png';
import notificationLogo from '../../assets/notification.png';

const MenuBar = () => {
  return (
    <div className="flex">
      <div id="languages" className="border-2 outline-0 rounded" style={{ height: 'fit-content' }}>
        <select name="language" id="language">
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
        </select>
      </div>
      <div id="menu" className="ms-auto">
        <div className="flex gap-3">
          <img src={homeLogo} className="m-auto" style={{ width: '14px', height: 'fit-content' }} />
          <img src={notificationLogo} className="m-auto" style={{ width: '14px', height: 'fit-content' }} />
          <div className="flex gap-2">
            <button className="bg-white p-2 rounded hover:bg-orange-500 hover:text-white">Login</button>
            <button className="bg-orange-500 text-white p-2 rounded hover:bg-white hover:text-black">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface HoverNavLinkProps {
  id: string;
  title: string;
}

const HoverNavLink: React.FC<HoverNavLinkProps> = ({ id, title }) => {
  return (
    <div id={id} className="m-auto cursor-pointer group">
      <span className="flex">
        {title}
        <svg
          className="w-2.5 h-2.5 ms-3 m-auto"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </span>
      <div className="absolute left-0 p-2 mt-1 bg-white border border-gray-200 rounded invisible group-hover:visible transition-opacity">
        This is the hidden content that appears on hover. This is the hidden content that appears on hover. This is the
        hidden content that appears on hover. This is the hidden content that appears on hover. This is the hidden
        content that appears on hover. This is the hidden content that appears on hover.
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className="grid gap-2 m-2">
      <div>
        <MenuBar />
      </div>
      <div className="hidden text-center border-2 rounded-lg relative md:flex">
        <HoverNavLink id="getting-there" title="Getting three" />
        <HoverNavLink id="discover" title="Discover" />
        <HoverNavLink id="events" title="Events" />
        <div id="logo" className="m-auto cursor-pointer">
          <img src={africaLogo} style={{ maxWidth: '150px' }} />
        </div>
        <HoverNavLink id="institute-collaboration" title={'Peace & Prosperity Institute'} />
        <div id="blog" className="m-auto cursor-pointer">
          <span>Blog</span>
        </div>
        <div id="contact" className="m-auto cursor-pointer">
          <span>Contact</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
