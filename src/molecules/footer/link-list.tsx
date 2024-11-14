import React from 'react';

export const LinkList = ({
  heading,
  links,
}: {
  heading: React.ReactNode;
  links: { link: string; label: string }[];
}) => {
  return (
    <div id="about">
      <h3 className="text-xl text-orange-500 font-bold mb-4">{heading}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.link}>{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
