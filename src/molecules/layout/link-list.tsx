import React from 'react';

export const LinkList = ({
  heading,
  links,
  className,
  subLinksHeading,
  subLinks,
}: {
  heading: React.ReactNode;
  links: { url: string; label: string }[];
  className?: string;
  subLinksHeading?: React.ReactNode;
  subLinks?: { url: string; label: string }[];
}) => {
  return (
    <>
      <div id="about" className={`${className} space-y-2`}>
        <div>{heading}</div>
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li key={index} className="text-sm md:text-base">
              <a href={link.url}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
      {subLinks && (
        <div className={`${className}`}>
          <div className="my-2">{subLinksHeading}</div>
          <ul className="space-y-2">
            {subLinks.map((link, index) => (
              <li key={index} className="text-sm md:text-base">
                <a href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
