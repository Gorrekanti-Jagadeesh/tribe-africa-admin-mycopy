import React from 'react';

export const LinkList = ({
  heading,
  links,
  className,
}: {
  heading: React.ReactNode;
  links: { url: string; label: string }[];
  className?: string;
}) => {
  return (
    <div id="about" className={`m-2 ${className} space-y-2`}>
      <div>{heading}</div>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url}>{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
