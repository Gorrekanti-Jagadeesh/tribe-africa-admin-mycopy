import africaLogo from '../../assets/logo.png';
import { MenuBar } from '../menu/MenuBar';

export const HoverNavLink = ({ id, title }: { id: string; title: string }) => (
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
      hidden content that appears on hover. This is the hidden content that appears on hover. This is the hidden content
      that appears on hover. This is the hidden content that appears on hover.
    </div>
  </div>
);

export const BusinessHeader = () => {
  return (
    <div className="grid gap-2 m-2">
      <div>
        <MenuBar />
      </div>
      <div className="hidden text-center border-2 rounded-lg relative md:flex">
        <HoverNavLink id="getting-there" title="Getting there" />
        <HoverNavLink id="discover" title="Discover" />
        <HoverNavLink id="events" title="Events" />
        <div id="logo" className="m-auto cursor-pointer">
          <img src={africaLogo} style={{ maxWidth: '150px' }} />
        </div>
        <HoverNavLink id="institute-collaboration" title="Peace & Prosperity Institute" />
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
