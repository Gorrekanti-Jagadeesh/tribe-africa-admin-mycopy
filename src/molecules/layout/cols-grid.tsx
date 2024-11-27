import React, { ReactNode } from 'react';

interface layoutProps {
  cols?: number;
  gap?: number;
  children: React.ReactNode;
}

const ColsGrid: React.FC<layoutProps> = ({ cols = 3, gap = 2, children }) => {
  return (
    <div
      className={`max-w-6xl m-auto grid gap-${gap}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  );
};

export default ColsGrid;
